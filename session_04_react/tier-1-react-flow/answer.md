# Bài 1.1 — Component render lần đầu

## Câu 1. Tại sao component chỉ render 1 lần?

Component chỉ render 1 lần khi trang được mở lần đầu vì React chỉ cần gọi function component một lần để lấy JSX và hiển thị lên màn hình.

Luồng hoạt động là:

```text
React gọi function App()
→ App return JSX
→ React hiển thị JSX lên màn hình
```

## Câu 2. Khi nào nó sẽ render lại?

Component sẽ render lại khi có sự thay đổi khiến React cần cập nhật giao diện.
