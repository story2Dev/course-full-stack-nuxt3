<template>
  <div>
    <h1>Login</h1>
    <input v-model="frm.email" type="text" placeholder="Email" />
    <input v-model="frm.password" 
     @keyup.enter="handleLogin()"
     type="password" placeholder="Password" />
    <input type="button" value="Login" @click="handleLogin()" />
    <hr />
    Email: {{ frm.email }},
    Password: {{ frm.password }}
    <nuxt-link to="/">Home</nuxt-link> |
    {{ 1-3 }}
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blank",
});

const frm = ref({
  email: "example.com",
  password: "",
});


function handleLogin() {
  console.log(frm.value);
}


</script>

<style scoped></style>
