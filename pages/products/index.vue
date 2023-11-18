<template>
    <div>
        Product page - 
        <nuxt-link to="/products/add">Add</nuxt-link>
        <button @click="$router.push('/products/add')">
            add
        </button>
        <table>
            <tr>
                <td>Name</td>
                <td>Price</td>
                <td>Action</td>
            </tr>
            <tr>
                <td>
                    <nuxt-link to="/products/1">Pepsi</nuxt-link>
                </td>
                <td>10,000</td>
                <td>
                    <nuxt-link to="/products/1/edit">Edit</nuxt-link>
                </td>
            </tr>
            <tr>
                <td>
                    <nuxt-link to="/products/2">Coca Cola</nuxt-link>
                </td>
                <td>100,000</td>
                <td>
                    <nuxt-link to="/products/2/edit">Edit</nuxt-link>
                </td>
            </tr>
        </table>
    </div>
</template>


<script setup>
useHead({
    title:'Product',
})
</script>