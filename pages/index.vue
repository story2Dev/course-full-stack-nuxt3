<template>
  <div>
    <!-- {{ token }} -->
    <ul>
      <li v-for="todo in result?.todo">
        <span>{{ todo.task }}</span> [{{ todo.status }}]
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { KEY_SESSION, KEY_TOKEN } from "~/constants";

const token = useCookie(KEY_TOKEN);
const session = useCookie(KEY_SESSION);
console.log(token.value);
console.log(session.value);

const products = await useFetch("/api/products");

console.log(products.data?.value);

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
console.log({ result, error });
</script>

<style scoped></style>
