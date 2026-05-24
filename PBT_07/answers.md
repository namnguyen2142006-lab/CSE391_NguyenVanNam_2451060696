## Câu A1 — var / let / const

### 1. Dự đoán output trước khi chạy code

---

### Đoạn 1

```javascript
console.log(x);
var x = 5;
```

Dự đoán output:

```txt
undefined
```

Giải thích:

Biến khai báo bằng `var` bị hoisting. Nghĩa là JavaScript đưa phần khai báo biến lên đầu phạm vi, nhưng giá trị `5` chưa được gán tại thời điểm `console.log(x)` chạy.

Code trên được hiểu gần giống như:

```javascript
var x;
console.log(x);
x = 5;
```

Vì vậy kết quả là `undefined`.

---

### Đoạn 2

```javascript
console.log(y);
let y = 10;
```

Dự đoán output:

```txt
ReferenceError
```

Giải thích:

Biến khai báo bằng `let` cũng có hoisting, nhưng không được dùng trước khi khai báo. Khoảng thời gian từ đầu block đến dòng khai báo `let y = 10` gọi là Temporal Dead Zone.

Vì vậy khi gọi:

```javascript
console.log(y);
```

trước khi khai báo `y`, chương trình báo lỗi `ReferenceError`.

---

### Đoạn 3

```javascript
const z = 15;
z = 20;
console.log(z);
```

Dự đoán output:

```txt
TypeError
```

Giải thích:

`const` dùng để khai báo hằng số. Sau khi đã gán giá trị ban đầu, ta không được gán lại giá trị mới cho biến đó.

Dòng này bị lỗi:

```javascript
z = 20;
```

Vì vậy `console.log(z)` sẽ không chạy được.

---

### Đoạn 4

```javascript
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
```

Dự đoán output:

```txt
[1, 2, 3, 4]
```

Giải thích:

`const` không cho phép gán lại biến `arr` sang một mảng khác, nhưng vẫn cho phép thay đổi nội dung bên trong mảng.

Ví dụ được phép:

```javascript
arr.push(4);
```

Ví dụ không được phép:

```javascript
arr = [1, 2, 3, 4];
```

Vì vậy kết quả là mảng `[1, 2, 3, 4]`.

---

### Đoạn 5

```javascript
let a = 1;
{
  let a = 2;
  console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
```

Dự đoán output:

```txt
Trong block: 2
Ngoài block: 1
```

Giải thích:

`let` có phạm vi theo block `{}`.

Biến `a` bên trong block:

```javascript
{
  let a = 2;
}
```

là biến khác với biến `a` bên ngoài:

```javascript
let a = 1;
```

Vì vậy trong block in ra `2`, còn ngoài block in ra `1`.

## 2. So sánh kết quả sau khi chạy

Sau khi chạy file, kết quả thực tế giống với dự đoán:

- Đoạn 1 in ra `undefined` vì `var` bị hoisting.
- Đoạn 2 báo `ReferenceError` vì `let` không được dùng trước khi khai báo.
- Đoạn 3 báo `TypeError` vì `const` không cho phép gán lại giá trị.
- Đoạn 4 in ra `[1, 2, 3, 4]` vì `const` array vẫn có thể thay đổi nội dung bên trong.
- Đoạn 5 in ra `Trong block: 2` và `Ngoài block: 1` vì `let` có block scope.

---

## 3. Kết quả bất ngờ cần nhớ

### `var` có thể in ra `undefined`

`var` bị hoisting nên không báo lỗi khi dùng trước khai báo, nhưng giá trị lúc đó là `undefined`.

### `let` báo lỗi khi dùng trước khai báo

`let` nằm trong Temporal Dead Zone nên nếu truy cập trước dòng khai báo sẽ bị `ReferenceError`.

### `const` array vẫn push được

`const` chỉ ngăn việc gán lại biến, không ngăn việc thay đổi nội dung bên trong object hoặc array.
