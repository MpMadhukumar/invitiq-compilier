// @ts-nocheck
/* eslint-disable */
// Language templates
const codeTemplates = {
    python: `# Python Code
def greet(name):
    return f"Hello {name} from InvitiQ!"

print(greet("World"))
print("Python is running!")`,
    
    java: `// Java Code
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello InvitiQ!");
        System.out.println("Java is running!");
        
        String name = "World";
        System.out.println("Hello " + name);
    }
}`,

    sql: `-- SQL Code
-- Create a sample table
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    age INTEGER
);

-- Insert sample data
INSERT INTO users (name, email, age) VALUES ('Alice', 'alice@invitiq.com', 25);
INSERT INTO users (name, email, age) VALUES ('Bob', 'bob@invitiq.com', 30);
INSERT INTO users (name, email, age) VALUES ('Charlie', 'charlie@invitiq.com', 28);

-- Query the data
SELECT * FROM users;
SELECT name, age FROM users WHERE age > 26;`,

    r: `# R Code
# Data analysis and visualization

# Create a vector
ages <- c(25, 30, 28, 35, 22)
names <- c("Alice", "Bob", "Charlie", "David", "Eve")

# Print values
print("Ages:")
print(ages)

# Calculate statistics
cat("\nMean age:", mean(ages), "\n")
cat("Median age:", median(ages), "\n")
cat("Max age:", max(ages), "\n")

# Create a data frame
df <- data.frame(Name = names, Age = ages)
print("\nData Frame:")
print(df)`,
    
    javascript: `// JavaScript Code
function greet(name) {
    return \`Hello \${name} from InvitiQ!\`;
}

console.log(greet("World"));
console.log("JavaScript is running!");`,
    
    c: `#include <stdio.h>

int main() {
    printf("Hello InvitiQ!\\n");
    printf("C is running!\\n");
    
    char name[] = "World";
    printf("Hello %s\\n", name);
    
    return 0;
}`,
    
    cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    cout << "Hello InvitiQ!" << endl;
    cout << "C++ is running!" << endl;
    
    string name = "World";
    cout << "Hello " << name << endl;
    
    return 0;
}`,
    
    go: `package main

import "fmt"

func main() {
    fmt.Println("Hello InvitiQ!")
    fmt.Println("Go is running!")
    
    // Example with input
    var name string
    fmt.Print("Enter your name: ")
    fmt.Scan(&name)
    fmt.Printf("Hello %s from InvitiQ!\\n", name)
    
    // Math example with multiple inputs
    var a, b int
    fmt.Print("Enter two numbers: ")
    fmt.Scan(&a, &b)
    fmt.Printf("Sum = %d\\n", a+b)
}`,
    
    php: `<?php
echo "Hello InvitiQ!\\n";
echo "PHP is running!\\n";

// Example with input
echo "Enter your name: ";
$name = trim(fgets(STDIN));
echo "Hello " . $name . " from InvitiQ!\\n";

// Math example
echo "Enter a number: ";
$num = trim(fgets(STDIN));
echo "Double: " . ($num * 2) . "\\n";
?>`,
    
    typescript: `// TypeScript Code
function greet(name: string): string {
    return \`Hello \${name} from InvitiQ!\`;
}

console.log(greet("World"));
console.log("TypeScript is running!");

// Example with typed arrays
const numbers: number[] = [1, 2, 3, 4, 5];
console.log("Numbers:", numbers);

// Example with interface
interface User {
    name: string;
    age: number;
}

const user: User = {
    name: "InvitiQ",
    age: 2026
};

console.log(\`User: \${user.name}, Age: \${user.age}\`);`
};

// Current language
let currentLang = 'python';

// DOM Elements
const languageBtn = document.getElementById('languageBtn');
const languageDropdown = document.getElementById('languageDropdown');
const langOptions = document.querySelectorAll('.lang-option');
const languageSelector = document.getElementById('languageSelector');
const codeEditor = document.getElementById('codeEditor');
const lineNumbers = document.getElementById('lineNumbers');
const runBtn = document.getElementById('runBtn');
const clearBtn = document.getElementById('clearBtn');
const outputDisplay = document.getElementById('output');
const backHomeBtn = document.getElementById('backHomeBtn');
const askDoubtBtn = document.getElementById('askDoubtBtn');
const outputSection = document.getElementById('outputSection');
const chatbotSection = document.getElementById('chatbotSection');
const closeChatBtn = document.getElementById('closeChatBtn');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const autocompleteDropdown = document.getElementById('autocompleteDropdown');
const selectAllBtn = document.getElementById('selectAllBtn');

// Java keywords and built-in types
const javaKeywords = [
    { name: 'abstract', type: 'keyword' },
    { name: 'assert', type: 'keyword' },
    { name: 'boolean', type: 'keyword' },
    { name: 'break', type: 'keyword' },
    { name: 'byte', type: 'keyword' },
    { name: 'case', type: 'keyword' },
    { name: 'catch', type: 'keyword' },
    { name: 'char', type: 'keyword' },
    { name: 'class', type: 'keyword' },
    { name: 'const', type: 'keyword' },
    { name: 'continue', type: 'keyword' },
    { name: 'default', type: 'keyword' },
    { name: 'do', type: 'keyword' },
    { name: 'double', type: 'keyword' },
    { name: 'else', type: 'keyword' },
    { name: 'enum', type: 'keyword' },
    { name: 'extends', type: 'keyword' },
    { name: 'final', type: 'keyword' },
    { name: 'finally', type: 'keyword' },
    { name: 'float', type: 'keyword' },
    { name: 'for', type: 'keyword' },
    { name: 'if', type: 'keyword' },
    { name: 'implements', type: 'keyword' },
    { name: 'import', type: 'keyword' },
    { name: 'instanceof', type: 'keyword' },
    { name: 'int', type: 'keyword' },
    { name: 'interface', type: 'keyword' },
    { name: 'long', type: 'keyword' },
    { name: 'native', type: 'keyword' },
    { name: 'new', type: 'keyword' },
    { name: 'package', type: 'keyword' },
    { name: 'private', type: 'keyword' },
    { name: 'protected', type: 'keyword' },
    { name: 'public', type: 'keyword' },
    { name: 'return', type: 'keyword' },
    { name: 'short', type: 'keyword' },
    { name: 'static', type: 'keyword' },
    { name: 'strictfp', type: 'keyword' },
    { name: 'super', type: 'keyword' },
    { name: 'switch', type: 'keyword' },
    { name: 'synchronized', type: 'keyword' },
    { name: 'this', type: 'keyword' },
    { name: 'throw', type: 'keyword' },
    { name: 'throws', type: 'keyword' },
    { name: 'transient', type: 'keyword' },
    { name: 'try', type: 'keyword' },
    { name: 'void', type: 'keyword' },
    { name: 'volatile', type: 'keyword' },
    { name: 'while', type: 'keyword' },
    { name: 'String', type: 'function' },
    { name: 'System', type: 'function' },
    { name: 'Scanner', type: 'function' },
    { name: 'ArrayList', type: 'function' },
    { name: 'HashMap', type: 'function' },
    { name: 'Integer', type: 'function' },
    { name: 'Double', type: 'function' },
    { name: 'Boolean', type: 'function' },
    { name: 'Math', type: 'function' },
    { name: 'Object', type: 'function' },
    { name: 'Exception', type: 'function' },
    { name: 'println', type: 'function' },
    { name: 'print', type: 'function' },
    { name: 'length', type: 'function' },
    { name: 'size', type: 'function' },
    { name: 'add', type: 'function' },
    { name: 'remove', type: 'function' },
    { name: 'get', type: 'function' },
    { name: 'set', type: 'function' }
];

// SQL keywords and functions
const sqlKeywords = [
    { name: 'SELECT', type: 'keyword' },
    { name: 'FROM', type: 'keyword' },
    { name: 'WHERE', type: 'keyword' },
    { name: 'INSERT', type: 'keyword' },
    { name: 'INTO', type: 'keyword' },
    { name: 'VALUES', type: 'keyword' },
    { name: 'UPDATE', type: 'keyword' },
    { name: 'SET', type: 'keyword' },
    { name: 'DELETE', type: 'keyword' },
    { name: 'CREATE', type: 'keyword' },
    { name: 'TABLE', type: 'keyword' },
    { name: 'ALTER', type: 'keyword' },
    { name: 'DROP', type: 'keyword' },
    { name: 'INDEX', type: 'keyword' },
    { name: 'PRIMARY', type: 'keyword' },
    { name: 'KEY', type: 'keyword' },
    { name: 'FOREIGN', type: 'keyword' },
    { name: 'REFERENCES', type: 'keyword' },
    { name: 'UNIQUE', type: 'keyword' },
    { name: 'NOT', type: 'keyword' },
    { name: 'NULL', type: 'keyword' },
    { name: 'DEFAULT', type: 'keyword' },
    { name: 'AUTO_INCREMENT', type: 'keyword' },
    { name: 'INTEGER', type: 'keyword' },
    { name: 'INT', type: 'keyword' },
    { name: 'VARCHAR', type: 'keyword' },
    { name: 'TEXT', type: 'keyword' },
    { name: 'DATE', type: 'keyword' },
    { name: 'DATETIME', type: 'keyword' },
    { name: 'TIMESTAMP', type: 'keyword' },
    { name: 'BOOLEAN', type: 'keyword' },
    { name: 'FLOAT', type: 'keyword' },
    { name: 'DOUBLE', type: 'keyword' },
    { name: 'DECIMAL', type: 'keyword' },
    { name: 'JOIN', type: 'keyword' },
    { name: 'INNER', type: 'keyword' },
    { name: 'LEFT', type: 'keyword' },
    { name: 'RIGHT', type: 'keyword' },
    { name: 'FULL', type: 'keyword' },
    { name: 'OUTER', type: 'keyword' },
    { name: 'ON', type: 'keyword' },
    { name: 'AND', type: 'keyword' },
    { name: 'OR', type: 'keyword' },
    { name: 'ORDER', type: 'keyword' },
    { name: 'BY', type: 'keyword' },
    { name: 'ASC', type: 'keyword' },
    { name: 'DESC', type: 'keyword' },
    { name: 'GROUP', type: 'keyword' },
    { name: 'HAVING', type: 'keyword' },
    { name: 'LIMIT', type: 'keyword' },
    { name: 'OFFSET', type: 'keyword' },
    { name: 'AS', type: 'keyword' },
    { name: 'DISTINCT', type: 'keyword' },
    { name: 'COUNT', type: 'function' },
    { name: 'SUM', type: 'function' },
    { name: 'AVG', type: 'function' },
    { name: 'MIN', type: 'function' },
    { name: 'MAX', type: 'function' },
    { name: 'UPPER', type: 'function' },
    { name: 'LOWER', type: 'function' },
    { name: 'LENGTH', type: 'function' },
    { name: 'SUBSTR', type: 'function' },
    { name: 'CONCAT', type: 'function' }
];

// R keywords and functions
const rKeywords = [
    { name: 'if', type: 'keyword' },
    { name: 'else', type: 'keyword' },
    { name: 'repeat', type: 'keyword' },
    { name: 'while', type: 'keyword' },
    { name: 'function', type: 'keyword' },
    { name: 'for', type: 'keyword' },
    { name: 'in', type: 'keyword' },
    { name: 'next', type: 'keyword' },
    { name: 'break', type: 'keyword' },
    { name: 'TRUE', type: 'keyword' },
    { name: 'FALSE', type: 'keyword' },
    { name: 'NULL', type: 'keyword' },
    { name: 'NA', type: 'keyword' },
    { name: 'NaN', type: 'keyword' },
    { name: 'Inf', type: 'keyword' },
    { name: 'return', type: 'keyword' },
    { name: 'print', type: 'function' },
    { name: 'cat', type: 'function' },
    { name: 'paste', type: 'function' },
    { name: 'c', type: 'function' },
    { name: 'vector', type: 'function' },
    { name: 'list', type: 'function' },
    { name: 'matrix', type: 'function' },
    { name: 'data.frame', type: 'function' },
    { name: 'mean', type: 'function' },
    { name: 'median', type: 'function' },
    { name: 'sum', type: 'function' },
    { name: 'min', type: 'function' },
    { name: 'max', type: 'function' },
    { name: 'length', type: 'function' },
    { name: 'nrow', type: 'function' },
    { name: 'ncol', type: 'function' },
    { name: 'head', type: 'function' },
    { name: 'tail', type: 'function' },
    { name: 'summary', type: 'function' },
    { name: 'str', type: 'function' },
    { name: 'typeof', type: 'function' },
    { name: 'class', type: 'function' },
    { name: 'seq', type: 'function' },
    { name: 'rep', type: 'function' },
    { name: 'sort', type: 'function' },
    { name: 'order', type: 'function' },
    { name: 'unique', type: 'function' },
    { name: 'table', type: 'function' },
    { name: 'subset', type: 'function' },
    { name: 'merge', type: 'function' },
    { name: 'rbind', type: 'function' },
    { name: 'cbind', type: 'function' },
    { name: 'read.csv', type: 'function' },
    { name: 'write.csv', type: 'function' },
    { name: 'plot', type: 'function' },
    { name: 'hist', type: 'function' },
    { name: 'barplot', type: 'function' },
    { name: 'boxplot', type: 'function' },
    { name: 'library', type: 'function' },
    { name: 'require', type: 'function' },
    { name: 'install.packages', type: 'function' }
];

