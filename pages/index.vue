<template>
  <div>
    <p class="text-white text-2xl text-center my-8">All Products</p>
    <div class="text-white text-center" v-if="cartStore.isLoading">
      Loading...
    </div>

    <div class="grid grid-cols-2 gap-7" v-else>
      <div v-for="product in products" :key="product.id">
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "~~/stores/cartStore";
// Fetch products
const cartStore = useCartStore();
console.log(cartStore.isLoading);
const products = await cartStore.getAll();
// const { data: products } = await useFetch("http://localhost:4000/products");
</script>

<style scoped></style>
