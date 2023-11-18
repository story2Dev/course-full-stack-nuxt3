<template>
  <div
    class="flex max-w-2xl w-full mx-auto gap-4 border p-4 rounded-xl min-h-[300px]"
  >
    <nav class="w-64">
      <div class="relative">
        <input
          type="text"
          class="mb-2 w-full border rounded-lg px-6 text-sm py-1"
          placeholder="search"
        />
        <Icon
          name="system-uicons:search"
          class="absolute left-2 mt-2 text-grey-dark"
        ></Icon>
      </div>
      <div class="my-2 mb-4 flex gap-2">
        <div>
          <img
            class="w-12 w-12 rounded-full"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt=""
          />
        </div>
        <div>
          <p class="">
            <h1 class="font-bold text-sm">
                Mark AI
            </h1>
            <small>Apple ID</small>
          </p>
         
        </div>
      </div>
      <ul class="w-full flex flex-col">
        <li class="w-full">
          <nuxt-link
            to="/settings/account"
            active-class="bg-green-100"
            class="hover:bg-slate-100 w-full rounded-lg py-1 px-2  flex gap-2 items-center text-sm"
          >
            <Icon name="system-uicons:user" class="text-grey-dark" size="20"></Icon>
            <span>Account</span>
          </nuxt-link>
        </li>
        <li class="w-full">
          <nuxt-link
            to="/settings/general"
            active-class="bg-green-100"
            class="hover:bg-slate-100 w-full rounded-lg py-1 px-2  flex gap-2 items-center text-sm"
          >
            <Icon name="system-uicons:settings" class="text-grey-dark" size="20"></Icon>
            <span>General</span>
          </nuxt-link>
        </li>
        <li class="w-full">
          <nuxt-link
            to="/settings/notification"
            active-class="bg-green-100"
            class="hover:bg-slate-100 w-full rounded-lg py-1 px-2 flex gap-2 items-center text-sm"
          >
            <Icon name="system-uicons:bell" class="text-grey-dark" size="20"></Icon>
            <span>Notification</span>
          </nuxt-link>
        </li>
       
      </ul>
    </nav>
    <main class="flex-grow">
      <h2 class="text-xl mb-2 flex gap-2 items-center">
        <Icon name="system-uicons:chevron-left" class="text-grey-dark" size="20"></Icon>
        <Icon name="system-uicons:chevron-right" class="text-grey-dark" size="20"></Icon>
        <span>Settings</span>
      </h2>
      <NuxtPage />
    </main>
  </div>
</template>
