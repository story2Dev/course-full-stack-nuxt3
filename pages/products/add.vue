<template>
  <div>
    <n-form ref="formRef" :model="frm" :rules="rules">
      <n-card class="max-w-2xl w-full mx-auto" title="Add Product">
        <div>
          <n-form-item label="Name" path="name">
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
          <n-form-item label="Price" path="price">
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
          <n-form-item label="Category" path="categoryId">
            <n-select
              v-model:value="frm.categoryId"
              :options="categories"
              value-field="id"
              label-field="name"
            />
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
              <Icon
                v-if="!image"
                name="heroicons-outline:photograph"
                size="40"
              />
              <span id="previewImage"></span>
            </label>
          </article>
        </div>
        <div class="flex gap-2">
          <n-button>Cancel</n-button>
          <n-button type="primary" @click.prevent="handleAdd">Save</n-button>
        </div>
      </n-card>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";
import { KEY_TOKEN } from "~/constants";
import type { Product } from "~/types";

const formRef = ref<FormInst | null>(null);
const { client } = useApolloClient();
const notification = useNotification();
useHead({
  title: "Add Product",
});

const rules: FormRules = {
  name: {
    required: true,
    message: "Please input product name",
    trigger: "blur",
  },
  price: {
    required: true,
    message: "Please input product price",
    type: "number",
  },
  categoryId: {
    required: true,
    message: "Please select product category",
    type: "number",
  },
};

const frm = ref<Partial<Product>>({
  name: "",
  description: "",
  price: 0,
  cost: 0,
  stock: 0,
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
    const imageUrl = URL.createObjectURL(file);
    previewImage.innerHTML = `<img src="${imageUrl}" class="w-20 h-20 rounded-lg" />`;
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

const token = useCookie(KEY_TOKEN);

function handleAdd(e: MouseEvent) {
  try {
    e.preventDefault();

    const { name, description, price, cost, categoryId, stock, imageUrl } =
      frm.value;

    formRef.value?.validate(async (errors) => {
      if (!errors) {
        if (image.value) {
          const config = useRuntimeConfig();
          const formData = new FormData();
          formData.append("file", image.value);
          const req = await fetch(`${config.public.uploadUrl}/files`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
            body: formData,
          });
          const res = await req.json();
          if (req.status === 201) {
            frm.value.imageUrl = res.id;
          }
          console.log(res);
        }

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
              image_url: frm.value.imageUrl || null,
            },
          },
        });
        if (!errors) {
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
          return;
        }

        notification.error({ title: "Add failed", duration: 3000 });
        throw new Error(`Cannot add product: ${errors}`);
      } else {
        console.log(errors);
      }
    });
  } catch (error) {
    throw new Error(`Cannot add product: ${error}`);
  }
}
</script>
