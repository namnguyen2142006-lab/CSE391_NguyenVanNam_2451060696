## PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 — Viewport & Mobile-First

### 1. Thẻ meta viewport chuẩn

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

- Giải thích:

* name="viewport": khai báo rằng thẻ meta này dùng để điều khiển vùng hiển thị của trình duyệt.
* width=device-width: chiều rộng của trang web sẽ bằng chiều rộng thật của thiết bị.
* initial-scale=1.0: mức zoom ban đầu là 100%.

- Nếu THIẾU thẻ này, thì iPhone sẽ coi trang web như một trang desktop, sau đó thu nhỏ toàn bộ trang lại cho vừa màn hình điện thoại.

- Mobile-First và Desktop-First khác nhau:

* Mobile-First là cách viết CSS cho màn hình nhỏ trước, sau đó dùng @media (min-width) để mở rộng layout cho màn hình lớn hơn.

- Desktop-First là cách viết CSS cho màn hình lớn trước, sau đó dùng @media (max-width) để chỉnh lại cho màn hình nhỏ hơn.

- Ví dụ Mobile-First với breakpoint 768px:

```css
.col {
  width: 100%;
}
@media (min-width: 768px) {
  .col {
    width: 50%;
  }
}
```

- Ví dụ Desktop-First với breakpoint 768px:

```css
.col {
  width: 25%;
}
@media (max-width: 768px) {
  .col {
    width: 100%;
  }
}
```

- Mobile-First được khuyên dùng vì:

* Phù hợp với xu hướng người dùng truy cập web bằng điện thoại.
* Điện thoại tải ít CSS hơn nên trang nhanh hơn.
* Code dễ mở rộng từ màn hình nhỏ lên màn hình lớn.
* Dễ quản lý responsive layout hơn.
* Giúp website thân thiện hơn với thiết bị di động.

## Câu A2 — Breakpoints

### Breakpoints chuẩn (theo Bootstrap)

- **xs** — `< 576px`
  - Thiết bị: Điện thoại dọc
  - Product grid: 1 cột

- **sm** — `≥ 576px`
  - Thiết bị: Điện thoại ngang
  - Product grid: 1–2 cột

- **md** — `≥ 768px`
  - Thiết bị: Tablet / iPad
  - Product grid: 2 cột

- **lg** — `≥ 992px`
  - Thiết bị: Laptop / Desktop nhỏ
  - Product grid: 3 cột

- **xl** — `≥ 1200px`
  - Thiết bị: Desktop lớn
  - Product grid: 4 cột

## Câu A3 — Media Queries

### Kết quả `.container width`

- **375px (iPhone SE)**
  - `< 576px`
  - Không rơi vào media query nào
  - `.container { width: 100%; }`

- **600px**
  - `≥ 576px`
  - Áp dụng:

```css
@media (min-width: 576px) {
  .container {
    width: 540px;
  }
}
```

- Kết quả: `540px`

- **800px**
  - `≥ 768px`
  - Áp dụng:

```css
@media (min-width: 768px) {
  .container {
    width: 720px;
  }
}
```

- Kết quả: `720px`

- **1000px**
  - `≥ 992px`
  - Áp dụng:

```css
@media (min-width: 992px) {
  .container {
    width: 960px;
  }
}
```

- Kết quả: `960px`

- **1400px**
  - `≥ 1200px`
  - Áp dụng:

```css
@media (min-width: 1200px) {
  .container {
    width: 1140px;
  }
}
```

- Kết quả: `1140px`

## Câu A4 — SCSS Basics

### 1. Variables (`$primary-color`)

SCSS cho phép tạo biến để lưu màu sắc, font chữ, spacing… giúp tái sử dụng dễ dàng.

Ví dụ:

```scss
$primary: #805ad5;
$radius: 8px;

.btn-primary {
  background: $primary;
  border-radius: $radius;
}

.header {
  background: $primary;
}
```

Lợi ích:

- Đổi 1 biến → toàn bộ giao diện đổi theo
- Giảm lặp code
- Dễ quản lý màu sắc và spacing

