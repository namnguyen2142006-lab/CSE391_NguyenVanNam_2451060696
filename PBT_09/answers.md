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

## Câu C1 — Debug DOM Code

### 1. Các lỗi trong code ban đầu

#### Lỗi 1: Dùng `innerHTML` không cần thiết để hiển thị số

Code ban đầu:

```javascript
countDisplay.innerHTML = count;
```

Ở đây chỉ cần hiển thị text là số đếm, không cần chèn HTML.

Cách sửa:

```javascript
countDisplay.textContent = count;
```

---

#### Lỗi 2: Sai tên event ở nút decrement

Code sai:

```javascript
document.querySelector("#decrementBtn").addEventListener("onclick", function() {
```

`addEventListener` không dùng `"onclick"`, mà dùng `"click"`.

Cách sửa:

```javascript
document.querySelector("#decrementBtn").addEventListener("click", function() {
```

---

#### Lỗi 3: Gán lại biến `countDisplay` là `const`

Code sai:

```javascript
countDisplay = count;
```

`countDisplay` được khai báo bằng `const`, không thể gán lại. Hơn nữa `countDisplay` là DOM element, muốn đổi nội dung thì phải dùng `.textContent`.

Cách sửa:

```javascript
countDisplay.textContent = count;
```

---

#### Lỗi 4: Xóa history bằng `innerHTML = null` không hợp lý

Code ban đầu:

```javascript
historyList.innerHTML = null;
```

Nên dùng chuỗi rỗng hoặc `textContent`.

Cách sửa:

```javascript
historyList.textContent = "";
```

Hoặc:

```javascript
historyList.innerHTML = "";
```

---

#### Lỗi 5: Xóa từng item nhưng thiếu dấu `()`

Code sai:

```javascript
item.remove;
```

Dòng này chỉ tham chiếu tới hàm `remove`, nhưng không gọi hàm.

Cách sửa:

```javascript
item.remove();
```

---

#### Lỗi 6: `localStorage.getItem("count")` trả về string

Code ban đầu:

```javascript
count = localStorage.getItem("count");
```

Dữ liệu lấy từ localStorage luôn là string. Nếu dùng để tính toán, nên chuyển về number.

Cách sửa:

```javascript
count = Number(localStorage.getItem("count")) || 0;
```

---

#### Lỗi 7: Load lại `count` nhưng không load lại history

Code ban đầu chỉ load count:

```javascript
count = localStorage.getItem("count");
countDisplay.textContent = count;
```

Nhưng trước đó có lưu:

```javascript
localStorage.setItem("history", historyList.innerHTML);
```

Vậy khi load lại cũng nên khôi phục history.

Cách sửa:

```javascript
historyList.innerHTML = localStorage.getItem("history") || "";
```

---

#### Lỗi 8: Event xóa history bị mất sau khi load từ localStorage

Ban đầu mỗi `<li>` được gắn event riêng:

```javascript
li.addEventListener("click", function () {
  deleteHistory(this);
});
```

Nhưng khi load lại bằng `innerHTML`, các event listener cũ không còn nữa.

Cách sửa tốt hơn là dùng Event Delegation: gắn event một lần lên `historyList`.

```javascript
historyList.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.remove();
  }
});
```

---

#### Lỗi 9: Nên kiểm tra element có tồn tại trước khi dùng

Nếu HTML thiếu một id/class như `#incrementBtn`, `#decrementBtn`, `.count`, chương trình sẽ lỗi khi gọi `addEventListener`.

Có thể kiểm tra:

```javascript
if (incrementBtn) {
  incrementBtn.addEventListener("click", function () {
    // code
  });
}
```

Tuy nhiên trong bài sửa cơ bản, giả sử HTML có đầy đủ element.

---

## 2. Code đã sửa

