function calcultate(a, op, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    return "Loi: Input khong phai so";
  }
  if (op === "+") {
    return a + b;
  }
  if (op === "-") {
    return a - b;
  }
  if (op === "*") {
    return a * b;
  }
  if (op === "/") {
    if (b === 0) {
      return "Loi: Khong the chia cho 0";
    }
    return a / b;
  }
  return "Loi: Op khong hop le";
}
console.log(calcultate(10, "+", 5));
console.log(calcultate(10, "-", 5));
console.log(calcultate(10, "*", 5));
console.log(calcultate(10, "/", 5));
console.log(calcultate(10, "/", 0));
console.log(calcultate("abc", "+", 5));
console.log(calcultate(10, "<<", 5));
