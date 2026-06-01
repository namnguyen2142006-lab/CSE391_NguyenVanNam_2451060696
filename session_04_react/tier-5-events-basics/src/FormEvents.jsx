import { useState } from "react";

function FormEvents() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault(); // Ngăn reload trang

    if (formData.name === "" || formData.email === "") {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setSubmitted(true);
  }

  function handleReset() {
    setFormData({ name: "", email: "", message: "" });
    setSubmitted(false);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Form Events</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label>Tên: </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Email: </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Tin nhắn: </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              style={{ width: "100%" }}
            />
          </div>

          <button type="submit">Gửi</button>
          <button type="button" onClick={handleReset}>
            Xóa
          </button>
        </form>
      ) : (
        <div
          style={{
            background: "#d4edda",
            padding: "15px",
            borderRadius: "4px",
          }}
        >
          <h3>✅ Đã gửi thành công!</h3>
          <p>Tên: {formData.name}</p>
          <p>Email: {formData.email}</p>
          <p>Tin nhắn: {formData.message}</p>
          <button onClick={handleReset}>Gửi lại</button>
        </div>
      )}
    </div>
  );
}

export default FormEvents;
