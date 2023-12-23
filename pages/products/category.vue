<template>
  <div>
    Category
    <div class="flex">
      <n-input v-model:value="name"></n-input>
      <n-button @click="handleAdd">Add</n-button>
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
            <th>Name</th>
            <th>Action</th>
          </tr>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ item.name }}</td>
              <td>
                <n-button size="small">Edit</n-button>
                <n-button size="small">Delete</n-button>
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
</script>
