import { DELETE_TODO, INSERT_TODO, UPDATE_TODO } from "~/gql/mutate";
import { TODO_QUERY } from "~/gql/query";

export const useTodo = () => {
  const { client } = useApolloClient();
  const todos = useState("todos", () => []);

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

  return {
    todos,
    addTodo,
    getTodos,
    current,
    handleUpdate,
    handleDelete,
    task,
    handleEdit,
  };
};
