<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <section class="w-full max-w-sm mx-auto flex flex-col space-y-2">
      <h1 class="text-xl" id="title">Login</h1>
      <n-input
        v-model:value="frm.email"
        type="text"
        placeholder="Email"
        id="email"
      />
      <n-input
        v-model:value="frm.password"
        type="password"
        placeholder="Password"
        id="password"
        @keyup.enter="handleLogin()"
      />
      <n-button
        :loading="loading"
        type="primary"
        id="login"
        @click="handleLogin()"
      >
        Login
      </n-button>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blank",
});

const notification = useNotification();
const frm = ref({
  email: "",
  password: "",
});
const loading = ref(false);

const { nhost } = useNhost();

async function handleLogin() {
  try {
    loading.value = true;
    const { email, password } = frm.value;
    const req = await nhost.auth.signIn({
      email,
      password,
    });

    console.log(req);

    loading.value = false;
  } catch (error) {
    notification.error({
      title: "Authentication failed",
      description: "Email or password is incorrect",
      duration: 3000,
    });
    loading.value = false;
    console.log(error);
  }
}
</script>
