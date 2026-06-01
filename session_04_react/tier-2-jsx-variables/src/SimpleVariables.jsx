function SimpleVariables() {
  const ten = "Nguyễn Văn Nam";
  const tuoi = 20;
  const queQuan = "Hà Nội";

  const canNang = 60;
  const chieuCao = 1.7;
  const bmi = canNang / (chieuCao * chieuCao);

  const gio = new Date().getHours();

  const loiChao =
    gio < 12
      ? "Chào buổi sáng"
      : gio < 18
        ? "Chào buổi chiều"
        : "Chào buổi tối";

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #3498db",
        marginTop: "20px",
      }}
    >
      <h2>Bài 2.1 — Hiển thị biến đơn giản</h2>

      <h1>
        {loiChao}, {ten}!
      </h1>

      <p>Tuổi: {tuoi}</p>
      <p>Quê quán: {queQuan}</p>

      <h3>Tính BMI</h3>
      <p>Cân nặng: {canNang} kg</p>
      <p>Chiều cao: {chieuCao} m</p>
      <p>BMI: {bmi.toFixed(2)}</p>
    </div>
  );
}

export default SimpleVariables;
