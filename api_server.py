"""
Flask Backend API for AI/ML Compiler
Provides REST API endpoints for the web frontend
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from compiler import AIMLCompiler
import json
import sys
import io
import subprocess
import tempfile
import os
import traceback
import re
import sqlite3

# Try to import Google Gemini AI
try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError:
    GEMINI_AVAILABLE = False
    print("⚠️ google-generativeai not installed. Run: pip install google-generativeai")

# Load environment variables from .env file
def load_env_file():
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    if os.path.exists(env_path):
        with open(env_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ[key.strip()] = value.strip()

load_env_file()

# Configure Gemini API
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', '')
if GEMINI_AVAILABLE and GEMINI_API_KEY:
    try:
        genai.configure(api_key=GEMINI_API_KEY)
        gemini_model = genai.GenerativeModel('models/gemini-2.5-flash')
        print("✅ Gemini AI enabled for chatbot (gemini-2.5-flash)")
    except Exception as e:
        GEMINI_AVAILABLE = False
        print(f"⚠️ Gemini API initialization failed: {e}")
else:
    GEMINI_AVAILABLE = False
    if not GEMINI_API_KEY:
        print("💡 Set GEMINI_API_KEY environment variable to enable AI chatbot")

# Add compilers to PATH
gcc_path = r'C:\msys64\mingw64\bin'
go_path = r'C:\go\bin'
php_path = r'C:\php'
nodejs_path = r'C:\Program Files\nodejs'
npm_path = os.path.join(os.environ.get('APPDATA', ''), 'npm')

# Add all paths to environment
for path in [gcc_path, go_path, php_path, nodejs_path, npm_path]:
    if path and path not in os.environ['PATH']:
        os.environ['PATH'] = path + os.pathsep + os.environ['PATH']

app = Flask(__name__, static_folder='.')
CORS(app)  # Enable CORS for frontend access

# Store compiler instances (in production, use proper session management)
compilers = {}

def execute_code(code: str, language: str, user_inputs: list = None) -> dict:
    """
    Execute the compiled code safely and capture output
    """
    result = {
        'status': 'unknown',
        'output': '',
        'errors': []
    }
    
    try:
        if language == 'python':
            # Capture stdout and stderr
            old_stdout = sys.stdout
            old_stderr = sys.stderr
            
            sys.stdout = io.StringIO()
            sys.stderr = io.StringIO()
            
            # Use user inputs if provided, otherwise use defaults
            if user_inputs is None or len(user_inputs) == 0:
                mock_values = ["5", "10", "test", "hello", "20", "3.14", "yes"]
            else:
                mock_values = user_inputs
            
            mock_index = [0]  # Use list to make it mutable in nested function
            
            # Custom input function that shows prompts and uses mock data
            def mock_input(prompt=""):
                # Print the prompt to stdout
                sys.stdout.write(prompt)
                sys.stdout.flush()
                
                # Get mock value
                if mock_index[0] < len(mock_values):
                    value = mock_values[mock_index[0]]
                    mock_index[0] += 1
                else:
                    value = "default"
                
                # Show the mock value being entered
                sys.stdout.write(f"{value}\n")
                return value
            
            # Create execution namespace with custom input
            exec_globals = {
                '__builtins__': __builtins__,
                'input': mock_input,
                '__name__': '__main__'  # Set __name__ so if __name__ == "__main__" works
            }
            
            try:
                # Execute the code with custom input
                exec(code, exec_globals)
                
                # Get output
                output = sys.stdout.getvalue()
                errors = sys.stderr.getvalue()
                
                result['status'] = 'success'
                result['output'] = output if output else 'Code executed successfully (no output)'
                
                if 'input(' in code:
                    if 'warnings' not in result:
                        result['warnings'] = []
                    result['warnings'].append(f'⚠️ Note: Using mock input values (auto-supplied)')
                
                if errors:
                    result['errors'].append(errors)
                    
            except EOFError:
                result['status'] = 'error'
                result['errors'].append('EOFError: Program tried to read more input than available.')
                result['output'] = sys.stdout.getvalue()
            except Exception as e:
                result['status'] = 'error'
                # Extract line number from traceback
                tb = traceback.extract_tb(e.__traceback__)
                line_num = None
                for frame in tb:
                    if frame.filename == '<string>':  # Our executed code
                        line_num = frame.lineno
                        break
                
                error_msg = f"{type(e).__name__}: {str(e)}"
                if line_num:
                    error_msg = f"Line {line_num}: {error_msg}"
                
                result['errors'].append(error_msg)
                # Get any output that was generated before the error
                partial_output = sys.stdout.getvalue()
                if partial_output:
                    result['output'] = partial_output
            finally:
                sys.stdout = old_stdout
                sys.stderr = old_stderr
        
        elif language == 'java':
            # Execute Java code using subprocess
            
            # Java JDK paths
            JAVA_HOME = r"C:\oracleJdk-25"
            javac_path = os.path.join(JAVA_HOME, "bin", "javac.exe")
            java_path = os.path.join(JAVA_HOME, "bin", "java.exe")
            
            # Check if JDK is available at the specified path
            if not os.path.exists(javac_path):
                result['status'] = 'error'
                result['errors'].append(
                    f' Java JDK not found at {JAVA_HOME}!\n\n'
                    'Please verify JDK installation or update JAVA_HOME path in api_server.py'
                )
                return result
            
            try:
                # Create temporary directory
                with tempfile.TemporaryDirectory() as temp_dir:
                    # Extract PUBLIC class name first (Java requirement: public class must match filename)
                    public_class_match = re.search(r'public\s+class\s+(\w+)', code)
                    if public_class_match:
                        class_name = public_class_match.group(1)
                    else:
                        # If no public class, use any class name
                        class_match = re.search(r'class\s+(\w+)', code)
                        class_name = class_match.group(1) if class_match else 'Main'
                    
                    # Write Java code to file
                    java_file = os.path.join(temp_dir, f'{class_name}.java')
                    with open(java_file, 'w', encoding='utf-8') as f:
                        f.write(code)
                    
                    # Compile Java code using full path
                    compile_process = subprocess.run(
                        [javac_path, java_file],
                        capture_output=True,
                        text=True,
                        timeout=10
                    )
                    
                    if compile_process.returncode != 0:
                        result['status'] = 'error'
                        # Parse and format compilation errors
                        error_output = compile_process.stderr
                        result['errors'].append(f'☕ Java Compilation Error:\n{error_output}')
                        return result
                    
                    # Run Java code using full path
                    # Prepare input for subprocess if provided
                    input_data = '\n'.join(str(inp) for inp in user_inputs) + '\n' if user_inputs else None
                    
                    run_process = subprocess.run(
                        [java_path, '-cp', temp_dir, class_name],
                        input=input_data,
                        capture_output=True,
                        text=True,
                        timeout=10
                    )
                    
                    result['status'] = 'success' if run_process.returncode == 0 else 'error'
                    result['output'] = run_process.stdout if run_process.stdout else 'Code executed successfully (no output)'
                    
                    if run_process.stderr:
                        result['errors'].append(f'⚠️ Runtime Error:\n{run_process.stderr}')
                        
            except subprocess.TimeoutExpired:
                result['status'] = 'error'
                result['errors'].append('⏱️ Execution timeout: Program took too long to execute (>10 seconds).')
            except Exception as e:
                result['status'] = 'error'
                result['errors'].append(f'❌ Java execution error: {str(e)}')
        
        elif language == 'sql':
            # Execute SQL code using SQLite
            
            try:
                # Create temporary database
                with tempfile.NamedTemporaryFile(mode='w', suffix='.db', delete=False) as temp_db:
                    db_path = temp_db.name
                
                try:
                    # Connect to SQLite database
                    conn = sqlite3.connect(db_path)
                    cursor = conn.cursor()
                    
                    # Remove comments first, then split SQL statements
                    lines = code.split('\n')
                    cleaned_lines = [line for line in lines if not line.strip().startswith('--')]
                    cleaned_code = '\n'.join(cleaned_lines)
                    
                    # Split SQL statements by semicolon
                    statements = [stmt.strip() for stmt in cleaned_code.split(';') if stmt.strip()]
                    
                    output_lines = []
                    
                    for statement in statements:
                        try:
                            cursor.execute(statement)
                            conn.commit()  # Commit after each statement
                            
                            # If it's a SELECT query, fetch and display results
                            if statement.upper().startswith('SELECT'):
                                rows = cursor.fetchall()
                                col_names = [description[0] for description in cursor.description]
                                
                                if rows:
                                    # Format as table
                                    output_lines.append('\n' + ' | '.join(col_names))
                                    output_lines.append('-' * (len(' | '.join(col_names))))
                                    for row in rows:
                                        output_lines.append(' | '.join(str(val) for val in row))
                                    output_lines.append('')  # Empty line for spacing
                                else:
                                    output_lines.append('Query returned 0 rows.\n')
                            else:
                                # For INSERT, UPDATE, DELETE, CREATE, etc.
                                stmt_type = statement.split()[0].upper()
                                output_lines.append(f'✓ {stmt_type} executed successfully')
                            
                        except sqlite3.Error as e:
                            result['errors'].append(f'SQL Error in statement:\n  {statement[:100]}\n  {str(e)}')
                    
                    conn.close()
                    
                    result['status'] = 'success'
                    result['output'] = '\n'.join(output_lines) if output_lines else 'SQL executed successfully (no output)'
                    
                finally:
                    # Clean up temp database
                    if os.path.exists(db_path):
                        os.unlink(db_path)
                        
            except Exception as e:
                result['status'] = 'error'
                result['errors'].append(f'❌ SQL execution error: {str(e)}')
        
        elif language == 'r':
            # Execute R code using Rscript
            
            try:
                # Transform readline() calls to work with stdin in non-interactive mode
                transformed_code = code
                
                # Replace as.integer(readline("prompt"))
                transformed_code = re.sub(
                    r'as\.integer\s*\(\s*readline\s*\([^)]*\)\s*\)',
                    'as.integer(scan("stdin", what=character(), n=1, quiet=TRUE))',
                    transformed_code
                )
                
                # Replace as.numeric(readline("prompt"))
                transformed_code = re.sub(
                    r'as\.numeric\s*\(\s*readline\s*\([^)]*\)\s*\)',
                    'as.numeric(scan("stdin", what=character(), n=1, quiet=TRUE))',
                    transformed_code
                )
                
                # Replace character(readline("prompt"))
                transformed_code = re.sub(
                    r'character\s*\(\s*readline\s*\([^)]*\)\s*\)',
                    'scan("stdin", what=character(), n=1, quiet=TRUE)',
                    transformed_code
                )
                
                # Replace standalone readline("prompt")
                transformed_code = re.sub(
                    r'readline\s*\([^)]*\)',
                    'scan("stdin", what=character(), n=1, quiet=TRUE)',
                    transformed_code
                )
                
                # Create temporary R script file with transformed code
                with tempfile.NamedTemporaryFile(mode='w', suffix='.R', delete=False, encoding='utf-8') as temp_r:
                    temp_r.write(transformed_code)
                    r_file = temp_r.name
                
                try:
                    # Try to find Rscript in common locations
                    rscript_paths = [
                        r'C:\Program Files\R\R-4.5.2\bin\Rscript.exe',  # Installed version
                        'Rscript',  # If in PATH
                        r'C:\Program Files\R\R-4.3.2\bin\Rscript.exe',
                        r'C:\Program Files\R\R-4.4.0\bin\Rscript.exe',
                        r'C:\Program Files\R\R-4.2.0\bin\Rscript.exe',
                        '/usr/bin/Rscript',  # Linux/Mac
                        '/usr/local/bin/Rscript'
                    ]
                    
                    rscript_cmd = None
                    for path in rscript_paths:
                        try:
                            test_process = subprocess.run(
                                [path, '--version'],
                                capture_output=True,
                                timeout=2
                            )
                            if test_process.returncode == 0:
                                rscript_cmd = path
                                break
                        except:
                            continue
                    
                    if not rscript_cmd:
                        result['status'] = 'error'
                        result['errors'].append(
                            '❌ R not found!\n\n'
                            'Please install R from https://cran.r-project.org/\n'
                            'Make sure Rscript is in your system PATH.'
                        )
                        return result
                    
                    # Prepare input data for R (if any user inputs)
                    input_data = None
                    if user_inputs and len(user_inputs) > 0:
                        input_data = '\n'.join(str(inp) for inp in user_inputs) + '\n'
                    
                    # Run R script with stdin support
                    run_process = subprocess.run(
                        [rscript_cmd, '--vanilla', '--slave', r_file],
                        input=input_data,
                        capture_output=True,
                        text=True,
                        timeout=30
                    )
                    
                    result['status'] = 'success' if run_process.returncode == 0 else 'error'
                    output = run_process.stdout if run_process.stdout else 'Code executed successfully (no output)'
                    
                    # If there are user inputs, show them clearly
                    if user_inputs and len(user_inputs) > 0:
                        result['output'] = f"📥 User Inputs: {', '.join(str(i) for i in user_inputs[:10])}" + \
                                         (f" (and {len(user_inputs) - 10} more...)" if len(user_inputs) > 10 else "") + \
                                         f"\n\n{output}"
                    else:
                        result['output'] = output
                    
                    if run_process.stderr:
                        # Filter out common R warnings that aren't actual errors
                        stderr_lines = run_process.stderr.split('\n')
                        error_lines = [line for line in stderr_lines if line.strip() and 
                                     not line.startswith('WARNING:') and 
                                     not 'package' in line.lower()]
                        if error_lines:
                            result['errors'].append(f'⚠️ R Messages:\n' + '\n'.join(error_lines))
                        
                finally:
                    # Clean up temp file
                    if os.path.exists(r_file):
                        os.unlink(r_file)
                        
            except subprocess.TimeoutExpired:
                result['status'] = 'error'
                result['errors'].append('⏱️ Execution timeout: R script took too long to execute (>30 seconds).')
            except Exception as e:
                result['status'] = 'error'
                result['errors'].append(f'❌ R execution error: {str(e)}')
        
        elif language == 'c':
            # Execute C code using gcc compiler
            
            try:
                # Create temporary directory
                with tempfile.TemporaryDirectory() as temp_dir:
                    # Write C code to file
                    c_file = os.path.join(temp_dir, 'program.c')
                    exe_file = os.path.join(temp_dir, 'program.exe')
                    
                    with open(c_file, 'w', encoding='utf-8') as f:
                        f.write(code)
                    
                    # Try to find gcc compiler
                    gcc_paths = [
                        'gcc',  # If in PATH
                        r'C:\MinGW\bin\gcc.exe',
                        r'C:\TDM-GCC-64\bin\gcc.exe',
                        r'C:\msys64\mingw64\bin\gcc.exe',
                        '/usr/bin/gcc',  # Linux/Mac
                    ]
                    
                    gcc_cmd = None
                    for path in gcc_paths:
                        try:
                            test_process = subprocess.run(
                                [path, '--version'],
                                capture_output=True,
                                timeout=2
                            )
                            if test_process.returncode == 0:
                                gcc_cmd = path
                                break
                        except:
                            continue
                    
                    if not gcc_cmd:
                        result['status'] = 'error'
                        result['errors'].append(
                            ' GCC compiler not found!\n\n'
                            'Please install MinGW-w64 or TDM-GCC:\n'
                            '• MinGW-w64: https://www.mingw-w64.org/\n'
                            '• TDM-GCC: https://jmeubank.github.io/tdm-gcc/\n\n'
                            'Make sure gcc is in your system PATH.'
                        )
                        return result
                    
                    # Compile C code
                    compile_process = subprocess.run(
                        [gcc_cmd, c_file, '-o', exe_file],
                        capture_output=True,
                        text=True,
                        timeout=30
                    )
                    
                    if compile_process.returncode != 0:
                        result['status'] = 'error'
                        error_output = compile_process.stderr
                        result['errors'].append(f'🔨 C Compilation Error:\n{error_output}')
                        return result
                    
                    # Run compiled program
                    input_data = '\n'.join(str(inp) for inp in user_inputs) + '\n' if user_inputs else None
                    
                    run_process = subprocess.run(
                        [exe_file],
                        input=input_data,
                        capture_output=True,
                        text=True,
                        timeout=30
                    )
                    
                    result['status'] = 'success' if run_process.returncode == 0 else 'error'
                    result['output'] = run_process.stdout if run_process.stdout else 'Code executed successfully (no output)'
                    
                    if run_process.stderr:
                        result['errors'].append(f' Runtime Error:\n{run_process.stderr}')
                        
            except subprocess.TimeoutExpired:
                result['status'] = 'error'
                result['errors'].append('Execution timeout: Program took too long to execute (>30 seconds).')
            except Exception as e:
                result['status'] = 'error'
                result['errors'].append(f' C execution error: {str(e)}')
                
        elif language == 'cpp':
            # Execute C++ code using g++ compiler
            
            try:
                # Create temporary directory
                with tempfile.TemporaryDirectory() as temp_dir:
                    # Write C++ code to file
                    cpp_file = os.path.join(temp_dir, 'program.cpp')
                    exe_file = os.path.join(temp_dir, 'program.exe')
                    
                    with open(cpp_file, 'w', encoding='utf-8') as f:
                        f.write(code)
                    
                    # Try to find g++ compiler
                    gpp_paths = [
                        'g++',  # If in PATH
                        r'C:\MinGW\bin\g++.exe',
                        r'C:\TDM-GCC-64\bin\g++.exe',
                        r'C:\msys64\mingw64\bin\g++.exe',
                        '/usr/bin/g++',  # Linux/Mac
                    ]
                    
                    gpp_cmd = None
                    for path in gpp_paths:
                        try:
                            test_process = subprocess.run(
                                [path, '--version'],
                                capture_output=True,
                                timeout=2
                            )
                            if test_process.returncode == 0:
                                gpp_cmd = path
                                break
                        except:
                            continue
                    
                    if not gpp_cmd:
                        result['status'] = 'error'
                        result['errors'].append(
                            ' G++ compiler not found!\n\n'
                            'Please install MinGW-w64 or TDM-GCC:\n'
                            '• MinGW-w64: https://www.mingw-w64.org/\n'
                            '• TDM-GCC: https://jmeubank.github.io/tdm-gcc/\n\n'
                            'Make sure g++ is in your system PATH.'
                        )
                        return result
                    
                    # Compile C++ code
                    compile_process = subprocess.run(
                        [gpp_cmd, cpp_file, '-o', exe_file],
                        capture_output=True,
                        text=True,
                        timeout=30
                    )
                    
                    if compile_process.returncode != 0:
                        result['status'] = 'error'
                        error_output = compile_process.stderr
                        result['errors'].append(f'🔨 C++ Compilation Error:\n{error_output}')
                        return result
                    
                    # Run compiled program
                    input_data = '\n'.join(str(inp) for inp in user_inputs) + '\n' if user_inputs else None
                    
                    run_process = subprocess.run(
                        [exe_file],
                        input=input_data,
                        capture_output=True,
                        text=True,
                        timeout=30
                    )
                    
                    result['status'] = 'success' if run_process.returncode == 0 else 'error'
                    result['output'] = run_process.stdout if run_process.stdout else 'Code executed successfully (no output)'
                    
                    if run_process.stderr:
                        result['errors'].append(f'⚠️ Runtime Error:\n{run_process.stderr}')
                        
            except subprocess.TimeoutExpired:
                result['status'] = 'error'
                result['errors'].append('⏱️ Execution timeout: Program took too long to execute (>30 seconds).')
            except Exception as e:
                result['status'] = 'error'
                result['errors'].append(f' C++ execution error: {str(e)}')
        
        elif language == 'go':
            # Execute Go code
            
            try:
                with tempfile.TemporaryDirectory() as temp_dir:
                    go_file = os.path.join(temp_dir, 'main.go')
                    with open(go_file, 'w', encoding='utf-8') as f:
                        f.write(code)
                    
                    # Run Go code with proper input formatting
                    if user_inputs and len(user_inputs) > 0:
                        # Add extra newlines for better visibility
                        input_data = '\n'.join(str(inp) for inp in user_inputs) + '\n\n'
                    else:
                        input_data = None
                    
                    run_process = subprocess.run(
                        ['go', 'run', go_file],
                        input=input_data,
                        capture_output=True,
                        text=True,
                        timeout=30
                    )
                    
                    result['status'] = 'success' if run_process.returncode == 0 else 'error'
                    
                    # Clean up output - replace multiple spaces with newlines for better readability
                    output = run_process.stdout if run_process.stdout else 'Code executed successfully'
                    
                    # If there are user inputs, show them clearly
                    if user_inputs and len(user_inputs) > 0:
                        result['output'] = f"📥 User Inputs: {', '.join(str(i) for i in user_inputs[:10])}" + \
                                         (f" (and {len(user_inputs) - 10} more...)" if len(user_inputs) > 10 else "") + \
                                         f"\n\n{output}"
                    else:
                        result['output'] = output
                    
                    if run_process.stderr:
                        result['errors'].append(f'⚠️ Error:\n{run_process.stderr}')
            except FileNotFoundError:
                result['status'] = 'error'
                result['errors'].append(' Go not found! Install from https://go.dev/dl/')
            except Exception as e:
                result['status'] = 'error'
                result['errors'].append(f' Go execution error: {str(e)}')
        
        elif language == 'php':
            # Execute PHP code
            
            try:
                with tempfile.NamedTemporaryFile(mode='w', suffix='.php', delete=False, encoding='utf-8') as temp_php:
                    temp_php.write(code)
                    php_file = temp_php.name
                
                try:
                    input_data = '\n'.join(str(inp) for inp in user_inputs) + '\n' if user_inputs else None
                    run_process = subprocess.run(
                        ['php', php_file],
                        input=input_data,
                        capture_output=True,
                        text=True,
                        timeout=30
                    )
                    
                    result['status'] = 'success' if run_process.returncode == 0 else 'error'
                    # Convert HTML line breaks to actual line breaks for console display
                    output = run_process.stdout if run_process.stdout else 'Code executed successfully'
                    output = output.replace('<br>', '\n').replace('<br/>', '\n').replace('<br />', '\n')
                    result['output'] = output
                    if run_process.stderr:
                        result['errors'].append(f'⚠️ Error:\n{run_process.stderr}')
                finally:
                    if os.path.exists(php_file):
                        os.unlink(php_file)
            except FileNotFoundError:
                result['status'] = 'error'
                result['errors'].append(' PHP not found! Install from https://www.php.net/downloads')
            except Exception as e:
                result['status'] = 'error'
                result['errors'].append(f' PHP execution error: {str(e)}')
        
        elif language == 'typescript':
            # Execute TypeScript code
            
            try:
                with tempfile.TemporaryDirectory() as temp_dir:
                    ts_file = os.path.join(temp_dir, 'program.ts')
                    js_file = os.path.join(temp_dir, 'program.js')
                    
                    with open(ts_file, 'w', encoding='utf-8') as f:
                        f.write(code)
                    
                    # Try ts-node first (simpler, runs TypeScript directly)
                    try:
                        input_data = '\n'.join(str(inp) for inp in user_inputs) + '\n' if user_inputs else None
                        ts_node_cmd = 'ts-node.cmd' if sys.platform == 'win32' else 'ts-node'
                        run_process = subprocess.run(
                            [ts_node_cmd, ts_file],
                            input=input_data,
                            capture_output=True,
                            text=True,
                            timeout=30,
                            shell=True if sys.platform == 'win32' else False
                        )

                        if run_process.returncode == 0:
                            result['status'] = 'success'
                            result['output'] = run_process.stdout if run_process.stdout else 'Code executed successfully'
                            if run_process.stderr:
                                result['errors'].append(f'⚠️ Warnings:\n{run_process.stderr}')
                            return result
                    except FileNotFoundError:
                        pass  # ts-node not found, try tsc instead
                    
                    # Fallback to tsc + node
                    tsc_cmd = 'tsc.cmd' if sys.platform == 'win32' else 'tsc'
                    compile_process = subprocess.run(
                        [tsc_cmd, ts_file, '--outFile', js_file, '--module', 'commonjs'],
                        capture_output=True,
                        text=True,
                        timeout=30,
                        shell=True if sys.platform == 'win32' else False
                    )
                    
                    if compile_process.returncode != 0:
                        result['status'] = 'error'
                        stderr = compile_process.stderr.strip()
                        if stderr:
                            result['errors'].append(f'🔨 TypeScript Compilation Error:\n{stderr}')
                        else:
                            result['errors'].append('🔨 TypeScript Compilation Error: tsc command failed')
                        result['errors'].append(
                            '\n💡 Install TypeScript:\n'
                            '   npm install -g typescript\n'
                            '   OR\n'
                            '   npm install -g ts-node (recommended for faster execution)'
                        )
                        return result
                    
                    # Check if JS file was created
                    if not os.path.exists(js_file):
                        result['status'] = 'error'
                        result['errors'].append('🔨 TypeScript compilation did not generate output file')
                        return result
                    
                    # Run compiled JavaScript
                    input_data = '\n'.join(str(inp) for inp in user_inputs) + '\n' if user_inputs else None
                    run_process = subprocess.run(
                        ['node', js_file],
                        input=input_data,
                        capture_output=True,
                        text=True,
                        timeout=30
                    )
                    
                    result['status'] = 'success' if run_process.returncode == 0 else 'error'
                    result['output'] = run_process.stdout if run_process.stdout else 'Code executed successfully'
                    if run_process.stderr:
                        result['errors'].append(f'⚠️ Runtime Error:\n{run_process.stderr}')
            except FileNotFoundError as e:
                result['status'] = 'error'
                result['errors'].append(
                    '❌ TypeScript/Node.js not found!\n\n'
                    '📦 Installation Required:\n'
                    '1. Install Node.js: https://nodejs.org/\n'
                    '2. Install TypeScript: npm install -g typescript\n'
                    '3. OR Install ts-node: npm install -g ts-node (recommended)\n\n'
                    f'Missing command: {str(e)}'
                )
            except Exception as e:
                result['status'] = 'error'
                result['errors'].append(f' TypeScript execution error: {str(e)}')
            
        else:
            result['status'] = 'unknown_language'
            result['output'] = f'Execution not supported for {language}'
            
    except Exception as e:
        result['status'] = 'error'
        result['errors'].append(f'Execution error: {str(e)}')
    
    return result

@app.route('/api/compile', methods=['POST'])
def compile_code():
    """
    Compile code with AI/ML enhancements
    
    Request body:
    {
        "code": "source code here",
        "language": "python" | "javascript" | "cpp",
        "auto_detect": true | false
    }
    """
    try:
        data = request.get_json()
        source_code = data.get('code', '')
        language = data.get('language', 'python')
        auto_detect = data.get('auto_detect', True)
        user_inputs = data.get('inputs', [])  # Get user inputs
        
        if not source_code:
            return jsonify({
                'success': False,
                'error': 'No code provided'
            }), 400
        
        # For Java, SQL, and R skip the compiler and execute directly
        if language == 'java':
            execution_result = execute_code(source_code, language, user_inputs)
            print(f"✅ Execution result for {language}: {execution_result}")  # Debug log
            return jsonify({
                'success': True,
                'execution': execution_result,
                'explanation': '=== Java Execution ===\nCode compiled and executed using Oracle JDK 25'
            })
        
        if language == 'sql':
            execution_result = execute_code(source_code, language, user_inputs)
            print(f"✅ Execution result for {language}: {execution_result}")  # Debug log
            return jsonify({
                'success': True,
                'execution': execution_result,
                'explanation': '=== SQL Execution ===\nSQL queries executed using SQLite3'
            })
        
        if language == 'r':
            execution_result = execute_code(source_code, language, user_inputs)
            print(f"✅ Execution result for {language}: {execution_result}")  # Debug log
            return jsonify({
                'success': True,
                'execution': execution_result,
                'explanation': '=== R Execution ===\nR code executed using Rscript'
            })
        
        if language == 'c':
            execution_result = execute_code(source_code, language, user_inputs)
            print(f"✅ Execution result for {language}: {execution_result}")  # Debug log
            return jsonify({
                'success': True,
                'execution': execution_result,
                'explanation': '=== C Execution ===\nC code compiled and executed using GCC'
            })
        
        if language == 'cpp':
            execution_result = execute_code(source_code, language, user_inputs)
            print(f"✅ Execution result for {language}: {execution_result}")  # Debug log
            return jsonify({
                'success': True,
                'execution': execution_result,
                'explanation': '=== C++ Execution ===\nC++ code compiled and executed using G++'
            })
        
        if language == 'go':
            execution_result = execute_code(source_code, language, user_inputs)
            print(f"✅ Execution result for {language}: {execution_result}")
            return jsonify({
                'success': True,
                'execution': execution_result,
                'explanation': '=== Go Execution ===\nGo code executed using go run'
            })
        
        if language == 'php':
            execution_result = execute_code(source_code, language, user_inputs)
            print(f"✅ Execution result for {language}: {execution_result}")
            return jsonify({
                'success': True,
                'execution': execution_result,
                'explanation': '=== PHP Execution ===\nPHP code executed using php interpreter'
            })
        
        if language == 'typescript':
            execution_result = execute_code(source_code, language, user_inputs)
            print(f"✅ Execution result for {language}: {execution_result}")
            return jsonify({
                'success': True,
                'execution': execution_result,
                'explanation': '=== TypeScript Execution ===\nTypeScript compiled and executed using tsc + node'
            })
        
        # Create compiler instance for Python
        compiler = AIMLCompiler(language)
        
        # Compile code
        result = compiler.compile(source_code, auto_detect_language=auto_detect)
        
        # Add explanation
        result['explanation'] = compiler.explain_compilation(result)
        
        # Execute the code if compilation was successful
        # Use ORIGINAL code, not corrected_code, so user can decide whether to apply fixes
        if result.get('success', False):
            code_to_execute = source_code  # Use original code
            execution_result = execute_code(code_to_execute, language, user_inputs)
            result['execution'] = execution_result
            print(f"✅ Execution result for {language}: {execution_result}")  # Debug log
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/detect-language', methods=['POST'])
def detect_language():
    """
    Detect programming language from code
    
    Request body:
    {
        "code": "source code here"
    }
    """
    try:
        data = request.get_json()
        source_code = data.get('code', '')
        
        if not source_code:
            return jsonify({
                'success': False,
                'error': 'No code provided'
            }), 400
        
        from nlp_corrector import NLPErrorCorrector
        nlp = NLPErrorCorrector()
        
        language, confidence = nlp.detect_language(source_code)
        
        return jsonify({
            'success': True,
            'language': language,
            'confidence': f"{confidence * 100:.1f}%"
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/correct-syntax', methods=['POST'])
def correct_syntax():
    """
    Auto-correct syntax errors using NLP
    
    Request body:
    {
        "code": "source code here",
        "language": "python" | "javascript" | "cpp"
    }
    """
    try:
        data = request.get_json()
        source_code = data.get('code', '')
        language = data.get('language', 'python')
        
        if not source_code:
            return jsonify({
                'success': False,
                'error': 'No code provided'
            }), 400
        
        from nlp_corrector import NLPErrorCorrector
        nlp = NLPErrorCorrector()
        
        result = nlp.correct_syntax_errors(source_code, language)
        
        return jsonify({
            'success': True,
            'corrected_code': result['corrected_code'],
            'fixes_applied': result['fixes_applied']
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/explain-error', methods=['POST'])
def explain_error():
    """
    Get human-friendly error explanation
    
    Request body:
    {
        "error": "error message",
        "context": "code context"
    }
    """
    try:
        data = request.get_json()
        error_message = data.get('error', '')
        context = data.get('context', '')
        
        from nlp_corrector import NLPErrorCorrector
        nlp = NLPErrorCorrector()
        
        explanation = nlp.explain_error(error_message, context)
        
        return jsonify({
            'success': True,
            'explanation': explanation
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/analyze', methods=['POST'])
def analyze_code():
    """
    Comprehensive code analysis
    
    Request body:
    {
        "code": "source code here",
        "language": "python" | "javascript" | "cpp"
    }
    """
    try:
        data = request.get_json()
        source_code = data.get('code', '')
        language = data.get('language', 'python')
        
        if not source_code:
            return jsonify({
                'success': False,
                'error': 'No code provided'
            }), 400
        
        from nlp_corrector import NLPErrorCorrector
        nlp = NLPErrorCorrector()
        
        # Language detection
        detected_lang, confidence = nlp.detect_language(source_code)
        
        # Generate documentation
        documentation = nlp.generate_code_documentation(source_code, language)
        
        return jsonify({
            'success': True,
            'detected_language': detected_lang,
            'language_confidence': f"{confidence * 100:.1f}%",
            'documentation': documentation
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

def get_intelligent_fallback_response(message, language, code):
    """Intelligent rule-based chatbot responses with code analysis"""
    message_lower = message.lower()
    
    # Extract line number if mentioned
    line_match = re.search(r'line\s+(\d+)', message_lower)
    target_line = int(line_match.group(1)) if line_match else None
    
    # Error explanations - ANALYZE THE CODE
    if 'error' in message_lower or 'wrong' in message_lower or target_line:
        if not code:
            return f"To help with errors, I need to see your code! Write some code in the editor, then ask me."
        
        # Analyze the code for common errors
        lines = code.split('\n')
        issues = []
        
        # Check specific line if mentioned
        if target_line and target_line <= len(lines):
            line_code = lines[target_line - 1]
            
            # Check for unclosed strings
            if line_code.count('"') % 2 != 0 or line_code.count("'") % 2 != 0:
                issues.append(f"**Line {target_line}:** Unclosed string - you're missing a closing quote\n```python\n{line_code}\n```\n**Fix:** Add the closing quote: `print(\"Python is running!\")`")
            
            # Check for unclosed parentheses
            elif line_code.count('(') != line_code.count(')'):
                issues.append(f"**Line {target_line}:** Unclosed parenthesis - missing `)` at the end\n```python\n{line_code}\n```\n**Fix:** Add `)` at the end")
            
            # Check for unclosed brackets
            elif line_code.count('[') != line_code.count(']'):
                issues.append(f"**Line {target_line}:** Unclosed bracket - missing `]`")
            
            # Check for unclosed braces
            elif line_code.count('{') != line_code.count('}'):
                issues.append(f"**Line {target_line}:** Unclosed brace - missing `}}`")
            
            else:
                issues.append(f"**Line {target_line}:** `{line_code.strip()}`\n\nThis line looks okay syntactically. The error might be:\n• Missing colon `:` at the end (for functions, if, for, while)\n• Incorrect indentation\n• Typo in a keyword")
        
        # General code analysis if no specific line
        else:
            for i, line in enumerate(lines, 1):
                if line.strip():
                    # Check quotes
                    if line.count('"') % 2 != 0 or line.count("'") % 2 != 0:
                        issues.append(f"**Line {i}:** Unclosed string quote")
                    # Check parentheses
                    if line.count('(') != line.count(')'):
                        issues.append(f"**Line {i}:** Unmatched parentheses")
        
        if issues:
            return "🔍 **Error Analysis:**\n\n" + "\n\n".join(issues[:3])  # Show up to 3 issues
        else:
            return f"I analyzed your {language} code but didn't find obvious syntax errors. Try:\n\n1. **Run the code** to see the exact error message\n2. Check for **indentation** (Python requires consistent spaces/tabs)\n3. Verify **spelling** of keywords like `print`, `def`, `if`"
    
    # Syntax questions
    if any(word in message_lower for word in ['syntax', 'how to', 'what is']):
        return f"I can help with {language} syntax! Some common topics:\n\n• **Variables**: `x = 10`\n• **Functions**: `def my_func():`\n• **Loops**: `for i in range(n):`\n• **Conditionals**: `if x > 5:`\n\nWhat specifically do you need help with?"
    
    # Debugging help
    if 'debug' in message_lower or 'fix' in message_lower:
        return f"**Debugging tips for {language}:**\n\n1. Read the error message carefully\n2. Check line numbers mentioned\n3. Look for typos\n4. Verify syntax (brackets, quotes, colons)\n5. Run code step-by-step\n\nPaste your error message for specific help!"
    
    # General help
    return f"I'm your {language} coding assistant! I can help with:\n\n• Explaining errors (try: 'what's wrong with line 6?')\n• Syntax questions\n• Debugging tips\n• Best practices\n\nAsk me about any specific line!"

@app.route('/api/chat', methods=['POST'])
def chat():
    """
    AI-powered chatbot using Google Gemini
    Helps with coding questions and debugging
    """
    try:
        data = request.get_json()
        message = data.get('message', '')
        code = data.get('code', '')
        language = data.get('language', 'python')
        
        if not message:
            return jsonify({
                'success': False,
                'error': 'No message provided'
            }), 400
        
        # Check if Gemini is available
        if not GEMINI_AVAILABLE or not GEMINI_API_KEY:
            # Use intelligent fallback response
            fallback_response = get_intelligent_fallback_response(message, language, code)
            return jsonify({
                'success': True,
                'response': fallback_response,
                'source': 'fallback'
            })
        
        try:
            # Build context-aware prompt
            system_prompt = f"""You are an expert programming assistant helping with {language} code.
