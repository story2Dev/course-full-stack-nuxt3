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
          />
        </n-form-item>
        <n-form-item label="Cost">
          <n-input-number
            v-model:value="frm.cost"
            placeholder="Cost"
            :show-button="false"
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
          <n-select />
        </n-form-item>
      </div>
      <div class="mb-4">
        <label for="image">Image</label>
        <input type="file" id="image" accept="image/*" class="hidden" @change="handleSelectImage" />
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
        <n-button type="primary">Save</n-button>
      </div>
    </n-card>
  </div>
</template>

<script setup>
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

const image = ref(null);

function handleSelectImage(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    image.value = file;
    console.log(image.value)
    document.getElementById(
      "previewImage"
    ).innerHTML = `<img src="${image.value}" class="w-20 h-20 rounded-lg" />`;
  };
}
</script>
