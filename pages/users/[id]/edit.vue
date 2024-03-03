<template>
  <div>
    <section class="px-4">
      <n-form class="max-w-2xl w-full mx-auto">
        <h3 class="text-2xl mb-2 flex gap-2 items-center">
          <button @click="$router.back()">
            <Icon name="system-uicons:arrow-left" size="20" />
          </button>
          Edit User
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
          <n-button type="primary" :loading="loading" @click="handleUpdateUser">
            Update
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
  mutation ($id: uuid!, $object: users_set_input) {
    updateUser(_set: $object, pk_columns: { id: $id }) {
      id
    }
  }
`;

const USER_QUERY = gql`
  query user($id: uuid!) {
    user(id: $id) {
      id
      email
      displayName
      defaultRole
    }
  }
`;

const { client } = useApolloClient();
const id = useRoute().params.id as string;

async function getUser(id: string) {
  try {
    const { data } = await client.query({
      query: USER_QUERY,
      variables: { id },
    });
    frm.value = {
      ...data.user,
    };
  } catch (error) {
    console.log(error);
  }
}

getUser(id);

async function handleUpdateUser() {
  try {
    const { email, password, displayName, defaultRole } = frm.value;
    if (!email || !displayName) {
      notification.error({
        title: "Error",
        description: "Please fill all fields",
        duration: 3000,
      });
      return;
    }
    loading.value = true;

    const passHash = await $fetch("/api/hash", {
      method: "POST",
      body: {
        password,
      },
    });

    // update user role
    client.mutate({
      mutation: UPDATE_USER,
      variables: {
        id,
        object: {
          defaultRole,
          email,
          displayName,
          ...(password
            ? {
                passwordHash: passHash,
              }
            : {}),
        },
      },
    });
    loading.value = false;
    notification.success({
      title: "Update User",
      description: "User created successfully",
      duration: 3000,
    });
    useRouter().back();
  } catch (error) {
    notification.error({
      title: "Error",
      description: "Error something went wrong",
      duration: 3000,
    });
    loading.value = false;
  }
}
</script>
