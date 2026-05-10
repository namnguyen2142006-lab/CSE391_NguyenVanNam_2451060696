# PHẦN A

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

   # PHẦN B

## Bài B1 — 5 loại Selector đã sử dụng trong `style.css`

1. **Element Selector (Bộ chọn phần tử):** `body`, `header`, `table`, `footer`
2. **Class Selector (Bộ chọn lớp):** `.active`
3. **ID Selector (Bộ chọn ID):** `#about`, `#skills`, `#contact`
4. **Descendant Selector (Bộ chọn hậu duệ):** `nav a`, `thead tr`, `figure img`
5. **Pseudo-class (Giả lớp):** `nav a:hover`, `tbody tr:nth-child(even)`

## Bài B2 — Box Model Lab

### Phần 1 — Chứng minh content-box vs border-box

- **Hộp 1 (content-box):** chiều rộng thực tế = **350px** (đo từ tab Computed của DevTools).
- **Hộp 2 (border-box):** chiều rộng thực tế = **300px** (đo từ DevTools).
- **Giải thích sự khác biệt:**
  - Ở Hộp 1 (content-box), thuộc tính `width: 300px` chỉ là kích thước của vùng lõi chứa chữ. Trình duyệt tự cộng thêm padding (20px _ 2) và border (5px _ 2) ra bên ngoài, làm hộp phình to thành 350px.
  - Ở Hộp 2 (border-box), thuộc tính `width: 300px` được khóa cứng là kích thước tổng. Trình duyệt tự động ép padding và border lùi vào bên trong, vùng lõi chứa chữ bị ép hẹp lại (còn 250px) để đảm bảo tổng chiều rộng không bao giờ vượt qua 300px.

### Phần 2 — Bố cục 3 cột

- **Tính toán khi KHÔNG dùng border-box:**
  - Chiều rộng thực tế Cột trái (sidebar) = 250 + (15\*2) = 280px
  - Chiều rộng thực tế Cột giữa (content) = 500 + (20\*2) = 540px
  - Chiều rộng thực tế Cột phải (ads) = 250 + (15\*2) = 280px
  - **Tổng chiều rộng thực tế = 280 + 540 + 280 = 1100px.**
  - **Kết luận:** Vì tổng (1100px) lớn hơn kích thước container (1000px), nên cột thứ 3 không đủ chỗ để đứng cạnh và bị đẩy văng xuống dòng mới (vỡ layout). Khi thêm `box-sizing: border-box`, kích thước chuẩn được giữ nguyên là `250 + 500 + 250 = 1000px`, nên 3 cột xếp vừa vặn.

## Bài B3 — Specificity Battle

**1. Danh sách 10 rules và Specificity Score (ID, Class, Tag):**

1. `*` → (0, 0, 0) — Màu đen (black)
2. `p` → (0, 0, 1) — Màu xám (gray)
3. `.text` → (0, 1, 0) — Màu hồng (pink)
4. `p.text` → (0, 1, 1) — Màu cam (orange)
5. `.text.highlight` → (0, 2, 0) — Màu vàng (yellow)
6. `p.text.highlight` → (0, 2, 1) — Màu xanh lá (green)
7. `#demo` → (1, 0, 0) — Màu cyan
8. `p#demo` → (1, 0, 1) — Màu xanh dương (blue)
9. `#demo.highlight` → (1, 1, 0) — Màu tím (purple)
10. `p#demo.text.highlight` → (1, 2, 1) — Màu đỏ (red)

**2. Element cuối cùng hiển thị màu gì? Tại sao?**

- Chữ "Hello World" sẽ hiển thị màu **đỏ (red)**.
- **Tại sao?** Vì quy tắc thứ 10 (`p#demo.text.highlight`) có điểm Specificity cao nhất (1, 2, 1). Trình duyệt sẽ luôn ưu tiên áp dụng CSS của quy tắc có điểm số cao nhất.

**3. Thay đổi thứ tự rules trong CSS file. Kết quả có đổi không? Giải thích.**

- Nếu đảo lộn thứ tự các dòng trong file `specificity.css` (ví dụ đem rule 10 lên trên cùng), kết quả **KHÔNG thay đổi**, chữ vẫn màu đỏ.
- **Giải thích:** Thứ tự từ trên xuống dưới (Cascade) chỉ có ý nghĩa phân định thắng thua khi hai quy tắc có **cùng mức điểm Specificity**. Ở đây, quy tắc 10 có điểm tuyệt đối cao nhất, nên dù nằm ở đâu trong file, nó vẫn sẽ ghi đè các quy tắc khác.

