import { useState } from "react";

function ListBasics() {
  const [fruits] = useState(["Táo", "Chuối", "Cam", "Nho"]);

  const [students] = useState([
    { id: 1, name: "Minh", age: 20 },
    { id: 2, name: "An", age: 21 },
    { id: 3, name: "Linh", age: 19 },
  ]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Danh sách trái cây</h2>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>

      <h2>Danh sách sinh viên</h2>
      {students.map((student) => (
        <div
          key={student.id}
          style={{
            padding: "8px",
            margin: "5px 0",
            background: "#f9f9f9",
          }}
        >
          {student.name} - {student.age} tuổi
        </div>
      ))}
    </div>
  );
}

export default ListBasics;
