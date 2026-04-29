## Câu A1 — HTTP & Browser

Khi người dùng nhập:
https://shopee.vn vào trình duyệt và nhấn Enter, trình duyệt và server sẽ thực hiện tuần tự các bước sau:

### Bước 1 — Browser tạo Request

Người dùng gõ URL vào Chrome và nhấn Enter.
Lúc này trình duyệt hiểu rằng người dùng đang muốn truy cập vào website shopee.vn nên bắt đầu gửi yêu cầu.

### Bước 2 — Request đi qua Internet

Request từ máy tính người dùng sẽ đi qua:

- Router WiFi
- Nhà mạng Internet (ví dụ VNPT / Viettel / FPT)
- Hệ thống cáp quang quốc tế
- Đến data center của website

### Bước 3 — Server nhận Request và xử lý

Server nhận yêu cầu từ browser.

### Bước 4 — Server trả HTTP Response

Server phản hồi về browser.
Response có thể bao gồm:

- file HTML
- file CSS
- file JavaScript
- hình ảnh
- dữ liệu khác
  HTTP Response thường có status code.

### Bước 5 — Browser Parse HTML

Browser đọc file HTML.
HTML đóng vai trò là bộ khung của website
Trình duyệt phân tích cấu trúc trang:

- heading
- paragraph
- image
- links
- sections
  và tạo ra DOM Tree.

### Bước 6 — Browser Parse CSS

Sau khi đọc HTML, browser tiếp tục đọc CSS.
CSS quyết định:

- màu sắc
- font chữ
- layout
- khoảng cách
- responsive
  Nếu thiếu CSS, trang chỉ là text đen nền trắng.

### Bước 7 — Execute JavaScript

Browser chạy JavaScript.
JavaScript xử lý:

- click button
- animation
- validate form
- cập nhật giỏ hàng
- gọi API
  JS tạo nên tính tương tác cho website.

### Bước 8 — Paint & Render

Browser ghép:
HTML + CSS + JavaScript
sau đó render giao diện hoàn chỉnh lên màn hình cho người dùng nhìn thấy.
Đây là bước cuối cùng của browser rendering.

Nguồn tham chiếu:

- Chương 01 — Introduction to the HTML Universe
- Mục 1.1 Kiến trúc Client–Server
- Mục 1.2 HTTP
- Mục 1.3 Browser Rendering

### Phân tích tab Network

Tab Network hiển thị:

- các request browser gửi tới server
- status code
- loại file tải về
- dung lượng file
- thời gian tải
- waterfall loading

Trong ảnh chụp em đã đánh dấu:

1. Status Code của request đầu tiên
2. Tổng thời gian load trang
3. Một request CSS (stylesheet)

Screenshot:
screenshots/A1-network.png

Nguồn tham chiếu:

- Chương 01 — mục 4.3 Developer Tools
- Tab Network

## Câu A2 — Semantic HTML

Trang web bị Google đánh giá SEO thấp vì sử dụng sai semantic HTML, chủ yếu dùng quá nhiều thẻ <div> khiến cấu trúc trang không rõ ràng.

### Lỗi 1 — Không dùng <header>

Code sử dụng:

<div class="header">

Thay vì:

<header>

→ Google không nhận diện được đây là phần đầu trang (logo + menu).

---

### Lỗi 2 — Menu không dùng <nav>

Code dùng:

<div class="menu">

Trong khi menu điều hướng nên dùng:

<nav>

→ Làm mất ý nghĩa điều hướng của các link.

---

### Lỗi 3 — Nội dung chính không dùng <main>

Code dùng:

<div class="main">

Trong khi phần nội dung chính nên dùng:

<main>

→ Google không xác định được nội dung chính của trang.

---

### Lỗi 4 — Sản phẩm không dùng <article>

Code dùng:

<div class="product">

Trong khi mỗi sản phẩm là một nội dung độc lập nên dùng:

<article>

→ Semantic không rõ ràng, ảnh hưởng SEO.

---

### Lỗi 5 — Không dùng <figure> cho hình ảnh

Code dùng:

<div class="image"><img src="iphone.jpg"></div>

Nên dùng:

<figure> + <figcaption>

→ Giúp mô tả ảnh rõ ràng hơn cho SEO và accessibility.

---

### Lỗi 6 — Footer không dùng <footer>

Code dùng:

<div class="footer">

Thay vì:

<footer>

→ Không thể hiện rõ phần cuối trang.

---

## Code đã sửa theo Semantic HTML

