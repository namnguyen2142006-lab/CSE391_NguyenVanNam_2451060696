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
