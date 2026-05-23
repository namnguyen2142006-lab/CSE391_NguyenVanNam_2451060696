const btnOpenForm = document.getElementById("btnOpenForm");
const btnCloseForm = document.getElementById("btnCloseForm");

const modal = document.getElementById("modal");
const taskForm = document.getElementById("taskForm");
const formTitle = document.getElementById("formTitle");

const message = document.getElementById("message");

const taskTableBody = document.getElementById("taskTableBody");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const incompleteTasks = document.getElementById("incompleteTasks");

// Mảng lưu danh sách công việc
let tasks = JSON.parse(localStorage.getItem("tasks"));

if (tasks === null || tasks.length === 0) {
  tasks = [
    {
      title: "Học HTML",
      description: "Ôn lại các thẻ cơ bản",
      deadline: "2026-05-25",
      priority: "Cao",
      completed: false,
    },
    {
      title: "Làm bài CSS",
      description: "Trang trí giao diện",
      deadline: "2026-05-26",
      priority: "Trung bình",
      completed: true,
    },
    {
      title: "Ôn JavaScript DOM",
      description: "Luyện lấy phần tử HTML",
      deadline: "2026-05-27",
      priority: "Cao",
      completed: false,
    },
    {
      title: "Làm bài tập Web",
      description: "Hoàn thành bài quản lý công việc",
      deadline: "2026-05-28",
      priority: "Cao",
      completed: false,
    },
    {
      title: "Nộp bài",
      description: "Kiểm tra lại code trước khi nộp",
      deadline: "2026-05-29",
      priority: "Thấp",
      completed: true,
    },
  ];

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// editIndex = -1 nghĩa là đang thêm mới
// editIndex khác -1 nghĩa là đang sửa công việc
let editIndex = -1;

btnOpenForm.addEventListener("click", function () {
  taskForm.reset();

  editIndex = -1;

  formTitle.innerText = "Thêm công việc";

  modal.classList.remove("hidden");
});

btnCloseForm.addEventListener("click", function () {
  modal.classList.add("hidden");

  taskForm.reset();

  editIndex = -1;

  formTitle.innerText = "Thêm công việc";
});

function renderTasks() {
  taskTableBody.innerHTML = "";

  tasks.forEach(function (task, index) {
    let completedClass = "";

    if (task.completed === true) {
      completedClass = "completed-row";
    }

    taskTableBody.innerHTML += `
      <tr class="${completedClass}">
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td>${task.deadline}</td>
        <td>${task.priority}</td>
        <td>${task.completed ? "Đã hoàn thành" : "Chưa hoàn thành"}</td>
        <td>
          <button class="btn-toggle" onclick="toggleTask(${index})">
            Đổi trạng thái
          </button>

          <button class="btn-edit" onclick="editTask(${index})">
            Sửa
          </button>

          <button class="btn-delete" onclick="deleteTask(${index})">
            Xóa
          </button>
        </td>
      </tr>
    `;
  });
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const task = {
    title: document.getElementById("taskTitle").value,
    description: document.getElementById("taskDescription").value,
    deadline: document.getElementById("taskDeadline").value,
    priority: document.getElementById("taskPriority").value,
    completed: document.getElementById("taskCompleted").checked,
  };

  if (editIndex === -1) {
    tasks.push(task);
    showMessage("Thêm công việc thành công");
  } else {
    tasks[editIndex] = task;
    showMessage("Cập nhật công việc thành công");
    editIndex = -1;
  }

  saveTasks();
  renderTasks();
  updateTaskSummary();

  taskForm.reset();
  modal.classList.add("hidden");

  formTitle.innerText = "Thêm công việc";
});

function deleteTask(index) {
  const confirmDelete = confirm("Bạn có chắc muốn xóa công việc này không?");

  if (confirmDelete) {
    tasks.splice(index, 1);

    saveTasks();
    renderTasks();
    updateTaskSummary();

    showMessage("Xóa công việc thành công");
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;

  saveTasks();
  renderTasks();
  updateTaskSummary();

  showMessage("Cập nhật trạng thái thành công");
}

function editTask(index) {
  const task = tasks[index];

  document.getElementById("taskTitle").value = task.title;
  document.getElementById("taskDescription").value = task.description;
  document.getElementById("taskDeadline").value = task.deadline;
  document.getElementById("taskPriority").value = task.priority;
  document.getElementById("taskCompleted").checked = task.completed;

  editIndex = index;

  formTitle.innerText = "Cập nhật công việc";

  modal.classList.remove("hidden");
}

function updateTaskSummary() {
  totalTasks.innerText = tasks.length;

  let completedCount = 0;

  tasks.forEach(function (task) {
    if (task.completed === true) {
      completedCount++;
    }
  });

  completedTasks.innerText = completedCount;
  incompleteTasks.innerText = tasks.length - completedCount;
}

function showMessage(text) {
  message.innerText = text;

  setTimeout(function () {
    message.innerText = "";
  }, 2000);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();
updateTaskSummary();
