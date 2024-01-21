<template>
  <div class="flex h-screen divide-x">
    <aside class="flex flex-col h-full p-2 items-center">
      <nuxt-link to="/">
        <h2 class="p-2">LG</h2>
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

<style>
a {
  text-decoration: none;
}
</style>