```javascript
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

const incrementBtn = document.querySelector("#incrementBtn");
const decrementBtn = document.querySelector("#decrementBtn");
const resetBtn = document.querySelector("#resetBtn");
const clearHistoryBtn = document.querySelector("#clearHistory");

let count = 0;

function updateDisplay() {
  countDisplay.textContent = count;
}

function addHistory() {
  const li = document.createElement("li");
  li.textContent = "Count changed to " + count;
  historyList.appendChild(li);
}

incrementBtn.addEventListener("click", function () {
  count++;
  updateDisplay();
  addHistory();
});

decrementBtn.addEventListener("click", function () {
  count--;
  updateDisplay();
  addHistory();
});

resetBtn.addEventListener("click", function () {
  count = 0;
  updateDisplay();
  historyList.textContent = "";
});

historyList.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.remove();
  }
});

clearHistoryBtn.addEventListener("click", function () {
  const items = historyList.querySelectorAll("li");

  items.forEach(function (item) {
    item.remove();
  });
});

window.addEventListener("beforeunload", function () {
  localStorage.setItem("count", count);
  localStorage.setItem("history", historyList.innerHTML);
});

window.addEventListener("load", function () {
  count = Number(localStorage.getItem("count")) || 0;
  countDisplay.textContent = count;

  historyList.innerHTML = localStorage.getItem("history") || "";
});
```

---

## Câu C2 — Performance

### 1. Tại sao bind event lên 1000 elements riêng lẻ là bad practice?

Ví dụ có 1000 item:

```javascript
const items = document.querySelectorAll(".item");

items.forEach((item) => {
  item.addEventListener("click", function () {
    console.log("Clicked");
  });
});
```

Cách này không tốt vì:

- Phải tạo 1000 event listeners riêng biệt.
- Tốn bộ nhớ hơn.
- Code khó quản lý hơn.
- Nếu sau này thêm item mới bằng JavaScript, item mới chưa có event listener.
- Khi danh sách lớn, hiệu năng có thể giảm.

---

### 2. Event Delegation giải quyết thế nào?

Event Delegation nghĩa là không gắn event vào từng item con, mà gắn event vào phần tử cha.

Ví dụ:

```javascript
const list = document.querySelector("#list");

list.addEventListener("click", function (e) {
  if (e.target.classList.contains("item")) {
    console.log("Clicked:", e.target.textContent);
  }
});
```

Cách này tốt hơn vì:

- Chỉ cần 1 event listener trên phần tử cha.
- Các item con click vào sẽ nổi sự kiện lên cha nhờ event bubbling.
- Item mới thêm vào sau vẫn hoạt động.
- Code gọn và dễ bảo trì hơn.

---

### 3. Code ban đầu gây 1000 lần reflow

Code ban đầu:

```javascript
for (let i = 0; i < 1000; i++) {
  const div = document.createElement("div");
  div.textContent = `Item ${i}`;
  document.body.appendChild(div);
}
```

Vấn đề:

Mỗi lần gọi:

```javascript
document.body.appendChild(div);
```

trình duyệt có thể phải cập nhật lại DOM và tính lại layout.

Lặp 1000 lần nghĩa là có thể gây ra nhiều lần reflow/repaint, làm trang chậm.

---

### 4. Refactor bằng `DocumentFragment`

```javascript
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
  const div = document.createElement("div");
  div.textContent = `Item ${i}`;
  fragment.appendChild(div);
}

document.body.appendChild(fragment);
```

---

### 5. Tại sao `DocumentFragment` nhanh hơn?

`DocumentFragment` là một vùng chứa tạm thời trong bộ nhớ, chưa gắn trực tiếp vào DOM thật.

Khi thêm 1000 `div` vào fragment:

```javascript
fragment.appendChild(div);
```

trình duyệt chưa cần render lại trang ngay.

Sau đó chỉ gọi một lần:

```javascript
document.body.appendChild(fragment);
```

Lúc này toàn bộ 1000 phần tử mới được đưa vào DOM thật cùng lúc.

Vì vậy thay vì cập nhật DOM 1000 lần, ta chỉ cập nhật DOM 1 lần.

---
