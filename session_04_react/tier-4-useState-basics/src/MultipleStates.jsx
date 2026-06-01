import { useState } from "react";

function MultipleStates() {
  // Nhiều state trong 1 component
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isStudent, setIsStudent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (name.trim() === "" || age === "") {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setSubmitted(true);
  }

  function handleReset() {
    setName("");
    setAge("");
    setIsStudent(false);
    setSubmitted(false);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Form đăng ký</h2>

      {!submitted ? (
        <div>
          <div style={{ marginBottom: "10px" }}>
            <label>Tên: </label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Tuổi: </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>
              <input
                type="checkbox"
                checked={isStudent}
                onChange={(e) => setIsStudent(e.target.checked)}
              />
              Là sinh viên
            </label>
          </div>

          <button onClick={handleSubmit}>Đăng ký</button>
        </div>
      ) : (
        <div
          style={{
            background: "#d4edda",
            padding: "15px",
            borderRadius: "4px",
          }}
        >
          <h3>✅ Đăng ký thành công!</h3>
          <p>Tên: {name}</p>
          <p>Tuổi: {age}</p>
          <p>Sinh viên: {isStudent ? "Có" : "Không"}</p>
          <button onClick={handleReset}>Đăng ký lại</button>
        </div>
      )}
    </div>
  );
}

export default MultipleStates;
