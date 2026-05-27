// Câu C2 — Tính hóa đơn nhà hàng

const items = [
  { name: "Phở bò", price: 65000, quantity: 2 },
  { name: "Trà đá", price: 5000, quantity: 3 },
  { name: "Bún chả", price: 55000, quantity: 1 },
];

// true nếu có tip, false nếu không có tip
const hasTip = true;

// Ngày trong tuần
const day = "Wednesday";

// Tính tổng tiền món ăn
let subtotal = 0;

for (let i = 0; i < items.length; i++) {
  subtotal += items[i].price * items[i].quantity;
}

// Tính phần trăm giảm giá
let discountPercent = 0;

if (subtotal > 1000000) {
  discountPercent = 15;
} else if (subtotal > 500000) {
  discountPercent = 10;
}

// Ngày thứ 3 theo đề ghi là Wednesday thì giảm thêm 5%
if (day === "Wednesday") {
  discountPercent += 5;
}

// Tính tiền giảm giá
const discountAmount = (subtotal * discountPercent) / 100;

// Tiền sau giảm giá
const afterDiscount = subtotal - discountAmount;

// VAT 8%
const vat = afterDiscount * 0.08;

// Tip 5% nếu có
let tip = 0;

if (hasTip === true) {
  tip = afterDiscount * 0.05;
}

// Tổng thanh toán
const total = afterDiscount + vat + tip;

// Hàm format tiền Việt Nam
function formatMoney(amount) {
  return amount.toLocaleString("vi-VN") + "đ";
}

// Hàm format k cho từng món
function formatK(amount) {
  return amount / 1000 + "k";
}

// In hóa đơn
console.log("╔══════════════════════════════════════╗");
console.log("║        HÓA ĐƠN NHÀ HÀNG             ║");
console.log("╠══════════════════════════════════════╣");

for (let i = 0; i < items.length; i++) {
  const item = items[i];
  const itemTotal = item.price * item.quantity;

  console.log(
    "║ " +
      (i + 1) +
      ". " +
      item.name +
      " x" +
      item.quantity +
      " @" +
      formatK(item.price) +
      " = " +
      formatK(itemTotal),
  );
}

console.log("╠══════════════════════════════════════╣");

console.log("║ Tổng cộng: " + formatMoney(subtotal));
console.log(
  "║ Giảm giá (" + discountPercent + "%): " + formatMoney(discountAmount),
);
console.log("║ VAT (8%): " + formatMoney(vat));
console.log("║ Tip (5%): " + formatMoney(tip));

console.log("╠══════════════════════════════════════╣");

console.log("║ THANH TOÁN: " + formatMoney(total));

console.log("╚══════════════════════════════════════╝");
