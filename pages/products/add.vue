<template>
    <div>
        Add Product
        <form action="">
            <label for="name">Name</label>
            <input type="text" name="name" id="name">
            <label for="price">Price</label>
            <input type="text" name="price" id="price">
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script setup>
useHead({
    title:'Add Product'
})
</script>