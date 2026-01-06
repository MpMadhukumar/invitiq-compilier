# 🚀 QUICK TEST COMMANDS

## Instant Testing (Copy & Paste)

### 1️⃣ Test Enhanced For Loop (Java)
```java
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Size: ");
        int n = sc.nextInt();
        sc.nextLine();
        String[] arr = new String[n];
        for(int i=0; i<n; i++) arr[i] = sc.nextLine();
        for(String s : arr) System.out.println(s);
    }
}
```
**Inputs**: `3`, `Apple`, `Banana`, `Cherry`

---

### 2️⃣ Test Nested Loop (Java)
```java
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt();
        int c = sc.nextInt();
        for(int i=0; i<r; i++)
            for(int j=0; j<c; j++)
                System.out.print(sc.nextInt() + " ");
    }
}
```
**Inputs**: `2`, `3`, then `1,2,3,4,5,6`
**Expected**: Shows "2 × 3 nested - 6 iterations"

---

### 3️⃣ Test Decrementing Loop (Python)
```python
n = int(input("Start: "))
for i in range(n, 0, -1):
    print(i)
```
**Inputs**: `5`
**Expected**: Shows "Decrementing loop"

---

### 4️⃣ Test .length (JavaScript)
```javascript
const readline = require('readline-sync');
let n = parseInt(readline.question("Size? "));
let arr = [];
for(let i=0; i<n; i++) arr.push(readline.question("Value: "));
for(let i=0; i<arr.length; i++) console.log(arr[i]);
```
**Inputs**: `3`, `10`, `20`, `30`

---

## 🎯 What to Look For

✅ **Message Format**: 
```
💡 Detected: [Loop Type] (nesting info) - X iterations × Y inputs = Z more values needed
```

✅ **Loop Types**:
- `Loop` - Regular for loop
- `Enhanced for loop` - foreach/for-of/for-in
- `Decrementing loop` - Countdown (i--)
- `Do-while loop` - Entry-controlled
- `(2 × 3 nested)` - Nested indication

✅ **Smart Prompts**: Uses actual prompts from your code

---

## ⚡ Quick Commands

### Hard Refresh Browser
```
Ctrl + Shift + R
```

### Check Implementation
```powershell
Get-Content script.js | Select-String "isDecrementing|nestedLoop" | Select-Object -First 5
```

### View All Features
```powershell
code TEST_ALL_FEATURES.md
```

---

## 📊 Feature Status

| Feature | Status | Test |
|---------|--------|------|
| Enhanced for | ✅ | Test #1 |
| Nested loops | ✅ | Test #2 |
| Decrementing | ✅ | Test #3 |
| .length/.size() | ✅ | Test #4 |
| Do-while | ✅ | See TEST_ALL_FEATURES.md |
| 9 Languages | ✅ | All tests |

---

**READY TO TEST!** 🎉

1. Hard refresh browser: `Ctrl + Shift + R`
2. Pick a test case above
3. Paste code and click Run
4. Watch the smart detection work!
