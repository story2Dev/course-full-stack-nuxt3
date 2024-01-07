<template>
  <div>
    Product page -
    <nuxt-link to="/products/add">Add</nuxt-link> |
    <button @click="$router.push('/products/add')">add</button>
    <table>
      <tr>
        <td></td>
        <td>Name</td>
        <td>Stock</td>
        <td>Price</td>
        <td>Action</td>
      </tr>
      <tbody class="divide-y">
        <tr v-for="(item, index) in products" :key="index">
          <td>
            <ProductImage :file-id="item.imageUrl" image-class="w-10" />
          </td>
          <td>
            <nuxt-link :to="`/products/${item.id}`">{{ item.name }}</nuxt-link>
          </td>
          <td>{{ item.stock }}</td>
          <td>{{ item.price }}</td>
          <td>
            <nuxt-link :to="`/products/${item.id}/edit`">Edit</nuxt-link>

            <n-popconfirm
              @positive-click="handleDelete(item.id)"
              negative-text="Cancel"
              positive-text="Delete"
            >
              <template #trigger>
                <n-button>Delete</n-button>
              </template>
              Delete Product: {{ item.name }}
            </n-popconfirm>
          </td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Product",
});

definePageMeta({
  middleware: "logged-only",
});

const { client } = useApolloClient();
const products = ref<any[]>([]);

const PRODUCTS_QUERY = gql`
  query ($where: products_bool_exp) {
    products(where: $where) {
      id
      name
      price
      cost
      description
      stock
      imageUrl: image_url
    }
  }
`;

async function getProducts() {
  try {
    const { data, error } = await client.query({
      query: PRODUCTS_QUERY,
    });
    console.log({ data, error });
    products.value = data.products;
  } catch (error) {
    throw new Error(`[getProducts]: ${error}`);
  }
}

getProducts();

const DELETE_PRODUCT = gql`
  mutation delete($id: uuid!) {
    product: delete_products_by_pk(id: $id) {
      id
      name
    }
  }
`;

async function handleDelete(id: string) {
  try {
    const { data, errors } = await client.mutate({
      mutation: DELETE_PRODUCT,
      variables: { id },
    });
    console.log({ data, errors });
    products.value = products.value.filter((e) => e.id !== id);
  } catch (error) {
    console.log(error);
  }
}
</script>
