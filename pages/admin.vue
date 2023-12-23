<template>
    <div>
        Admin
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'admin-only'
}) 
</script>

<style scoped>

</style>