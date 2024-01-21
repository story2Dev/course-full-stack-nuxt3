<template>
  <div>
    <h3>Account</h3>
    <ul>
        <li class="text-xl">{{ user?.displayName }}</li>
        <li>{{ user?.email }}</li>
        <li>
            <button @click="logOut">Log out</button>
        </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { user, logOut } = useAuth();
</script>
