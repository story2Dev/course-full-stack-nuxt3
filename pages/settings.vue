<template>
  <div class="flex gap-4 max-w-xl mx-auto">
    <div>
      <n-input placeholder="Search">
        <template #prefix>
          <Icon name="system-uicons:search" size="20" />
        </template>
      </n-input>
      <nav class="flex flex-col py-1 mt-2">
        <nuxt-link-locale
          to="/settings/account"
          class="rounded p-2"
          active-class="bg-primary-100"
          >Account</nuxt-link-locale
        >
        <nuxt-link-locale
          to="/settings/general"
          class="rounded p-2"
          active-class="bg-primary-100"
        >
          General
        </nuxt-link-locale>
      </nav>
    </div>
    <main class="flex-grow">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "admin-only",
});
</script>

<style></style>
