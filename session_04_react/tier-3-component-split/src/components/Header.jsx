function Header() {
  return (
    <header
      style={{
        background: "#3498db",
        color: "white",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1>Cửa hàng điện thoại</h1>

      <nav>
        <a href="/" style={{ color: "white", margin: "0 10px" }}>
          Trang chủ
        </a>
        <a href="/about" style={{ color: "white", margin: "0 10px" }}>
          Giới thiệu
        </a>
        <a href="/contact" style={{ color: "white", margin: "0 10px" }}>
          Liên hệ
        </a>
      </nav>
    </header>
  );
}

export default Header;
