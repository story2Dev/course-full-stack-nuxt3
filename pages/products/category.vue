<template>
  <div>
    Category
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

  const { items: _items, errors, count } = await getTerms({
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
</script>
