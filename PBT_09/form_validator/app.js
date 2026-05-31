const form = document.querySelector("#registerForm");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirmPassword");
const phoneInput = document.querySelector("#phone");

const nameStatus = document.querySelector("#nameStatus");
const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const confirmError = document.querySelector("#confirmError");
const phoneError = document.querySelector("#phoneError");

const strengthBar = document.querySelector("#strengthBar");
const submitBtn = document.querySelector("#submitBtn");

const modal = document.querySelector("#modal");
const modalContent = document.querySelector("#modalContent");
const closeModal = document.querySelector("#closeModal");

let validName = false;
let validEmail = false;
let validPassword = false;
let validConfirmPassword = false;
let validPhone = false;

function validateName() {
  const name = nameInput.value.trim();

  if (name.length >= 2 && name.length <= 50) {
    nameStatus.textContent = "✅";
    nameError.textContent = "";
    validName = true;
  } else {
    nameStatus.textContent = "❌";
    nameError.textContent = "Tên phải từ 2 đến 50 ký tự.";
    validName = false;
  }

  updateSubmitButton();
}

function validateEmail() {
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    emailError.textContent = "Email không được để trống.";
    validEmail = false;
  } else if (!emailRegex.test(email)) {
    emailError.textContent = "Email không đúng định dạng.";
    validEmail = false;
  } else {
    emailError.textContent = "";
    validEmail = true;
  }

  updateSubmitButton();
}

function validatePassword() {
  const password = passwordInput.value;

  strengthBar.className = "";

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  if (password.length === 0) {
    passwordError.textContent = "Mật khẩu không được để trống.";
    validPassword = false;
  } else if (password.length < 8) {
    strengthBar.classList.add("weak");
    passwordError.textContent = "Mật khẩu yếu: cần ít nhất 8 ký tự.";
    validPassword = false;
  } else if (hasLower && hasUpper && hasNumber && hasSpecial) {
    strengthBar.classList.add("strong");
    passwordError.textContent = "Mật khẩu mạnh.";
    validPassword = true;
  } else if ((hasLower || hasUpper) && hasNumber) {
    strengthBar.classList.add("medium");
    passwordError.textContent = "Mật khẩu trung bình.";
    validPassword = true;
  } else {
    strengthBar.classList.add("weak");
    passwordError.textContent = "Mật khẩu cần có chữ và số.";
    validPassword = false;
  }

  validateConfirmPassword();
  updateSubmitButton();
}

function validateConfirmPassword() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (confirmPassword === "") {
    confirmError.textContent = "Vui lòng nhập lại mật khẩu.";
    validConfirmPassword = false;
  } else if (confirmPassword !== password) {
    confirmError.textContent = "Mật khẩu nhập lại không khớp.";
    validConfirmPassword = false;
  } else {
    confirmError.textContent = "";
    validConfirmPassword = true;
  }

  updateSubmitButton();
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 10);

  if (digits.length <= 4) {
    return digits;
  }

  if (digits.length <= 7) {
    return digits.slice(0, 4) + "-" + digits.slice(4);
  }

  return digits.slice(0, 4) + "-" + digits.slice(4, 7) + "-" + digits.slice(7);
}

function validatePhone() {
  phoneInput.value = formatPhone(phoneInput.value);

  const digits = phoneInput.value.replace(/\D/g, "");

  if (digits.length === 10) {
    phoneError.textContent = "";
    validPhone = true;
  } else {
    phoneError.textContent = "Số điện thoại phải gồm 10 chữ số.";
    validPhone = false;
  }

  updateSubmitButton();
}

function updateSubmitButton() {
  if (
    validName &&
    validEmail &&
    validPassword &&
    validConfirmPassword &&
    validPhone
  ) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", validateConfirmPassword);
phoneInput.addEventListener("input", validatePhone);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (submitBtn.disabled) {
    return;
  }

  modalContent.textContent = "";

  const nameP = document.createElement("p");
  nameP.textContent = "Tên: " + nameInput.value.trim();

  const emailP = document.createElement("p");
  emailP.textContent = "Email: " + emailInput.value.trim();

  const phoneP = document.createElement("p");
  phoneP.textContent = "SĐT: " + phoneInput.value;

  modalContent.appendChild(nameP);
  modalContent.appendChild(emailP);
  modalContent.appendChild(phoneP);

  modal.classList.remove("hidden");
});

closeModal.addEventListener("click", function () {
  modal.classList.add("hidden");
});
