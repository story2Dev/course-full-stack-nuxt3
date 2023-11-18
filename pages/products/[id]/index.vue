<template>
    <div>
        Product ID {{ $route.params.id }}
    </div>
</template>

<script setup lang="ts">
    const { params } = useRoute()
    const route = useRoute()
    console.log(params)
    console.log(route)

    useHead({
        title:'Product ID ' + params.id,
    })
</script>