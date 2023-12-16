<script setup lang="ts">

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

function xx() {
  console.log("xx");
}

const name = ref('mark')

watch(() => name.value, (newVal, oldVal) => {
  xx()
})

const name2 = computed(() => {
  return name.value + '2'
})

onMounted(() => {
  console.log('mounted')
});

onUnmounted(() => {
  console.log('unmounted')
});


</script>
<template>
  <div>
    {{ name2 }}
    <n-button>Default</n-button>
    <n-button type="tertiary"> Tertiary </n-button>
    <n-input type="text" placeholder="Basic Input" />
    <input v-model="name" type="text" id="name" class="border p-2">
  </div>
</template>
