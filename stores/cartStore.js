import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    isLoading: false,
    cart: [],
  }),
  getters: {
    cartTotal() {
      return this.cart.reduce((accomulator, currentValue) => {
        return accomulator + currentValue.price * currentValue.quantity;
      }, 0);
    },
    numberOfProducts() {
      const total = this.cart.reduce((total, item) => total + item.quantity, 0);
      return total;
    },
  },
  actions: {
    async getAll() {
      this.isLoading = true;
      const { data } = await useFetch("http://localhost:4000/products");
      this.isLoading = false;
      return data;
    },
    async getCart() {
      const data = await $fetch("http://localhost:4000/cart");
      this.cart = data;
    },

    async deleteFromCart(product) {
      this.cart = this.cart.filter((p) => {
        return p.id !== product.id;
      });

      // make delete request
      await $fetch("http://localhost:4000/cart/" + product.id, {
        method: "DELETE",
      });
    },

    async increaseQty(product) {
      let updateProduct;
      // map return a new array
      this.cart = this.cart.map((p) => {
        if (p.id === product.id) {
          p.quantity++;
          updateProduct = p;
        }
        return p;
      });

      // make put request
      await $fetch("http://localhost:4000/cart/" + product.id, {
        method: "PUT",
        body: JSON.stringify(updateProduct),
      });
    },

    async decreaseQty(product) {
      let updateProduct;
      // return new array เข้าไปใน this.cart
      this.cart = this.cart.map((p) => {
        // หาตัวที่ id === id ที่ส่งมา
        if (p.id === product.id && p.quantity > 1) {
          p.quantity--;
          updateProduct = p;
        }
        // return p ใน cart ที่ไม่ได้แก้อะไรเลย
        return p;
      });
      if (updateProduct) {
        await $fetch("http://localhost:4000/cart/" + product.id, {
          method: "PUT",
          body: JSON.stringify(updateProduct),
        });
      }
    },

    async addToCart(payload) {
      const exists = this.cart.find((p) => p.id === payload.id);

      const product = {
        ...payload,
        quantity: 1,
      };
      if (!exists) {
        this.cart.push(product);
      } else {
        return this.increaseQty(payload);
      }

      // make post request
      await $fetch("http://localhost:4000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, quantity: 1 }),
      });
    },
  },
});
