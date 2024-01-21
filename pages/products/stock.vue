<template>
  <div>
    <section class="flex justify-between px-4">
      <h1 class="text-xl">Product Stock</h1>
      <article>
        <n-button @click="showModal = true">Import</n-button>
      </article>
    </section>
    <table class="w-full text-left">
      <tr>
        <th class="px-4 py-2">Name</th>
        <th>quantity</th>
        <th>stock</th>
        <th>price</th>
        <th>cost</th>
        <th>Date</th>
      </tr>
      <tbody class="divide-y">
        <tr v-for="(item, index) in stocks" :key="index">
          <td class="px-4 py-2">{{ item.product.name }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.stock }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.cost }}</td>
          <td>{{ new Date(item.onDate).toDateString() }}</td>
        </tr>
      </tbody>
    </table>

    <n-modal v-model:show="showModal">
      <n-card
        style="width: 600px"
        title="Import Stock"
        :bordered="false"
        aria-modal="true"
      >
        <div>
          <n-form>
            <n-form-item label="Product">
              <n-select
                v-model:value="frm.productId"
                :options="products"
                value-field="id"
                label-field="name"
                filterable
              ></n-select>
            </n-form-item>
            <article class="flex gap-4">
              <n-form-item label="Quantity">
                <n-input-number
                  v-model:value="frm.quantity"
                  placeholder="Quantity"
                  :parse="parseInput"
                  :format="formatNumber"
                />
              </n-form-item>
              <n-form-item label="Date">
                <n-date-picker
                  v-model:value="frm.onDate"
                  type="date"
                  format="dd/MM/yyyy"
                />
              </n-form-item>
            </article>
            <article class="flex gap-4">
              <n-form-item label="Price">
                <n-input-number
                  v-model:value="frm.price"
                  placeholder="Price"
                  :show-button="false"
                  :parse="parseInput"
                  :format="formatNumber"
                />
              </n-form-item>
              <n-form-item label="Cost">
                <n-input-number
                  v-model:value="frm.cost"
                  placeholder="Price"
                  :show-button="false"
                  :parse="parseInput"
                  :format="formatNumber"
                />
              </n-form-item>
            </article>
          </n-form>
        </div>
        <template #footer>
          <n-button @click.prevent="handleImport">Import</n-button>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
const showModal = ref(false);
const { client } = useApolloClient();
const frm = ref({
  quantity: 0,
  price: 0,
  cost: 0,
  productId: "",
  onDate: Date.now(),
});

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

const products = ref<any[]>([]);
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

const STOCKS_QUERY = gql`
  query ($where: product_stock_bool_exp, $limit: Int, $offset: Int) {
    stocks: product_stock(where: $where, limit: $limit, offset: $offset) {
      id
      quantity
      stock
      price
      cost
      onDate: on_date
      createdAt: created_at
      product {
        name
        stock
      }
    }
  }
`;

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

const INSERT_STOCK = gql`
  mutation (
    $object: product_stock_insert_input!
    $productId: uuid!
    $productSet: products_set_input
  ) {
    stock: insert_product_stock_one(object: $object) {
      id
      quantity
      stock
      price
      cost
      onDate: on_date
      createdAt: created_at
      product {
        name
        stock
      }
    }

    product: update_products_by_pk(
      pk_columns: { id: $productId }
      _set: $productSet
    ) {
      id
      name
      description
      price
      cost
      stock
      imageUrl: image_url
      categoryId: category_id
      term {
        id
        name
      }
    }
  }
`;

async function handleImport() {
  try {
    const { price, productId, cost, quantity } = frm.value;
    const currentProduct = products.value.find((e) => e.id == productId);
    const currentStock = quantity + currentProduct.stock;
    const { data, errors } = await client.mutate({
      mutation: INSERT_STOCK,
      variables: {
        // for insert product stock
        object: {
          price,
          product_id: productId,
          cost,
          quantity,
          stock: quantity,
        },
        // for update product variable
        productId,
        productSet: {
          stock: currentStock,
        },
      },
    });
    console.log({ data, errors })
    showModal.value = false
  } catch (error) {
    console.log(error);
  }
}
</script>
