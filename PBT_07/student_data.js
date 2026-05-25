const students = [
  { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
  { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
  { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
  { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
  { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
  { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
  { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
  { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];
function calculateAverage(student) {
  return student.math * 0.4 + student.physics * 0.3 + student.cs * 0.3;
}
function classify(avg) {
  if (avg >= 8.0) {
    return "Giỏi";
  } else if (avg >= 6.5) {
    return "Khá";
  } else if (avg >= 5.0) {
    return "Trung bình";
  } else {
    return "Yếu";
  }
}
let countGioi = 0;
let countKha = 0;
let countTrungBinh = 0;
let countYeu = 0;

let highestStudent = null;
let lowestStudent = null;

let totalMath = 0;
let totalPhysics = 0;
let totalCs = 0;

let totalMaleAvg = 0;
let totalFemaleAvg = 0;
let countMale = 0;
let countFemale = 0;
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");

for (let i = 0; i < students.length; i++) {
  const student = students[i];

  const avg = calculateAverage(student);
  const rank = classify(avg);
  student.avg = avg;
  student.rank = rank;

  // In từng dòng bảng
  console.log(
    "| " +
      (i + 1) +
      "   | " +
      student.name +
      " | " +
      avg.toFixed(1) +
      "  | " +
      rank +
      " |",
  );
  if (rank === "Giỏi") {
    countGioi++;
  } else if (rank === "Khá") {
    countKha++;
  } else if (rank === "Trung bình") {
    countTrungBinh++;
  } else {
    countYeu++;
  }
  if (highestStudent === null || avg > highestStudent.avg) {
    highestStudent = student;
  }

  if (lowestStudent === null || avg < lowestStudent.avg) {
    lowestStudent = student;
  }
  totalMath += student.math;
  totalPhysics += student.physics;
  totalCs += student.cs;
  if (student.gender === "M") {
    totalMaleAvg += avg;
    countMale++;
  } else if (student.gender === "F") {
    totalFemaleAvg += avg;
    countFemale++;
  }
}
console.log("\n--- Thống kê xếp loại ---");
console.log("Giỏi:", countGioi);
console.log("Khá:", countKha);
console.log("Trung bình:", countTrungBinh);
console.log("Yếu:", countYeu);
console.log("\n--- Sinh viên điểm cao nhất và thấp nhất ---");
console.log(
  "Cao nhất:",
  highestStudent.name,
  "- TB:",
  highestStudent.avg.toFixed(1),
);
console.log(
  "Thấp nhất:",
  lowestStudent.name,
  "- TB:",
  lowestStudent.avg.toFixed(1),
);
console.log("\n--- Điểm trung bình toàn lớp theo từng môn ---");
console.log("Toán:", (totalMath / students.length).toFixed(1));
console.log("Vật lý:", (totalPhysics / students.length).toFixed(1));
console.log("CS:", (totalCs / students.length).toFixed(1));
console.log("\n--- Bonus: Điểm TB theo giới tính ---");

if (countMale > 0) {
  console.log("Nam:", (totalMaleAvg / countMale).toFixed(1));
}

if (countFemale > 0) {
  console.log("Nữ:", (totalFemaleAvg / countFemale).toFixed(1));
}
