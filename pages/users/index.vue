<template>
  <div>
    <section class="px-4 flex justify-between">
      <div>
        <n-input>
          <template #suffix>
            <div>
              <Icon name="heroicons-outline:search" size="20" />
            </div>
          </template>
        </n-input>
      </div>
      <div>
        <nuxt-link to="/users/add">Add</nuxt-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts"></script>
