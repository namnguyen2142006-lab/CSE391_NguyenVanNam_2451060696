// Câu A1 — var / let / const

console.log("===== Đoạn 1: var hoisting =====");

console.log(x);
var x = 5;

console.log("--------------------------------");

console.log("===== Đoạn 2: let và Temporal Dead Zone =====");

try {
  console.log(y);
  let y = 10;
} catch (error) {
  console.log(error.name + ": " + error.message);
}

console.log("--------------------------------");

console.log("===== Đoạn 3: const không được gán lại =====");

try {
  const z = 15;
  z = 20;
  console.log(z);
} catch (error) {
  console.log(error.name + ": " + error.message);
}

console.log("--------------------------------");

console.log("===== Đoạn 4: const array vẫn thay đổi nội dung được =====");

const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

console.log("--------------------------------");

console.log("===== Đoạn 5: let có block scope =====");

let a = 1;

{
  let a = 2;
  console.log("Trong block:", a);
}

console.log("Ngoài block:", a);
