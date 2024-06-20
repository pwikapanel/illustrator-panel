# bugs & how they were fixed

---
### param passed to program() not defined

When a button is clicked:
- the value of param is set in csif
- the script is executed

In the script, the value of param was undefined.

The problem was that the script was an anonymous function.

The fix was to assign the value of param to the variable before defining the anonymous function.