```html
<header>
  <h1>ShopTLU</h1>

  <nav>
    <a href="/">Trang chủ</a>
    <a href="/products">Sản phẩm</a>
  </nav>
</header>

<main>
  <section>
    <article>
      <h2>iPhone 16 Pro</h2>
      <p>25.990.000đ</p>

      <figure>
        <img src="iphone.jpg" alt="iPhone 16 Pro" />
        <figcaption>iPhone 16 Pro</figcaption>
      </figure>
    </article>
  </section>
</main>

<footer>
  <p>© 2026 ShopTLU</p>
</footer>
```

---

Nguồn tham chiếu:

- Chương 04 — Semantic HTML5
- Phần "Tại sao không dùng <div> cho mọi thứ?"
- Bảng các thẻ semantic: header, nav, main, article, section, footer, figure

## Câu A3 — Block vs Inline

Kết quả hiển thị:

```text
+----------------------+
| Hộp 1               |
+----------------------+

Text A Text B

+----------------------+
| Hộp 2               |
+----------------------+

Text C **Text D**

+----------------------+
| Hộp 3               |
+----------------------+
```

Giải thích:

- `<div>` là block element nên chiếm toàn bộ chiều ngang và luôn xuống dòng mới.
- `<span>` là inline element nên chỉ chiếm đúng phần nội dung và nằm cạnh nhau trên cùng dòng.
- `<strong>` cũng là inline element nên nằm cùng dòng với `<span>`, nhưng nội dung được in đậm để nhấn mạnh ý nghĩa.

Nguồn tham chiếu:

- Chương 04 — Block vs Inline
- Bảng so sánh Block element và Inline element

## Câu A4 — Table

### 1. Sự khác nhau giữa `<thead>`, `<tbody>`, `<tfoot>`

Trong HTML, bảng dữ liệu thường có cấu trúc:

```html
<table>
  <thead>
    ...
  </thead>

  <tbody>
    ...
  </tbody>

  <tfoot>
    ...
  </tfoot>
</table>
```

---

#### `<thead>` — Phần tiêu đề bảng

`<thead>` là phần đầu của bảng, dùng để chứa tiêu đề các cột.

Bên trong thường gồm:

- `<tr>` → một hàng
- `<th>` → ô tiêu đề

Vai trò:

- xác định tiêu đề cột
- giúp browser hiểu cấu trúc bảng
- hỗ trợ accessibility tốt hơn

#### `<tbody>` — Phần thân bảng

`<tbody>` là phần chứa dữ liệu chính của bảng.

Bên trong thường gồm:

- `<tr>` → hàng dữ liệu
- `<td>` → ô dữ liệu

Vai trò:

- chứa nội dung chính
- là phần lớn nhất trong bảng

#### `<tfoot>` — Phần cuối bảng

`<tfoot>` là phần chân bảng, thường dùng cho:

- tổng kết
- subtotal
- ghi chú cuối bảng
- tổng số lượng

Vai trò:

- hiển thị thông tin tổng hợp cuối bảng
- giúp bảng rõ ràng, có cấu trúc

---

### 2. Tại sao không nên dùng table để tạo layout trang web

#### Lý do 1 — Sai mục đích semantic

Theo HTML5, `<table>` chỉ nên dùng cho dữ liệu dạng bảng:

- danh sách
- thống kê
- so sánh dữ liệu

Không dùng để chia bố cục trang.

#### Lý do 2 — Code phức tạp, khó bảo trì

Layout bằng table thường phải lồng nhiều:

- `<table>`
- `<tr>`
- `<td>`

Code dài, rối và khó sửa.

Trong khi semantic HTML chỉ cần:

- `<header>`
- `<main>`
- `<section>`
- `<aside>`
- `<footer>`

ngắn gọn và rõ ràng hơn.

#### Lý do 3 — Responsive kém

Table có cấu trúc cứng theo hàng và cột.

Khi hiển thị trên mobile:

- khó co giãn
- dễ vỡ layout
- khó responsive

CSS Flexbox và CSS Grid phù hợp hơn nhiều.

#### Lý do 4 — Accessibility kém

Screen reader hiểu `<table>` là dữ liệu bảng.

Nếu dùng table để layout:

- người dùng khiếm thị bị nhầm
- trải nghiệm truy cập kém

Kết luận:

`<table>` chỉ nên dùng cho dữ liệu dạng bảng, không nên dùng để bố trí giao diện website.

Nguồn tham chiếu:

- Chương 05 — Tables & Hyperlinks
- Phần "Cấu trúc cơ bản"
- Ghi chú: "KHÔNG dùng table cho layout trang web"
