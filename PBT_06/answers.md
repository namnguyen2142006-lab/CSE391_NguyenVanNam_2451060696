## Câu A1 — Grid System

HTML:

```html
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-3">Box 1</div>
    <div class="col-12 col-md-6 col-lg-3">Box 2</div>
    <div class="col-12 col-md-6 col-lg-3">Box 3</div>
    <div class="col-12 col-md-6 col-lg-3">Box 4</div>
  </div>
</div>
```

### 1. Layout ở từng kích thước

---

### Mobile `< 768px`

- Bootstrap dùng class `col-12`
- Mỗi box chiếm toàn bộ chiều rộng
- Layout hiển thị 1 cột

```txt
┌────────────┐
│ Box 1      │
├────────────┤
│ Box 2      │
├────────────┤
│ Box 3      │
├────────────┤
│ Box 4      │
└────────────┘
```

- Số cột: 1 cột

---

### Tablet `768px - 991px`

- Bootstrap dùng class `col-md-6`
- Mỗi box chiếm 6/12 cột
- Mỗi hàng có 2 box
- Layout hiển thị 2 cột

```txt
┌────────┬────────┐
│ Box 1  │ Box 2  │
├────────┼────────┤
│ Box 3  │ Box 4  │
└────────┴────────┘
```

- Số cột: 2 cột

---

### Desktop `≥ 992px`

- Bootstrap dùng class `col-lg-3`
- Mỗi box chiếm 3/12 cột
- Mỗi hàng có 4 box
- Layout hiển thị 4 cột

```txt
┌──────┬──────┬──────┬──────┐
│Box 1 │Box 2 │Box 3 │Box 4 │
└──────┴──────┴──────┴──────┘
```

- Số cột: 4 cột

---

## Câu hỏi thêm

### `col-md-6` nghĩa là gì?

`col-md-6` nghĩa là từ breakpoint `md` trở lên (`≥ 768px`), phần tử sẽ chiếm 6/12 cột của Bootstrap Grid System.

Vì 6/12 bằng một nửa chiều rộng nên mỗi hàng sẽ có 2 phần tử.

---

### Tại sao không cần viết `col-sm-12`?

Không cần viết `col-sm-12` vì đã có `col-12`.

Class `col-12` áp dụng cho mọi kích thước màn hình mặc định từ nhỏ nhất trở lên.

Khi màn hình đạt `md` hoặc `lg`, Bootstrap sẽ tự dùng:

- `col-md-6`
- `col-lg-3`

để ghi đè layout tương ứng.

## Câu A2 — Utilities & Components

### 1. Giải thích class `d-none d-md-block`

Ví dụ:

```html
<div class="d-none d-md-block">Nội dung</div>
```

Ý nghĩa:

- `d-none`
  - `display: none`
  - Element bị ẩn mặc định trên mobile.

- `d-md-block`
  - Từ breakpoint `md` trở lên (`≥ 768px`)
  - Element sẽ hiển thị với `display: block`.

Kết quả:

- Mobile `< 768px`
  - Element bị ẩn.

- Tablet/Desktop `≥ 768px`
  - Element hiển thị.

---

## 2. 5 spacing utilities

### `mt-3`

- `m` = margin
- `t` = top
- `3` = mức spacing 3

→ Tạo `margin-top`.

---

### `mb-4`

- `m` = margin
- `b` = bottom
- `4` = spacing level 4

→ Tạo `margin-bottom`.

---

### `ms-2`

- `m` = margin
- `s` = start
- `2` = spacing level 2

→ Tạo `margin-left` trong layout trái sang phải.

---

### `px-4`

- `p` = padding
- `x` = trục ngang
- `4` = spacing level 4

→ Tạo:

- `padding-left`
- `padding-right`

---

### `py-3`

- `p` = padding
- `y` = trục dọc
- `3` = spacing level 3

→ Tạo:

- `padding-top`
- `padding-bottom`

---

### `mb-auto`

- `mb` = margin-bottom
- `auto` = giá trị auto

