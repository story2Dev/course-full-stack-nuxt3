<template>
  <div>
    <section class="flex justify-between">
      <h1>Order</h1>
      <n-button>Create</n-button>
    </section>

    <section>
      <table>
        <tr>
          <td>ID</td>
          <td>Status</td>
          <td>Title</td>
        </tr>
        <tbody class="divide-y">
          <tr v-for="(item, index) in orders" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.title }}</td>
            <td>
              <div class="flex gap-1">
                <button v-if="item.status" @click="handleApprove(item.id, false)">Approved</button>
                <button v-else @click="handleApprove(item.id, true)">Approve</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
const { client } = useApolloClient();

const CREATE_ORDER = gql`
  mutation CreateOrder($object: order_insert_input!) {
    createOrder: insert_order_one(object: $object) {
      id
      status
      title
    }
  }
`;

const UPDATE = gql`
  mutation UpdateOrder($id: Int!, $object: order_set_input!) {
    updateOrder: update_order_by_pk(pk_columns: { id: $id }, _set: $object) {
      id
      status
      title
    }
  }
`;

const QUERY_ORDER = gql`
  query Order {
    order {
      id
      status
      title
    }
  }
`;

const orders = ref<any[]>([]);
const notification = useNotification();

async function fetchOrder() {
  try {
    const { data } = await client.query({ query: QUERY_ORDER });
    orders.value = data.order;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function handleApprove(id: number, status: boolean) {
  try {
    const { data, errors } = await client.mutate({
      mutation: UPDATE,
      variables: {
        id,
        object: {
          status,
        //   title: `Order ${status ? "Approved" : "Rejected"}`,
        //   qty: 1
        },
      },
    });
    notification.success({
      title: "Update success",
      description: `Order has been updated: ${status}`,
      duration: 3000,
    });
    console.log({ data, errors });
    if (!errors) {
        // update local stat
      orders.value = orders.value.map((item) => {
        if (item.id === id) {
          return data.updateOrder;
        }
        return item;
      });
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  fetchOrder();
});
</script>

<style scoped></style>
