<template>
  <div>
    <section>
      <n-tabs type="line" animated :tabs-padding="16">
        <n-tab-pane name="product" tab="Product">
          <template #tab>
            <nuxt-link to="/products">Product</nuxt-link>
          </template>
        </n-tab-pane>
        <n-tab-pane name="stock" tab="Stock">
          <template #tab>
            <nuxt-link to="/products/stock">Stock</nuxt-link>
          </template>
        </n-tab-pane>
        <n-tab-pane name="category" tab="Category">
          <template #tab>
            <nuxt-link to="/products/category">Category</nuxt-link>
          </template>
        </n-tab-pane>
      </n-tabs>
    </section>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts"></script>
