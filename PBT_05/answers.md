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
