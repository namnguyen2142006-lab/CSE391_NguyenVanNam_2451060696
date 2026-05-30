// 1. pipe() — Nối chuỗi functions
function pipe(...fns) {
  return function (initialValue) {
    return fns.reduce((value, fn) => {
      return fn(value);
    }, initialValue);
  };
}

const process = pipe(
  (x) => x * 2, // 5 → 10
  (x) => x + 10, // 10 → 20
  (x) => x.toString(), // 20 → "20"
  (x) => "Kết quả: " + x,
);

console.log("=== PIPE ===");
console.log(process(5)); // Kết quả: 20

// 2. memoize() — Cache kết quả
function memoize(fn) {
  const cache = {};

  return function (arg) {
    if (cache[arg] !== undefined) {
      return cache[arg];
    }

    const result = fn(arg);
    cache[arg] = result;

    return result;
  };
}

const expensiveCalc = memoize((n) => {
  console.log("Đang tính...");

  let result = 0;

  for (let i = 0; i < n; i++) {
    result += i;
  }

  return result;
});

console.log("\n=== MEMOIZE ===");
console.log(expensiveCalc(1000000));
console.log(expensiveCalc(1000000));

// 3. debounce() — Chờ user ngừng gõ mới thực hiện
function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const search = debounce((query) => {
  console.log("Searching:", query);
}, 500);

console.log("\n=== DEBOUNCE ===");
search("i");
search("ip");
search("iph");
search("iphone");

// 4. retry() — Thử lại nếu lỗi
async function retry(fn, maxAttempts = 3) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await fn();
      return result;
    } catch (error) {
      console.log("Lần thử " + attempt + " thất bại");

      if (attempt === maxAttempts) {
        throw error;
      }
    }
  }
}

// Test retry
let count = 0;

async function unstableTask() {
  count++;

  if (count < 3) {
    throw new Error("Lỗi tạm thời");
  }

  return "Thành công ở lần thử " + count;
}

console.log("\n=== RETRY ===");

retry(unstableTask, 3)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log("Thất bại hoàn toàn:", error.message);
  });
