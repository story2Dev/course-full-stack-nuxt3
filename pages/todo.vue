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
const {
  todos,
  current,
  addTodo,
  getTodos,
  handleUpdate,
  task,
  handleEdit,
  handleDelete,
} = useTodo();

getTodos();
</script>
