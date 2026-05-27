## Câu A1 — Function Declaration vs Expression vs Arrow

Yêu cầu: Viết cùng một hàm `tinhThueBaoHiem(luong)` theo 3 cách.  
Nếu lương > 11.000.000 thì trừ 10%, nếu lương ≤ 11.000.000 thì không trừ. Hàm trả về object `{ thuong, thuc_nhan }`. :contentReference[oaicite:0]{index=0}

---

### 1. Function Declaration

```javascript
function tinhThueBaoHiemDeclaration(luong) {
  let thuong = 0;

  if (luong > 11000000) {
    thuong = luong * 0.1;
  }

  let thuc_nhan = luong - thuong;

  return {
    thuong: thuong,
    thuc_nhan: thuc_nhan,
  };
}

console.log(tinhThueBaoHiemDeclaration(15000000));
```

Kết quả:

```javascript
{
    thuong: 1500000,
    thuc_nhan: 13500000
}
```

---

### 2. Function Expression

```javascript
const tinhThueBaoHiemExpression = function (luong) {
  let thuong = 0;

  if (luong > 11000000) {
    thuong = luong * 0.1;
  }

  let thuc_nhan = luong - thuong;

  return {
    thuong: thuong,
    thuc_nhan: thuc_nhan,
  };
};

console.log(tinhThueBaoHiemExpression(15000000));
```

Kết quả:

```javascript
{
    thuong: 1500000,
    thuc_nhan: 13500000
}
```

---

### 3. Arrow Function

```javascript
const tinhThueBaoHiemArrow = (luong) => {
  let thuong = 0;

  if (luong > 11000000) {
    thuong = luong * 0.1;
  }

  let thuc_nhan = luong - thuong;

  return {
    thuong: thuong,
    thuc_nhan: thuc_nhan,
  };
};

console.log(tinhThueBaoHiemArrow(15000000));
```

Kết quả:

```javascript
{
    thuong: 1500000,
    thuc_nhan: 13500000
}
```

---

## 4. Ba cách này có khác nhau về hoisting không?

Có khác nhau.

### Function Declaration có hoisting

Function Declaration có thể gọi trước khi khai báo.

Ví dụ:

```javascript
console.log(tinhThueBaoHiemDeclaration(15000000));

function tinhThueBaoHiemDeclaration(luong) {
  let thuong = 0;

  if (luong > 11000000) {
    thuong = luong * 0.1;
  }

  return {
    thuong: thuong,
    thuc_nhan: luong - thuong,
  };
}
```

Code trên chạy được vì Function Declaration được hoisting toàn bộ hàm lên đầu.

---

### Function Expression không dùng được trước khi khai báo

Ví dụ:

```javascript
console.log(tinhThueBaoHiemExpression(15000000));

const tinhThueBaoHiemExpression = function (luong) {
  return {
    thuong: 0,
    thuc_nhan: luong,
  };
};
```

Code trên sẽ lỗi:

```txt
ReferenceError
```

Lý do: biến `tinhThueBaoHiemExpression` được khai báo bằng `const`, nên không thể sử dụng trước dòng khai báo.

---

### Arrow Function cũng không dùng được trước khi khai báo

Ví dụ:

```javascript
console.log(tinhThueBaoHiemArrow(15000000));

const tinhThueBaoHiemArrow = (luong) => {
  return {
    thuong: 0,
    thuc_nhan: luong,
  };
};
```

Code trên cũng lỗi:

```txt
ReferenceError
```

Lý do: Arrow Function thường được gán vào biến `const` hoặc `let`, nên không thể gọi trước khi khai báo.

---

## Câu A2 — Scope & Closure

### Đoạn 1

```javascript
function counter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}
const c = counter();
console.log(c.increment()); // ???
console.log(c.increment()); // ???
console.log(c.increment()); // ???
console.log(c.decrement()); // ???
console.log(c.getCount()); // ???
```

Output dự đoán:

```txt
1
2
3
2
2
```

Giải thích:

Hàm `counter()` tạo biến `count = 0`. Sau đó nó trả về một object có 3 hàm con:

- `increment()` tăng `count` lên 1
- `decrement()` giảm `count` đi 1
- `getCount()` lấy giá trị hiện tại của `count`

Đây là ví dụ về **closure**. Closure nghĩa là hàm con vẫn nhớ và truy cập được biến của hàm cha, ngay cả khi hàm cha `counter()` đã chạy xong.

Diễn biến:

```txt
count ban đầu = 0

c.increment()  → count = 1
c.increment()  → count = 2
c.increment()  → count = 3
c.decrement()  → count = 2
c.getCount()   → count = 2
```

---

