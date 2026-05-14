# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 — 5 Loại Định Vị

### 1. `position: static`

- Là giá trị mặc định của mọi element
- Vẫn chiếm chỗ trong layout (normal flow)
- Tham chiếu vị trí theo flow bình thường của trang
- Cuộn theo trang khi scroll
- `top`, `left`, `right`, `bottom` không hoạt động
- Thường dùng cho layout bình thường, không cần định vị đặc biệt

### 2. `position: relative`

- Vẫn chiếm chỗ trong layout
- Tham chiếu theo vị trí gốc của chính nó
- Cuộn theo trang khi scroll
- Có thể dùng `top`, `left`, `right`, `bottom`
- Thường dùng để:
  - Dịch nhẹ element
  - Làm mốc tọa độ cho element `absolute`

### 3. `position: absolute`

- Không còn chiếm chỗ trong layout
- Bay ra khỏi normal flow
- Tham chiếu theo ancestor gần nhất có `position` khác `static`
- Cuộn theo trang khi scroll
- Dùng cho:
  - Badge
  - Tooltip
  - Popup
  - Dropdown
  - Overlay

### 4. `position: fixed`

- Không chiếm chỗ trong layout
- Tham chiếu theo viewport (màn hình)
- Không cuộn theo trang
- Luôn dính trên màn hình
- Dùng cho:
  - Fixed header
  - Chat button
  - Scroll-to-top button
  - Cookie banner

### 5. `position: sticky`

- Ban đầu vẫn chiếm chỗ trong layout
- Hoạt động như `relative` trước khi scroll tới ngưỡng
- Sau khi scroll tới ngưỡng `top`, element sẽ dính như `fixed`
- Dùng cho:
  - Sticky header
  - Sticky sidebar
  - Sticky table header

## Câu hỏi thêm

### Khi nào `absolute` tham chiếu `body`?

`absolute` sẽ tham chiếu `body` hoặc `html` khi không có ancestor nào có:

- `position: relative`
- `position: absolute`
- `position: fixed`
- `position: sticky`

---

### Khi nào `absolute` tham chiếu parent?

Khi parent hoặc ancestor gần nhất có `position` khác `static`.

Ví dụ:

```css
.card {
  position: relative;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
}
```

## Câu A2 — Flexbox vs Grid

### Trường hợp 1

```css
.container {
  display: flex;
}
.item {
  flex: 1;
}
```

- Có 4 items
- `display: flex` mặc định xếp item theo hàng ngang
- `flex: 1` làm các item chia đều chiều rộng
- Kết quả: 1 hàng, 4 cột bằng nhau

Sơ đồ:

```txt
| Item 1 | Item 2 | Item 3 | Item 4 |
```

---

### Trường hợp 2

```css
.container {
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 45%;
  margin: 2.5%;
}
```

- Có 6 items
- Mỗi item rộng `45%`
- Margin trái/phải tổng khoảng `5%`
- Mỗi item chiếm khoảng `50%`
- Một hàng chứa được 2 items
- 6 items tạo thành 3 hàng, 2 cột

Sơ đồ:

```txt
| Item 1 | Item 2 |
| Item 3 | Item 4 |
| Item 5 | Item 6 |
```

---

### Trường hợp 3

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

- Có 3 items
- `justify-content: space-between` đẩy item đầu sang trái, item cuối sang phải
- Item giữa nằm ở khoảng giữa
- `align-items: center` căn giữa theo chiều dọc

Sơ đồ:

```txt
| Item 1              Item 2              Item 3 |
```

---

### Trường hợp 4

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  gap: 20px;
}
```

- Có 3 items
- Grid tạo 3 cột
- Cột trái rộng `200px`
- Cột giữa dùng `1fr`, chiếm phần còn lại
- Cột phải rộng `200px`
- `gap: 20px` tạo khoảng cách giữa các cột
- 3 items nằm trên cùng 1 hàng

Sơ đồ:

```txt
| 200px |        1fr        | 200px |
| Item1 |       Item2       | Item3 |
```

---

### Trường hợp 5

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
```

- Có 7 items
- `repeat(3, 1fr)` tạo 3 cột bằng nhau
- Grid tự tạo hàng mới nếu không đủ chỗ
- 7 items tạo thành 3 hàng
- Item 7 nằm ở cột đầu tiên của hàng cuối

Sơ đồ:

```txt
| Item 1 | Item 2 | Item 3 |
| Item 4 | Item 5 | Item 6 |
| Item 7 |        |        |
```
