function createCart() {
  let items = []; // ← biến "private"
  return {
    addItem(name, price) {
      items.push({ name, price });
    },
    getTotal() {
      return items.reduce((sum, i) => sum + i.price, 0);
    },
    printCart() {
      console.log("-----Giỏ hàng -----");
      for (let i = 0; i < items.length; i++) {
        console.log(items[i].name + " - " + items[i].price + "Đ");
      }
      console.log("Tổng tiền:", this.getTotal() + " Đ");
    },
  };
}
const cart = createCart();
cart.addItem("IP 17PRM", 30000000);
cart.addItem("Tai Nghe", 10000000);
cart.addItem("Ốp", 300000);
console.log("Tổng: ", cart.getTotal());
cart.printCart();
console.log(cart.items);
