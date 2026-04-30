## Câu A1

1. type="email" → Ô nhập text, tự kiểm tra có ký tự @ và định dạng email hợp lệ → Dùng cho form đăng ký / đăng nhập
2. type="password" → Ô nhập mật khẩu, ký tự hiển thị dạng chấm hoặc sao → Kiểm tra minlength / required → Dùng cho đăng nhập tài khoản
3. type="number" → Ô nhập số, có nút tăng giảm → Tự kiểm tra chỉ nhập số, giới hạn min / max → Dùng nhập số lượng sản phẩm
4. type="tel" → Ô nhập số điện thoại → Có thể kiểm tra pattern số điện thoại → Dùng cho form thông tin giao hàng
5. type="date" → Ô chọn ngày bằng lịch → Tự kiểm tra định dạng ngày hợp lệ → Dùng chọn ngày sinh / ngày giao hàng
6. type="time" → Ô chọn giờ phút → Tự kiểm tra định dạng thời gian → Dùng chọn khung giờ nhận hàng
7. type="url" → Ô nhập liên kết website → Tự kiểm tra URL hợp lệ → Dùng nhập link website shop / sản phẩm
8. type="search" → Ô nhập tìm kiếm, có giao diện tối ưu cho search → Không validate đặc biệt → Dùng ô tìm kiếm sản phẩm
9. type="file" → Nút chọn file upload → Có thể giới hạn loại file bằng accept → Dùng upload ảnh đánh giá sản phẩm
10. type="range" → Thanh kéo slider → Giới hạn giá trị theo min / max → Dùng bộ lọc khoảng giá sản phẩm

## Câu A2:

- Trường hợp 1: `<input type="text" required value="">` _(User để trống)_
    Dự đoán: Form không thể submit. Trình duyệt sẽ focus vào ô nhập liệu này và hiện thông báo yêu cầu điền thông tin. Vì Thuộc tính `required` bắt buộc input này phải có dữ liệu. Vì `value=""` (rỗng), HTML5 validation sẽ chặn hành động gửi form
- Trường hợp 2: `<input type="email" value="abc">` _(User gõ "abc")_
    Dự đoán: Form không thể submit. Trình duyệt hiện thông báo lỗi cú pháp email. Dữ liệu bắt buộc phải tuân theo định dạng của `type="email"`. Chuỗi "abc" thiếu ký tự `@` và domain nên bị đánh lỗi
- Trường hợp 3: `<input type="number" min="1" max="10" value="15">` _(User gõ 15)_
    Dự đoán: Form không thể Submit. Trình duyệt hiện thông báo giá trị vượt quá giới hạn. Vì thuộc tính `max="10"` giới hạn giá trị lớn nhất được phép nhập là 10. Giá trị user nhập là `15` đã vi phạm điều kiện này
- Trường hợp 4: `<input type="text" pattern="[0-9]{10}" value="abc123">` _(User gõ "abc123")_
    Dự đoán: Form không thể submit. Trình duyệt hiện thông báo định dạng không khớp. Vì thuộc tính `pattern="[0-9]{10}"` yêu cầu người dùng phải nhập chính xác 10 chữ số. Chuỗi "abc123" vừa chứa chữ cái, vừa chỉ có 6 ký tự nên validation sẽ thất bại
- Trường hợp 5: `<input type="password" minlength="8" value="123">` _(User gõ "123")_
    Dự đoán: Form không thể submit. Trình duyệt hiện thông báo độ dài chưa đủ. Vì thuộc tính `minlength="8"` yêu cầu chuỗi nhập vào phải có ít nhất 8 ký tự. Chuỗi "123" chỉ có 3 ký tự nên không hợp lệ

  ### So sánh với dự đoán

  Kết quả thực tế trùng với dự đoán.
  Cả 5 trường hợp đều bị browser chặn submit do vi phạm validation rules tương ứng như required, email format, max value, pattern và minlength.

  ## Câu A3:

