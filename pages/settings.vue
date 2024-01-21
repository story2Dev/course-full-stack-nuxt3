<template>
  <div class="flex gap-4 max-w-2xl mx-auto mt-4">
    <nav class="w-64 flex flex-col">
      <n-input placeholder="Search"> </n-input>

      <div class="mt-4 flex flex-col">
        <nuxt-link to="/settings/account">Account</nuxt-link>
        <nuxt-link to="/settings/general">General</nuxt-link>
      </div>
    </nav>
    <main class="flex-grow">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts"></script>
