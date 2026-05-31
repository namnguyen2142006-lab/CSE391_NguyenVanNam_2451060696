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