# PHẦN C — DEBUG & SUY LUẬN

## Câu C1 — Gỡ lỗi CSS Layout

**1. Tính chiều rộng thực tế (dựa trên mặc định `content-box`):**

- **Sidebar:** 300px (width) + 40px (padding 2 bên) + 2px (border 2 bên) = **342px**
- **Content:** 660px (width) + 60px (padding 2 bên) + 2px (border 2 bên) = **722px**

**2. Giải thích tại sao bố cục bị hỏng:**

- Tổng chiều rộng thực tế của hai cột khi đặt cạnh nhau là: `342px + 722px = 1064px`.
- Kích thước này đã **vượt quá** sức chứa của thẻ cha `.container` (chỉ rộng 960px). Do thẻ cha không đủ chỗ chứa cột thứ hai, trình duyệt buộc phải đẩy cột `.content` rớt xuống dòng mới, làm vỡ bố cục (layout).

**3. Đưa ra 2 cách sửa lỗi:**

- **Cách 1 (Dùng `border-box`):** Thêm thuộc tính `box-sizing: border-box;` cho cả sidebar và content. Lúc này trình duyệt sẽ ép padding và border vào bên trong, giữ nguyên tổng chiều rộng đúng bằng 300px và 660px (Tổng đúng bằng 960px).
- **Cách 2 (Không dùng `border-box` - Trừ thủ công):** Giữ nguyên `content-box`, nhưng ta phải trừ bớt giá trị `width` để nhường chỗ cho padding và border.
  - Sidebar mới: `width: 258px;` (258 + 40 + 2 = 300)
  - Content mới: `width: 598px;` (598 + 60 + 2 = 660)

## Câu C2 — Cascade Puzzle

**1. "Sản phẩm A" (h2) có `font-size` = 20px và `color` = green**

- **font-size: 20px** — Thẻ h2 này chịu tác động của bộ chọn `.card .title` quy định `font-size: 20px`. Nó ghi đè thuộc tính kế thừa từ `.container` (14px) vì nó nhắm mục tiêu trực tiếp và có điểm đặc hiệu cao hơn.
- **color: green** — Có 2 quy tắc tranh chấp màu là `#featured .title` (màu đỏ) và `.highlight` (màu xanh lá). Dù bộ chọn ID có điểm đặc hiệu cao hơn, nhưng class `.highlight` lại chứa từ khóa `!important`. Theo luật Cascade, `!important` phá vỡ mọi thứ tự ưu tiên và giành chiến thắng tuyệt đối.

**2. "Mô tả sản phẩm" (p trong thẻ card featured) có `color` = blue**

- **Giải thích:** Thẻ `<p>` này bị nhắm trúng bởi quy tắc `.card p { color: inherit; }`. Từ khóa `inherit` ép phần tử này bắt buộc phải "kế thừa" màu sắc từ thẻ cha chứa nó (là thẻ `div` mang class `.card`). Thẻ cha `.card` đang được thiết lập `color: blue;`, do đó thẻ `<p>` này cũng mang màu xanh dương (blue).

**3. "Sản phẩm B" (h2) có `font-size` = 20px và `color` = blue**

- **font-size: 20px** — Tương tự Sản phẩm A, nó chịu tác động của bộ chọn trực tiếp `.card .title`.
- **color: blue** — Thẻ h2 này không có bất kỳ quy tắc CSS nào trực tiếp gán màu cho nó (quy tắc `#featured .title` không có tác dụng vì Sản phẩm B không nằm trong thẻ mang ID featured). Do không có màu tự định nghĩa, nó sẽ mặc định "kế thừa" màu từ thẻ cha gần nhất là `.card`. Vì `.card` có màu xanh dương (blue), nó cũng có màu xanh dương.

**4. "Mô tả sản phẩm B" (p.highlight) có `color` = green**

- **Giải thích:** Thẻ `<p>` này vừa bị tác động bởi `.card p` (ép kế thừa màu blue), lại vừa mang class `.highlight` (màu green). Một lần nữa, từ khóa `!important` trong `.highlight` kích hoạt sức mạnh tối thượng của mình, đánh bại quy tắc kế thừa và áp đặt màu xanh lá (green) cho văn bản.