→ Bootstrap tự tính khoảng cách phía dưới.

---

## 3. Sự khác nhau giữa `.container`, `.container-fluid`, `.container-md`

### `.container`

- Có chiều rộng tối đa theo từng breakpoint.
- Nội dung được căn giữa.
- Phù hợp layout website thông thường.

Ví dụ:

```html
<div class="container"></div>
```

---

### `.container-fluid`

- Luôn chiếm 100% chiều rộng màn hình.
- Full width ở mọi kích thước.

Ví dụ:

```html
<div class="container-fluid"></div>
```

---

### `.container-md`

- Trước breakpoint `md`
  - rộng 100%.

- Từ `md` trở lên
  - có `max-width` giống `.container`.

Ví dụ:

```html
<div class="container-md"></div>
```

Phù hợp khi muốn:

- mobile full width
- desktop có giới hạn chiều rộng.

## Câu C1 — Tùy biến Bootstrap

### 1. Đổi màu `$primary` từ xanh mặc định sang `#E63946`

Bootstrap được xây dựng bằng Sass/SCSS, nên để đổi màu chủ đạo đúng cách, ta nên sửa biến Sass của Bootstrap trước khi compile.

Quy trình:

- Cài Bootstrap bằng npm:

```bash
npm install bootstrap
```

- Tạo file SCSS riêng, ví dụ:

```txt
scss/custom-bootstrap.scss
```

- Trong file `custom-bootstrap.scss`, khai báo lại biến `$primary` trước khi import Bootstrap:

```scss
$primary: #e63946;

@import "../node_modules/bootstrap/scss/bootstrap";
```

- Compile SCSS thành CSS:

```bash
sass scss/custom-bootstrap.scss css/custom-bootstrap.css
```

- Link file CSS đã compile vào HTML:

```html
<link rel="stylesheet" href="css/custom-bootstrap.css" />
```

Kết quả: các class Bootstrap dùng màu primary như `.btn-primary`, `.bg-primary`, `.text-primary`, `.border-primary` sẽ tự đổi sang màu `#E63946`.

---

### 2. Tại sao không nên override trực tiếp `.btn-primary { background: red; }`?

Không nên viết:

```css
.btn-primary {
  background: red;
}
```

vì cách này chỉ sửa riêng `.btn-primary`, không sửa toàn bộ hệ thống màu của Bootstrap.

Nhược điểm:

- Không đồng bộ với các class khác như `.bg-primary`, `.text-primary`, `.border-primary`.
- Dễ bị thiếu style như `border-color`, `hover`, `active`, `focus`.
- Code override dễ rối và khó bảo trì.
- Khi Bootstrap update, CSS tự override có thể bị lỗi hoặc không còn phù hợp.
- Không tận dụng được hệ thống theme Sass của Bootstrap.

Dùng Sass variables tốt hơn vì chỉ cần đổi một biến `$primary`, Bootstrap sẽ tự tạo lại toàn bộ các class liên quan đến màu primary một cách đồng bộ.

Ví dụ:

```scss
$primary: #e63946;

@import "../node_modules/bootstrap/scss/bootstrap";
```

Cách này giúp giao diện nhất quán, dễ maintain và chuyên nghiệp hơn.

## Câu C2 — So sánh CSS thuần và Bootstrap

### 1. CSS thuần: Navbar responsive + Product card

Ví dụ CSS thuần từ PBT trước:

```html
<header class="header">
  <div class="logo">MyShop</div>

  <button class="hamburger">☰</button>

  <nav class="nav-links">
    <a href="#">Trang chủ</a>
    <a href="#">Sản phẩm</a>
    <a href="#">Liên hệ</a>
  </nav>
</header>

<div class="product-card">
  <img src="product.jpg" alt="Product" />
  <h3>Sản phẩm 1</h3>
  <p>Giá: 250.000đ</p>
  <button>Mua ngay</button>
</div>
```

