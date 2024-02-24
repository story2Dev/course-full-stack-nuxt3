<template>
    <div class="flex gap-4 max-w-xl mx-auto">
        <div>
          <n-input placeholder="Search"></n-input>
          <nav class="flex flex-col">
            <nuxt-link-locale to="/settings/account">Account</nuxt-link-locale>
            <nuxt-link-locale to="/settings/general">General</nuxt-link-locale> 
        </nav>
        </div>
        <main class="flex-grow">
          <NuxtPage />
        </main>
    </div>
</template>