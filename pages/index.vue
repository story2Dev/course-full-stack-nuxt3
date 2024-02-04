<template>
  <div>
    <h1>Welcome</h1>
    <!-- {{ token }} -->
    <ul>
      <li v-for="todo in result?.todo">
        <span>{{ todo.task }}</span> [{{ todo.status }}]
      </li>
    </ul>
    <hr>
    <div v-if="user?.defaultRole =='admin'">
      edit
    </div>

    {{ $hello('Mark') }}
    <button @click="$log.info('log click')">log</button>
    <hr />
    {{ setting }}
    <n-date-picker :format="setting.formatDate"></n-date-picker>
    <n-date-picker format="dd/MM/yyyy"></n-date-picker>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  // middleware: "logged-only",
  permissions: ["all"],
});
const { $hello, $log } = useNuxtApp()
const { user } = useAuth();
const { setting } = useApp()

const query = gql`
  subscription {
    todo(where: { status: { _eq: false } }) {
      id
      task
      status
    }
  }
`;
const variables = { channelId: "abc" };
const { result, error } = useSubscription(query);

onMounted(() => {
  $log.info('Mounted')
  $log.warn('Mounted')
  $log.error('Mounted')
})
</script>

<style scoped></style>