1. Tại sao `<label for="email">` quan trọng?

- Giúp screen reader nhận diện thẻ `<input>` tương ứng
- Nếu thiếu, người dùng sẽ không biết ô đó yêu cầu nhập thông tin gì
- Click thẳng vào dòng chữ thì con trỏ sẽ tự động nhảy vào ô nhập liệu

2. Khi nào dùng `<fieldset>` + `<legend>`?

- Dùng để gom nhóm các trường dữ liệu có liên quan với nhau trong một form dài
- `<fieldset>` tạo khung bao quanh, còn `<legend>` làm tiêu đề cho nhóm đó

3. `<aria-label>` dùng khi nào? Tại sao không dùng chung với `<label>`?

- Khi nào dùng: Khi nút bấm hoặc ô nhập liệu không có chữ hiển thị mà chỉ dùng icon
- Tại sao không dùng chung: Trình đọc màn hình sẽ ưu tiên đọc`<aria-label>` và bỏ qua `<label>`. HTML5 đã quy định thẻ `<label>` làm rất tốt nhiệm vụ của nó, việc dùng thêm `aria-label` là dư thừa và dễ gây xung đột, làm screen reader khó hiểu

## Câu A4:

1. Thuộc tính `loading="lazy"` trên thẻ `<img>`

- Tác dụng: Trì hoãn tải ảnh cho đến khi người dùng cuộn chuột tới. Giúp trang web load nhanh hơn lúc đầu và tiết kiệm băng thông
- Không nên dùng: Cho các ảnh ở ngay màn hình đầu tiên vì sẽ làm chậm hiển thị nội dung quan trọng nhất

2. Nên cung cấp nhiều `<source>` trong thẻ `<video>` vì các trình duyệt hỗ trợ định dạng video khác nhau. Nhiều `<source>` tạo phương án dự phòng, đảm bảo video luôn chạy được trên mọi thiết bị.

- 3 format phổ biến: `MP4`, `WebM`, `Ogg`

3. Thuộc tính `alt` trên `<img>` dùng để hiện chữ thay thế khi ảnh lỗi

- 3 ví dụ `alt` tốt:
    1. Ảnh iPhone 16: `alt="Điện thoại iPhone 16 Pro Max màu titan"` (Mô tả chi tiết ảnh).
    2. Ảnh trang trí: `alt=""` (Bắt buộc có nhưng để rỗng để screen reader tự động bỏ qua).
    3. Biểu đồ Q1/2026: `alt="Biểu đồ doanh thu Q1/2026 đạt 50 tỷ đồng, tăng 20%"` _(Mô tả thẳng vào kết quả/số liệu của biểu đồ)._

  ## Câu A5:

Cách 1(dùng `<img>`): Dùng cho những bức ảnh độc lập trong văn bản mà không cần ghi chú giải thích, hoặc các ảnh chỉ mang tính minh họa.

- 2 Ví dụ thực tế:
    1. Ảnh đại diện: Hiển thị avatar
    2. Banner: Banner quảng cáo lớn trên trang chủ

2. Cách 2 (dùng `<figure>` kết hợp `<figcaption>`) Dùng khi bức ảnh (hoặc biểu đồ, video...) bắt buộc phải có một đoạn chú thích đi kèm để người đọc hiểu được ngữ cảnh. Thẻ `<figure>` giúp gói gọn ảnh và phần chữ giải thích thành một khối thống nhất có ý nghĩa

- 2 Ví dụ thực tế:
    1. Card sản phẩm: Đóng gói ảnh sản phẩm và chú thích là (Tên + Giá tiền) vào một khối để tạo thành danh sách sản phẩm
    2. Biểu đồ: Đăng một biểu đồ doanh thu trong bài báo tài chính, bên dưới cần ghi rõ đây là biểu đồ chỉ gì

  ## Câu C1:

