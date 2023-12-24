<template>
  <div>
    <n-card class="max-w-2xl w-full mx-auto" title="Add Product">
      <div>
        <n-form-item label="Name">
          <n-input v-model:value="frm.name" placeholder="Name"></n-input>
        </n-form-item>
        <n-form-item label="Description">
          <n-input
            v-model:value="frm.description"
            placeholder="Description"
            type="textarea"
          ></n-input>
        </n-form-item>
      </div>
      <div class="grid grid-cols-3 gap-3">
        <n-form-item label="Price">
          <n-input-number
            v-model:value="frm.price"
            placeholder="Price"
            :show-button="false"
            :parse="parse"
            :format="format"
          />
        </n-form-item>
        <n-form-item label="Cost">
          <n-input-number
            v-model:value="frm.cost"
            placeholder="Cost"
            :show-button="false"
            :parse="parse"
            :format="format"
          />
        </n-form-item>
        <n-form-item label="Init Stock">
          <n-input-number
            v-model:value="frm.stock"
            placeholder="Init Stock"
            :min="0"
          />
        </n-form-item>
      </div>
      <div>
        <n-form-item label="Category">
          <n-select v-model:value="frm.categoryId" :options="categories" value-field="id" label-field="name" />
        </n-form-item>
      </div>
      <div class="mb-4">
        <label for="image">Image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          class="hidden"
          @change="handleSelectImage"
        />
        <article
          class="w-20 h-20 bg-slate-200 rounded-lg items-center flex justify-center"
        >
          <label for="image">
            <Icon v-if="!image" name="heroicons-outline:photograph" size="40" />
            <span id="previewImage"></span>
          </label>
        </article>
      </div>
      <div class="flex gap-2">
        <n-button>Cancel</n-button>
        <n-button type="primary" @click.prevent="handleAdd">Save</n-button>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
const { client } = useApolloClient();
const notification =  useNotification();
useHead({
  title: "Add Product",
});

const frm = ref({
  name: "",
  description: "",
  price: 0,
  cost: 0,
  stock: 0,
  categoryId: 0,
  imageUrl: "",
});

const categories = ref([]);

const CATEGORY = gql`
  query getCategories {
    categories: terms {
      id
      name
    }
  }
`;
async function getCategories() {
  const { data, errors } = await client.query({
    query: CATEGORY,
  });
  categories.value = data.categories;
}

getCategories();

const image = ref(null);

function handleSelectImage(e: any) {
  const file = e.target.files[0];
  const reader = new FileReader();
  const previewImage = document.getElementById("previewImage") as HTMLElement;
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    image.value = file;
    console.log(image.value);
    previewImage.innerHTML = `<img src="${image.value}" class="w-20 h-20 rounded-lg" />`;
  };
}

const parse = (input: string) => {
  const nums = input.replace(/,/g, "").trim();
  if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums);
  return nums === "" ? null : Number.NaN;
};

const format = (value: number | null) => {
  if (value === null) return "";
  return value.toLocaleString("en-US");
};

const INSERT = gql`
  mutation insertProduct($object: products_insert_input!) {
    product: insert_products_one(object: $object) {
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

async function handleAdd() {
  try {
    const { name, description, price, cost, categoryId, stock } = frm.value;
    const { data, errors } = await client.mutate({
      mutation: INSERT,
      variables: {
        object: {
          name,
          description,
          price,
          cost,
          stock,
          category_id: categoryId,
        },
      },
    });
    if(!errors) {
      notification.success({ title: "Add success", duration: 3000 });
      frm.value = {
        name: "",
        description: "",
        price: 0,
        cost: 0,
        stock: 0,
        categoryId: 0,
        imageUrl: "",
      };
      return
    }
    
    notification.error({ title: "Add failed", duration: 3000 });
    throw new Error(`Cannot add product: ${errors}`);
  } catch (error) {
    throw new Error(`Cannot add product: ${error}`);
  }
}
</script>
