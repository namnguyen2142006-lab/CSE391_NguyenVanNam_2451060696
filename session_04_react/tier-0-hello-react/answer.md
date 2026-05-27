# Answer — Bài 0.1: Chạy React đầu tiên

## Câu 1. File `.jsx` khác gì file `.js`?

File `.js` là file JavaScript bình thường.

File `.jsx` cũng là JavaScript, nhưng bên trong có thể viết cú pháp giống HTML. Cú pháp đó gọi là JSX.

## Câu 2. Tại sao phải export default App?

Vì component App cần được file khác lấy ra để sử dụng.

## Câu 3. Thử xóa export default → chuyện gì xảy ra?

Nếu xóa dòng:

export default App;

thì file main.jsx sẽ không import được component App nữa.

Khi đó trang web có thể bị trắng và báo lỗi kiểu như:

The requested module '/src/App.jsx' does not provide an export named 'default'

Dịch dễ hiểu là:

File App.jsx không cung cấp export default nào cả

Nguyên nhân là vì main.jsx đang cần lấy App, nhưng App.jsx không đưa App ra ngoài, nên React không biết component nào để hiển thị.

### Bài 1 — Component `UserProfile`

HTML gốc:

```html
<div class="profile">
  <h1>Hồ sơ cá nhân</h1>
  <img src="photo.jpg" alt="Ảnh đại diện" />
  <table>
    <tr>
      <td>Họ tên:</td>
      <td>Minh</td>
    </tr>
    <tr>
      <td>Email:</td>
      <td>minh@example.com</td>
    </tr>
  </table>
</div>
```

JSX:

```jsx
function UserProfile() {
  return (
    <div className="profile">
      <h1>Hồ sơ cá nhân</h1>

      <img src="photo.jpg" alt="Ảnh đại diện" />

      <table>
        <tbody>
          <tr>
            <td>Họ tên:</td>
            <td>Minh</td>
          </tr>

          <tr>
            <td>Email:</td>
            <td>minh@example.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
```

Giải thích:

- `class="profile"` đổi thành `className="profile"`.
- Thẻ `<img>` đổi thành `<img />` vì trong JSX thẻ `img` phải tự đóng.
- Thêm `<tbody>` để bảng đúng cấu trúc hơn trong React.

---

### Bài 2 — Component `ProductInfo`

HTML gốc:

```html
<div class="product">
  <h2>iPhone 15</h2>
  <p class="price">25.000.000đ</p>
  <ul>
    <li>Màn hình: 6.1 inch</li>
    <li>Camera: 48MP</li>
    <li>Pin: 3349 mAh</li>
  </ul>
  <button>Mua ngay</button>
</div>
```

JSX:

```jsx
function ProductInfo() {
  return (
    <div className="product">
      <h2>iPhone 15</h2>

      <p className="price">25.000.000đ</p>

      <ul>
        <li>Màn hình: 6.1 inch</li>
        <li>Camera: 48MP</li>
        <li>Pin: 3349 mAh</li>
      </ul>

      <button>Mua ngay</button>
    </div>
  );
}
```
