## Câu A1 — Sync vs Async

### Thứ tự output

```txt
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```

### Giải thích

JavaScript chạy code đồng bộ trước, nên hai dòng này chạy đầu tiên:

```javascript
console.log("1 - Start");
console.log("4 - End");
```

Vì vậy output đầu tiên là:

```txt
1 - Start
4 - End
```

Sau khi code đồng bộ chạy xong, Event Loop sẽ ưu tiên xử lý **Microtask Queue** trước **Macrotask Queue**.

`Promise.then()` thuộc **Microtask Queue**, nên chạy trước `setTimeout`:

```txt
3 - Promise
6 - Promise 2
```

`setTimeout()` thuộc **Macrotask Queue**. Sau khi Microtask chạy xong, các timeout mới được xử lý:

```txt
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```

`7 - Nested timeout` được tạo bên trong Promise 2, nên nó được đưa vào Macrotask Queue sau `2 - Timeout 0ms`.

`5 - Timeout 100ms` chạy sau cùng vì có thời gian chờ 100ms.

## Câu A2 — Fetch API

### 1. `await fetch(...)`

```javascript
const response = await fetch("https://api.example.com/data");
```

`fetch()` trả về một `Promise`.

Cần dùng `await` để chờ API phản hồi xong rồi mới lấy được object `response`.

Nếu không có `await`, biến `response` sẽ là một `Promise`, chưa phải dữ liệu phản hồi thật.

---

### 2. `response.ok`

```javascript
if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}
```

`response.ok` là `true` khi status code nằm trong khoảng `200 - 299`.

`response.ok` là `false` khi server trả lỗi HTTP.

Ví dụ 3 status code:

```txt
404 Not Found
500 Internal Server Error
429 Too Many Requests
```

---

### 3. `response.json()`

```javascript
const data = await response.json();
```

`response.json()` dùng để đọc body của response và chuyển JSON thành object JavaScript.

Cần `await` lần nữa vì việc đọc và parse body cũng là thao tác bất đồng bộ.

---

### 4. `try...catch`

```javascript
try {
    ...
} catch (error) {
    console.error("Failed:", error.message);
    return null;
}
```

`try...catch` có thể bắt:

- Network error, ví dụ mất mạng hoặc không kết nối được API.
- Lỗi do mình tự `throw`, ví dụ `throw new Error("HTTP 404")`.
- JSON parse error, ví dụ response không phải JSON hợp lệ.

Lưu ý: `fetch()` không tự nhảy vào `catch` khi gặp `404` hoặc `500`. Vì vậy cần tự kiểm tra `response.ok` và `throw new Error(...)`.

## Câu A3 — Promise States

### 1. Sơ đồ 3 trạng thái của Promise

```txt
                 ┌─────────────┐
                 │   Pending   │
                 └──────┬──────┘
                        │
          ┌─────────────┴─────────────┐
          │                           │
          ▼                           ▼
   ┌─────────────┐             ┌─────────────┐
   │  Fulfilled  │             │  Rejected   │
   └─────────────┘             └─────────────┘
```

Giải thích:

- `Pending`: Promise đang chờ kết quả.
- `Fulfilled`: Promise thành công, trả về dữ liệu.
- `Rejected`: Promise thất bại, trả về lỗi.

---

### 2. Callback Hell là gì?

Callback Hell là tình trạng nhiều callback lồng nhau quá sâu, làm code khó đọc, khó sửa và khó xử lý lỗi.

Ví dụ 4 cấp callback hell:

```javascript
getUser(userId, function (user) {
  getOrders(user.id, function (orders) {
    getOrderDetail(orders[0].id, function (detail) {
      getPayment(detail.paymentId, function (payment) {
        console.log(payment);
      });
    });
  });
});
```

---

### 3. Refactor bằng async/await

```javascript
async function loadPayment(userId) {
  try {
    const user = await getUser(userId);
    const orders = await getOrders(user.id);
    const detail = await getOrderDetail(orders[0].id);
    const payment = await getPayment(detail.paymentId);

    console.log(payment);
  } catch (error) {
    console.error("Lỗi:", error.message);
  }
}
```
