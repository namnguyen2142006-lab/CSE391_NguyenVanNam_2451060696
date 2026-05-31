## Câu A1 — DOM Tree

### 1. DOM Tree cho HTML đã cho

```txt
div#app
├── header
│   ├── h1
│   │   └── "Todo App"
│   └── nav
│       ├── a.active
│       │   └── "All"
│       ├── a
│       │   └── "Active"
│       └── a
│           └── "Completed"
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button
    │       └── "Add"
    └── ul#todoList
        ├── li.todo-item
        │   └── "Learn HTML"
        └── li.todo-item.completed
            └── "Learn CSS"
```

### 2. Viết `querySelector` cho từng yêu cầu

#### Chọn thẻ `<h1>`

```javascript
const title = document.querySelector("h1");
```

---

#### Chọn input trong form

```javascript
const input = document.querySelector("#todoForm input");
```

Hoặc có thể chọn trực tiếp bằng `id`:

```javascript
const input = document.querySelector("#todoInput");
```

---

#### Chọn tất cả `.todo-item`

```javascript
const todoItems = document.querySelectorAll(".todo-item");
```

Vì có nhiều todo item nên dùng `querySelectorAll`.

---

#### Chọn link đang active

```javascript
const activeLink = document.querySelector("nav a.active");
```

---

#### Chọn `<li>` đầu tiên trong `#todoList`

```javascript
const firstTodo = document.querySelector("#todoList li:first-child");
```

Hoặc:

```javascript
const firstTodo = document.querySelector("#todoList .todo-item");
```

---

#### Chọn tất cả `<a>` bên trong `<nav>`

```javascript
const navLinks = document.querySelectorAll("nav a");
```

## Câu A2 — `innerHTML` vs `textContent`

### 1. `innerHTML` là gì?

`innerHTML` dùng để đọc hoặc ghi nội dung HTML bên trong một element.

Ví dụ:

```javascript
const box = document.querySelector("#result");

box.innerHTML = "<strong>Xin chào</strong>";
```

Kết quả hiển thị:

```txt
Xin chào
```

nhưng chữ sẽ được in đậm vì trình duyệt hiểu `<strong>` là thẻ HTML.

### Khi nào dùng `innerHTML`?

Dùng `innerHTML` khi mình thật sự muốn chèn HTML vào trang.

Ví dụ:

```javascript
document.querySelector("#result").innerHTML = `
    <h2>Thông báo</h2>
    <p>Thêm sản phẩm thành công</p>
`;
```

Tuy nhiên, chỉ nên dùng `innerHTML` với nội dung do lập trình viên tự viết, không nên dùng trực tiếp với dữ liệu người dùng nhập vào.

---

### 2. `textContent` là gì?

`textContent` dùng để đọc hoặc ghi nội dung dạng văn bản thuần.

Ví dụ:

```javascript
const box = document.querySelector("#result");

box.textContent = "<strong>Xin chào</strong>";
```

Kết quả hiển thị đúng nguyên văn:

```txt
<strong>Xin chào</strong>
```

Trình duyệt không hiểu `<strong>` là HTML, mà chỉ coi nó là text bình thường.

### Khi nào dùng `textContent`?

Dùng `textContent` khi muốn hiển thị dữ liệu dạng chữ, đặc biệt là dữ liệu do người dùng nhập vào.

Ví dụ:

```javascript
const username = document.querySelector("#username").value;

document.querySelector("#result").textContent = username;
```

---

## 3. So sánh ngắn gọn

| Tiêu chí                      | `innerHTML` | `textContent` |
| ----------------------------- | ----------- | ------------- |
| Hiểu thẻ HTML                 | Có          | Không         |
| Chỉ hiển thị text             | Không hẳn   | Có            |
| Có nguy cơ XSS                | Có          | An toàn hơn   |
| Nên dùng với input người dùng | Không nên   | Nên dùng      |

---

## 4. Vì sao `innerHTML` có thể gây XSS?

XSS là lỗi bảo mật xảy ra khi website cho phép người dùng chèn mã HTML hoặc JavaScript độc hại vào trang.

Ví dụ nguy hiểm:

```javascript
// User nhập vào input:
// <img src=x onerror="alert('Hacked!')">

const userInput = document.querySelector("#search").value;

document.querySelector("#result").innerHTML = userInput;
```

Nếu dùng `innerHTML`, trình duyệt sẽ hiểu chuỗi người dùng nhập là HTML thật.

Khi đó đoạn:

```html
<img src="x" onerror="alert('Hacked!')" />
```

có thể chạy JavaScript trong `onerror`, gây ra lỗi XSS.

---

## 5. Cách sửa an toàn

Thay vì dùng `innerHTML`, dùng `textContent`:

```javascript
const userInput = document.querySelector("#search").value;

document.querySelector("#result").textContent = userInput;
```

Khi dùng `textContent`, trình duyệt chỉ hiển thị nội dung người dùng nhập như văn bản bình thường, không thực thi HTML hoặc JavaScript.

Nếu user nhập:

```html
<img src="x" onerror="alert('Hacked!')" />
```

trang chỉ hiển thị nguyên dòng đó, không chạy `alert`.

---

## Câu A3 — Event Bubbling

### 1. Khi click vào button, output là gì?

Code:

```javascript
document.querySelector("#outer").addEventListener("click", () => {
  console.log("OUTER");
});

document.querySelector("#inner").addEventListener("click", () => {
  console.log("INNER");
});

document.querySelector("#btn").addEventListener("click", (e) => {
  console.log("BUTTON");
});
```

HTML:

```html
<div id="outer">
  <div id="inner">
    <button id="btn">Click me</button>
  </div>
</div>
```

Khi click vào button, output là:

```txt
BUTTON
INNER
OUTER
```

### Giải thích

Đây là cơ chế **Event Bubbling**.

Khi click vào button, sự kiện xảy ra ở phần tử con trước, sau đó nổi dần lên các phần tử cha.

Thứ tự là:

```txt
button#btn → div#inner → div#outer
```

Nên console in ra:

```txt
BUTTON
INNER
OUTER
```

---

### 2. Nếu bỏ comment `e.stopPropagation()` thì output thay đổi thế nào?

Code:

```javascript
document.querySelector("#btn").addEventListener("click", (e) => {
  console.log("BUTTON");
  e.stopPropagation();
});
```

Khi click vào button, output là:

```txt
BUTTON
```

### Giải thích

`e.stopPropagation()` dùng để chặn sự kiện nổi lên phần tử cha.

Vì vậy sau khi button xử lý xong sự kiện, event sẽ dừng lại, không chạy tiếp handler của `#inner` và `#outer`.

---