---

### 2. Nesting (CSS lồng nhau)

SCSS cho phép viết CSS lồng nhau theo cấu trúc HTML.

Ví dụ:

```scss
.navbar {
  background: #1a202c;

  ul {
    display: flex;

    li {
      margin-right: 24px;

      a {
        color: white;

        &:hover {
          color: $primary;
        }
      }
    }
  }
}
```

Lợi ích:

- Code gọn hơn
- Dễ đọc hơn
- Dễ nhìn cấu trúc component

---

### 3. Mixins (`@mixin`, `@include`)

Mixin giúp tái sử dụng một nhóm CSS giống như hàm.

Ví dụ:

```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero {
  @include flex-center;
  height: 100vh;
}
```

Lợi ích:

- Tái sử dụng code
- Giảm lặp CSS
- Dễ viết responsive

---

### 4. `@extend` / Inheritance

`@extend` cho phép class kế thừa style từ class khác.

Ví dụ:

```scss
.btn {
  padding: 10px 20px;
  border-radius: 6px;
}

.btn-primary {
  @extend .btn;
  background: blue;
  color: white;
}
```

Lợi ích:

- Dùng lại style chung
- Tránh lặp code

---

## Tại sao trình duyệt KHÔNG đọc được file `.scss`?

Trình duyệt chỉ đọc được:

- HTML
- CSS
- JavaScript

SCSS là CSS preprocessor nên trình duyệt không hiểu trực tiếp file `.scss`.

---

## Cần bước gì để chuyển SCSS → CSS?

Cần dùng Sass Compiler để compile SCSS thành CSS.

Quá trình:

```text
SCSS → Compiler → CSS
```

Ví dụ lệnh compile:

```bash
sass style.scss style.css
```

Hoặc dùng extension VS Code:

- Live Sass Compiler
- Click "Watch Sass"
- Tự động tạo file `.css`

## B3 — Compile SCSS

Lệnh compile SCSS sang CSS:

```bash
sass scss/style.scss scss/style.css
```

Hoặc dùng VS Code extension:

- Live Sass Compiler
- Click "Watch Sass"
- Tự động tạo file `style.css`

## Câu C1 — Phân tích trang web thực: YouTube

Em chọn website YouTube để phân tích responsive layout trên 3 kích thước màn hình: mobile, tablet và desktop.

### 1. Mobile — 375px

Ở kích thước mobile, giao diện YouTube được tối giản. Navigation chính được thu gọn, các thành phần như sidebar lớn bên trái không hiển thị đầy đủ. Nội dung video hiển thị theo dạng 1 cột, mỗi video chiếm gần hết chiều rộng màn hình.

- Navigation: được rút gọn, ưu tiên icon và thanh tìm kiếm đơn giản.
- Lưới content: 1 cột.
- Elements bị ẩn: sidebar lớn, một số menu phụ, text dài.
- Font size: nhỏ hơn desktop để phù hợp màn hình điện thoại.

### 2. Tablet — 768px

Ở kích thước tablet, giao diện rộng hơn mobile nên có nhiều không gian hơn. Một số thành phần navigation bắt đầu hiển thị rõ hơn. Lưới video có thể chuyển sang 2 cột tùy nội dung và khu vực hiển thị.

- Navigation: hiển thị nhiều icon hơn mobile.
- Lưới content: khoảng 2 cột.
- Elements bị ẩn: sidebar đầy đủ vẫn có thể bị thu gọn.
- Font size: lớn hơn mobile một chút.

### 3. Desktop — 1440px

Ở kích thước desktop, YouTube hiển thị đầy đủ layout hơn. Sidebar bên trái có thể xuất hiện, thanh tìm kiếm nằm rõ ở header, danh sách video hiển thị nhiều cột.

- Navigation: hiển thị đầy đủ hơn, có sidebar và thanh tìm kiếm lớn.
- Lưới content: khoảng 3–4 cột.
- Elements bị ẩn trên mobile nhưng hiện ở desktop: sidebar, nhiều menu điều hướng, text mô tả dài hơn.
- Font size: dễ đọc hơn và khoảng cách giữa các phần tử rộng hơn.

