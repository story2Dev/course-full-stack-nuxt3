<template>
  <div>
    <h1>Todo x</h1>
    <div>
      <input v-model="task" class="border p-2" type="text" />
      <button class="bg-green-100 border p-2" @click="addTodo">add</button>

      <ul class="bg-gray-200 p-4">
        <li v-for="todo in todos" :key="todo.id">
          {{ todo.task }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const { client } = useApolloClient();
const TODO_QUERY = gql`
  query todo(
    $limit: Int
    $offset: Int
    $orderBy: [todo_order_by!]
    $where: todo_bool_exp
  ) {
    todos: todo(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      task
    }
  }
`;

const INSERT_TODO = gql`
  mutation insert_todo_one($object: todo_insert_input!) {
    insert_todo_one(object: $object) {
      id
      task
    }
  }
`;

const task = ref("");
const todos = ref([]);
const limit = 2;
async function getTodos() {
  const { data, error } = await useAsyncQuery(TODO_QUERY, {
    limit,
    orderBy: {
      id: "desc",
    },
    // where:{
    //     id: {
    //         _eq: 2
    //     }
    // }
  });
  console.log({ data, error });
  if (data) {
    todos.value = data.value?.todos;
  }
}

getTodos();

async function addTodo() {
  try {
    const { data, errors } = await client.mutate({
      mutation: INSERT_TODO,
      variables: {
        object: {
          task: task.value,
        },
      },
    });
    console.log({ data, errors });
  } catch (error) {
    throw new Error(`[addTodo]: error: ${error}`);
  }
}
</script>
