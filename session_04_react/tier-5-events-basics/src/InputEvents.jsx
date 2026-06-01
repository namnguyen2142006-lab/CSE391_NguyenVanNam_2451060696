import { useState } from "react";

function InputEvents() {
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);

  function handleChange(event) {
    const newValue = event.target.value;
    setText(newValue);
    setCharCount(newValue.length);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Input Events</h2>

      <input
        value={text}
        onChange={handleChange}
        placeholder="Nhập gì đó..."
        maxLength={100}
        style={{ padding: "8px", width: "300px" }}
      />

      <p>Ký tự: {charCount}/100</p>
      <p>Bạn đang nhập: {text}</p>

      {charCount > 80 && <p style={{ color: "red" }}>⚠️ Sắp hết ký tự!</p>}
    </div>
  );
}

export default InputEvents;
