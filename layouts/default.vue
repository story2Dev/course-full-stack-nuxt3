<template>
  <div class="flex h-screen divide-x">
    <aside class="flex flex-col h-full p-2 items-center">
      <nuxt-link to="/">
        <img v-if="setting.logo" :src="setting.logo" alt="LG" width="30" />
        <h2 v-else class="p-2">LG</h2>
      </nuxt-link>
      <CommonSidebar />
    </aside>
    <main class="flex-grow">
      <CommonAppbar />
      <div class="flex-grow py-4">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
const { setting, loadSetting } = useApp();
loadSetting();
</script>

<style>
a {
  text-decoration: none;
}
</style>
