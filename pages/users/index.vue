<template>
  <div>
    <section class="px-4 flex justify-between">
      <div>
        <n-input>
          <template #suffix>
            <div>
              <Icon name="heroicons-outline:search" size="20" />
            </div>
          </template>
        </n-input>
      </div>
      <div>
        <nuxt-link to="/users/add">Add</nuxt-link>
      </div>
    </section>
    <section>
      <table class="w-full mt-4">
        <thead class="border-y">
          <tr>
            <td class="px-4 py-1">Name</td>
            <td>Email</td>
            <td>Role</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="user in users">
            <td class="px-4 py-1">{{ user.displayName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.defaultRole }}</td>
            <td>
              <NuxtLink :to="`/users/${user.id}/edit`">Edit</NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
const { client } = useApolloClient();
const USER_QUERY = gql`
  query users {
    users {
      id
      email
      displayName
      defaultRole
    }
  }
`;

const users = ref([]);
async function getUsers() {
  try {
    const { data } = await client.query({ query: USER_QUERY });
    users.value = data.users;
  } catch (error) {
    console.log(error);
  }
}

getUsers();
</script>
