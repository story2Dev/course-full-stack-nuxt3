<script setup lang="ts">
const name = "Chocolate Cake";
const price = 10;

const carts = useState<any[]>("carts", () => []);

function addToCart(item: any) {
  console.log(item);
  carts.value.push(item);
}
function handleRemove(item: any) {
  console.log(item);
}

const products = [
  {
    name: "Chocolate Cake",
    price: 10,
    imageUrl:
      "https://joyfoodsunshine.com/wp-content/uploads/2020/08/best-chocolate-cake-recipe-from-scratch-8.jpg",
  },
  {
    name: "Cake",
    price: 20,
    imageUrl:
      "https://joyfoodsunshine.com/wp-content/uploads/2020/08/best-chocolate-cake-recipe-from-scratch-8.jpg",
  },
];

function testError() {
  try {
    throw new Error("[testError]: test error");
  } catch (error) {
    throw new Error("[testError]: test error");
  }
}
</script>
<template>
  <div>
    <n-button>Default</n-button>
    <n-button type="tertiary"> Tertiary </n-button>
    <n-input type="text" placeholder="Basic Input" />
  </div>
</template>