### Đoạn 2

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i), 100);
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let:", j), 200);
}
```

Output sau khoảng 200ms:

```txt
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```

Giải thích:

Với vòng lặp dùng `var`:

```javascript
for (var i = 0; i < 3; i++)
```

`var` có **function scope**, không có block scope. Vì vậy cả 3 lần `setTimeout` đều dùng chung một biến `i`.

Khi callback trong `setTimeout` chạy sau 100ms, vòng lặp đã kết thúc. Lúc đó `i = 3`, nên in ra:

```txt
var: 3
var: 3
var: 3
```

Với vòng lặp dùng `let`:

```javascript
for (let j = 0; j < 3; j++)
```

`let` có **block scope**. Mỗi vòng lặp tạo ra một biến `j` riêng.

Vì vậy các callback nhớ đúng giá trị từng vòng lặp:

```txt
let: 0
let: 1
let: 2
```

---

## Câu A3 — Array Methods

Cho mảng:

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

### 1. Lấy các số chẵn

```javascript
const evenNums = nums.filter((num) => num % 2 === 0);
```

Kết quả:

```javascript
[2, 4, 6, 8, 10];
```

---

### 2. Nhân mỗi số với 3

```javascript
const multiplied = nums.map((num) => num * 3);
```

Kết quả:

```javascript
[3, 6, 9, 12, 15, 18, 21, 24, 27, 30];
```

---

### 3. Tính tổng tất cả

```javascript
const total = nums.reduce((sum, num) => sum + num, 0);
```

Kết quả:

```javascript
55;
```

---

### 4. Tìm số đầu tiên lớn hơn 7

```javascript
const firstGreaterThan7 = nums.find((num) => num > 7);
```

Kết quả:

```javascript
8;
```

---

### 5. Kiểm tra có số lớn hơn 10 không

```javascript
const hasGreaterThan10 = nums.some((num) => num > 10);
```

Kết quả:

```javascript
false;
```

---

### 6. Kiểm tra tất cả đều lớn hơn 0

```javascript
const allGreaterThan0 = nums.every((num) => num > 0);
```

Kết quả:

```javascript
true;
```

---

### 7. Tạo mảng `"Số X là [chẵn/lẻ]"`

```javascript
const evenOddText = nums.map(
  (num) => `Số ${num} là ${num % 2 === 0 ? "chẵn" : "lẻ"}`,
);
```

Kết quả:

```javascript
[
  "Số 1 là lẻ",
  "Số 2 là chẵn",
  "Số 3 là lẻ",
  "Số 4 là chẵn",
  "Số 5 là lẻ",
  "Số 6 là chẵn",
  "Số 7 là lẻ",
  "Số 8 là chẵn",
  "Số 9 là lẻ",
  "Số 10 là chẵn",
];
```

---

### 8. Đảo ngược mảng nhưng không thay đổi mảng gốc

```javascript
const reversedNums = [...nums].reverse();
```

Kết quả:

```javascript
[10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
```

Giải thích:

```javascript
[...nums];
```

dùng để copy mảng mới. Sau đó mới gọi `.reverse()`, nên mảng gốc `nums` không bị thay đổi.

## Câu A4 — Object Destructuring & Spread

### Code đề bài

```javascript
const product = {
  name: "iPhone 16",
  price: 25990000,
  specs: { ram: 8, storage: 256, color: "Titan" },
};
```

---

## 1. Destructuring

```javascript
const {
  name,
  price,
  specs: { ram, color },
} = product;
console.log(name, price, ram, color);
```

Output dự đoán:

```txt
iPhone 16 25990000 8 Titan
```

Giải thích:

Dòng destructuring lấy ra:

- `name` từ `product.name`
- `price` từ `product.price`
- `ram` từ `product.specs.ram`
- `color` từ `product.specs.color`

---

```javascript
console.log(specs);
```

Output dự đoán:

```txt
ReferenceError
```

Giải thích:

Trong đoạn destructuring:

```javascript
const {
  name,
  price,
  specs: { ram, color },
} = product;
```

`specs` chỉ được dùng để truy cập vào object con, chứ không tạo ra biến tên là `specs`.

Vì vậy biến được tạo là:

```javascript
name;
price;
ram;
color;
```

Không có biến:

```javascript
specs;
```

nên `console.log(specs)` sẽ báo lỗi `ReferenceError`.

---

## 2. Spread

```javascript
const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price);
console.log(updated.sale);
console.log(product.price);
```

Output dự đoán:

```txt
23990000
true
25990000
```

Giải thích:

```javascript
{ ...product }
```

copy các thuộc tính của `product` sang object mới.

Sau đó:

```javascript
price: 23990000;
```

ghi đè giá trong object mới `updated`.

```javascript
sale: true;
```

thêm thuộc tính mới.

Object gốc `product` không bị đổi, nên:

```javascript
product.price;
```

vẫn là:

```txt
25990000
```

---

## 3. Spread gotcha

```javascript
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram);
```

Output dự đoán:

```txt
16
```

Giải thích:

Spread object chỉ copy nông, gọi là **shallow copy**.

Nghĩa là object ngoài được copy, nhưng object con `specs` bên trong vẫn được dùng chung tham chiếu.

Vì vậy:

```javascript
copy.specs;
```

và:

```javascript
product.specs;
```

vẫn trỏ đến cùng một object.

Khi sửa:

```javascript
copy.specs.ram = 16;
```

thì `product.specs.ram` cũng bị đổi theo.

---
