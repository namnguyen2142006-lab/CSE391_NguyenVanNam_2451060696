## A1 — 3 Cách nhúng CSS vào HTML

---

### 1. Inline CSS (Nội tuyến)

<h1 style="color: red; font-size: 24px;">
    Hello CSS
</h1>
 Ưu điểm:
- Viết nhanh trực tiếp trên element
- Phù hợp test nhanh hoặc debug
- Không cần tạo file CSS riêng

Nhược điểm:

- Code HTML bị rối
- Không tái sử dụng được
- Khó bảo trì khi dự án lớn

Khi nên dùng:

- Test nhanh 1 element
- Debug CSS
- Demo nhỏ

### 2. Internal CSS (Nội bộ)

<head>
    <style>
        h1 {
            color: blue;
            font-size: 28px;
        }
    </style>
</head>

Ưu điểm:

- Gọn trong 1 file HTML
- Dễ học và dễ demo
- Không cần file ngoài

Nhược điểm:

- Không tái sử dụng giữa nhiều trang
- File HTML sẽ lớn nếu CSS nhiều
- Khó quản lý dự án lớn

Khi nên dùng:

- Bài tập
- Prototype
- Demo đơn giản

### 3. External CSS (Bên ngoài)

HTML:

<link rel="stylesheet" href="style.css">

CSS:
h1 {
color: green;
font-size: 30px;
}

Ưu điểm:

- Chuẩn dự án thực tế
- Tái sử dụng cho nhiều trang
- Code sạch, dễ bảo trì
- Tách biệt HTML và CSS

Nhược điểm:

- Cần thêm file CSS
- Phải quản lý đường dẫn file

Khi nên dùng:

- Website thật
- Dự án lớn
- Team project

## Nếu cả 3 cùng tồn tại thì ai thắng?

-> INLINE CSS thắng
Giải thích:

CSS ưu tiên theo thứ tự:
Inline > Internal > External

Inline thắng vì:

- nằm trực tiếp trên element
- specificity cao nhất
- áp dụng gần nhất với HTML element

## A2 — CSS Selectors

### 1. h1

→ Chọn: ShopTLU

### 2. .price

→ Chọn:

- 25.990.000đ
- 45.990.000đ

### 3. #app header

→ Chọn: toàn bộ header (top-bar dark)

### 4. nav a:first-child

→ Chọn: Home

### 5. .product.featured h2

→ Chọn: MacBook Pro

### 6. article > p

→ Chọn:

- 25.990.000đ
- Mô tả sản phẩm...
- 45.990.000đ
- Mô tả sản phẩm...

### 7. a[href="/"]

→ Chọn: Home

### 8. .top-bar.dark h1

→ Chọn: ShopTLU

## Câu A3 — Box Model — Tính toán kích thước

### Trường hợp 1: content-box (mặc định)

- **Chiều rộng hiển thị (Visible Width):** 400 + 20(padding trái) + 20(padding phải) + 5(border trái) + 5(border phải) = 450px
- **Không gian chiếm trên trang (Total Space):** 450 + 10(margin trái) + 10(margin phải) = 470px

### Trường hợp 2: border-box

- **Chiều rộng hiển thị (Visible Width):** 400px (Do dùng `border-box` nên thuộc tính width đã bao trọn cả padding và border bên trong nó).
- **Kích thước content thực tế (Content Area Width):** 400 - 40(tổng padding) - 10(tổng border) = 350px
- **Không gian chiếm trên trang (Total Space):** 400 + 20(tổng margin) = 420px

### Trường hợp 3: Margin collapse

- **Khoảng cách giữa box-a và box-b:** 40px
- **Giải thích:** Trình duyệt áp dụng quy tắc gộp margin (Margin Collapse) cho các block-level element nằm kề nhau theo chiều dọc (trên - dưới). Thay vì cộng dồn (25 + 40 = 65px), trình duyệt sẽ so sánh và lấy giá trị lớn hơn (40px) làm khoảng cách thực tế giữa hai hộp.

### Nâng cao:

Nếu `.box-a` có `margin-bottom: -10px` và `.box-b` có `margin-top: 40px`.

- Khoảng cách = 30px
- Giải thích: Khi có một margin dương và một margin âm gặp nhau, khoảng cách sẽ được tính bằng phép cộng đại số của hai giá trị đó: `40 + (-10) = 30px`.

## Câu A4 — Specificity (Độ ưu tiên)

1. **Tính điểm specificity (a, b, c) cho mỗi rule:**
   - **Rule A (`p`):** (0, 0, 1) — _Có 1 thẻ HTML (Element)_
   - **Rule B (`.price`):** (0, 1, 0) — _Có 1 Class_
   - **Rule C (`#main-price`):** (1, 0, 0) — _Có 1 ID_
   - **Rule D (`p.price`):** (0, 1, 1) — _Có 1 Class và 1 thẻ HTML_

2. **Element sẽ có màu gì? Giải thích:**
   - Element sẽ có màu **đỏ (red)**.
   - **Giải thích:** Trình duyệt sẽ áp dụng Rule C vì bộ chọn ID (`#main-price`) có điểm Specificity cao nhất (1, 0, 0) trong số tất cả các rule. ID luôn "thắng" Class và Element tag.

3. **Nếu thêm inline style `style="color: orange;"`:**
   - Phần tử sẽ có màu **cam (orange)**.
   - **Giải thích:** Inline CSS (viết trực tiếp vào thẻ) có độ ưu tiên cao hơn tất cả các bộ chọn thông thường (ID, Class, Tag) trong các file CSS.

4. **Nếu Rule A thêm `!important`:**
   - Phần tử sẽ có màu **đen (black)**.
   - **Giải thích:** Từ khóa `!important` là ngoại lệ lớn nhất trong CSS. Nó phá vỡ hoàn toàn quy tắc tính điểm Specificity thông thường. Bất cứ thuộc tính nào có gắn `!important` sẽ ghi đè lên mọi thứ khác (kể cả ID hay Inline style). Vì Rule A (`p`) quy định màu đen và được gắn `!important`, nó sẽ trở thành ưu tiên tuyệt đối.
