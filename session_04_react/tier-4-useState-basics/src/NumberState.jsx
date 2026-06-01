import { useState } from "react";

function NumberState() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Bộ đếm: {count}</h2>

      <button onClick={() => setCount(count + 1)}>Tăng (+1)</button>

      <button onClick={() => setCount(count - 1)}>Giảm (-1)</button>

      <button onClick={() => setCount(0)}>Reset</button>

      <button onClick={() => setCount(count * 2)}>Nhân đôi</button>
    </div>
  );
}

export default NumberState;
