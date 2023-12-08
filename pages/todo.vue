<template>
  <div>
    <h1>Todo x</h1>
    <div>{{ todos }}</div>
  </div>
</template>

<script setup lang="ts">
const TODO_QUERY = gql`
  query todo($limit: Int , $offset: Int, $orderBy: [todo_order_by!], $where: todo_bool_exp) {
    todos: todo(limit: $limit, offset: $offset, order_by: $orderBy, 
    where: $where
    ) {
      id
      task
    }
  }
`;

const todos = ref([]);
const limit = 2
async function getTodos() {
  const { data, error } = await useAsyncQuery(TODO_QUERY, {
    limit,
    orderBy:{
        id: 'desc'
    },
    where:{
        id: {
            _eq: 2
        }
    }
  });
  console.log({ data, error });
  if (data) {
    todos.value = data.value?.todos;
  }
}

getTodos();
</script>