Be concise, clear, and provide practical solutions.

Current Code Context:
```{language}
{code[:500] if code else 'No code provided'}
```

User Question: {message}

Provide a helpful, actionable response. If suggesting code changes, use proper formatting."""
            
            # Generate response using Gemini
            response = gemini_model.generate_content(system_prompt)
            
            return jsonify({
                'success': True,
                'response': response.text,
                'source': 'gemini-2.5-flash'
            })
            
        except Exception as e:
            # Log the actual error
            print(f"❌ Gemini API Error: {str(e)}")
            import traceback
            traceback.print_exc()
            
            # Fallback to basic response
            return jsonify({
                'success': True,
                'response': f"I'm having trouble connecting to AI services. However, I can help with basic questions about {language} programming. Could you rephrase your question?",
                'source': 'fallback',
                'error': str(e)
            })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'version': '1.0.0',
        'features': [
            'Multi-language compilation',
            'AI/ML error detection',
            'NLP-based corrections',
            'Automatic language detection',
            'IR optimization',
            'Intelligent suggestions'
        ]
    })

@app.route('/', methods=['GET'])
def index():
    """Serve the main HTML page"""
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files (CSS, JS, images)"""
    return send_from_directory('.', path)

@app.route('/api', methods=['GET'])
def api_docs():
    """API documentation"""
    return jsonify({
        'name': 'AI/ML Compiler API',
        'version': '1.0.0',
        'endpoints': {
            '/api/compile': 'POST - Compile code with AI/ML enhancements',
            '/api/chat': 'POST - AI-powered coding assistant (Gemini)',
            '/api/detect-language': 'POST - Detect programming language',
            '/api/correct-syntax': 'POST - Auto-correct syntax errors',
            '/api/explain-error': 'POST - Get human-friendly error explanations',
            '/api/analyze': 'POST - Comprehensive code analysis',
            '/api/health': 'GET - Health check'
        }
    })

if __name__ == '__main__':
    print("🚀 Starting AI/ML Compiler API Server...")
    port = int(os.environ.get('PORT', 5000))
    print(f"📝 API Documentation: http://localhost:{port}/")
    print(f"🔍 Health Check: http://localhost:{port}/api/health")
    app.run(debug=False, host='0.0.0.0', port=port, use_reloader=False)
