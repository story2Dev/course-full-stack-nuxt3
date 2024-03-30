<template>
  <div>
    <section class="px-4">
      <h2>Dashboard</h2>
    </section>
    <section class="grid gap-4 grid-cols-4 px-4 mt-4">
      <article
        class="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6"
      >
        <div
          class="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>

          <span class="text-xs font-medium"> 67.81% </span>
        </div>

        <div>
          <strong class="block text-sm font-medium text-gray-500">
            Products
          </strong>

          <p>
            <span class="text-2xl font-medium text-gray-900">{{
              countProduct
            }}</span>
            <!-- <span class="text-xs text-gray-500"> from $240.94 </span> -->
          </p>
        </div>
      </article>
      <article
        class="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6"
      >
        <div
          class="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>

          <span class="text-xs font-medium"> 67.81% </span>
        </div>

        <div>
          <strong class="block text-sm font-medium text-gray-500">
            Min Stock
          </strong>

          <p>
            <span class="text-2xl font-medium text-gray-900">
              {{ countProductMinStock }}
            </span>
            <!-- <span class="text-xs text-gray-500"> from $240.94 </span> -->
          </p>
        </div>
      </article>
    </section>

    <section class="grid grid-cols-3 p-4 gap-4">
      <article>
        <ProductLineChart class="h-64" />
      </article>
      <article>
        <ProductBarChart class="h-64" />
      </article>
      <article>
        <ProductPieChart class="h-64" />
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: "slide",
    mode: "out-in",
  },
  middleware: "logged-only",
});

const QUERY = gql`
  query index {
    countProduct: products_aggregate {
      aggregate {
        count
      }
    }
    countProductMinStock: products_aggregate(where: { stock: { _lt: 5 } }) {
      aggregate {
        count
      }
    }
  }
`;
const countProduct = ref(0);
const countProductMinStock = ref(0);
const { client } = useApolloClient();

async function getData() {
  const { data, errors } = await client.query({
    query: QUERY,
  });

  if (errors?.length) {
    throw new Error(`[getData]: index error}`);
  }

  console.log(data);
  countProduct.value = data.countProduct.aggregate.count;
  countProductMinStock.value = data.countProductMinStock.aggregate.count;
}

getData();
</script>

<style scoped></style>
