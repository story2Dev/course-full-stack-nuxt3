<template>
  <nav class="flex flex-col items-center justify-center mt-4 space-y-2">
    <nuxt-link
      v-for="item in menu"
      :key="item.title"
      :to="item.link"
      active-class="text-blue-700 bg-blue-100"
      class="rounded-lg p-2"
      :class="isActive(item.link) ? 'text-blue-700 bg-blue-100' : ''"
    >
      <Icon :name="item.icon" size="20" />
    </nuxt-link>
  </nav>
</template>

<script setup lang="ts">
const menu = [
  {
    icon: "heroicons-outline:home",
    title: "Home",
    link: "/",
  },
  {
    icon: "heroicons-outline:archive-box",
    title: "Products",
    link: "/products",
  },
  {
    icon: "heroicons:cog-solid",
    title: "Setting",
    link: "/settings",
  },
];

// check active path
const route = useRoute();
const activePath = computed(() => route.path);

const isActive = (path: string) => {
  if (!path) return false;

  if (path === "/") {
    return activePath.value === "/";
  }

  const pathArr = path.split("/")[1];
  const current  = activePath.value.split('/')[1]
  return pathArr === current
};


</script>
