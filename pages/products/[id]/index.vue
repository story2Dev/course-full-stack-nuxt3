<template>
  <div>
    <ProductImage
      v-if="product?.imageUrl"
      :file-id="product?.imageUrl"
      image-class="w-20"
    />
    <h1>{{ product?.name }}</h1>
    <h2>{{ product?.price }}</h2>
    <h3>{{ product?.term.name }}</h3>
    <nuxt-link :to="`/products/${params?.id}/edit`">Edit</nuxt-link>
  </div>
</template>

<script setup lang="ts">
const { params } = useRoute();

const PRODUCT_ID = gql`
  query ($id: uuid!) {
    product: products_by_pk(id: $id) {
      id
      name
      price
      cost
      description
      imageUrl: image_url
      categoryId: category_id
      term {
        name
      }
    }
  }
`;

const { client } = useApolloClient();
const product = ref<any>();

async function getProduct() {
  try {
    const { data, error } = await client.query({
      query: PRODUCT_ID,
      variables: {
        id: params.id,
      },
    });
    product.value = data.product;
    useHead({
      title: product.value.name,
    });
  } catch (error) {
    throw new Error(`[getProduct]: ${error}`);
  }
}

getProduct();
</script>
