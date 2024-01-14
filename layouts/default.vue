<template>
  <div class="flex h-screen divide-x">
    <aside class="flex flex-col h-full p-2 items-center">
      <nuxt-link to="/">
        <h2 class="p-2">LG</h2>
      </nuxt-link>
      <CommonSidebar />
    </aside>
    <main class="flex-grow">
      <nav class="flex justify-between p-2">
        <ul>
          <li class="flex gap-2 items-center">
            <n-avatar circle></n-avatar>
            <h2 class="text-lg font-bold">Mark AI</h2>
          </li>
        </ul>

        <ul class="flex gap-2 items-center">
          <li>
            <n-input>
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
      <div class="flex-grow">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<style>
a {
  text-decoration: none;
}
</style>
