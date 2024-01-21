<template>
    <div>
        User
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'has-permission',
    // check from default role
    permissions: ['admin', 'user', 'manager']
})

</script>
