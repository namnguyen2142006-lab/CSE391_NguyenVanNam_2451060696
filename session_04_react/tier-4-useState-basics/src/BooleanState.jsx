import { useState } from "react";

function BooleanState() {
  const [isVisible, setIsVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const themeStyle = {
    backgroundColor: isDarkMode ? "#333" : "#fff",
    color: isDarkMode ? "#fff" : "#333",
    padding: "20px",
    minHeight: "200px",
  };

  return (
    <div style={themeStyle}>
      <h2>Toggle Demo</h2>

      {/* Toggle ẩn/hiện */}
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Ẩn nội dung" : "Hiện nội dung"}
      </button>

      {isVisible && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            border: "1px solid #ddd",
          }}
        >
          <p>Đây là nội dung có thể ẩn/hiện!</p>
        </div>
      )}

      <hr />

      {/* Toggle dark mode */}
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <hr />

      {/* Toggle like */}
      <button onClick={() => setIsLiked(!isLiked)}>
        {isLiked ? "❤️ Đã thích" : "🤍 Thích"}
      </button>
    </div>
  );
}

export default BooleanState;
