function createCart() {
  // Private data
  let items = [];
  let discount = 0;

  function formatMoney(amount) {
    return amount.toLocaleString("vi-VN") + "đ";
  }

  return {
    // Thêm sản phẩm
    addItem(product, quantity = 1) {
      const existingItem = items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
        });
      }
    },

    // Xóa sản phẩm theo id
    removeItem(productId) {
      items = items.filter((item) => item.id !== productId);
    },

    // Cập nhật số lượng
    updateQuantity(productId, newQuantity) {
      const item = items.find((item) => item.id === productId);

      if (!item) {
        console.log("Không tìm thấy sản phẩm có id:", productId);
        return;
      }

      if (newQuantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = newQuantity;
      }
    },

    // Tính tổng tiền sau giảm giá
    getTotal() {
      const subtotal = items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);

      return subtotal - discount;
    },

    // Áp dụng mã giảm giá
    applyDiscount(code) {
      const subtotal = items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);

      if (code === "SALE10") {
        discount = subtotal * 0.1;
      } else if (code === "SALE20") {
        discount = subtotal * 0.2;
      } else if (code === "FREESHIP") {
        discount = 30000;
      } else {
        discount = 0;
        console.log("Mã giảm giá không hợp lệ");
      }
    },

    // In giỏ hàng
    printCart() {
      console.log("┌──────────────────────────────────────────────┐");
      console.log("│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │");
      console.log("├──────────────────────────────────────────────┤");

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemTotal = item.price * item.quantity;

        console.log(
          "│ " +
            (i + 1) +
            " │ " +
            item.name +
            " │ " +
            item.quantity +
            " │ " +
            formatMoney(item.price) +
            " │ " +
            formatMoney(itemTotal) +
            " │",
        );
      }

      console.log("├──────────────────────────────────────────────┤");

      const subtotal = items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);

      if (discount > 0) {
        console.log("│ Tạm tính: " + formatMoney(subtotal));
        console.log("│ Giảm giá: " + formatMoney(discount));
      }

      console.log("│ Tổng cộng: " + formatMoney(this.getTotal()));
      console.log("└──────────────────────────────────────────────┘");
    },

    // Lấy tổng số sản phẩm
    getItemCount() {
      return items.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
    },

    // Xóa toàn bộ giỏ hàng
    clearCart() {
      items = [];
      discount = 0;
    },
  };
}

// === TEST ===
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

console.log("=== GIỎ HÀNG BAN ĐẦU ===");
cart.printCart();

cart.applyDiscount("SALE10");

console.log("\n=== SAU KHI ÁP DỤNG SALE10 ===");
cart.printCart();

console.log("\nSố SP:", cart.getItemCount());

cart.removeItem(3);

console.log("Sau xóa:", cart.getItemCount());

console.log("\n=== GIỎ HÀNG SAU KHI XÓA AIRPODS ===");
cart.printCart();
