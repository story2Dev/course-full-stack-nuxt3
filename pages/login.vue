<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <section class="w-full max-w-sm mx-auto flex flex-col space-y-2">
      <h1 class="text-xl" id="title">Login</h1>
      <n-input v-model:value="frm.email" type="text" placeholder="Email" id="email" />
      <n-input
        v-model:value="frm.password"
        type="password"
        placeholder="Password" id="password"
        @keyup.enter="handleLogin()"
      />
      <n-button :loading="loading" type="primary" id="login" @click="handleLogin()">
        Login
      </n-button>

      <div>
        <n-button id="google" @click="handleSignInWithSocial('google')">
          Sign in with Google
          <icon name="logos:google-icon" size="20" />
        </n-button>

        <n-button @click="handleSignInWithSocial('facebook')">
          Sign in with Facebook
          <icon name="logos:facebook" size="20" />
        </n-button>

        <button @click="test">test</button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blank",
});

const notification = useNotification();
const auth = useAuth();
const frm = ref({
  email: "",
  password: "",
});
const loading = ref(false);

const { nhost } = useNhost();

async function handleSignInWithSocial(provider = "google") {
  switch (provider) {
    case "google":
      const res = await nhost.auth.signIn({
        provider: "google",
      });

      console.log(res);
      break;

    case "facebook":
      const res2 = await nhost.auth.signIn({
        provider: "facebook",
      });

    default:
      break;
  }
}

function test() {
  console.log(nhost.auth.getUser());
}

async function handleLogin() {
  try {
    loading.value = true;
    const { email, password } = frm.value;
    nhost.auth.signIn({
      email,
      password,
    });
    const isLogged = await auth.signIn(email, password);
   

    if (isLogged) {
      notification.success({
        title: "Authentication success",
        description: "You are now logged in",
        duration: 3000,
      });
      navigateTo("/");
    }

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
