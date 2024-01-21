<template>
  <div>
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
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: "logged-only",
  permissions: ["all"],
});

const { user } = useAuth();

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
</script>

<style scoped></style>
