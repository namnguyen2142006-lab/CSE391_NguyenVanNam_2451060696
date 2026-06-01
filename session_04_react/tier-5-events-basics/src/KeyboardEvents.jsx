import { useState } from "react";

function KeyboardEvents() {
  const [lastKey, setLastKey] = useState("");
  const [log, setLog] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Xử lý phím trên toàn trang
  function handleKeyDown(event) {
    setLastKey(event.key);

    // Thêm vào log
    setLog((prev) => [...prev.slice(-4), event.key]); // Giữ 5 phím cuối
  }

  // Xử lý phím trong input
  function handleInputKeyDown(event) {
    if (event.key === "Enter") {
      if (inputValue.trim() !== "") {
        alert("Bạn nhập: " + inputValue);
        setInputValue("");
      }
    }

    if (event.key === "Escape") {
      setInputValue("");
    }
  }

  return (
    <div style={{ padding: "20px" }} onKeyDown={handleKeyDown} tabIndex={0}>
      <h2>Keyboard Events</h2>

      <p>
        Phím cuối cùng: <strong>{lastKey || "Chưa nhấn"}</strong>
      </p>

      <p>Log: {log.join(" → ")}</p>

      <hr />

      <h3>Nhập và nhấn Enter:</h3>

      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleInputKeyDown}
        placeholder="Nhập rồi nhấn Enter..."
        style={{ padding: "8px", width: "300px" }}
      />

      <p style={{ fontSize: "12px", color: "#666" }}>Nhấn Escape để xóa</p>
    </div>
  );
}

export default KeyboardEvents;
