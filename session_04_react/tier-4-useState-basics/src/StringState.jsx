import { useState } from "react";

function StringState() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h2>Nhập thông tin</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Tên: </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên..."
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Email: </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email..."
        />
      </div>

      <h3>Thông tin đã nhập:</h3>
      <p>Tên: {name || "(chưa nhập)"}</p>
      <p>Email: {email || "(chưa nhập)"}</p>

      {/* Preview realtime */}
      {name && (
        <p style={{ background: "#f0f0f0", padding: "10px" }}>
          Xin chào <strong>{name}</strong>! Email của bạn là {email}
        </p>
      )}
    </div>
  );
}

export default StringState;
