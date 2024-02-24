<template>
  <div class="w-full">
    Account
    <div class="my-2 mb-4 flex gap-2">
      <div>
        <img
          class="w-12 h-12 rounded-full"
          src="https://avatars.githubusercontent.com/u/739984?v=4"
          alt=""
        />
      </div>
      <div class="flex flex-grow justify-between items-center">
        <div>
          <h1 class="font-bold text-sm">Mark AI</h1>
          <small>Apple ID</small>
        </div>
        <button>Edit</button>
      </div>
    </div>
    <ul class="border rounded-lg py-4 px-4 divide-y">
      <li class="flex justify-between py-1">
        <div>
          <h3 class="font-bold text-sm">Name</h3>
          <p class="text-sm">Mark AI</p>
        </div>
        <button class="text-sm">Edit</button>
      </li>
      <li class="flex justify-between py-1">
        <div>
          <h3 class="font-bold text-sm">Email</h3>
          <p class="text-sm">mark@email.com</p>
        </div>
        <button class="text-sm">Edit</button>
      </li>
    </ul>

    <ul class="border rounded-lg py-4 px-4 divide-y mt-6 mb-4">
      <li class="flex justify-between py-2">
        <div>
          <h3 class="font-bold text-sm">{{ $t("language") }}</h3>
        </div>
        <div>
          <NuxtLink :to="switchLocalePath('en')">English</NuxtLink> |
          <NuxtLink :to="switchLocalePath('lo')">Lao</NuxtLink>
        </div>
      </li>
      <li class="py-2">
        <div>
          <h3 class="font-bold text-sm">Theme</h3>
        </div>
        <ol class="mt-2 flex gap-2">
          <li class="border rounded-lg p-4 px-6 flex items-center gap-2">
            <Icon
              name="system-uicons:sun"
              class="text-yellow-500"
              size="20"
            ></Icon>
            Light
          </li>
          <li class="border rounded-lg p-4 px-6 flex gap-2 items-center">
            <Icon
              name="system-uicons:moon"
              class="text-yellow-500"
              size="20"
            ></Icon>
            Dark
          </li>
        </ol>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
</script>
