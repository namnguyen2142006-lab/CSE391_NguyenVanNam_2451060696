function AndDemo() {
  const hasNotification = true;
  const notificationCount = 5;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Thông báo</h2>

      {/* Hiện khi có thông báo */}
      {hasNotification && (
        <div style={{ background: "#fff3cd", padding: "10px" }}>
          Bạn có {notificationCount} thông báo mới!
        </div>
      )}

      {/* Không hiện gì khi không có */}
      {!hasNotification && <p>Không có thông báo</p>}
    </div>
  );
}

export default AndDemo;
