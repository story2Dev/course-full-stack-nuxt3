<template>
  <div>
    <button  @click="getTodos()">test</button>
    <h1>Hello, Nuxt 3!</h1>
    <input type="text" id="input" />

  </div>
</template>

<script setup>
const { nhost } = useNhost();
const q = `
  query {
    todo{
      id
      task
    }
  }
`;

function getTodos() {
  nhost.graphql.request(q).then((data) => {
    console.log({ data });
  });
}

onMounted(() => {
  getTodos();
});

</script>
