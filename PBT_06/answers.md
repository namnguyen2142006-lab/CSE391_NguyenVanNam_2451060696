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