// Python keywords and built-in functions
const pythonKeywords = [
    { name: 'and', type: 'keyword' },
    { name: 'as', type: 'keyword' },
    { name: 'assert', type: 'keyword' },
    { name: 'break', type: 'keyword' },
    { name: 'class', type: 'keyword' },
    { name: 'continue', type: 'keyword' },
    { name: 'def', type: 'keyword' },
    { name: 'del', type: 'keyword' },
    { name: 'elif', type: 'keyword' },
    { name: 'else', type: 'keyword' },
    { name: 'except', type: 'keyword' },
    { name: 'False', type: 'keyword' },
    { name: 'finally', type: 'keyword' },
    { name: 'for', type: 'keyword' },
    { name: 'from', type: 'keyword' },
    { name: 'global', type: 'keyword' },
    { name: 'if', type: 'keyword' },
    { name: 'import', type: 'keyword' },
    { name: 'in', type: 'keyword' },
    { name: 'is', type: 'keyword' },
    { name: 'lambda', type: 'keyword' },
    { name: 'None', type: 'keyword' },
    { name: 'not', type: 'keyword' },
    { name: 'or', type: 'keyword' },
    { name: 'pass', type: 'keyword' },
    { name: 'raise', type: 'keyword' },
    { name: 'return', type: 'keyword' },
    { name: 'True', type: 'keyword' },
    { name: 'try', type: 'keyword' },
    { name: 'while', type: 'keyword' },
    { name: 'with', type: 'keyword' },
    { name: 'yield', type: 'keyword' },
    { name: 'int', type: 'function' },
    { name: 'str', type: 'function' },
    { name: 'float', type: 'function' },
    { name: 'bool', type: 'function' },
    { name: 'list', type: 'function' },
    { name: 'dict', type: 'function' },
    { name: 'tuple', type: 'function' },
    { name: 'set', type: 'function' },
    { name: 'input', type: 'function' },
    { name: 'print', type: 'function' },
    { name: 'len', type: 'function' },
    { name: 'range', type: 'function' },
    { name: 'enumerate', type: 'function' },
    { name: 'zip', type: 'function' },
    { name: 'map', type: 'function' },
    { name: 'filter', type: 'function' },
    { name: 'sum', type: 'function' },
    { name: 'min', type: 'function' },
    { name: 'max', type: 'function' },
    { name: 'sorted', type: 'function' },
    { name: 'open', type: 'function' },
    { name: 'abs', type: 'function' },
    { name: 'round', type: 'function' }
];

let selectedSuggestionIndex = -1;

// Autocomplete functionality
function showAutocomplete(word, cursorPos) {
    // Only show autocomplete for words with 2+ characters to avoid false matches
    if (!word || word.length < 2) {
        hideAutocomplete();
        return;
    }
    
    // Select appropriate keywords based on current language
    let keywords;
    if (currentLang === 'java') {
        keywords = javaKeywords;
    } else if (currentLang === 'sql') {
        keywords = sqlKeywords;
    } else if (currentLang === 'r') {
        keywords = rKeywords;
    } else {
        keywords = pythonKeywords;
    }
    
    const matches = keywords.filter(kw => 
        kw.name.toLowerCase().startsWith(word.toLowerCase())
    );
    
    if (matches.length === 0) {
        hideAutocomplete();
        return;
    }
    
    // Position dropdown
    const textBeforeCursor = codeEditor.value.substring(0, cursorPos);
    const lines = textBeforeCursor.split('\n');
    const currentLine = lines.length;
    const currentCol = lines[lines.length - 1].length;
    
    const lineHeight = 25.6;
    const charWidth = 8.4;
    const lineNumberWidth = 50;
    
    autocompleteDropdown.style.top = `${currentLine * lineHeight + 20}px`;
    autocompleteDropdown.style.left = `${lineNumberWidth + currentCol * charWidth}px`;
    
    // Populate suggestions
    autocompleteDropdown.innerHTML = matches.map((match, index) => `
        <div class="autocomplete-item${index === 0 ? ' selected' : ''}" data-index="${index}" data-keyword="${match.name}">
            <span class="keyword-type">${match.type === 'keyword' ? 'abc' : 'f()'}</span>
            <span class="keyword-name">${match.name}</span>
        </div>
    `).join('');
    
    autocompleteDropdown.classList.add('active');
    selectedSuggestionIndex = 0;
    
    // Add click handlers
    document.querySelectorAll('.autocomplete-item').forEach(item => {
        item.addEventListener('click', () => {
            insertSuggestion(item.dataset.keyword, word, cursorPos);
        });
    });
}

function hideAutocomplete() {
    autocompleteDropdown.classList.remove('active');
    selectedSuggestionIndex = -1;
}

function insertSuggestion(keyword, typedWord, cursorPos) {
    const before = codeEditor.value.substring(0, cursorPos - typedWord.length);
    const after = codeEditor.value.substring(cursorPos);
    codeEditor.value = before + keyword + after;
    codeEditor.setSelectionRange(before.length + keyword.length, before.length + keyword.length);
    codeEditor.focus();
    hideAutocomplete();
    updateLineNumbers();
}

function navigateSuggestions(direction) {
    const items = document.querySelectorAll('.autocomplete-item');
    if (items.length === 0) return;
    
    items[selectedSuggestionIndex]?.classList.remove('selected');
    
    if (direction === 'down') {
        selectedSuggestionIndex = (selectedSuggestionIndex + 1) % items.length;
    } else {
        selectedSuggestionIndex = selectedSuggestionIndex <= 0 ? items.length - 1 : selectedSuggestionIndex - 1;
    }
    
    items[selectedSuggestionIndex].classList.add('selected');
    items[selectedSuggestionIndex].scrollIntoView({ block: 'nearest' });
}

// Update line numbers
function updateLineNumbers() {
    const lines = codeEditor.value.split('\n');
    const lineNumbersHtml = lines.map((_, index) => index + 1).join('\n');
    lineNumbers.textContent = lineNumbersHtml;
}

// Highlight error lines
function highlightErrorLines(errorLines = []) {
    const lines = codeEditor.value.split('\n');
    const lineNumbersHtml = lines.map((_, index) => {
        const lineNum = index + 1;
        if (errorLines.includes(lineNum)) {
            return `<span class="line-error">${lineNum}</span>`;
        }
        return lineNum;
    }).join('\n');
    lineNumbers.innerHTML = lineNumbersHtml;
}

// Real-time syntax and logical error checking (debounced)
let syntaxCheckTimeout;
async function checkSyntaxErrors() {
    clearTimeout(syntaxCheckTimeout);
    
    syntaxCheckTimeout = setTimeout(async () => {
        const code = codeEditor.value.trim();
        if (!code || (currentLang !== 'python' && currentLang !== 'java')) {
            updateLineNumbers(); // Clear any highlights if no code
            return;
        }
        
        // First, do quick client-side check for obvious errors
        const clientSideErrors = checkClientSideSyntax(code);
        if (clientSideErrors.length > 0) {
            highlightErrorLines(clientSideErrors);
        }
        
        // Then check with backend for more detailed analysis
        try {
            const response = await fetch('http://localhost:5000/api/compile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: code,
                    language: currentLang,
                    user_inputs: []
                })
            });
            
            if (!response.ok) {
                console.log('Backend not available, using client-side check only');
                return;
            }
            
            const result = await response.json();
            
            // Extract error lines from ALL types of errors (syntax, logical, runtime)
            const errorLines = [];
            
            // 1. Check compilation/syntax errors
            if (result.errors && result.errors.length > 0) {
                result.errors.forEach(error => {
                    const lineMatch = error.line || error.message?.match(/line (\d+)/i);
                    if (lineMatch) {
                        const lineNum = typeof lineMatch === 'number' ? lineMatch : parseInt(lineMatch[1]);
                        if (!errorLines.includes(lineNum)) {
                            errorLines.push(lineNum);
                        }
                    }
                });
            }
            
            // 2. Check warnings (logical errors like undefined variables, unused imports)
            if (result.warnings && result.warnings.length > 0) {
                result.warnings.forEach(warning => {
                    const lineMatch = warning.line || warning.message?.match(/line (\d+)/i);
                    if (lineMatch) {
                        const lineNum = typeof lineMatch === 'number' ? lineMatch : parseInt(lineMatch[1]);
                        if (!errorLines.includes(lineNum)) {
                            errorLines.push(lineNum);
                        }
                    }
                });
            }
            
            // 3. Check execution errors (runtime errors like NameError, TypeError)
            if (result.execution_error) {
                const lineMatch = result.execution_error.match(/line (\d+)/i);
                if (lineMatch) {
                    const lineNum = parseInt(lineMatch[1]);
                    if (!errorLines.includes(lineNum)) {
                        errorLines.push(lineNum);
                    }
                }
            }
            
            // Highlight error lines in RED - DO NOT auto-correct
            if (errorLines.length > 0) {
                highlightErrorLines(errorLines);
            } else {
                updateLineNumbers(); // Clear highlights if no errors
            }
            
        } catch (error) {
            console.log('Backend check failed:', error.message);
            // Fallback to client-side check already done above
        }
    }, 600); // Check 0.6 seconds after user stops typing (faster feedback)
}

