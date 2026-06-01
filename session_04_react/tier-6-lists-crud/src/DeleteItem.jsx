import { useState } from "react";

function DeleteItem() {
  const [items, setItems] = useState([
    { id: 1, name: "Minh" },
    { id: 2, name: "An" },
    { id: 3, name: "Linh" },
  ]);

  function handleDelete(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function handleDeleteAll() {
    if (window.confirm("Xóa tất cả?")) {
      setItems([]);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Xóa sinh viên</h2>

      {items.length > 0 && (
        <button
          onClick={handleDeleteAll}
          style={{
            marginBottom: "10px",
            background: "#e74c3c",
            color: "white",
            padding: "8px 16px",
            border: "none",
          }}
        >
          🗑 Xóa tất cả
        </button>
      )}

      {items.length === 0 ? (
        <p style={{ color: "#999" }}>Danh sách trống</p>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              margin: "5px 0",
              background: "#f9f9f9",
            }}
          >
            <span>{item.name}</span>

            <button
              onClick={() => handleDelete(item.id)}
              style={{
                background: "#e74c3c",
                color: "white",
                border: "none",
                padding: "4px 8px",
              }}
            >
              Xóa
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default DeleteItem;
