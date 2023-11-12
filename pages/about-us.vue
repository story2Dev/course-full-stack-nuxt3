<template>
    <div>
        About Us
        {{ frm }}
        <input v-model="frm.email">
        <button @click="setEmail()">set email</button>
        <hr />
        {{ counter }}
        <button @click="increment">+</button>
    </div>
</template>

<script setup lang="ts">
    const {counter, increment, decrement} = useCounter()
    const frm = reactive({
        email: "example.com",
        password: "",
    });

    function setEmail() {
        frm.email = "mark@email";
        counter.value = counter.value + 1;
    }


</script>

<style scoped>

</style>