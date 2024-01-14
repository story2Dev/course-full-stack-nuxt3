<template>
  <div>
    <nav class="flex justify-between px-4 mt-2">
      <h2 class="text-lg font-bold">Category</h2>
      <div class="flex">
        <n-button @click="isAdd=true">Add</n-button>
      </div>
    </nav>

    <n-modal v-model:show="isAdd">
      <n-card class="max-w-sm" title="Add Category">
        <n-input v-model:value="name"></n-input>
        <n-button class="mt-4" @click="handleAdd">Add</n-button>
      </n-card>
    </n-modal>

    <n-modal v-model:show="isEdit">
      <n-card class="max-w-sm" title="Edit Category">
        <n-input v-model:value="frm.name"></n-input>
        <n-button class="mt-4" @click="handleUpdate">Update</n-button>
      </n-card>
    </n-modal>

    <div>
      <table class="w-full">
        <thead class="border-b text-left">
          <tr>
            <th class="cursor-pointer p-4" @click="toggleOrderBy">
              Name
              <Icon
                :name="
                  orderByMode === 'asc'
                    ? 'system-uicons:arrow-up'
                    : 'system-uicons:arrow-down'
                "
              />
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="(item, index) in items" :key="index">
            <td class="px-4">{{ item.name }}</td>
            <td>
              <n-button size="small" @click="setEdit(item)">Edit</n-button>

              <n-popconfirm
                @positive-click="handleDelete(item.id)"
                positive-text="Delete"
                negative-text="Cancel"
              >
                <template #trigger>
                  <n-button size="small">Delete</n-button>
                </template>
                <div>Are you sure to delete "{{ item.name }}" ?</div>
              </n-popconfirm>
            </td>
          </tr>
        </tbody>
      </table>

      <n-pagination
        v-model:page="page"
        :page-count="totalPage"
        class="mx-4"
        @update:page="handleSearch"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { getTerms, items } = useTerm();
const { search, limit } = useApp();
const isAdd = ref(false)
const isEdit = ref(false)

const page = ref(1);
const totalPage = ref(0);


const orderByMode = ref("asc");
function toggleOrderBy() {
  orderByMode.value = orderByMode.value === "asc" ? "desc" : "asc";
  handleSearch();
}

async function handleSearch() {
  const { value } = search;
  const where = value
    ? {
        name: {
          _ilike: `%${value}%`,
        },
      }
    : null;

  const {
    items: _items,
    errors,
    count,
  } = await getTerms({
    where,
    limit,
    offset: (page.value - 1) * limit,
    orderBy: { name: orderByMode.value },
  });
  totalPage.value = Math.ceil(count / limit);
  if (errors) {
    throw new Error(`Cannot get terms: ${errors}`);
  }
  items.value = _items;
}

handleSearch();
const notification = useNotification();
const { client } = useApolloClient();
const name = ref("");

const INSERT = gql`
  mutation insertTerm($object: terms_insert_input!) {
    term: insert_terms_one(object: $object) {
      id
      name
    }
  }
`;

async function handleAdd() {
  try {
    const { data, errors } = await client.mutate({
      mutation: INSERT,
      variables: {
        object: {
          name: name.value,
        },
      },
    });
    console.log({ data, errors });
    if (!errors) {
      notification.success({ title: "Add success", duration: 3000 });
      items.value = [data.term, ...items.value];
      name.value = "";
    }
  } catch (error) {
    throw new Error(`Cannot add term: ${error}`);
  }
}

const UPDATE = gql`
  mutation updateTerm($id: Int!, $object: terms_set_input) {
    term: update_terms_by_pk(pk_columns: { id: $id }, _set: $object) {
      id
      name
    }
  }
`;
async function handleUpdate() {
  try {
    const { id, name } = frm.value;
    const { data, errors } = await client.mutate({
      mutation: UPDATE,
      variables: {
        id,
        object: { name },
      },
    });
    console.log({ data, errors });
    if (!errors) {
      notification.success({ title: "Update success", duration: 3000 });
      items.value = items.value.map((item: any) => {
        if (item.id === id) {
          return data.term;
        }
        return item;
      });
      frm.value = { name: "", id: 0 };
    }
  } catch (error) {
    throw new Error(`Cannot update term: ${error}`);
  }
}

const frm = ref({
  name: "",
  id: 0,
});

function setEdit(item: any) {
  frm.value = { ...item };
  isEdit.value = true
}

const DELETE = gql`
  mutation deleteTerm($id: Int!) {
    term: delete_terms_by_pk(id: $id) {
      id
    }
  }
`;

async function handleDelete(id: number) {
  try {
    items.value = items.value.filter((item: any) => item.id !== id);
    const { data, errors } = await client.mutate({
      mutation: DELETE,
      variables: { id },
    });

    if (errors) {
      notification.warning({ title: "Delete failed", duration: 3000 });
      throw new Error(`Cannot delete term: ${errors}`);
    }
  } catch (error) {
    throw new Error(`Cannot delete term: ${error}`);
  }
}

watch(
  () => search.value,
  () => {
    page.value = 1;
    handleSearch();
  }
);
</script>