## Câu C2 — Thiết kế Responsive Strategy: Trang đặt bàn nhà hàng

### 1. Mobile `< 768px`

Wireframe mobile:

```txt
┌────────────────────────┐
│ HEADER                 │
│ Logo + nút gọi điện    │
├────────────────────────┤
│ HERO IMAGE             │
├────────────────────────┤
│ FORM ĐẶT BÀN           │
│ Ngày                   │
│ Giờ                    │
│ Số người               │
│ Ghi chú                │
├────────────────────────┤
│ GRID ẢNH MÓN ĂN        │
│ 1 cột                  │
├────────────────────────┤
│ GOOGLE MAPS            │
├────────────────────────┤
│ FOOTER                 │
└────────────────────────┘
```

Ở mobile, các thành phần phụ như sidebar hoặc menu dài sẽ bị ẩn. Form đặt bàn nên đặt ngay sau hero image để người dùng dễ thao tác. Grid ảnh món ăn hiển thị 1 cột.

---

### 2. Tablet `768px - 1023px`

Wireframe tablet:

```txt
┌────────────────────────────────┐
│ HEADER                         │
│ Logo + số điện thoại đặt bàn   │
├────────────────────────────────┤
│ HERO IMAGE                     │
├────────────────────────────────┤
│ FORM ĐẶT BÀN                   │
├───────────────┬────────────────┤
│ ẢNH MÓN ĂN    │ ẢNH MÓN ĂN     │
│ 2 cột         │                │
├────────────────────────────────┤
│ GOOGLE MAPS                    │
├────────────────────────────────┤
│ FOOTER                         │
└────────────────────────────────┘
```

Ở tablet, grid ảnh món ăn nên hiển thị 2 cột. Form đặt bàn vẫn nằm phía trên phần ảnh để người dùng dễ thấy. Bản đồ Google Maps nằm dưới grid ảnh và chiếm toàn bộ chiều rộng.

---

### 3. Desktop `≥ 1024px`

Wireframe desktop:

```txt
┌──────────────────────────────────────────────┐
│ HEADER: Logo + số điện thoại đặt bàn         │
├──────────────────────────────────────────────┤
│ HERO IMAGE FULL WIDTH                        │
├───────────────────────┬──────────────────────┤
│ GRID ẢNH MÓN ĂN       │ FORM ĐẶT BÀN         │
│ 3 cột                 │ Sidebar bên phải     │
├───────────────────────┴──────────────────────┤
│ GOOGLE MAPS FULL WIDTH                       │
├──────────────────────────────────────────────┤
│ FOOTER                                       │
└──────────────────────────────────────────────┘
```

Ở desktop, layout có thể chia thành 2 cột chính: bên trái là grid ảnh món ăn, bên phải là form đặt bàn dạng sidebar. Grid ảnh món ăn hiển thị 3 cột. Bản đồ Google Maps nằm bên dưới và chiếm toàn bộ chiều rộng.

---

## CSS Skeleton Mobile-First

```css
/* RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* MOBILE FIRST */
body {
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.hero {
  width: 100%;
  min-height: 300px;
  background-image: url("restaurant-hero.jpg");
  background-size: cover;
  background-position: center;
}

.page-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding: 16px;
}

.booking-form {
  display: grid;
  gap: 12px;
}

.food-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.food-grid img {
  width: 100%;
  height: auto;
}

.map {
  width: 100%;
  min-height: 300px;
}

.footer {
  padding: 20px;
  text-align: center;
}

/* TABLET */
@media (min-width: 768px) {
  .food-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .map {
    min-height: 350px;
  }
}

/* DESKTOP */
@media (min-width: 1024px) {
  .page-layout {
    grid-template-columns: 2fr 1fr;
    align-items: start;
  }

  .food-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .booking-form {
    position: sticky;
    top: 20px;
  }

  .map {
    grid-column: 1 / -1;
    min-height: 400px;
  }
}
```
