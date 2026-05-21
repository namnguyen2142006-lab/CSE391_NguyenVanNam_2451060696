const btnOpenForm = document.getElementById("btnOpenForm");
const btnCloseForm = document.getElementById("btnCloseForm");

const modal = document.getElementById("modal");

const studentForm = document.getElementById("studentForm");

const studentTableBody = document.getElementById("studentTableBody");

const totalStudents = document.getElementById("totalStudents");

const averageScore = document.getElementById("averageScore");

const message = document.getElementById("message");

const formTitle = document.getElementById("formTitle");
btnOpenForm.addEventListener("click", function () {
  studentForm.reset();

  editIndex = -1;

  formTitle.innerText = "Thêm sinh viên";

  modal.classList.remove("hidden");
});
btnCloseForm.addEventListener("click", function () {
  modal.classList.add("hidden");

  studentForm.reset();

  editIndex = -1;

  formTitle.innerText = "Thêm sinh viên";
});
let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;
function renderStudents() {
  studentTableBody.innerHTML = "";

  students.forEach(function (student, index) {
    studentTableBody.innerHTML += `

      <tr>

        <td>${student.studentId}</td>

        <td>${student.fullName}</td>

        <td>${student.birthday}</td>

        <td>${student.className}</td>

        <td>${student.score}</td>

        <td>${student.email}</td>

        <td>

          <button class = "btn btn-edit" onclick="editStudent(${index})" >
  Sửa
</button>

          <button class="btn btn-delete" onclick="deleteStudent(${index})">
            Xóa
          </button>

        </td>

      </tr>

    `;
  });
}
studentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const student = {
    studentId: document.getElementById("studentId").value,

    fullName: document.getElementById("fullName").value,

    birthday: document.getElementById("birthday").value,

    className: document.getElementById("className").value,

    score: document.getElementById("score").value,

    email: document.getElementById("email").value,
  };

  if (editIndex === -1) {
    students.push(student);
    showMessage("Thêm sinh viên thành công");
  } else {
    students[editIndex] = student;
    showMessage("Cập nhật sinh viên thành công");
    editIndex = -1;
  }
  saveStudents();
  renderStudents();
  updateStatistics();

  showMessage("Thêm sinh viên thành công");

  studentForm.reset();

  modal.classList.add("hidden");
});
function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}
renderStudents();
function updateStatistics() {
  totalStudents.innerText = students.length;

  if (students.length === 0) {
    averageScore.innerText = "0";
    return;
  }

  let totalScore = 0;

  students.forEach(function (student) {
    totalScore += Number(student.score);
  });

  let avg = totalScore / students.length;

  averageScore.innerText = avg.toFixed(2);
}
function showMessage(text) {
  message.innerText = text;

  setTimeout(function () {
    message.innerText = "";
  }, 2000);
}
function deleteStudent(index) {
  const confirmDelete = confirm("Bạn có chắc muốn xóa sinh viên này không?");

  if (confirmDelete) {
    students.splice(index, 1);

    saveStudents();

    renderStudents();

    updateStatistics();

    showMessage("Xóa sinh viên thành công");
  }
}
function editStudent(index) {
  const student = students[index];

  document.getElementById("studentId").value = student.studentId;

  document.getElementById("fullName").value = student.fullName;

  document.getElementById("birthday").value = student.birthday;

  document.getElementById("className").value = student.className;

  document.getElementById("score").value = student.score;

  document.getElementById("email").value = student.email;

  editIndex = index;

  formTitle.innerText = "Cập nhật sinh viên";

  modal.classList.remove("hidden");
}
