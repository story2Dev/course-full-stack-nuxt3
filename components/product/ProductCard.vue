<template>
  <div class="card">
    <img class="p-img" :src="imageUrl" alt="Cake" />
    <div class="info">
      <h3>{{ name }}</h3>
      <p>$ {{ price }}</p>
      <button @click="addToCart">Add to Cart</button>
      <button @click="handleRemove">Remove</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const prop = defineProps({
  imageUrl: String,
  name: String,
  price: Number,
});
const emit = defineEmits(["add-to-cart", "remove"]);

function addToCart() {
  console.log("Add to cart");
  emit("add-to-cart", prop);
}

function handleRemove() {
  console.log("Remove from cart");
  emit("remove", prop);
}
</script>

<style scoped>
.p-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.info {
  padding: 4px;
}
.card {
  border: 1px solid #dbdbdb;
  border-radius: 4px;
}
</style>
