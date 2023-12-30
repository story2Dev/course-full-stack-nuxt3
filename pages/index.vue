<template>
  <div>
{{ token }}
  </div>
</template>

<script setup lang="ts">
import { KEY_SESSION, KEY_TOKEN } from '~/constants';

const token = useCookie(KEY_TOKEN);
const session = useCookie(KEY_SESSION);
console.log(token.value)
console.log(session.value)
</script>

<style scoped>

</style>