- Lỗi 1: Dòng 1 - Thẻ `<form>` thiếu thuộc tính `action` và `method` (vi phạm best practices về gửi dữ liệu).
    Sửa: `<form action="#" method="POST">`
- Lỗi 2: Dòng 2 - Input "Tên" không có `<label for="...">`, thiếu thuộc tính `name`, `id` và `required` (vi phạm accessibility và validation).
    Sửa: `<label for="name">Tên:</label> <input type="text" id="name" name="name" required>`
- Lỗi 3: Dòng 4 - Input "Email" không có `<label for="...">`, lạm dụng `placeholder` thay cho label, thiếu thuộc tính `name` và `id` (vi phạm accessibility).
    Sửa: `<label for="email">Email:</label> <input type="email" id="email" name="email" required placeholder="Email của bạn">`
- Lỗi 4: Dòng 6 và 7 - Input "Mật khẩu" không có `<label for="...">`, thiếu thuộc tính `name` và thiếu validation an toàn như `minlength` (vi phạm accessibility và validation).
    Sửa:
    `<label for="pwd">Mật khẩu:</label> <input type="password" id="pwd" name="pwd" minlength="8" required placeholder="Mật khẩu">`
    `<label for="confirm_pwd">Nhập lại mật khẩu:</label> <input type="password" id="confirm_pwd" name="confirm_pwd" minlength="8" required placeholder="Nhập lại mật khẩu">`
- Lỗi 5: Dòng 9 - Input "Phone" dùng sai `type="text"` (phải là `tel`), thiếu `<label for="...">`, thiếu `name`, và lạm dụng `value` gán cứng thay vì `placeholder` (vi phạm accessibility và best practices).
    Sửa: `<label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" placeholder="0901234567">`
- Lỗi 6: Dòng 11 - Thẻ `<select>` không có `<label for="...">`, thiếu thuộc tính `id` để liên kết và `name` để gửi dữ liệu (vi phạm accessibility).
    Sửa: `<label for="city">Thành phố:</label> <select id="city" name="city">`
- Lỗi 7: Dòng 12 và 13 - Các thẻ `<option>` thiếu thuộc tính `value` (vi phạm best practices, khiến server khó xử lý đồng nhất dữ liệu khi submit).
    Sửa:
    `<option value="hn">Hà Nội</option>`
    `<option value="hcm">TP.HCM</option>`
- Lỗi 8: Dòng 16, 17, 18 - Có thẻ `<label>` nhưng bị thiếu thẻ `<input type="checkbox">`, và thiếu validation bắt buộc đồng ý (vi phạm logic form và validation).
    Sửa: `<input type="checkbox" id="agree" name="agree" required> <label for="agree">Tôi đồng ý điều khoản</label>`

## Câu C2:

1. CMND/CCCD (đúng 12 chữ số): `pattern="[0-9]{12}"`
      Số tài khoản (từ 10 đến 15 chữ số): `pattern="[0-9]{10,15}"`
2. HTML5 không đủ an toàn cho ứng dụng ngân hàng Vì người dùng có thể dễ dàng nhấn `F12` để xóa bỏ các quy tắc kiểm tra trong HTML, hoặc dùng phần mềm ngoài gửi thẳng dữ liệu sai lệch qua mặt giao diện web
3. Ba loại validation HTML5 không làm được:

- So sánh 2 ô input
- Kiểm tra dữ liệu với hệ thống
- Điều kiện logic

4. Hai rủi ro nếu chỉ kiểm tra Frontend (bỏ qua Backend):

- Bị chèn mã độc: Hacker gửi thẳng các đoạn code độc hại để phá hoặc ăn cắp toàn bộ cơ sở dữ liệu.
- Gian lận tài chính: Hacker có thể sửa đổi request để gửi lên những dữ liệu phi logic như số tiền chuyển khoản âm, hoặc sửa đổi ID người nhận, dẫn đến hệ thống bị lỗ hổng trục lợi nghiêm trọng.
