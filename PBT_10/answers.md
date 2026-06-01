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

## Câu C1 — Error Handling Strategy

### 1. Network errors

Network error xảy ra khi mất mạng, DNS lỗi, server không kết nối được.

Cách xử lý:

```javascript
try {
  const response = await fetch(url);
} catch (error) {
  console.error("Mất kết nối mạng:", error.message);
  alert("Không thể kết nối mạng. Vui lòng thử lại.");
}
```

---

### 2. API errors

`fetch()` không tự báo lỗi với status `404`, `500`, `429`, nên phải kiểm tra `response.ok`.

```javascript
async function handleApi(url) {
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Không tìm thấy dữ liệu.");
    }

    if (response.status === 500) {
      throw new Error("Lỗi server. Vui lòng thử lại sau.");
    }

    if (response.status === 429) {
      throw new Error("Gửi quá nhiều request. Vui lòng chờ rồi thử lại.");
    }

    throw new Error("Lỗi API: " + response.status);
  }

  return await response.json();
}
```

Giải thích:

- `404`: sai URL hoặc dữ liệu không tồn tại.
- `500`: server bị lỗi.
- `429`: gọi API quá nhiều lần.

---

### 3. Timeout

Nếu API quá chậm, ví dụ hơn 10 giây, ta hủy request bằng `AbortController`.

```javascript
async function fetchWithTimeout(url, ms) {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, ms);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request quá thời gian chờ.");
    }

    throw error;
  }
}
```

Ví dụ dùng:

```javascript
fetchWithTimeout("https://api.example.com/products", 10000);
```

---

### 4. Retry logic

Retry dùng để thử lại khi lỗi mạng tạm thời.

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }

      return await response.json();
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error("Thất bại sau " + maxRetries + " lần thử.");
      }

      console.log("Thử lại lần " + (attempt + 1));
    }
  }
}
```

Giải thích:

- Nếu request lỗi, hàm thử lại.
- Nếu hết số lần thử mà vẫn lỗi, trả về lỗi cuối cùng.
- Không nên retry quá nhiều để tránh làm server quá tải.

---

## Câu C2 — Promise.all vs Promise.allSettled vs Promise.race

| Method                 | Khi nào resolve?                                        | Khi nào reject?                 | Use case                                                    |
| ---------------------- | ------------------------------------------------------- | ------------------------------- | ----------------------------------------------------------- |
| `Promise.all()`        | Khi tất cả Promise thành công                           | Khi chỉ cần 1 Promise lỗi       | Khi tất cả API đều bắt buộc thành công                      |
| `Promise.allSettled()` | Khi tất cả Promise đã xong, dù thành công hoặc thất bại | Không reject toàn bộ            | Dashboard nhiều widget, 1 API lỗi không làm hỏng toàn trang |
| `Promise.race()`       | Khi Promise đầu tiên hoàn thành thành công              | Khi Promise đầu tiên thất bại   | Timeout request                                             |
| `Promise.any()`        | Khi có Promise đầu tiên thành công                      | Khi tất cả Promise đều thất bại | Gọi nhiều mirror API, lấy API nào thành công trước          |

---

### 1. `Promise.all()`

Dùng khi cần tất cả dữ liệu đều thành công.

```javascript
async function loadProductPage() {
  try {
    const [product, reviews, seller] = await Promise.all([
      fetch("/api/product/1").then((res) => res.json()),
      fetch("/api/product/1/reviews").then((res) => res.json()),
      fetch("/api/seller/5").then((res) => res.json()),
    ]);

    console.log(product, reviews, seller);
  } catch (error) {
    console.error("Không thể tải đầy đủ trang sản phẩm.");
  }
}
```

---

### 2. `Promise.allSettled()`

Dùng khi mỗi API độc lập, API này lỗi không ảnh hưởng API khác.

```javascript
async function loadDashboard() {
  const results = await Promise.allSettled([
    fetch("/api/users").then((res) => res.json()),
    fetch("/api/orders").then((res) => res.json()),
    fetch("/api/revenue").then((res) => res.json()),
  ]);

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log("Widget", index, result.value);
    } else {
      console.log("Widget", index, "lỗi:", result.reason.message);
    }
  });
}
```

---

### 3. `Promise.race()`

Dùng để xử lý timeout.

```javascript
function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request timeout")), ms);
  });
}

async function fetchProductWithTimeout() {
  try {
    const response = await Promise.race([
      fetch("/api/products"),
      timeout(10000),
    ]);

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
}
```

---

### 4. `Promise.any()`

Dùng khi có nhiều nguồn API, chỉ cần một nguồn thành công.

```javascript
async function fetchFromAnyServer() {
  try {
    const response = await Promise.any([
      fetch("https://server1.example.com/products"),
      fetch("https://server2.example.com/products"),
      fetch("https://server3.example.com/products"),
    ]);

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Tất cả server đều lỗi.");
  }
}
```
