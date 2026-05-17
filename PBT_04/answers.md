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
| Item 1 | Item 2 | Item 3 | Item 4 |

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
| Item 1 | Item 2 |
| Item 3 | Item 4 |
| Item 5 | Item 6 |

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
| Item 1 Item 2 Item 3 |

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
| 200px | 1fr | 200px |
| Item1 | Item2 | Item3 |

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
| Item 1 | Item 2 | Item 3 |
| Item 4 | Item 5 | Item 6 |
| Item 7 | | |

# PHẦN C — SUY LUẬN

## Câu C1 — Flexbox vs Grid: Khi nào dùng gì?

### 1. Navigation bar ngang

- Nên dùng: **Flexbox**
- Lý do: Navbar chủ yếu là layout 1 chiều theo hàng ngang.
- Ta cần sắp xếp logo, menu và buttons trên cùng một trục ngang.
- Flexbox phù hợp vì có `justify-content` để chia khoảng cách và `align-items` để căn giữa theo chiều dọc.

### 2. Lưới ảnh Instagram 3 cột

- Nên dùng: **Grid**
- Lý do: Đây là layout 2 chiều gồm hàng và cột.
- Số ảnh không biết trước, nhưng cần giữ 3 cột đều nhau.
- Grid phù hợp vì có thể dùng `grid-template-columns: repeat(3, 1fr)`.

### 3. Layout blog: main content + sidebar

- Nên dùng: **Grid**
- Lý do: Layout blog cần chia vùng rõ ràng: nội dung chính và sidebar.
- Grid phù hợp để tạo cột chính và cột phụ.
- Ví dụ: `grid-template-columns: 1fr 300px`.

### 4. Footer với 4 cột thông tin

- Nên dùng: **Grid**
- Lý do: Footer có 4 nhóm nội dung cần chia thành 4 cột đều nhau.
- Grid giúp tạo cột rõ ràng và dễ responsive.
- Ví dụ: `grid-template-columns: repeat(4, 1fr)`.

### 5. Card sản phẩm

- Nên dùng: **Flexbox**
- Lý do: Nội dung trong card xếp theo 1 chiều dọc: ảnh, text, giá, nút.
- Flexbox phù hợp vì có thể dùng `flex-direction: column`.
- Để nút luôn nằm dưới đáy card, dùng `margin-top: auto`.

## Câu C2 — Debug Flexbox

### Lỗi 1 — Cards không đều chiều cao, nút "Mua" bị nhảy lên/xuống

#### Nguyên nhân

- `.card` chưa dùng Flexbox theo chiều dọc.
- Nội dung mỗi card dài ngắn khác nhau.
- Button nằm ngay sau text nên vị trí button không đồng đều.

---

#### Code sửa

```css
.card-container {
  display: flex;
  flex-wrap: wrap;
}

.card {
  display: flex;
  flex-direction: column;

  padding: 16px;
}

.card img {
  width: 100%;
}

.card .btn {
  margin-top: auto;

  padding: 10px;
}
```

### Lỗi 2 — Hero không nằm giữa màn hình

#### Nguyên nhân

- .hero có display: flex nhưng thiếu:justify-content,align-items. Mặc định Flexbox đặt item ở góc trái trên.

#### code sửa

```css
.hero {
  height: 100vh;

  display: flex;

  justify-content: center;

  align-items: center;
}

.hero-content {
  text-align: center;
}
```

### Lỗi 3 — Sidebar bị co lại khi content quá dài

#### Nguyên nhân

- Trong Flexbox, items mặc định có thể bị shrink.
- Sidebar có width: 250px nhưng vẫn bị co khi content quá lớn.

```css
.layout {
  display: flex;
}

.sidebar {
  width: 250px;

  flex-shrink: 0;
}

.content {
  flex: 1;
}
```