// Client-side syntax check for immediate feedback
function checkClientSideSyntax(code) {
    const errorLines = [];
    const lines = code.split('\n');
    
    lines.forEach((line, index) => {
        const lineNum = index + 1;
        const trimmed = line.trim();
        
        // Skip empty lines
        if (!trimmed) return;
        
        // Python-specific checks
        if (currentLang === 'python') {
            // Skip comments
            if (trimmed.startsWith('#')) return;
            
            // Check for missing colon after if/else/elif/for/while/def/class
            if ((trimmed.startsWith('if ') || trimmed.startsWith('elif ') || 
                 trimmed.match(/^else\s*$/) || trimmed.startsWith('for ') || 
                 trimmed.startsWith('while ') || trimmed.startsWith('def ') || 
                 trimmed.startsWith('class ')) && !trimmed.endsWith(':')) {
                if (!errorLines.includes(lineNum)) {
                    errorLines.push(lineNum);
                }
            }
            
            // Check for potential undefined variables
            if (trimmed.match(/int\([a-zA-Z_]\w*\)/) || trimmed.match(/float\([a-zA-Z_]\w*\)/) || 
                trimmed.match(/str\([a-zA-Z_]\w*\)/)) {
                const varMatch = trimmed.match(/(?:int|float|str)\(([a-zA-Z_]\w*)\)/);
                if (varMatch) {
                    const varName = varMatch[1];
                    const previousCode = lines.slice(0, index).join('\n');
                    if (!previousCode.includes(`${varName} =`) && !previousCode.includes(`${varName}=`) && 
                        varName !== 'input') {
                        if (!errorLines.includes(lineNum)) {
                            errorLines.push(lineNum);
                        }
                    }
                }
            }
        }
        
        // Java-specific checks
        if (currentLang === 'java') {
            // Skip comments
            if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;
            
            // Check for missing semicolon (except for class, method declarations, and control structures)
            if (!trimmed.endsWith(';') && !trimmed.endsWith('{') && !trimmed.endsWith('}') &&
                !trimmed.startsWith('public ') && !trimmed.startsWith('private ') && 
                !trimmed.startsWith('protected ') && !trimmed.startsWith('class ') &&
                !trimmed.startsWith('if ') && !trimmed.startsWith('else') && 
                !trimmed.startsWith('for ') && !trimmed.startsWith('while ') &&
                !trimmed.startsWith('import ') && !trimmed.startsWith('package ') &&
                !trimmed.startsWith('@') && trimmed.length > 0) {
                if (!errorLines.includes(lineNum)) {
                    errorLines.push(lineNum);
                }
            }
        }
        
        // Common checks for both languages
        // Check for unmatched parentheses
        const openParen = (trimmed.match(/\(/g) || []).length;
        const closeParen = (trimmed.match(/\)/g) || []).length;
        if (openParen !== closeParen) {
            if (!errorLines.includes(lineNum)) {
                errorLines.push(lineNum);
            }
        }
        
        // Check for unmatched curly braces (Java)
        if (currentLang === 'java') {
            const openBrace = (trimmed.match(/\{/g) || []).length;
            const closeBrace = (trimmed.match(/\}/g) || []).length;
            if (openBrace !== closeBrace) {
                if (!errorLines.includes(lineNum)) {
                    errorLines.push(lineNum);
                }
            }
        }
        
        // Check for unmatched quotes
        const singleQuotes = (trimmed.match(/'/g) || []).length;
        const doubleQuotes = (trimmed.match(/"/g) || []).length;
        if (singleQuotes % 2 !== 0 || doubleQuotes % 2 !== 0) {
            if (!errorLines.includes(lineNum)) {
                errorLines.push(lineNum);
            }
        }
        if (trimmed.match(/int\([a-zA-Z_]\w*\)/) || trimmed.match(/float\([a-zA-Z_]\w*\)/) || 
            trimmed.match(/str\([a-zA-Z_]\w*\)/)) {
            const varMatch = trimmed.match(/(?:int|float|str)\(([a-zA-Z_]\w*)\)/);
            if (varMatch) {
                const varName = varMatch[1];
                // Check if this variable was defined earlier
                const previousCode = lines.slice(0, index).join('\n');
                if (!previousCode.includes(`${varName} =`) && !previousCode.includes(`${varName}=`) && 
                    varName !== 'input') {
                    if (!errorLines.includes(lineNum)) {
                        errorLines.push(lineNum);
                    }
                }
            }
        }
    });
    
    return errorLines;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadLanguage('python');
    updateLineNumbers();
    
    // Update line numbers on typing
    codeEditor.addEventListener('input', () => {
        updateLineNumbers();
        checkSyntaxErrors(); // Check for syntax errors
    });
    codeEditor.addEventListener('scroll', () => {
        lineNumbers.scrollTop = codeEditor.scrollTop;
    });
});

// Language dropdown toggle
languageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    languageDropdown.classList.toggle('active');
});

// Prevent dropdown from closing when clicking inside it
languageDropdown.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
    languageDropdown.classList.remove('active');
});

// Language selection
langOptions.forEach(option => {
    option.addEventListener('click', () => {
        const lang = option.getAttribute('data-lang');
        loadLanguage(lang);
        
        // Update active state
        langOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        languageDropdown.classList.remove('active');
    });
});

// Load language template
function loadLanguage(lang) {
    currentLang = lang;
    codeEditor.value = codeTemplates[lang];
    updateLineNumbers();
    highlightErrorLines([]); // Clear any error highlights
    
    // Update language selector if it exists
    if (languageSelector) {
        languageSelector.value = lang;
    }
}

// Handle language selector change
if (languageSelector) {
    languageSelector.addEventListener('change', (e) => {
        const lang = e.target.value;
        loadLanguage(lang);
    });
}

// Select All button handler
if (selectAllBtn) {
    selectAllBtn.addEventListener('click', () => {
        codeEditor.select();
        codeEditor.focus();
    });
}

// Detect language from code content
function detectLanguageFromCode(code) {
    // Java detection
    if (code.includes('public class') || code.includes('public static void main') || 
        code.includes('System.out.println') || code.includes('import java.')) {
        return 'java';
    }
    // C++ detection
    if (code.includes('#include <iostream>') || code.includes('std::cout') || 
        code.includes('using namespace std')) {
        return 'cpp';
    }
    // C detection
    if ((code.includes('#include <stdio.h>') || code.includes('printf(')) && 
        !code.includes('std::')) {
        return 'c';
    }
    // Go detection
    if (code.includes('package main') && code.includes('func main()')) {
        return 'go';
    }
    // R detection
    if (code.includes('<-') || code.includes('readline()') || code.includes('cat(')) {
        return 'r';
    }
    // SQL detection
    if (/^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)/im.test(code)) {
        return 'sql';
    }
    // JavaScript/TypeScript detection
    if (code.includes('const ') || code.includes('let ') || code.includes('function') ||
        code.includes('console.log')) {
        return code.includes(': string') || code.includes(': number') ? 'typescript' : 'javascript';
    }
    // PHP detection
    if (code.includes('<?php')) {
        return 'php';
    }
    // Python detection (default for def, import, print without semicolons)
    if (code.includes('def ') || code.includes('import ') || 
        (code.includes('print(') && !code.includes(';'))) {
        return 'python';
    }
    
    return currentLang; // Keep current if can't detect
}

// Run code with interactive input
runBtn.addEventListener('click', async () => {
    const code = codeEditor.value.trim();
    
    if (!code) {
        displayOutput('No code to run!', 'error');
        return;
    }
    
    // Use the selected language from dropdown (no auto-detection)
    // currentLang is already set by the language selector change event
    
    // Check if code needs input
    const hasInput = code.includes('input(') || 
                     (code.includes('Scanner') && (code.includes('.next()') || code.includes('.nextInt()') || 
                      code.includes('.nextLine()') || code.includes('.nextDouble()') || code.includes('.nextFloat()'))) ||
                     (code.includes('scanf') || code.includes('getchar') || code.includes('gets')) ||
                     (code.includes('cin >>') || code.includes('getline(cin')) ||
                     (code.includes('prompt(')) ||
                     (code.includes('fmt.Scan') || code.includes('fmt.Scanf')) ||
                     (code.includes('fgets(STDIN)') || code.includes('readline()')) ||
                     (code.includes('readlineSync') || code.includes('question')) ||
                     (code.includes('readline(') || code.includes('scan('));
    
    if (hasInput && (currentLang === 'python' || currentLang === 'cpp' || currentLang === 'java' || currentLang === 'c' || currentLang === 'javascript' || currentLang === 'go' || currentLang === 'php' || currentLang === 'typescript' || currentLang === 'r')) {
        // Show interactive input prompt directly in output
        await executeWithInteractiveInput(code, currentLang);
    } else {
        displayOutput('🤖 Compiling and running code...', 'info');
        
        setTimeout(() => {
            executeCode(code, currentLang);
        }, 300);
    }
});

