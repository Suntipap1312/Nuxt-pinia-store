<template>
  <div class="flex">
    <button class="btn" @click="cartStore.decreaseQty(product)">-</button>
    <p class="py-1 px-4 mx-1 rounded-sm text-lg bg-gray-200">
      {{ product.quantity }}
    </p>
    <button class="btn" @click="cartStore.increaseQty(product)">+</button>
  </div>
</template>

<script setup>
import { useCartStore } from "~~/stores/cartStore";
defineProps(["product"]);
const cartStore = useCartStore();
</script>

<style scoped></style>
