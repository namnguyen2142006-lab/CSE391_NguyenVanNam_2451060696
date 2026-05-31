const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const countText = document.querySelector("#countText");
const clearCompletedBtn = document.querySelector("#clearCompletedBtn");
const filterButtons = document.querySelectorAll(".filter-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getFilteredTodos() {
  if (currentFilter === "active") {
    return todos.filter((todo) => todo.completed === false);
  }

  if (currentFilter === "completed") {
    return todos.filter((todo) => todo.completed === true);
  }

  return todos;
}

function updateCount() {
  const activeTodos = todos.filter((todo) => todo.completed === false);
  countText.textContent = activeTodos.length + " items left";
}

function renderTodos() {
  todoList.textContent = "";

  const filteredTodos = getFilteredTodos();

  for (let i = 0; i < filteredTodos.length; i++) {
    const todo = filteredTodos[i];

    const li = document.createElement("li");
    li.classList.add("todo-item");

    if (todo.completed === true) {
      li.classList.add("completed");
    }

    li.dataset.id = todo.id;

    const span = document.createElement("span");
    span.classList.add("todo-text");
    span.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "❌";

    li.appendChild(span);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  }

  updateCount();
}

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = todoInput.value.trim();

  if (text === "") {
    return;
  }

  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  todos.push(newTodo);

  todoInput.value = "";

  saveTodos();
  renderTodos();
});

todoList.addEventListener("click", function (e) {
  const li = e.target.closest(".todo-item");

  if (!li) {
    return;
  }

  const id = Number(li.dataset.id);

  if (e.target.classList.contains("delete-btn")) {
    todos = todos.filter((todo) => todo.id !== id);

    saveTodos();
    renderTodos();

    return;
  }

  if (e.target.classList.contains("todo-text")) {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        todos[i].completed = !todos[i].completed;
      }
    }

    saveTodos();
    renderTodos();
  }
});

todoList.addEventListener("dblclick", function (e) {
  if (!e.target.classList.contains("todo-text")) {
    return;
  }

  const li = e.target.closest(".todo-item");
  const id = Number(li.dataset.id);
  const oldText = e.target.textContent;

  const input = document.createElement("input");
  input.classList.add("edit-input");
  input.value = oldText;

  li.replaceChild(input, e.target);
  input.focus();

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const newText = input.value.trim();

      if (newText !== "") {
        for (let i = 0; i < todos.length; i++) {
          if (todos[i].id === id) {
            todos[i].text = newText;
          }
        }
      }

      saveTodos();
      renderTodos();
    }
  });
});

for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    currentFilter = this.dataset.filter;

    for (let j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove("active");
    }

    this.classList.add("active");

    renderTodos();
  });
}

clearCompletedBtn.addEventListener("click", function () {
  todos = todos.filter((todo) => todo.completed === false);

  saveTodos();
  renderTodos();
});

renderTodos();
