<template>
  <nav class="flex justify-between p-2 border-b">
    <ul>
      <li class="flex gap-2 items-center">
        <n-avatar circle></n-avatar>
        <h2 class="text-lg font-bold">Mark AI</h2>
      </li>
    </ul>

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
          <Icon name="heroicons:chat-bubble-bottom-center-text" size="20" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const { search } = useApp();
</script>
