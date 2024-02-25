<template>
  <naive-config :theme-config="themeConfig">
    <n-notification-provider>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </n-notification-provider>
  </naive-config>
</template>

<script setup lang="ts">
import { themeConfig } from "./theme.config";
</script>
