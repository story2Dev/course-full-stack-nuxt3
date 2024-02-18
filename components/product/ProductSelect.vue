<template>
  <n-modal v-model:show="show">
    <n-card class="max-w-md" title="Select Product">
        <div>
            <n-input placeholder="Search"></n-input>
        </div>
      <ul class="flex flex-col divide-y">
        <li v-for="(item, index) in products" :key="index" class="flex gap-3 justify-between py-1">
           <span> {{ item.name }}</span>
           <div>
            <button @click="handleSelect(item)">select</button> |
            <button @click="handleEdit(item)">edit</button> |
            <button @click="handleRemove(item)">x</button>
           </div>
        </li>
      </ul>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue", "select", "remove" , 'edit']);

const show = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const { client } = useApolloClient();
const QUERY = gql`
  query products {
    products {
      imageUrl: image_url
      name
      price
    }
  }
`;

const products = ref<any[]>([]);
async function getProducts() {
  const { data } = await client.query({ query: QUERY });
  products.value = data.products;
  console.log(data);
}

getProducts();


function handleSelect(product: any) {
  emit("select", product);
  show.value = false;
}

function handleRemove(product: any) {
  emit("remove", product);
}

function handleEdit(product: any) {
  emit("edit", product);
}
</script>
