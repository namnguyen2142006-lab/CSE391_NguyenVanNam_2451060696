# PHẦN A — KIỂM TRA ĐỌC HIỂU

## A1 — Các loại input HTML5

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

## Câu A2:Thuộc tính xác thực

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
