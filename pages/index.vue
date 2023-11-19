<script setup lang="ts">
const name = 'Chocolate Cake';
const price = 10;

const carts = useState<any[]>('carts', ()=> [])

function addToCart(item: any) {
    console.log(item)
    carts.value.push(item)
}
function handleRemove(item: any) {
    console.log(item)
}

const products = [
    {name: 'Chocolate Cake', price: 10, imageUrl: 'https://joyfoodsunshine.com/wp-content/uploads/2020/08/best-chocolate-cake-recipe-from-scratch-8.jpg'},
    {name: 'Cake', price: 20, imageUrl: 'https://joyfoodsunshine.com/wp-content/uploads/2020/08/best-chocolate-cake-recipe-from-scratch-8.jpg'},
]

</script>
<template>
    <div>
        {{ carts.length }}
        <ProductCard v-for="(item, index) in products" 
         :key="index" 
         :name="item.name"
         :price="item.price"
         :image-url="item.imageUrl" 
         @add-to-cart="addToCart" @remove="handleRemove">
        </ProductCard>
    </div>
</template>
