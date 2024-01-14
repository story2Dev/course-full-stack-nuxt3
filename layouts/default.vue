<template>
  <div class="flex h-screen divide-x">
    <aside class="flex flex-col h-full p-2 items-center">
      <h2 class="p-2">LG</h2>
      <nav class="flex flex-col items-center justify-center mt-4 space-y-4">
        <nuxt-link to="/">
          <Icon name="heroicons-outline:home" size="20" />
        </nuxt-link>
        <nuxt-link to="/products">
          <Icon name="heroicons:archive-box" size="20" />
        </nuxt-link>
      </nav>
    </aside>
    <main class="flex-grow">
        <nav class="flex justify-between">
          <ul>
            <li class="flex gap-2 items-center">
              <n-avatar circle></n-avatar>
              <h2>Mark AI</h2>
            </li>
          </ul>

          <ul>
            <li>
              <button>
                <Icon name="heroicons-outline:logout" size="20" />
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
