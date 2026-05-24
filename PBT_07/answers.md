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

## Câu A2 — Data Types & Coercion

### 1. Dự đoán kết quả trước khi chạy

```javascript
console.log(typeof null); // "object"
console.log(typeof undefined); // "undefined"
console.log(typeof NaN); // "number"
console.log("5" + 3); // "53"
console.log("5" - 3); // 2
console.log("5" * "3"); // 15
console.log(true + true); // 2
console.log([] + []); // ""
console.log([] + {}); // "[object Object]"
console.log({} + []); // 0 hoặc "[object Object]" tùy môi trường chạy
```

---

### 2. Giải thích từng kết quả

#### `typeof null`

```javascript
console.log(typeof null);
```

Kết quả dự đoán:

```txt
"object"
```

Giải thích:

Đây là lỗi lịch sử của JavaScript. `null` không thực sự là object, nhưng `typeof null` lại trả về `"object"`.

---

#### `typeof undefined`

```javascript
console.log(typeof undefined);
```

Kết quả dự đoán:

```txt
"undefined"
```

Giải thích:

`undefined` là kiểu dữ liệu thể hiện biến chưa có giá trị.

---

#### `typeof NaN`

```javascript
console.log(typeof NaN);
```

Kết quả dự đoán:

```txt
"number"
```

Giải thích:

`NaN` là viết tắt của `Not a Number`, nhưng trong JavaScript nó vẫn thuộc kiểu `number`.

---

#### `"5" + 3`

```javascript
console.log("5" + 3);
```

Kết quả dự đoán:

```txt
"53"
```

Giải thích:

Toán tử `+` trong JavaScript có thể dùng để cộng số hoặc nối chuỗi.

Khi một bên là string, JavaScript ưu tiên nối chuỗi.

```javascript
"5" + 3;
```

JavaScript tự chuyển:

```javascript
3 → "3"
```

nên thành:

```javascript
"5" + "3";
```

Kết quả là:

```txt
"53"
```

---

#### `"5" - 3`

```javascript
console.log("5" - 3);
```

Kết quả dự đoán:

```txt
2
```

Giải thích:

Toán tử `-` không dùng để nối chuỗi. Nó chỉ dùng cho phép toán số.

Vì vậy JavaScript tự chuyển:

```javascript
"5" → 5
```

rồi tính:

```javascript
5 - 3;
```

Kết quả là:

```txt
2
```

---

#### `"5" * "3"`

```javascript
console.log("5" * "3");
```

Kết quả dự đoán:

```txt
15
```

Giải thích:

Toán tử `*` cũng là toán tử số học, nên JavaScript tự chuyển hai chuỗi `"5"` và `"3"` thành số.

```javascript
"5" * "3";
```

thành:

```javascript
5 * 3;
```

Kết quả là:

```txt
15
```

---

#### `true + true`

```javascript
console.log(true + true);
```

Kết quả dự đoán:

```txt
2
```

Giải thích:

Khi tính toán số học:

```javascript
true → 1
false → 0
```

nên:

```javascript
true + true;
```

thành:

```javascript
1 + 1;
```

Kết quả là:

```txt
2
```

---

#### `[] + []`

```javascript
console.log([] + []);
```

Kết quả dự đoán:

```txt
""
```

Giải thích:

Mảng rỗng khi chuyển sang chuỗi sẽ thành chuỗi rỗng:

```javascript
[] → ""
```

nên:

```javascript
[] + [];
```

thành:

```javascript
"" + "";
```

Kết quả là chuỗi rỗng.

---

#### `[] + {}`

```javascript
console.log([] + {});
```

Kết quả dự đoán:

```txt
"[object Object]"
```

Giải thích:

JavaScript chuyển:

```javascript
[] → ""
{} → "[object Object]"
```

nên:

```javascript
[] + {};
```

thành:

```javascript
"" + "[object Object]";
```

Kết quả là:

```txt
"[object Object]"
```

---

#### `{} + []`

```javascript
console.log({} + []);
```

Kết quả dự đoán:

```txt
"[object Object]"
```

Giải thích:

Đây là trường hợp dễ gây nhầm.

Trong một số môi trường, `{}` có thể bị hiểu là một block code rỗng, sau đó `+[]` được hiểu là ép mảng rỗng sang số.

```javascript
+[];
```

JavaScript hiểu `{}` là object literal trong biểu thức, kết quả có thể là:

```txt
"[object Object]"
```

---

## 3. So sánh sau khi chạy code

Sau khi chạy file `type_coercion.js`, phần lớn kết quả giống với dự đoán.

Kết quả cần chú ý nhất là:

- `"5" + 3` ra `"53"` vì toán tử `+` ưu tiên nối chuỗi khi có string.
- `"5" - 3` ra `2` vì toán tử `-` chỉ dùng cho phép toán số nên JavaScript ép `"5"` thành số `5`.

---

## 4. Bài học rút ra

Type coercion là việc JavaScript tự động chuyển kiểu dữ liệu.

Điều này có thể gây bug nếu lập trình viên không kiểm soát kiểu dữ liệu.

Cách an toàn hơn là chuyển kiểu rõ ràng trước khi tính toán:

```javascript
Number("5") + 3;
```

Kết quả:

```txt
8
```

## Câu A3 — So sánh `==` và `===`

```javascript
console.log(5 == "5"); // true
console.log(5 === "5"); // false
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log(NaN == NaN); // false
console.log(0 == false); // true
console.log(0 === false); // false
console.log("" == false); // true
```

### Giải thích ngắn

- `==` là so sánh lỏng, JavaScript có thể tự ép kiểu trước khi so sánh.
- `===` là so sánh nghiêm ngặt, kiểm tra cả giá trị và kiểu dữ liệu.
- `NaN == NaN` là `false` vì `NaN` không bằng bất kỳ giá trị nào, kể cả chính nó.

### Nên dùng `==` hay `===`?

Từ giờ trở đi nên dùng `===`.

Lý do:

- Tránh JavaScript tự ép kiểu gây kết quả bất ngờ.
- Code dễ hiểu hơn.
- An toàn hơn khi kiểm tra điều kiện.

Chỉ nên dùng `==` khi thật sự hiểu rõ JavaScript sẽ ép kiểu như thế nào..

## Câu A5 — Template Literals

### Cách 1

Code ban đầu:

```javascript
var greeting = "Xin chào " + name + "! Bạn " + age + " tuổi.";
```

Viết bằng template literal:

```javascript
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

---

### Cách 2

Code ban đầu:

```javascript
var url = "https://api.example.com/users/" + userId + "/orders?page=" + page;
```

Viết bằng template literal:

```javascript
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;
```

---

### Cách 3

Code ban đầu:

```javascript
var html =
  '<div class="card">' +
  "<h2>" +
  title +
  "</h2>" +
  "<p>" +
  description +
  "</p>" +
  "<span>Giá: " +
  price +
  "đ</span>" +
  "</div>";
```

Viết bằng template literal:

```javascript
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
```
