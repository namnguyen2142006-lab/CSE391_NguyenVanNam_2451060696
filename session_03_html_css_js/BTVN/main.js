const btnOpenForm = document.getElementById("btnOpenForm");
const btnCloseForm = document.getElementById("btnCloseForm");

const modal = document.getElementById("modal");

const studentForm = document.getElementById("studentForm");

const studentTableBody = document.getElementById("studentTableBody");

const totalStudents = document.getElementById("totalStudents");

const averageScore = document.getElementById("averageScore");

const message = document.getElementById("message");

const formTitle = document.getElementById("formTitle");

const studentIdError = document.getElementById("studentIdError");
const fullNameError = document.getElementById("fullNameError");
const birthdayError = document.getElementById("birthdayError");
const classNameError = document.getElementById("classNameError");
const scoreError = document.getElementById("scoreError");
const emailError = document.getElementById("emailError");

let students = JSON.parse(localStorage.getItem("students"));

if (students === null || students.length === 0) {
  students = [
    {
      studentId: "SV001",
      fullName: "Nguyễn Văn A",
      birthday: "2005-01-01",
      className: "K66A",
      score: "8",
      email: "a@gmail.com",
    },
    {
      studentId: "SV002",
      fullName: "Trần Thị B",
      birthday: "2005-03-12",
      className: "K66B",
      score: "7",
      email: "b@gmail.com",
    },
    {
      studentId: "SV003",
      fullName: "Lê Văn C",
      birthday: "2005-07-20",
      className: "K66C",
      score: "9",
      email: "c@gmail.com",
    },
    {
      studentId: "SV004",
      fullName: "Phạm Thị D",
      birthday: "2005-09-10",
      className: "K66A",
      score: "6",
      email: "d@gmail.com",
    },
    {
      studentId: "SV005",
      fullName: "Hoàng Văn E",
      birthday: "2005-11-25",
      className: "K66B",
      score: "8",
      email: "e@gmail.com",
    },
  ];

  localStorage.setItem("students", JSON.stringify(students));
}

let editIndex = -1;

btnOpenForm.addEventListener("click", function () {
  studentForm.reset();

  clearErrors();

  editIndex = -1;

  formTitle.innerText = "Thêm sinh viên";

  modal.classList.remove("hidden");
});

btnCloseForm.addEventListener("click", function () {
  modal.classList.add("hidden");

  studentForm.reset();

  clearErrors();

  editIndex = -1;

  formTitle.innerText = "Thêm sinh viên";
});

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
          <button class="btn btn-edit" onclick="editStudent(${index})">
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

  if (validateStudentForm() === false) {
    return;
  }

  const student = {
    studentId: document.getElementById("studentId").value.trim(),
    fullName: document.getElementById("fullName").value.trim(),
    birthday: document.getElementById("birthday").value,
    className: document.getElementById("className").value.trim(),
    score: document.getElementById("score").value,
    email: document.getElementById("email").value.trim(),
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

  studentForm.reset();

  clearErrors();

  modal.classList.add("hidden");

  formTitle.innerText = "Thêm sinh viên";
});

function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}

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

  clearErrors();

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

function clearErrors() {
  studentIdError.innerText = "";
  fullNameError.innerText = "";
  birthdayError.innerText = "";
  classNameError.innerText = "";
  scoreError.innerText = "";
  emailError.innerText = "";

  document.getElementById("studentId").classList.remove("input-error");
  document.getElementById("fullName").classList.remove("input-error");
  document.getElementById("birthday").classList.remove("input-error");
  document.getElementById("className").classList.remove("input-error");
  document.getElementById("score").classList.remove("input-error");
  document.getElementById("email").classList.remove("input-error");
}

function validateStudentForm() {
  clearErrors();

  let isValid = true;

  const studentId = document.getElementById("studentId").value.trim();
  const fullName = document.getElementById("fullName").value.trim();
  const birthday = document.getElementById("birthday").value;
  const className = document.getElementById("className").value.trim();
  const score = document.getElementById("score").value;
  const email = document.getElementById("email").value.trim();

  if (studentId === "") {
    studentIdError.innerText = "Mã sinh viên không được để trống";
    document.getElementById("studentId").classList.add("input-error");
    isValid = false;
  } else if (!/^SV[0-9]{3}$/.test(studentId)) {
    studentIdError.innerText = "Mã sinh viên phải có dạng SV001";
    document.getElementById("studentId").classList.add("input-error");
    isValid = false;
  } else {
    let isDuplicate = false;

    students.forEach(function (student, index) {
      if (student.studentId === studentId && index !== editIndex) {
        isDuplicate = true;
      }
    });

    if (isDuplicate === true) {
      studentIdError.innerText = "Mã sinh viên đã tồn tại";
      document.getElementById("studentId").classList.add("input-error");
      isValid = false;
    }
  }

  if (fullName === "") {
    fullNameError.innerText = "Họ tên không được để trống";
    document.getElementById("fullName").classList.add("input-error");
    isValid = false;
  } else if (fullName.length < 3) {
    fullNameError.innerText = "Họ tên phải có ít nhất 3 ký tự";
    document.getElementById("fullName").classList.add("input-error");
    isValid = false;
  }

  if (birthday === "") {
    birthdayError.innerText = "Ngày sinh không được để trống";
    document.getElementById("birthday").classList.add("input-error");
    isValid = false;
  } else {
    const today = new Date();
    const birthDate = new Date(birthday);

    if (birthDate > today) {
      birthdayError.innerText = "Ngày sinh không được lớn hơn ngày hiện tại";
      document.getElementById("birthday").classList.add("input-error");
      isValid = false;
    }
  }

  if (className === "") {
    classNameError.innerText = "Lớp học không được để trống";
    document.getElementById("className").classList.add("input-error");
    isValid = false;
  }

  if (score === "") {
    scoreError.innerText = "Điểm không được để trống";
    document.getElementById("score").classList.add("input-error");
    isValid = false;
  } else if (isNaN(score)) {
    scoreError.innerText = "Điểm phải là số";
    document.getElementById("score").classList.add("input-error");
    isValid = false;
  } else if (Number(score) < 0 || Number(score) > 10) {
    scoreError.innerText = "Điểm phải từ 0 đến 10";
    document.getElementById("score").classList.add("input-error");
    isValid = false;
  }

  if (email === "") {
    emailError.innerText = "Email không được để trống";
    document.getElementById("email").classList.add("input-error");
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.innerText = "Email không đúng định dạng";
    document.getElementById("email").classList.add("input-error");
    isValid = false;
  }

  return isValid;
}

renderStudents();
updateStatistics();
