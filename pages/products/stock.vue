<template>
  <div>
    {{ stocks }}
  </div>
</template>

<script setup lang="ts">
const STOCKS_QUERY = gql`
  query ($where: product_stock_bool_exp, $limit: Int, $offset: Int) {
    stocks: product_stock(where: $where, limit: $limit, offset: $offset) {
      id
      quantity
      stock
      price
      cost
      product {
        name
      }
    }
  }
`;

const { client } = useApolloClient();
const stocks = ref<any[]>([]);

async function getStocks() {
  try {
    const { data, errors } = await client.query({ query: STOCKS_QUERY });
    if (data) {
      stocks.value = data.stocks;
    }
  } catch (error) {
    console.log(error);
  }
}

getStocks();
</script>
