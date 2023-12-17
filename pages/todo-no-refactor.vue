<template>
  <div>
    <h1>Todo x</h1>
    <div>
      <input v-model="task" class="border p-2" type="text" />
      <button class="bg-green-100 border p-2" @click="addTodo">add</button>

      <ul class="p-4 divide-y">
        <li v-for="todo in todos" :key="todo.id" class="py-1">
          <div v-if="current.id == todo.id">
            <input v-model="current.task" type="text" class="border" />
            <button class="border" @click="handleUpdate">update</button>
            <button class="border" @click="current.id = 0">cancel</button>
          </div>
          <div v-else>
            <span>{{ todo.task }}</span>
            <button class="border bg-green-400" @click="handleEdit(todo)">
              edit
            </button>
            <button class="border bg-red-400" @click="handleDelete(todo)">
              delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
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
    todo: insert_todo_one(object: $object) {
      id
      task
    }
  }
`;

const DELETE_TODO = gql`
  mutation ($id: Int!) {
    delete_todo_by_pk(id: $id) {
      id
      task
    }
  }
`;

const UPDATE_TODO = gql`
  mutation ($id: Int!, $set: todo_set_input) {
    todo: update_todo_by_pk(pk_columns: { id: $id }, _set: $set) {
      id
      task
    }
  }
`;

const { client } = useApolloClient();
const todos = useState<any[]>("todos", () => []);

const current = ref({
  id: 0,
  task: "",
});

const limit = 10;
async function getTodos() {
  const { data, error } = await useAsyncQuery(TODO_QUERY, {
    limit,
    orderBy: {
      id: "desc",
    },
  });
  console.log({ data, error });
  if (data) {
    todos.value = data.value?.todos;
  }
}

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
    if (data) {
      todos.value = [data.todo, ...todos.value];
      task.value = "";
    }
  } catch (error) {
    throw new Error(`[addTodo]: error: ${error}`);
  }
}

function handleUpdate() {
  const items = todos.value.map((item: any) => {
    if (item.id === current.value.id) {
      return current.value;
    }
    return item;
  });

  const { id, task } = current.value;

  client.mutate({
    mutation: UPDATE_TODO,
    variables: {
      id,
      set: {
        task,
      },
    },
  });

  todos.value = items;
  current.value = {
    id: 0,
    task: "",
  };
}

function handleDelete(todo: any) {
  console.log(todo);
  const items = todos.value.filter((item: any) => item.id !== todo.id);
  client.mutate({
    mutation: DELETE_TODO,
    variables: {
      id: todo.id,
    },
  });
  todos.value = items;
}

const task = ref("");
function handleEdit(todo: any) {
  console.log(todo);
  current.value = {
    ...todo,
  };
}

onMounted(() => {
  getTodos();
});
</script>
