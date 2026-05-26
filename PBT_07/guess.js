// Bài B3 — Mini Game Đoán Số

const secretNumber = Math.floor(Math.random() * 100) + 1;

let attempts = 0;
const maxAttempts = 7;

let guessedNumbers = [];
let isWin = false;

while (attempts < maxAttempts && isWin === false) {
  let input = prompt("Nhập số bạn đoán từ 1 đến 100:");

  let guess = Number(input);

  // Validate input
  if (
    input === null ||
    input === "" ||
    isNaN(guess) ||
    guess < 1 ||
    guess > 100
  ) {
    alert("Lỗi: Vui lòng nhập một số từ 1 đến 100!");
    continue;
  }

  // Kiểm tra số đã đoán chưa
  let isDuplicate = false;

  for (let i = 0; i < guessedNumbers.length; i++) {
    if (guessedNumbers[i] === guess) {
      isDuplicate = true;
    }
  }

  if (isDuplicate === true) {
    alert("Bạn đã đoán số này rồi!");
    continue;
  }

  // Lưu số đã đoán
  guessedNumbers.push(guess);

  // Tăng số lần đoán hợp lệ
  attempts++;

  if (guess === secretNumber) {
    alert("Đúng rồi! Bạn đoán đúng sau " + attempts + " lần!");
    isWin = true;
  } else if (guess < secretNumber) {
    alert("Cao hơn");
  } else {
    alert("Thấp hơn");
  }
}

// Nếu hết lượt mà chưa thắng
if (isWin === false) {
  alert("Bạn đã thua! Đáp án đúng là: " + secretNumber);
}