// Execute code with interactive input prompts
async function executeWithInteractiveInput(code, lang) {
    let prompts = [];
    let inputCount = 0;
    
    // Detect loop patterns for all languages
    let loopVariable = null;
    let loopPattern = null;
    let isDecrementing = false;
    
    if (lang === 'python') {
        // Python: for i in range(n):
        const match = code.match(/for\s+\w+\s+in\s+range\s*\(\s*(\w+)\s*\):/i);
        if (match) {
            loopVariable = match[1];
            loopPattern = 'python';
        }
    } else if (lang === 'java') {
        // Java: for(int i = 0; i < n; i++) or for(int i = 1; i <= n; i++)
        // Also: for(int i = n; i > 0; i--) or for(int i = n; i >= 0; i--)
        const incMatch = code.match(/for\s*\(\s*int\s+\w+\s*=\s*\d+\s*;\s*\w+\s*<=?\s*(\w+)\s*;\s*\w+\+\+/i);
        const decMatch = code.match(/for\s*\(\s*int\s+\w+\s*=\s*(\w+)\s*;\s*\w+\s*>=?\s*\d+\s*;\s*\w+--/i);
        const lengthMatch = code.match(/for\s*\(\s*int\s+\w+\s*=\s*\d+\s*;\s*\w+\s*<\s*(\w+)\.(?:length|size\(\))\s*;/i);
        
        if (incMatch) {
            loopVariable = incMatch[1];
            loopPattern = 'java';
        } else if (decMatch) {
            loopVariable = decMatch[1];
            loopPattern = 'java';
            isDecrementing = true;
        } else if (lengthMatch) {
            loopVariable = lengthMatch[1];
            loopPattern = 'java';
        }
    } else if (lang === 'c' || lang === 'cpp') {
        // C/C++: for(int i = 0; i < n; i++) or decrementing
        const incMatch = code.match(/for\s*\(\s*int\s+\w+\s*=\s*\d+\s*;\s*\w+\s*<=?\s*(\w+)\s*;\s*\w+\+\+/i);
        const decMatch = code.match(/for\s*\(\s*int\s+\w+\s*=\s*(\w+)\s*;\s*\w+\s*>=?\s*\d+\s*;\s*\w+--/i);
        const lengthMatch = code.match(/for\s*\(\s*int\s+\w+\s*=\s*\d+\s*;\s*\w+\s*<\s*(\w+)\.(?:length|size\(\))\s*;/i);
        
        if (incMatch) {
            loopVariable = incMatch[1];
            loopPattern = lang;
        } else if (decMatch) {
            loopVariable = decMatch[1];
            loopPattern = lang;
            isDecrementing = true;
        } else if (lengthMatch) {
            loopVariable = lengthMatch[1];
            loopPattern = lang;
        }
    } else if (lang === 'javascript') {
        // JavaScript: for(let/const/var i = 0; i < n; i++) or decrementing
        const incMatch = code.match(/for\s*\(\s*(?:let|const|var)\s+\w+\s*=\s*\d+\s*;\s*\w+\s*<=?\s*(\w+)\s*;\s*\w+\+\+/i);
        const decMatch = code.match(/for\s*\(\s*(?:let|const|var)\s+\w+\s*=\s*(\w+)\s*;\s*\w+\s*>=?\s*\d+\s*;\s*\w+--/i);
        const lengthMatch = code.match(/for\s*\(\s*(?:let|const|var)\s+\w+\s*=\s*\d+\s*;\s*\w+\s*<\s*(\w+)\.length\s*;/i);
        
        if (incMatch) {
            loopVariable = incMatch[1];
            loopPattern = 'javascript';
        } else if (decMatch) {
            loopVariable = decMatch[1];
            loopPattern = 'javascript';
            isDecrementing = true;
        } else if (lengthMatch) {
            loopVariable = lengthMatch[1];
            loopPattern = 'javascript';
        }
    } else if (lang === 'typescript') {
        // TypeScript: for(let/const/var i = 0; i < n; i++) or decrementing
        const incMatch = code.match(/for\s*\(\s*(?:let|const|var)\s+\w+\s*=\s*\d+\s*;\s*\w+\s*<=?\s*(\w+)\s*;\s*\w+\+\+/i);
        const decMatch = code.match(/for\s*\(\s*(?:let|const|var)\s+\w+\s*=\s*(\w+)\s*;\s*\w+\s*>=?\s*\d+\s*;\s*\w+--/i);
        const lengthMatch = code.match(/for\s*\(\s*(?:let|const|var)\s+\w+\s*=\s*\d+\s*;\s*\w+\s*<\s*(\w+)\.length\s*;/i);
        
        if (incMatch) {
            loopVariable = incMatch[1];
            loopPattern = 'typescript';
        } else if (decMatch) {
            loopVariable = decMatch[1];
            loopPattern = 'typescript';
            isDecrementing = true;
        } else if (lengthMatch) {
            loopVariable = lengthMatch[1];
            loopPattern = 'typescript';
        }
    } else if (lang === 'php') {
        // PHP: for($i = 0; $i < $n; $i++) or decrementing
        const incMatch = code.match(/for\s*\(\s*\$\w+\s*=\s*\d+\s*;\s*\$\w+\s*<=?\s*\$(\w+)\s*;\s*\$\w+\+\+/i);
        const decMatch = code.match(/for\s*\(\s*\$\w+\s*=\s*\$(\w+)\s*;\s*\$\w+\s*>=?\s*\d+\s*;\s*\$\w+--/i);
        
        if (incMatch) {
            loopVariable = incMatch[1];
            loopPattern = 'php';
        } else if (decMatch) {
            loopVariable = decMatch[1];
            loopPattern = 'php';
            isDecrementing = true;
        }
    } else if (lang === 'go') {
        // Go: for i := 0; i < n; i++ or decrementing
        const incMatch = code.match(/for\s+\w+\s*:=\s*\d+\s*;\s*\w+\s*<=?\s*(\w+)\s*;\s*\w+\+\+/i);
        const decMatch = code.match(/for\s+\w+\s*:=\s*(\w+)\s*;\s*\w+\s*>=?\s*\d+\s*;\s*\w+--/i);
        
        if (incMatch) {
            loopVariable = incMatch[1];
            loopPattern = 'go';
        } else if (decMatch) {
            loopVariable = decMatch[1];
            loopPattern = 'go';
            isDecrementing = true;
        }
    } else if (lang === 'r') {
        // R: for(i in 1:n)
        const match = code.match(/for\s*\(\s*\w+\s+in\s+\d+:(\w+)\s*\)/i);
        if (match) {
            loopVariable = match[1];
            loopPattern = 'r';
        }
    }
    
    // Enhanced for loop detection (if regular for loop wasn't detected)
    if (!loopVariable) {
        if (lang === 'java') {
            // Java enhanced for: for(Type var : collection)
            const match = code.match(/for\s*\(\s*\w+(?:<[^>]+>)?\s+(\w+)\s*:\s*(\w+)\s*\)/i);
            if (match) {
                loopVariable = match[2]; // collection variable
                loopPattern = 'java-enhanced';
            }
        } else if (lang === 'javascript') {
            // JavaScript for-of: for(let var of array)
            const forOfMatch = code.match(/for\s*\(\s*(?:let|const|var)\s+(\w+)\s+of\s+(\w+)\s*\)/i);
            if (forOfMatch) {
                loopVariable = forOfMatch[2]; // array variable
                loopPattern = 'javascript-forof';
            }
        } else if (lang === 'typescript') {
            // TypeScript for-of: for(let var of array)
            const forOfMatch = code.match(/for\s*\(\s*(?:let|const|var)\s+(\w+)\s+of\s+(\w+)\s*\)/i);
            if (forOfMatch) {
                loopVariable = forOfMatch[2]; // array variable
                loopPattern = 'typescript-forof';
            }
        } else if (lang === 'cpp') {
            // C++ range-based for: for(auto var : vector)
            const match = code.match(/for\s*\(\s*(?:auto|const\s+auto|\w+)\s+&?\s*(\w+)\s*:\s*(\w+)\s*\)/i);
            if (match) {
                loopVariable = match[2]; // vector variable
                loopPattern = 'cpp-rangebased';
            }
        } else if (lang === 'php') {
            // PHP foreach: foreach($array as $item)
            const match = code.match(/foreach\s*\(\s*\$(\w+)\s+as\s+\$\w+\s*\)/i);
            if (match) {
                loopVariable = match[1]; // array variable
                loopPattern = 'php-foreach';
            }
        } else if (lang === 'go') {
            // Go range: for _, v := range slice or for i, v := range slice
            const match = code.match(/for\s+(?:_|\w+)\s*,?\s*(?:\w+)?\s*:=\s*range\s+(\w+)\s*\{/i);
            if (match) {
                loopVariable = match[1]; // slice variable
                loopPattern = 'go-range';
            }
        } else if (lang === 'python') {
            // Python for-in (not range): for item in list
            const match = code.match(/for\s+(\w+)\s+in\s+(\w+)\s*:/i);
            if (match && !match[2].includes('range')) {
                loopVariable = match[2]; // list variable
                loopPattern = 'python-forin';
            }
        }
    }
    
    // Nested loop detection
    let nestedLoopVariable = null;
    let nestedLoopPattern = null;
    
    if (loopVariable) {
        // Look for nested loops inside the first loop
        const firstLoopMatch = code.match(/for[^{]*\{([\s\S]*?)\n\}/i);
        if (firstLoopMatch) {
            const outerLoopBody = firstLoopMatch[1];
            
            // Check if there's another for loop inside
            if (lang === 'java' || lang === 'c' || lang === 'cpp') {
                const nestedMatch = outerLoopBody.match(/for\s*\(\s*int\s+\w+\s*=\s*\d+\s*;\s*\w+\s*<=?\s*(\w+)\s*;/);
                if (nestedMatch) {
                    nestedLoopVariable = nestedMatch[1];
                    nestedLoopPattern = lang;
                }
            } else if (lang === 'javascript' || lang === 'typescript') {
                const nestedMatch = outerLoopBody.match(/for\s*\(\s*(?:let|const|var)\s+\w+\s*=\s*\d+\s*;\s*\w+\s*<=?\s*(\w+)\s*;/);
                if (nestedMatch) {
                    nestedLoopVariable = nestedMatch[1];
                    nestedLoopPattern = lang;
                }
            } else if (lang === 'python') {
                const nestedMatch = outerLoopBody.match(/for\s+\w+\s+in\s+range\s*\(\s*(\w+)\s*\):/);
                if (nestedMatch) {
                    nestedLoopVariable = nestedMatch[1];
                    nestedLoopPattern = 'python';
                }
            }
        }
    }
    
    if (lang === 'java') {
        // For Java, detect Scanner input methods
        // Count all Scanner input calls: nextInt(), next(), nextLine(), nextDouble(), etc.
        const scannerInputRegex = /sc\w*\.(nextInt|next|nextLine|nextDouble|nextFloat|nextBoolean|nextLong)\s*\(\s*\)/gi;
        let match;
        
        while ((match = scannerInputRegex.exec(code)) !== null) {
            // Look for the LAST System.out.print before this input
            const beforeInput = code.substring(0, match.index);
            const allPrints = [...beforeInput.matchAll(/System\.out\.print(?:ln)?\s*\(\s*["']([^"']*)["']/g)];
            const lastPrint = allPrints.length > 0 ? allPrints[allPrints.length - 1] : null;
            prompts.push(lastPrint ? lastPrint[1] : `Enter value ${prompts.length + 1}: `);
        }
        inputCount = prompts.length;
    } else if (lang === 'c' || lang === 'cpp') {
        // For C, count format specifiers in scanf calls
        const scanfRegex = /scanf\s*\(\s*["']([^"']*)["']/g;
        let match;
        
        while ((match = scanfRegex.exec(code)) !== null) {
            const formatString = match[1];
            // Count format specifiers: %d, %f, %c, %s, %lf, etc. (but not %%)
            const specifiers = formatString.match(/%[diuoxXfFeEgGaAcspn]/g);
            if (specifiers) {
                // Add a prompt for each format specifier
                for (let i = 0; i < specifiers.length; i++) {
                    // Look for printf before this scanf for prompt text
                    const beforeInput = code.substring(0, match.index);
                    const printMatch = beforeInput.match(/printf\s*\(\s*["']([^"']*)["']\s*\)\s*;?\s*$/);
                    prompts.push(printMatch && i === 0 ? printMatch[1] : `Enter value ${prompts.length + 1}: `);
                }
            }
        }
        
        // For C++, count cin >> operations
        const cinRegex = /cin\s*>>\s*(\w+)/g;
        while ((match = cinRegex.exec(code)) !== null) {
            // Look for cout before this cin for prompt text
            const beforeInput = code.substring(0, match.index);
            const coutMatch = beforeInput.match(/cout\s*<<\s*["']([^"']*)["']/);
            prompts.push(coutMatch ? coutMatch[1] : `Enter value ${prompts.length + 1}: `);
        }
        
        // For C++, count getline operations
        const getlineRegex = /getline\s*\(\s*cin\s*,\s*(\w+)\s*\)/g;
        while ((match = getlineRegex.exec(code)) !== null) {
            // Look for cout before this getline for prompt text
            const beforeInput = code.substring(0, match.index);
            const coutMatch = beforeInput.match(/cout\s*<<\s*["']([^"']*)["']/);
            prompts.push(coutMatch ? coutMatch[1] : `Enter text ${prompts.length + 1}: `);
        }
        inputCount = prompts.length;
    } else if (lang === 'javascript') {
        // For JavaScript, extract prompt() calls
        const promptRegex = /prompt\(\s*["']([^"']*)["']\s*\)|prompt\(\s*\)/g;
        let match;
        
        while ((match = promptRegex.exec(code)) !== null) {
            // Use the prompt message or default
            prompts.push(match[1] || 'Enter value: ');
        }
        inputCount = prompts.length;
    } else if (lang === 'go') {
        // For Go, count fmt.Scan and fmt.Scanf calls
        const scanRegex = /fmt\.Scan(?:f|ln)?\s*\(([^)]*)\)/g;
        let match;
        
        while ((match = scanRegex.exec(code)) !== null) {
            const args = match[1];
            // Count the number of arguments (variables being scanned)
            const argCount = args.split(',').filter(arg => arg.trim().startsWith('&')).length;
            
            // Look for the LAST fmt.Print before this Scan
            const beforeInput = code.substring(0, match.index);
            const allPrints = [...beforeInput.matchAll(/fmt\.Print(?:f|ln)?\s*\(\s*["']([^"']*)["']/g)];
            const lastPrint = allPrints.length > 0 ? allPrints[allPrints.length - 1] : null;
            
            for (let i = 0; i < argCount; i++) {
                prompts.push(lastPrint && i === 0 ? lastPrint[1] : `Enter value ${prompts.length + 1}: `);
            }
        }
        inputCount = prompts.length;
    } else if (lang === 'php') {
        // For PHP, detect fgets(STDIN) or readline()
        const fgetsRegex = /fgets\s*\(\s*STDIN\s*\)|readline\s*\(\s*\)/g;
        let match;
        
        while ((match = fgetsRegex.exec(code)) !== null) {
            // Look for the LAST echo before this input
            const beforeInput = code.substring(0, match.index);
            const allEchos = [...beforeInput.matchAll(/echo\s+["']([^"']*)["']/g)];
            const lastEcho = allEchos.length > 0 ? allEchos[allEchos.length - 1] : null;
            prompts.push(lastEcho ? lastEcho[1] : `Enter value ${prompts.length + 1}: `);
        }
        inputCount = prompts.length;
    } else if (lang === 'typescript') {
        // For TypeScript, detect readlineSync or question() calls
        const readlineSyncRegex = /readlineSync\.question(?:Int|Float)?\s*\(\s*["']([^"']*)["']\s*\)|readlineSync\.question\s*\(\s*\)/g;
        let match;
        
        while ((match = readlineSyncRegex.exec(code)) !== null) {
            prompts.push(match[1] || `Enter value ${prompts.length + 1}: `);
        }
        inputCount = prompts.length;
    } else if (lang === 'r') {
        // For R, detect readline() and scan() calls
        const readlineRegex = /readline\s*\(\s*["']([^"']*)["']\s*\)|readline\s*\(\s*\)/g;
        const scanRegex = /scan\s*\(/g;
        let match;
        
        // First check for readline() with prompts
        while ((match = readlineRegex.exec(code)) !== null) {
            prompts.push(match[1] || `Enter value ${prompts.length + 1}: `);
        }
        
        // Then check for scan() calls (these usually don't have prompts in the call itself)
        let scanCount = (code.match(scanRegex) || []).length;
        for (let i = 0; i < scanCount; i++) {
            // Look for cat() or print() before scan
            const beforeScan = code.substring(0, code.indexOf('scan('));
            const catMatch = beforeScan.match(/cat\s*\(\s*["']([^"']*)["']/);
            prompts.push(catMatch ? catMatch[1] : `Enter value ${prompts.length + 1}: `);
        }
        
        inputCount = prompts.length;
    } else {
        // For Python, extract input prompts from the code
        const inputRegex = /input\(\s*["']([^"']*)["']\s*\)|input\(\s*\)/g;
        let match;
        
        while ((match = inputRegex.exec(code)) !== null) {
            // If there's a prompt string, use it; otherwise use empty string
            prompts.push(match[1] || '');
        }
        inputCount = prompts.length;
    }
    
    // Clear output and start
    outputDisplay.innerHTML = '';
    
    // Collect inputs interactively in the output box
    const userInputs = [];
    
    // Check if code has loops with input - need extra warning
    const hasLoopWithInput = (lang === 'python' && /for\s+.*:\s*[\s\S]*?input\(|while\s+.*:\s*[\s\S]*?input\(/i.test(code)) ||
                             (lang === 'java' && /while\s*\([^)]*\)\s*\{[\s\S]*?sc\w*\.(next|nextInt|nextLine|nextDouble)/i.test(code)) ||
                             (lang === 'c' && /(for|while)\s*\([^)]*\)\s*\{[\s\S]*?scanf/i.test(code)) ||
                             (lang === 'cpp' && /(for|while)\s*\([^)]*\)\s*\{[\s\S]*?(cin\s*>>|getline)/i.test(code)) ||
                             (lang === 'javascript' && /(for|while)\s*\([^)]*\)\s*\{[\s\S]*?prompt\(/i.test(code)) ||
                             (lang === 'typescript' && /(for|while)\s*\([^)]*\)\s*\{[\s\S]*?readlineSync/i.test(code)) ||
                             (lang === 'php' && /(for|while)\s*\([^)]*\)\s*\{[\s\S]*?(fgets\(STDIN\)|readline\()/i.test(code)) ||
                             (lang === 'go' && /for\s+[\s\S]*?\{[\s\S]*?fmt\.Scan/i.test(code)) ||
                             (lang === 'r' && /for\s*\([^)]*\)\s*\{[\s\S]*?(readline\(|scan\()/i.test(code));
    
    if (hasLoopWithInput && lang === 'python') {
        appendToOutput('⚠️ Your code has input() inside a loop!\n');
        appendToOutput('You\'ll need to enter values for EACH loop iteration.\n');
        appendToOutput('After initial prompts, you can add more values.\n\n');
    } else if (hasLoopWithInput && lang === 'java') {
        appendToOutput('⚠️ Your code has Scanner input inside a while loop!\n\n');
        appendToOutput('📝 How to handle this:\n');
        appendToOutput('   • The program will ask for inputs BEFORE running\n');
        appendToOutput('   • Plan ALL your inputs in advance\n');
        appendToOutput('   • Example: If loop asks for tickets twice, enter:\n');
        appendToOutput('     - First tickets count (e.g., 4)\n');
        appendToOutput('     - "yes" or "no" to continue\n');
        appendToOutput('     - Second tickets count (e.g., 3)\n');
        appendToOutput('     - "yes" or "no" again\n');
        appendToOutput('   • After all inputs, press Enter on empty to run\n\n');
    } else if (hasLoopWithInput && (lang === 'c' || lang === 'cpp')) {
        appendToOutput(`⚠️ Your code has ${lang === 'c' ? 'scanf' : 'cin'} input inside a loop!\n\n`);
        appendToOutput('📝 How to handle this:\n');
        appendToOutput('   • The program will ask for inputs BEFORE running\n');
        appendToOutput('   • Plan ALL your inputs in advance\n');
        appendToOutput('   • For each loop iteration, enter the required values\n');
        appendToOutput('   • After all inputs, press Enter on empty to run\n\n');
    } else if (hasLoopWithInput && lang === 'javascript') {
        appendToOutput('⚠️ Your code has prompt() inside a loop!\n\n');
        appendToOutput('📝 Loop detected! After initial prompts, you can add more values.\n');
        appendToOutput('   • Press Enter on empty input when done\n\n');
    } else if (hasLoopWithInput && lang === 'typescript') {
        appendToOutput('⚠️ Your code has readlineSync input inside a loop!\n\n');
        appendToOutput('📝 Loop detected! After initial prompts, you can add more values.\n');
        appendToOutput('   • Press Enter on empty input when done\n\n');
    } else if (hasLoopWithInput && lang === 'php') {
        appendToOutput('⚠️ Your code has input inside a loop!\n\n');
        appendToOutput('📝 Loop detected! After initial prompts, you can add more values.\n');
        appendToOutput('   • Press Enter on empty input when done\n\n');
    } else if (hasLoopWithInput && lang === 'go') {
        appendToOutput('⚠️ Your code has fmt.Scan input inside a loop!\n\n');
        appendToOutput('📝 Loop detected! After initial prompts, you can add more values.\n');
        appendToOutput('   • Press Enter on empty input when done\n\n');
    } else if (hasLoopWithInput && lang === 'r') {
        appendToOutput('⚠️ Your code has input inside a loop!\n\n');
        appendToOutput('📝 Loop detected! After initial prompts, you can add more values.\n');
        appendToOutput('   • Press Enter on empty input when done\n\n');
    }
    
    for (let i = 0; i < inputCount; i++) {
        // Use the actual prompt from code, or default if empty
        const promptText = prompts[i] || `Enter value ${i + 1}/${inputCount}: `;
        // Add line break if not the first prompt
        if (i > 0) {
            appendToOutput('\n');
        }
        const value = await promptInOutputBox(promptText);
        if (value === null) {
            appendToOutput('\n\n❌ Execution cancelled by user.', 'error');
            return;
        }
        userInputs.push(value);
        
        // SMART DETECTION: If this is the loop variable, calculate additional inputs needed
        if (loopVariable && i === 0) {
            const numIterations = parseInt(value);
            if (!isNaN(numIterations) && numIterations > 0) {
                let loopBody = '';
                let loopPrompts = [];
                
                // Check if there's a nested loop
                let nestedIterations = 1;
                if (nestedLoopVariable && userInputs.length > 1) {
                    // Try to get the nested loop variable value from previous inputs
                    const nestedVarIndex = prompts.findIndex(p => p.includes(nestedLoopVariable));
                    if (nestedVarIndex >= 0 && nestedVarIndex < userInputs.length) {
                        nestedIterations = parseInt(userInputs[nestedVarIndex]) || 1;
                    }
                }
                
                if (loopPattern === 'python') {
                    // Find how many input() calls are inside the Python loop
                    const loopMatch = code.match(/for\s+\w+\s+in\s+range\s*\([^)]+\)\s*:([\s\S]*?)(?=\n\S|\nfor\s|\nwhile\s|\ndef\s|\nclass\s|$)/i);
                    if (loopMatch) {
                        loopBody = loopMatch[1];
                        
                        // Extract actual prompts from input() calls in the loop
                        const inputMatches = [...loopBody.matchAll(/input\(\s*["']([^"']*)["']\s*\)/g)];
                        loopPrompts = inputMatches.map(m => m[1] || 'Enter value: ');
                    }
                } else if (loopPattern === 'java') {
                    // Find how many Scanner inputs are inside the Java loop
                    const loopMatch = code.match(/for\s*\([^)]+\)\s*\{([\s\S]*?)\}/i);
                    if (loopMatch) {
                        loopBody = loopMatch[1];
                        
                        // Extract System.out.print prompts before Scanner inputs
                        const lines = loopBody.split('\n');
                        let foundInputCount = 0;
                        for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
                            const line = lines[lineIdx];
                            // Check if this line has Scanner input
                            if (/sc\w*\.(nextInt|next|nextLine|nextDouble|nextFloat|nextBoolean|nextLong)\s*\(/.test(line)) {
                                foundInputCount++;
                                let promptFound = false;
                                // Look backwards for the nearest System.out.print
                                for (let backIdx = lineIdx - 1; backIdx >= 0; backIdx--) {
                                    const prevLine = lines[backIdx];
                                    const printMatch = prevLine.match(/System\.out\.print(?:ln)?\s*\(\s*["']([^"']*)["']\s*\)/);
                                    if (printMatch) {
                                        loopPrompts.push(printMatch[1]);
                                        promptFound = true;
                                        break;
                                    }
                                }
                                // If no print found, use default
                                if (!promptFound) {
                                    loopPrompts.push(`Enter value ${foundInputCount}: `);
                                }
                            }
                        }
                    }
                } else if (loopPattern === 'c' || loopPattern === 'cpp') {
                    // Find how many inputs are inside the C/C++ loop
                    const loopMatch = code.match(/for\s*\([^)]+\)\s*\{([\s\S]*?)\}/i);
                    if (loopMatch) {
                        loopBody = loopMatch[1];
                        
                        if (loopPattern === 'c') {
                            // C: Process line by line to match printf with scanf
                            const lines = loopBody.split('\n');
                            let lastPrintf = '';
                            
                            for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
                                const line = lines[lineIdx];
                                
                                // Check for printf first
                                const printfMatch = line.match(/printf\s*\(\s*["']([^"']*)["']/);
                                if (printfMatch) {
                                    lastPrintf = printfMatch[1];
                                }
                                
                                // Check for scanf
                                const scanfMatch = line.match(/scanf\s*\(\s*["']([^"']*)["']/);
                                if (scanfMatch) {
                                    const formatString = scanfMatch[1];
                                    const specifiers = formatString.match(/%[diuoxXfFeEgGaAcspn]/g);
                                    if (specifiers) {
                                        // For each format specifier, use the last printf found
                                        for (let i = 0; i < specifiers.length; i++) {
                                            loopPrompts.push(lastPrintf || `Enter value ${loopPrompts.length + 1}: `);
                                        }
                                    }
                                    lastPrintf = ''; // Reset after using
                                }
                            }
                        } else {
                            // C++: Process line by line to match cout with cin
                            const lines = loopBody.split('\n');
                            let lastCout = '';
                            
                            for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
                                const line = lines[lineIdx];
                                
                                // Check for cout first
                                const coutMatch = line.match(/cout\s*<<\s*["']([^"']*)["']/);
                                if (coutMatch) {
                                    lastCout = coutMatch[1];
                                }
                                
                                // Check for cin
                                if (/cin\s*>>\s*(\w+)/.test(line)) {
                                    loopPrompts.push(lastCout || `Enter value ${loopPrompts.length + 1}: `);
                                    lastCout = ''; // Reset after using
                                }
                            }
                        }
                    }
                } else if (loopPattern === 'javascript') {
                    // JavaScript: Extract prompts from prompt() calls
                    const loopMatch = code.match(/for\s*\([^)]+\)\s*\{([\s\S]*?)\}/i);
                    if (loopMatch) {
                        loopBody = loopMatch[1];
                        const promptMatches = [...loopBody.matchAll(/prompt\s*\(\s*["']([^"']*)["']/g)];
                        loopPrompts = promptMatches.map(m => m[1] || 'Enter value: ');
                    }
                } else if (loopPattern === 'typescript') {
                    // TypeScript: Extract readlineSync prompts
                    const loopMatch = code.match(/for\s*\([^)]+\)\s*\{([\s\S]*?)\}/i);
                    if (loopMatch) {
                        loopBody = loopMatch[1];
                        const readlineMatches = [...loopBody.matchAll(/readlineSync\.question(?:Int|Float)?\s*\(\s*["']([^"']*)["']/g)];
                        loopPrompts = readlineMatches.map(m => m[1] || 'Enter value: ');
                    }
                } else if (loopPattern === 'php') {
                    // PHP: Extract echo prompts before input
                    const loopMatch = code.match(/for\s*\([^)]+\)\s*\{([\s\S]*?)\}/i);
                    if (loopMatch) {
                        loopBody = loopMatch[1];
                        const lines = loopBody.split('\n');
                        let lastEcho = '';
                        
                        for (const line of lines) {
                            const echoMatch = line.match(/echo\s+["']([^"']*)["']/);
                            if (echoMatch) lastEcho = echoMatch[1];
                            
                            if (/fgets\(STDIN\)|readline\(/.test(line)) {
                                loopPrompts.push(lastEcho || 'Enter value: ');
                                lastEcho = '';
                            }
                        }
                    }
                } else if (loopPattern === 'go') {
                    // Go: Extract fmt.Print prompts before fmt.Scan
                    const loopMatch = code.match(/for\s+[^{]+\{([\s\S]*?)\}/i);
                    if (loopMatch) {
                        loopBody = loopMatch[1];
                        const lines = loopBody.split('\n');
                        let lastPrint = '';
                        
                        for (const line of lines) {
                            const printMatch = line.match(/fmt\.Print(?:f|ln)?\s*\(\s*["']([^"']*)["']/);
                            if (printMatch) lastPrint = printMatch[1];
                            
                            if (/fmt\.Scan/.test(line)) {
                                loopPrompts.push(lastPrint || 'Enter value: ');
                                lastPrint = '';
                            }
                        }
                    }
                } else if (loopPattern === 'r') {
                    // R: Extract prompts from readline() calls inside the loop
                    const loopMatch = code.match(/for\s*\([^)]+\)\s*\{([\s\S]*?)\}/i);
                    if (loopMatch) {
                        loopBody = loopMatch[1];
                        
                        // Extract prompts from readline("prompt") calls
                        const readlineMatches = [...loopBody.matchAll(/readline\s*\(\s*["']([^"']*)["']\s*\)|as\.numeric\s*\(\s*readline\s*\(\s*["']([^"']*)["']\s*\)\)/g)];
                        for (const match of readlineMatches) {
                            // match[1] for direct readline, match[2] for as.numeric(readline())
                            loopPrompts.push(match[1] || match[2] || 'Enter value: ');
                        }
                        
                        // Also check for scan() calls
                        const scanMatches = [...loopBody.matchAll(/scan\s*\(/g)];
                        for (let i = 0; i < scanMatches.length; i++) {
                            // Look for cat() before scan
                            const catMatch = loopBody.match(/cat\s*\(\s*["']([^"']*)["']/);
                            loopPrompts.push(catMatch ? catMatch[1] : 'Enter value: ');
                        }
                    }
                }
                
                const inputsInLoop = loopPrompts.length;
                
                if (inputsInLoop > 0) {
                    // Calculate total iterations (nested or single)
                    const totalIterations = nestedLoopVariable ? numIterations * nestedIterations : numIterations;
                    const additionalNeeded = inputsInLoop * totalIterations;
                    
                    // Build detection message
                    let loopTypeDesc = 'Loop';
                    if (isDecrementing) loopTypeDesc = 'Decrementing loop';
                    else if (loopPattern.includes('dowhile')) loopTypeDesc = 'Do-while loop';
                    else if (loopPattern.includes('enhanced') || loopPattern.includes('forof') || loopPattern.includes('foreach') || loopPattern.includes('rangebased') || loopPattern.includes('range') || loopPattern.includes('forin')) {
                        loopTypeDesc = 'Enhanced for loop';
                    }
                    
                    const nestedInfo = nestedLoopVariable ? ` (${numIterations} × ${nestedIterations} nested)` : '';
                    appendToOutput(`\n💡 Detected: ${loopTypeDesc}${nestedInfo} - ${totalIterations} iterations × ${inputsInLoop} inputs = ${additionalNeeded} more values needed\n\n`);
                
                    
                    // Collect exactly those many inputs with actual prompts
                    for (let j = 0; j < additionalNeeded; j++) {
                        const promptIndex = j % inputsInLoop;
                        const actualPrompt = loopPrompts[promptIndex];
                        
                        appendToOutput(j > 0 ? '\n' : '');
                        const extraValue = await promptInOutputBox(actualPrompt);
                        if (extraValue === null) {
                            appendToOutput('\n\n❌ Execution cancelled by user.', 'error');
                            return;
                        }
                        userInputs.push(extraValue);
                    }
                    
                    // Skip the old loop-continuation logic
                    appendToOutput('\n\n🤖 Running with your inputs...\n\n');
                    executeCode(code, lang, userInputs);
                    return;
                }
            }
        }
    }
    
    // Ask if user needs to add more inputs (for loops) - only if smart detection didn't handle it
    if (hasLoopWithInput && (lang === 'python' || lang === 'java' || lang === 'c' || lang === 'cpp' || lang === 'javascript' || lang === 'typescript' || lang === 'php' || lang === 'go' || lang === 'r') && inputCount >= 1 && !loopVariable) {
        appendToOutput('\n\n💡 Your code has a loop with input! Keep entering values (press Enter on empty input when done): \n');
        
        let continueAdding = true;
        while (continueAdding) {
            const extraValue = await promptInOutputBox(`Value ${userInputs.length + 1}: `);
            if (extraValue === null || extraValue.trim() === '') {
                continueAdding = false;
            } else {
                userInputs.push(extraValue);
                appendToOutput('\n');
            }
        }
    }
    
    appendToOutput('\n\n🤖 Running with your inputs...\n\n');
    
    // Execute with collected inputs
    executeCode(code, lang, userInputs);
}

// Prompt user for input directly in the output box
function promptInOutputBox(promptText) {
    return new Promise((resolve) => {
        // Add prompt text
        const promptSpan = document.createElement('span');
        promptSpan.className = 'output-text';
        promptSpan.textContent = promptText;
        outputDisplay.appendChild(promptSpan);
        
        // Create inline input field
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.className = 'inline-input';
        inputField.style.cssText = `
            background: transparent;
            color: #4CAF50;
            border: none;
            outline: none;
            font-family: 'Courier New', Courier, monospace;
            font-size: 14px;
            padding: 2px 5px;
            width: 300px;
            border-bottom: 2px solid #4CAF50;
        `;
        
        outputDisplay.appendChild(inputField);
        inputField.focus();
        
        // Handle input submission
        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                const value = inputField.value;
                
                // Replace input with the entered value
                const valueSpan = document.createElement('span');
                valueSpan.className = 'output-success';
                valueSpan.textContent = value + '\n';
                outputDisplay.replaceChild(valueSpan, inputField);
                
                inputField.removeEventListener('keypress', handleKeyPress);
                resolve(value);
            } else if (e.key === 'Escape') {
                outputDisplay.removeChild(inputField);
                inputField.removeEventListener('keypress', handleKeyPress);
                resolve(null);
            }
        };
        
        inputField.addEventListener('keypress', handleKeyPress);
        
        // Scroll to bottom to show input
        outputDisplay.scrollTop = outputDisplay.scrollHeight;
    });
}

// Append text to existing output
function appendToOutput(text, type = 'text') {
    const outputElement = document.createElement('div');
    
    if (type === 'error') {
        outputElement.className = 'output-error';
    } else if (type === 'success') {
        outputElement.className = 'output-success';
    } else if (type === 'info') {
        outputElement.className = 'output-text';
    } else {
        outputElement.className = 'output-text';
    }
    
    outputElement.textContent = text;
    outputDisplay.appendChild(outputElement);
    
    // Auto scroll to bottom
    outputDisplay.scrollTop = outputDisplay.scrollHeight;
}

// Execute code based on language
function executeCode(code, lang, userInputs = []) {
    try {
        if (lang === 'javascript') {
            // Execute JavaScript code with input support
            const logs = [];
            const originalConsoleLog = console.log;
            let inputIndex = 0;
            
            // Override prompt to use userInputs
            const originalPrompt = window.prompt;
            window.prompt = function(message) {
                if (inputIndex < userInputs.length) {
                    return userInputs[inputIndex++];
                }
                return '';
            };
            
            console.log = (...args) => {
                logs.push(args.join(' '));
            };
            
            try {
                eval(code);
                console.log = originalConsoleLog;
                window.prompt = originalPrompt;
                
                if (logs.length > 0) {
                    displayOutput(logs.join('\n'), 'success');
                } else {
                    displayOutput('Code executed successfully (no output)', 'success');
                }
            } catch (error) {
                console.log = originalConsoleLog;
                window.prompt = originalPrompt;
                displayOutput(`Error: ${error.message}`, 'error');
            }
        } else if (lang === 'python' || lang === 'cpp' || lang === 'java' || lang === 'sql' || lang === 'r' || lang === 'c' || lang === 'go' || lang === 'php' || lang === 'typescript') {
            // Execute via backend API
            executeViaBackend(code, lang, userInputs);
        }
    } catch (error) {
        displayOutput(`Unexpected error: ${error.message}`, 'error');
    }
}

// Execute code via backend API
async function executeViaBackend(code, lang, userInputs = []) {
    try {
        const response = await fetch('http://localhost:5000/api/compile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: code,
                language: lang,
                auto_detect: false,
                inputs: userInputs  // Send user inputs from interactive prompts
            })
        });
        
        const result = await response.json();
        
        // DISABLED: Auto-correction - students must fix errors themselves
        // This helps them learn by identifying and fixing their own mistakes
        
        if (result.success) {
            let output = '';
            let errorLines = [];
            
            // Extract error line numbers from compilation errors
            if (result.errors && result.errors.length > 0) {
                result.errors.forEach(error => {
                    if (typeof error === 'object' && error.line) {
                        errorLines.push(error.line);
                    } else if (typeof error === 'string') {
                        const lineMatch = error.match(/line\s+(\d+)/i);
                        if (lineMatch) {
                            errorLines.push(parseInt(lineMatch[1]));
                        }
                    }
                });
            }
            
            // Extract error line numbers from execution errors
            if (result.execution && result.execution.errors && result.execution.errors.length > 0) {
                result.execution.errors.forEach(error => {
                    const lineMatch = error.match(/line\s+(\d+)/i);
                    if (lineMatch) {
                        errorLines.push(parseInt(lineMatch[1]));
                    }
                });
            }
            
            // Highlight error lines in editor with RED
            if (errorLines.length > 0) {
                highlightErrorLines(errorLines);
            } else {
                updateLineNumbers(); // Clear highlights if no errors
            }
            
            // Show errors and suggestions prominently
            if (result.errors && result.errors.length > 0) {
                output += '❌ ERRORS FOUND:\n';
                result.errors.forEach((error, index) => {
                    output += `\n${index + 1}. Line ${error.line}: ${error.message}\n`;
                    if (error.suggestion) {
                        output += `   💡 Suggestion: ${error.suggestion}\n`;
                    }
                    if (error.code_line) {
                        output += `   Code: ${error.code_line}\n`;
                    }
                });
                output += '\n';
            }
            
            // Show AI suggestions
            if (result.suggestions && result.suggestions.length > 0) {
                output += '💡 AI SUGGESTIONS:\n';
                result.suggestions.forEach((suggestion, index) => {
                    const msg = suggestion.message || suggestion;
                    output += `${index + 1}. ${msg}\n`;
                });
                output += '\n';
            }
            
            // Show warnings
            if (result.warnings && result.warnings.length > 0) {
                output += '⚠️ WARNINGS:\n';
                result.warnings.forEach((warning, index) => {
                    output += `${index + 1}. ${warning.message || warning}\n`;
                });
                output += '\n';
            }
            
            // Show compilation details
            if (result.tokens) {
                output += `✓ Tokenization: ${result.tokens.length} tokens\n`;
            }
            if (result.ir) {
                output += `✓ IR Generation: ${result.ir.instructions ? result.ir.instructions.length : 0} instructions\n`;
            }
            if (result.execution) {
                output += `✓ Execution: ${result.execution.status}\n\n`;
                
                if (result.execution.output) {
                    output += '=== Output ===\n' + result.execution.output + '\n';
                }
                
                if (result.execution.errors && result.execution.errors.length > 0) {
                    output += '\n=== Execution Errors ===\n' + result.execution.errors.join('\n');
                }
            }
            
            if (result.explanation) {
                output += '\n=== Compilation Info ===\n' + result.explanation;
            }
            
            displayOutput(output, result.execution && result.execution.errors && result.execution.errors.length > 0 ? 'error' : 'success');
        } else {
            displayOutput(`Compilation Error:\n${result.error || 'Unknown error'}`, 'error');
            highlightErrorLines([]);
        }
    } catch (error) {
        displayOutput(
            `Backend Connection Error:\n\n` +
            `Could not connect to the backend server.\n` +
            `Make sure the Flask API is running on http://localhost:5000\n\n` +
            `Error: ${error.message}`,
            'error'
        );
    }
}

// Display output
function displayOutput(text, type = 'text') {
    outputDisplay.innerHTML = '';
    const outputElement = document.createElement('div');
    
    if (type === 'error') {
        outputElement.className = 'output-error';
    } else if (type === 'success') {
        outputElement.className = 'output-success';
    } else if (type === 'info') {
        outputElement.className = 'output-text';
    } else {
        outputElement.className = 'output-text';
    }
    
    outputElement.textContent = text;
    outputDisplay.appendChild(outputElement);
}

// Clear output
clearBtn.addEventListener('click', () => {
    outputDisplay.innerHTML = '<div class="output-placeholder">Run your code to see output...</div>';
});

// Back to home
backHomeBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to go back to home?')) {
        // Add your home page URL here
        alert('Add your home page URL in script.js');
    }
});

// Chatbot functionality
askDoubtBtn.addEventListener('click', () => {
    outputSection.classList.add('shrink');
    chatbotSection.classList.add('active');
});

closeChatBtn.addEventListener('click', () => {
    outputSection.classList.remove('shrink');
    chatbotSection.classList.remove('active');
});

// Send chat message
// Format markdown code blocks to HTML
function formatMarkdownCodeBlocks(text) {
    // Convert ```language code blocks to styled HTML
    text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, function(match, lang, code) {
        const language = lang || 'code';
        return `<div class="code-block">
            <div class="code-header">${language}</div>
            <pre><code>${escapeHtml(code.trim())}</code></pre>
        </div>`;
    });
    
    // Convert inline code `text` to styled spans
    text = text.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    
    // Convert **bold** to <strong>
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Convert line breaks to <br>
    text = text.replace(/\n/g, '<br>');
    
    return text;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

async function sendChatMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    // Show typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot-message typing-indicator';
    typingDiv.innerHTML = '<div class="message-content">Thinking...</div>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    try {
        // Call Gemini API
        const response = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                code: codeEditor.value,
                language: currentLang
            })
        });
        
        const data = await response.json();
        
        // Remove typing indicator
        typingDiv.remove();
        
        if (data.success) {
            // Add AI response with proper formatting
            let aiResponse = data.response;
            
            // Convert markdown code blocks to HTML
            aiResponse = formatMarkdownCodeBlocks(aiResponse);
            
            // Add source indicator
            if (data.source === 'gemini-2.5-flash') {
                aiResponse += '\n\n<div style="text-align: center; color: #888; font-size: 0.85em; margin-top: 10px;">✨ Powered by Google Gemini 2.5 Flash</div>';
            }
            
            addChatMessage(aiResponse, 'bot', true); // Pass true for HTML rendering
        } else {
            addChatMessage('Sorry, I encountered an error. Please try again.', 'bot', false);
        }
    } catch (error) {
        // Remove typing indicator
        typingDiv.remove();
        
        // Fallback to rule-based response if API fails
        console.warn('Gemini API unavailable, using fallback:', error);
        const response = getIntelligentBotResponse(message);
        addChatMessage(response + '\n\n⚠️ Using fallback mode (API unavailable)', 'bot');
    }
}

function addChatMessage(text, sender, isHTML = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    if (isHTML) {
        contentDiv.innerHTML = text; // Render as HTML for formatted responses
    } else {
        contentDiv.style.whiteSpace = 'pre-wrap'; // Preserve line breaks
        contentDiv.textContent = text;
    }
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getIntelligentBotResponse(question) {
    const lowerQuestion = question.toLowerCase();
    const userCode = codeEditor.value;
    const codeLines = userCode.split('\n');
    
    // Extract line number if mentioned (e.g., "line 1", "first line", "line 3")
    let specificLine = null;
    if (lowerQuestion.match(/line\s*(\d+)/)) {
        specificLine = parseInt(lowerQuestion.match(/line\s*(\d+)/)[1]);
    } else if (lowerQuestion.includes('first line')) {
        specificLine = 1;
    } else if (lowerQuestion.includes('second line')) {
        specificLine = 2;
    } else if (lowerQuestion.includes('third line')) {
        specificLine = 3;
    }
    
    // If asking about a specific line
    if (specificLine && specificLine <= codeLines.length) {
        const line = codeLines[specificLine - 1].trim();
        let response = `📍 Line ${specificLine}: "${codeLines[specificLine - 1]}"\n\n`;
        
        // Analyze this specific line
        if (!line) {
            response += "This line is empty. No error here!";
        } else if (line.startsWith('#')) {
            response += "This is a comment line. Comments don't cause errors!";
        } else {
            // Check for common errors on this line
            if ((line.startsWith('if ') || line.startsWith('elif ') || line.match(/^else\s*$/) || 
                 line.startsWith('for ') || line.startsWith('while ') || line.startsWith('def ') || 
                 line.startsWith('class ')) && !line.endsWith(':')) {
                response += `❌ Error Found: Missing colon (:)\n\n`;
                response += `💡 In Python, you need a colon at the end of:\n`;
                response += `• if/elif/else statements\n• for/while loops\n• function definitions (def)\n• class definitions\n\n`;
                response += `🔧 Fix: Add : at the end of this line`;
            } else if (line.includes(' = ') && line.startsWith('if ') && !line.includes('==')) {
                response += `❌ Error Found: Using = instead of ==\n\n`;
                response += `💡 Explanation:\n`;
                response += `• = is for assignment (x = 5)\n`;
                response += `• == is for comparison (if x == 5:)\n\n`;
                response += `🔧 Fix: Change = to ==`;
            } else if ((line.match(/\(/g) || []).length !== (line.match(/\)/g) || []).length) {
                response += `❌ Error Found: Unmatched parentheses\n\n`;
                response += `💡 Every opening ( needs a closing )\n\n`;
                response += `🔧 Fix: Check your parentheses match`;
            } else if ((line.match(/"/g) || []).length % 2 !== 0 || (line.match(/'/g) || []).length % 2 !== 0) {
                response += `❌ Error Found: Unmatched quotes\n\n`;
                response += `💡 Every opening quote needs a closing quote\n\n`;
                response += `🔧 Fix: Make sure quotes are in pairs`;
            } else {
                response += `✅ This line looks syntactically correct!\n\n`;
                response += `If you're still seeing errors:\n`;
                response += `• Check indentation (use 4 spaces)\n`;
                response += `• Make sure variables are defined before use\n`;
                response += `• Run the code to see the actual error message`;
            }
        }
        
        return response;
    }
    
    // Check if asking for help or solution
    if (lowerQuestion.includes('help') || lowerQuestion.includes('error') || lowerQuestion.includes('wrong') || lowerQuestion.includes('not working')) {
        return analyzeCodeAndHelp(userCode, codeLines, lowerQuestion);
    }
    
    // If asking for solution directly
    if (lowerQuestion.includes('solution') || lowerQuestion.includes('fix it') || lowerQuestion.includes('correct code')) {
        return "Let me help you understand first! 🤔\n\nInstead of giving you the answer, let me guide you:\n\n" + analyzeCodeAndHelp(userCode, codeLines, lowerQuestion);
    }
    
    // General Python questions
    if (lowerQuestion.includes('print')) {
        return "📝 The print() function displays output.\n\nSyntax: print(value)\nExample: print('Hello')";
    } else if (lowerQuestion.includes('variable')) {
        return "📦 Variables store data.\n\nSyntax: variable_name = value\nExample: age = 25";
    } else if (lowerQuestion.includes('input')) {
        return "⌨️ The input() function gets user input.\n\nSyntax: variable = input('prompt')\nExample: name = input('Enter name: ')";
    } else if (lowerQuestion.includes('function') || lowerQuestion.includes('def')) {
        return "🔧 Functions are reusable code blocks.\n\nSyntax:\ndef function_name(parameters):\n    # code\n    return result";
    } else if (lowerQuestion.includes('loop') || lowerQuestion.includes('for')) {
        return "🔄 Loops repeat code.\n\nFor loop:\nfor i in range(5):\n    print(i)";
    } else if (lowerQuestion.includes('if')) {
        return "🔀 If statements check conditions.\n\nSyntax:\nif condition:\n    # code";
    }
    
    return "I'm here to help you learn! 💡\n\nAsk me:\n• 'what was error in line X' - to check a specific line\n• 'help' - to analyze your entire code\n• About Python concepts (print, variables, loops, etc.)";
}

function analyzeCodeAndHelp(code, codeLines, question) {
    if (!code.trim()) {
        return "⚠️ Your editor is empty! Write some Python code first, then I can help you debug it.";
    }
    
    let errorReport = "🔍 Let me analyze your code...\n\n";
    let foundIssues = false;
    
    // Check for common Python errors line by line
    for (let i = 0; i < codeLines.length; i++) {
        const lineNum = i + 1;
        const line = codeLines[i].trim();
        
        if (!line || line.startsWith('#')) continue; // Skip empty lines and comments
        
        // Check for missing colon
        if ((line.startsWith('if ') || line.startsWith('elif ') || line.startsWith('else') || 
             line.startsWith('for ') || line.startsWith('while ') || line.startsWith('def ') || 
             line.startsWith('class ')) && !line.endsWith(':')) {
            errorReport += `❌ Line ${lineNum}: Missing colon (:)\n`;
            errorReport += `   "${line}"\n\n`;
            errorReport += `💡 Explanation: In Python, you need a colon (:) at the end of control statements.\n\n`;
            errorReport += `🔧 Hint: Add : at the end of this line\n\n`;
            foundIssues = true;
        }
        
        // Check for undefined variables (simple check)
        if (line.includes('print(') && !line.includes('"') && !line.includes("'")) {
            const match = line.match(/print\((\w+)\)/);
            if (match) {
                const varName = match[1];
                const isDefined = code.substring(0, code.indexOf(line)).includes(`${varName} =`) || 
                                  code.substring(0, code.indexOf(line)).includes(`${varName}=`);
                if (!isDefined && !['input', 'int', 'str', 'float'].includes(varName)) {
                    errorReport += ` Line ${lineNum}: Variable '${varName}' might not be defined\n`;
                    errorReport += `   "${line}"\n\n`;
                    errorReport += ` Explanation: You're trying to print a variable that doesn't exist yet.\n\n`;
                    errorReport += ` Hint: Define the variable before using it. Example: ${varName} = some_value\n\n`;
                    foundIssues = true;
                }
            }
        }
        
        // Check for assignment in if statement
        if (line.includes('if ') && line.includes(' = ') && !line.includes('==')) {
            errorReport += ` Line ${lineNum}: Using = instead of ==\n`;
            errorReport += `   "${line}"\n\n`;
            errorReport += ` Explanation: = is for assignment, == is for comparison.\n\n`;
            errorReport += ` Hint: Change = to == for comparison\n\n`;
            foundIssues = true;
        }
        
        // Check for indentation issues (basic check)
        const prevLine = i > 0 ? codeLines[i - 1].trim() : '';
        if (prevLine.endsWith(':') && codeLines[i].length > 0 && codeLines[i][0] !== ' ' && codeLines[i][0] !== '\t') {
            errorReport += ` Line ${lineNum}: Missing indentation\n`;
            errorReport += `   "${line}"\n\n`;
            errorReport += ` Explanation: Code after : must be indented (4 spaces or 1 tab).\n\n`;
            errorReport += ` Hint: Add 4 spaces at the start of this line\n\n`;
            foundIssues = true;
        }
    }
    
    if (!foundIssues) {
        errorReport += " No obvious syntax errors found!\n\n";
        errorReport += "If your code isn't working:\n";
        errorReport += "1. Click 'Run ▶' to see the actual error\n";
        errorReport += "2. Check the red line numbers\n";
        errorReport += "3. Tell me which line has the error";
    } else {
        errorReport += "\n Try fixing these issues first!\n";
        errorReport += "If you're still stuck, ask me about the specific line.";
    }
    
    return errorReport;
}

sendBtn.addEventListener('click', sendChatMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
});

// Code editor autocomplete
codeEditor.addEventListener('input', (e) => {
    const cursorPos = codeEditor.selectionStart;
    const textBeforeCursor = codeEditor.value.substring(0, cursorPos);
    
    // Get the current word being typed
    const wordMatch = textBeforeCursor.match(/[a-zA-Z_]\w*$/);
    const currentWord = wordMatch ? wordMatch[0] : '';
    
    if (currentWord && currentWord.length > 0) {
        showAutocomplete(currentWord, cursorPos);
    } else {
        hideAutocomplete();
    }
});

codeEditor.addEventListener('keydown', (e) => {
    const isDropdownActive = autocompleteDropdown.classList.contains('active');
    
    // Handle Enter key for auto-indentation (when autocomplete is NOT active)
    if (e.key === 'Enter' && !isDropdownActive) {
        const cursorPos = codeEditor.selectionStart;
        const textBeforeCursor = codeEditor.value.substring(0, cursorPos);
        const lines = textBeforeCursor.split('\n');
        const currentLine = lines[lines.length - 1];
        
        // Python: Check if current line ends with colon
        if (currentLang === 'python' && currentLine.trim().endsWith(':')) {
            e.preventDefault();
            
            // Get current indentation
            const currentIndent = currentLine.match(/^\s*/)[0];
            
            // Add new line with increased indentation (4 spaces)
            const newIndent = currentIndent + '    ';
            const textAfterCursor = codeEditor.value.substring(cursorPos);
            
            codeEditor.value = textBeforeCursor + '\n' + newIndent + textAfterCursor;
            codeEditor.selectionStart = codeEditor.selectionEnd = cursorPos + 1 + newIndent.length;
            
            updateLineNumbers();
            return;
        }
        
        // Java: Check if current line ends with opening brace
        if (currentLang === 'java' && currentLine.trim().endsWith('{')) {
            e.preventDefault();
            
            // Get current indentation
            const currentIndent = currentLine.match(/^\s*/)[0];
            
            // Add new line with increased indentation (4 spaces)
            const newIndent = currentIndent + '    ';
            const textAfterCursor = codeEditor.value.substring(cursorPos);
            
            codeEditor.value = textBeforeCursor + '\n' + newIndent + textAfterCursor;
            codeEditor.selectionStart = codeEditor.selectionEnd = cursorPos + 1 + newIndent.length;
            
            updateLineNumbers();
            return;
        }
    }
    
    // Only handle autocomplete special keys if dropdown is actually visible
    if (!isDropdownActive) return;
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        navigateSuggestions('down');
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        navigateSuggestions('up');
    } else if (e.key === 'Enter' || e.key === 'Tab') {
        // Only insert suggestion if there's actually a word being typed
        const cursorPos = codeEditor.selectionStart;
        const textBeforeCursor = codeEditor.value.substring(0, cursorPos);
        const wordMatch = textBeforeCursor.match(/[a-zA-Z_]\w*$/);
        
        if (wordMatch && wordMatch[0].length > 0) {
            e.preventDefault();
            const selectedItem = document.querySelector('.autocomplete-item.selected');
            if (selectedItem) {
                const keyword = selectedItem.dataset.keyword;
                const currentWord = wordMatch[0];
                insertSuggestion(keyword, currentWord, cursorPos);
            }
        } else {
            // No word being typed, just hide dropdown and allow normal Enter/Tab
            hideAutocomplete();
        }
    } else if (e.key === 'Escape') {
        hideAutocomplete();
    } else if (e.key === ' ' || e.key === '(' || e.key === ')' || e.key === ',' || e.key === ':') {
        // Hide autocomplete on space or special characters
        hideAutocomplete();
    }
});

// Click outside to hide autocomplete
document.addEventListener('click', (e) => {
    if (!autocompleteDropdown.contains(e.target) && e.target !== codeEditor) {
        hideAutocomplete();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to run code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runBtn.click();
    }
    
    // Ctrl/Cmd + L to clear output
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        clearBtn.click();
    }
});

// ============================================
// Syntax Highlighting System
// ============================================

function applySyntaxHighlighting(code, language) {
    // Get keywords based on language
    let keywords = [];
    if (language === 'Python') {
        keywords = ['def', 'class', 'if', 'elif', 'else', 'for', 'while', 'return', 'import', 'from', 'as', 'try', 'except', 'finally', 'with', 'lambda', 'yield', 'None', 'True', 'False', 'and', 'or', 'not', 'in', 'is', 'break', 'continue', 'pass', 'raise', 'assert', 'del', 'global', 'nonlocal', 'async', 'await', 'int', 'str', 'float', 'bool', 'list', 'dict', 'tuple', 'set', 'frozenset', 'bytes', 'bytearray', 'range', 'object', 'type'];
    } else if (language === 'Java') {
        keywords = ['public', 'private', 'protected', 'static', 'final', 'class', 'interface', 'extends', 'implements', 'new', 'this', 'super', 'void', 'int', 'double', 'float', 'long', 'boolean', 'char', 'byte', 'short', 'String', 'Integer', 'Double', 'Float', 'Long', 'Boolean', 'Character', 'Byte', 'Short', 'Object', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break', 'continue', 'return', 'try', 'catch', 'finally', 'throw', 'throws', 'import', 'package', 'true', 'false', 'null'];
    } else if (language === 'SQL') {
        keywords = ['SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'ALTER', 'DROP', 'INDEX', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER', 'ON', 'GROUP', 'BY', 'ORDER', 'HAVING', 'DISTINCT', 'AS', 'AND', 'OR', 'NOT', 'NULL', 'IS', 'LIKE', 'IN', 'BETWEEN', 'LIMIT', 'OFFSET', 'INTEGER', 'INT', 'VARCHAR', 'TEXT', 'CHAR', 'BOOLEAN', 'DATE', 'DATETIME', 'TIMESTAMP', 'FLOAT', 'DOUBLE', 'DECIMAL', 'NUMERIC', 'BLOB'];
    } else if (language === 'R') {
        keywords = ['function', 'if', 'else', 'for', 'while', 'repeat', 'in', 'next', 'break', 'TRUE', 'FALSE', 'NULL', 'NA', 'NaN', 'Inf', 'return', 'library', 'require', 'data', 'vector', 'matrix', 'list', 'data.frame', 'numeric', 'integer', 'character', 'logical', 'factor', 'double', 'complex'];
    } else if (language === 'C') {
        keywords = ['auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum', 'extern', 'float', 'for', 'goto', 'if', 'int', 'long', 'register', 'return', 'short', 'signed', 'sizeof', 'static', 'struct', 'switch', 'typedef', 'union', 'unsigned', 'void', 'volatile', 'while', 'include', 'define', 'ifdef', 'ifndef', 'endif', 'undef', 'pragma', 'NULL', 'true', 'false'];
    } else if (language === 'C++') {
        keywords = ['auto', 'break', 'case', 'catch', 'char', 'class', 'const', 'continue', 'default', 'delete', 'do', 'double', 'else', 'enum', 'explicit', 'export', 'extern', 'false', 'float', 'for', 'friend', 'goto', 'if', 'inline', 'int', 'long', 'mutable', 'namespace', 'new', 'operator', 'private', 'protected', 'public', 'register', 'return', 'short', 'signed', 'sizeof', 'static', 'struct', 'switch', 'template', 'this', 'throw', 'true', 'try', 'typedef', 'typename', 'union', 'unsigned', 'using', 'virtual', 'void', 'volatile', 'while', 'cout', 'cin', 'endl', 'string', 'getline', 'vector', 'map', 'set', 'include', 'define', 'nullptr', 'std', 'bool'];
    } else if (language === 'JavaScript') {
        keywords = ['function', 'var', 'let', 'const', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break', 'continue', 'return', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'class', 'extends', 'super', 'async', 'await', 'true', 'false', 'null', 'undefined', 'typeof', 'instanceof'];
    } else if (language === 'Go') {
        keywords = ['break', 'case', 'chan', 'const', 'continue', 'default', 'defer', 'else', 'fallthrough', 'for', 'func', 'go', 'goto', 'if', 'import', 'interface', 'map', 'package', 'range', 'return', 'select', 'struct', 'switch', 'type', 'var', 'true', 'false', 'nil', 'fmt', 'Println', 'Printf', 'Print', 'Scan', 'Scanf', 'Scanln', 'main', 'int', 'string', 'bool', 'float64', 'byte', 'rune', 'error', 'make', 'len', 'cap', 'append', 'copy', 'delete', 'panic', 'recover'];
    } else if (language === 'PHP') {
        keywords = ['abstract', 'and', 'array', 'as', 'break', 'case', 'catch', 'class', 'const', 'continue', 'declare', 'default', 'do', 'echo', 'else', 'elseif', 'extends', 'false', 'final', 'for', 'foreach', 'function', 'global', 'if', 'implements', 'include', 'include_once', 'interface', 'namespace', 'new', 'null', 'or', 'print', 'private', 'protected', 'public', 'require', 'require_once', 'return', 'static', 'switch', 'throw', 'true', 'try', 'use', 'var', 'while', 'fgets', 'STDIN', 'readline', 'trim', 'isset', 'empty', 'count', 'strlen'];
    } else if (language === 'TypeScript') {
        keywords = ['abstract', 'any', 'as', 'async', 'await', 'boolean', 'break', 'case', 'catch', 'class', 'const', 'continue', 'default', 'do', 'else', 'enum', 'export', 'extends', 'false', 'finally', 'for', 'function', 'if', 'implements', 'import', 'in', 'instanceof', 'interface', 'let', 'new', 'null', 'number', 'private', 'protected', 'public', 'return', 'static', 'string', 'super', 'switch', 'this', 'throw', 'true', 'try', 'type', 'typeof', 'undefined', 'var', 'void', 'while', 'readonly', 'get', 'set', 'namespace', 'module', 'declare', 'keyof', 'infer', 'never', 'unknown'];
    }

    // Escape HTML
    let highlighted = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Highlight strings (double and single quotes)
    highlighted = highlighted.replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, 
        '<span class="syntax-string">$&</span>');

    // Highlight comments based on language
    if (language === 'Python' || language === 'R') {
        highlighted = highlighted.replace(/(#[^\n]*)/g, '<span class="syntax-comment">$1</span>');
    } else if (language === 'Java' || language === 'JavaScript' || language === 'C' || language === 'C++' || language === 'Go' || language === 'TypeScript') {
        highlighted = highlighted.replace(/(\/\/[^\n]*)/g, '<span class="syntax-comment">$1</span>');
        highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="syntax-comment">$1</span>');
    } else if (language === 'SQL') {
        highlighted = highlighted.replace(/(--[^\n]*)/g, '<span class="syntax-comment">$1</span>');
    } else if (language === 'PHP') {
        highlighted = highlighted.replace(/(\/\/[^\n]*)/g, '<span class="syntax-comment">$1</span>');
        highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="syntax-comment">$1</span>');
        highlighted = highlighted.replace(/(#[^\n]*)/g, '<span class="syntax-comment">$1</span>');
    }

    // Highlight numbers
    highlighted = highlighted.replace(/(?<![<>\w])(\d+\.?\d*)(?![<>\w])/g, 
        (match, num, offset) => {
            if (highlighted.substring(Math.max(0, offset - 10), offset).includes('span')) return match;
            return `<span class="syntax-number">${num}</span>`;
        });

    // Highlight keywords
    keywords.forEach(keyword => {
        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(?<![<>\\w])(${escapedKeyword})(?![<>\\w])`, 'gi');
        highlighted = highlighted.replace(regex, (match, kw, offset) => {
            if (highlighted.substring(Math.max(0, offset - 10), offset).includes('span')) return match;
            return `<span class="syntax-keyword">${kw}</span>`;
        });
    });

    // Highlight function calls
    highlighted = highlighted.replace(/(?<![<>\w])([a-zA-Z_]\w*)(?=\s*\()/g, 
        (match, func, offset) => {
            if (highlighted.substring(Math.max(0, offset - 10), offset).includes('span')) return match;
            return `<span class="syntax-function">${func}</span>`;
        });

    return highlighted;
}

// Apply syntax highlighting on load
const syntaxOverlay = document.getElementById('syntaxOverlay');

function updateSyntaxHighlighting() {
    const code = codeEditor.value;
    const language = languageSelector.value;
    
    if (syntaxOverlay) {
        const result = applySyntaxHighlighting(code, language);
        syntaxOverlay.innerHTML = result;
        console.log('Highlighting applied for', language, 'with', result.length, 'chars');
        // Sync scroll positions
        syntaxOverlay.scrollTop = codeEditor.scrollTop;
        syntaxOverlay.scrollLeft = codeEditor.scrollLeft;
    } else {
        console.error('syntaxOverlay not found!');
    }
}

// Update highlighting on code change
let highlightTimeout;
codeEditor.addEventListener('input', () => {
    // Debounce to prevent lag during fast typing
    clearTimeout(highlightTimeout);
    highlightTimeout = setTimeout(updateSyntaxHighlighting, 10);
});

codeEditor.addEventListener('keyup', (e) => {
    // Immediately update on backspace, delete, or paste for better sync
    if (e.key === 'Backspace' || e.key === 'Delete' || (e.ctrlKey && e.key === 'v')) {
        updateSyntaxHighlighting();
    }
});

// Use RAF for smooth scroll synchronization
let scrollRAF = null;
codeEditor.addEventListener('scroll', () => {
    if (scrollRAF) cancelAnimationFrame(scrollRAF);
    
    scrollRAF = requestAnimationFrame(() => {
        if (syntaxOverlay) {
            syntaxOverlay.scrollTop = codeEditor.scrollTop;
            syntaxOverlay.scrollLeft = codeEditor.scrollLeft;
        }
        if (lineNumbers) {
            lineNumbers.scrollTop = codeEditor.scrollTop;
        }
    });
});

// Update highlighting on language change
languageSelector.addEventListener('change', updateSyntaxHighlighting);

// Initial highlighting
updateSyntaxHighlighting();
