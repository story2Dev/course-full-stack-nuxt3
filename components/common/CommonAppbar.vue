<template>
  <nav class="flex justify-between px-4 py-2 border-b">
    <ul class="flex gap-2 items-center">
      <li>
        <n-input v-model:value="search">
          <template #prefix>
            <Icon name="heroicons-outline:search" size="20" />
          </template>
        </n-input>
      </li>
      <li>
        <button>
          <Icon name="solar:add-circle-bold" size="20" />
        </button>
      </li>
    </ul>

    <ul class="flex gap-4 items-center">
      <li class="flex gap-2 items-center">
        <n-badge :value="20" :max="15">
          <Icon
            name="solar:bell-line-duotone"
            class="text-slate-600"
            size="30"
          />
        </n-badge>
      </li>
      <li>
        <nuxt-link to="/settings/account" class="flex gap-2 items-center">
          <n-avatar circle></n-avatar>
          <h2 class="text-lg font-bold">Mark AI</h2>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const { search } = useApp();
</script>
