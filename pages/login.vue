<template>
    <div>
        <h1>Login</h1>
        <input type="text">
        <input type="password">
        <input type="button" value="Login">
        <nuxt-link to="/">Home</nuxt-link> |
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'blank',
})
</script>

<style scoped>

</style>