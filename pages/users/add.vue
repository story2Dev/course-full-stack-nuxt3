<template>
  <div>
    <section class="px-4">
      <n-form class="max-w-2xl w-full mx-auto">
        <h3 class="text-2xl mb-2 flex gap-2 items-center">
          <button @click="$router.back()">
            <Icon name="system-uicons:arrow-left" size="20" />
          </button>
          Add User
        </h3>
        <n-form-item label="Name" path="name">
          <n-input v-model:value="frm.displayName" placeholder="Name"></n-input>
        </n-form-item>
        <n-form-item label="Email" path="email">
          <n-input v-model:value="frm.email" placeholder="Email"></n-input>
        </n-form-item>
        <n-form-item label="Password" path="password">
          <n-input
            v-model:value="frm.password"
            placeholder="Password"
          ></n-input>
        </n-form-item>
        <n-form-item label="Role" path="role">
          <n-select v-model:value="frm.defaultRole" :options="roleOptions" />
        </n-form-item>
        <div>
          <n-button type="primary" :loading="loading" @click="handleAddUser">
            Add
          </n-button>
        </div>
      </n-form>
    </section>
  </div>
</template>

<script setup lang="ts">
const frm = ref({
  displayName: "",
  email: "",
  password: "",
  defaultRole: "user",
});

const loading = ref(false);

const roleOptions = [
  {
    value: "user",
    label: "User",
  },
  {
    value: "manager",
    label: "Manager",
  },
  {
    value: "admin",
    label: "Admin",
  },
];

const config = useRuntimeConfig();
const notification = useNotification();

const UPDATE_USER = gql`
  mutation ($email: citext!, $object: users_set_input) {
    updateUsers(_set: $object, where: { email: { _eq: $email } }) {
      returning {
        id
      }
    }
  }
`;

const { client } = useApolloClient();

async function handleAddUser() {
  try {
    const { email, password, displayName, defaultRole } = frm.value;
    if (!email || !password || !displayName) {
      notification.error({
        title: "Error",
        description: "Please fill all fields",
        duration: 3000,
      });
      return;
    }
    loading.value = true;
    const req = await $fetch(config.public.authApi + "/signup/email-password", {
      method: "POST",
      body: {
        email,
        password,
        options: {
          displayName,
        },
      },
    });
    console.log(req);
    // update user role
    client.mutate({
      mutation: UPDATE_USER,
      variables: {
        email,
        object: {
          defaultRole,
          locale: "en",
          metadata: {
            firstName: "John",
            lastName: "Smith",
          },
        },
      },
    });
    loading.value = false;
    notification.success({
      title: "Create User",
      description: "User created successfully",
      duration: 3000,
    });
  } catch (error) {
    notification.error({
      title: "Error",
      description: "Error something went wrong",
      duration: 3000,
    });
    loading.value = false;
    console.log(error);
  }
}
</script>
