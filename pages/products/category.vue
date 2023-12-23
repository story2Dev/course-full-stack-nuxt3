<template>
  <div>
    Category
    <div class="flex">
      <n-input v-model:value="name"></n-input>
      <n-button @click="handleAdd">Add</n-button>
    </div>

    <div class="flex">
      <n-input v-model:value="frm.name"></n-input>
      <n-button @click="handleUpdate">Update</n-button>
    </div>

    <n-card>
      <n-input
        v-model:value="search"
        placeholder="Search"
        @keyup.enter="handleSearch"
      />
      <div>
        <table>
          <tr>
            <th class="cursor-pointer" @click="toggleOrderBy">
              Name
              <Icon :name="orderByMode === 'asc' ? 'system-uicons:arrow-up' : 'system-uicons:arrow-down'" />
            </th>
            <th>Action</th>
          </tr>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ item.name }}</td>
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
          @update:page="handleSearch"
        />
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
const { getTerms, items } = useTerm();

const page = ref(1);
const search = ref("");
const totalPage = ref(0);
const limit = 10;

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
    const {data, errors } = await client.mutate({ mutation: DELETE, variables: { id } });
    
    if(errors) {
      notification.warning({ title: "Delete failed", duration: 3000 });
      throw new Error(`Cannot delete term: ${errors}`);
    }
  } catch (error) {
    throw new Error(`Cannot delete term: ${error}`);
  }
}
</script>
