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