```css
.header {
  background-color: #222;
  color: white;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hamburger {
  display: block;
  background: none;
  border: none;
  color: white;
  font-size: 28px;
}

.nav-links {
  display: none;
}

.product-card {
  background-color: white;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-card img {
  max-width: 100%;
  height: auto;
}

.product-card button {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
}

@media (min-width: 768px) {
  .hamburger {
    display: none;
  }

  .nav-links {
    display: flex;
    gap: 20px;
  }
}
```

---

### 2. Bootstrap version

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand fw-bold" href="#">MyShop</a>

    <button
      class="navbar-toggler"
      data-bs-toggle="collapse"
      data-bs-target="#menu"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="menu">
      <div class="navbar-nav ms-auto">
        <a class="nav-link active" href="#">Trang chủ</a>
        <a class="nav-link" href="#">Sản phẩm</a>
        <a class="nav-link" href="#">Liên hệ</a>
      </div>
    </div>
  </div>
</nav>

<div class="card">
  <img src="product.jpg" class="card-img-top" alt="Product" />
  <div class="card-body">
    <h5 class="card-title">Sản phẩm 1</h5>
    <p class="card-text">Giá: 250.000đ</p>
    <button class="btn btn-primary">Mua ngay</button>
  </div>
</div>
```

---

### 3. So sánh

#### Số dòng CSS cần viết

- CSS thuần:
  - Cần tự viết khoảng 40–60 dòng CSS cho navbar, responsive, card, button, image.
  - Nếu thêm hover, spacing, grid thì số dòng còn tăng thêm.

- Bootstrap:
  - Hầu như không cần viết CSS riêng.
  - Chủ yếu dùng class có sẵn như `navbar`, `navbar-expand-lg`, `card`, `btn`, `container`.

Kết luận: Bootstrap giúp giảm rất nhiều số dòng CSS.

---

#### Thời gian phát triển

- CSS thuần:
  - Tốn thời gian hơn vì phải tự viết layout, responsive, spacing, hover, màu sắc.
  - Phải test nhiều breakpoint.

- Bootstrap:
  - Nhanh hơn vì có sẵn component và utilities.
  - Navbar, card, button, grid đã được thiết kế sẵn.

Kết luận: Bootstrap phù hợp khi cần làm nhanh giao diện chuẩn responsive.

---

#### Khả năng tùy biến

- CSS thuần:
  - Tùy biến rất cao.
  - Có thể thiết kế giao diện theo ý muốn hoàn toàn.
  - Nhưng mất nhiều thời gian và dễ lỗi responsive.

- Bootstrap:
  - Tùy biến nhanh bằng utility classes.
  - Có thể đổi theme bằng Sass variables.
  - Tuy nhiên nếu muốn giao diện quá đặc biệt thì phải override nhiều hoặc custom Bootstrap.

Kết luận: CSS thuần linh hoạt hơn, còn Bootstrap nhanh và ổn định hơn.

---

### 4. Khi nào NÊN dùng Bootstrap?

Nên dùng Bootstrap khi:

- Cần làm website nhanh.
- Làm dashboard, landing page, admin panel.
- Cần responsive sẵn.
- Dự án không yêu cầu thiết kế quá độc đáo.
- Team muốn dùng chung một hệ thống component.

Ví dụ:

- Trang quản trị admin.
- Landing page bán hàng.
- Website giới thiệu công ty.
- Prototype/demo nhanh.

---

### 5. Khi nào KHÔNG NÊN dùng Bootstrap?

Không nên dùng Bootstrap khi:

- Dự án cần giao diện rất riêng, không muốn giống Bootstrap.
- Muốn kiểm soát CSS chi tiết 100%.
- Website cần tối ưu dung lượng CSS cực nhỏ.
- Team dùng design system riêng.
- Dự án đã dùng framework khác như TailwindCSS.

Kết luận: Bootstrap rất tốt để phát triển nhanh, nhưng CSS thuần hoặc framework khác sẽ phù hợp hơn khi cần tùy biến giao diện sâu.
