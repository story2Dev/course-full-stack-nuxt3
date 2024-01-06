<template>
  <div :class="wrapperClass">
    <img v-if="url" :src="url" :alt="alt" :class="imageClass" />
    <n-skeleton v-else circle size="medium" />
  </div>
</template>

<script setup lang="ts">
import { KEY_TOKEN } from "~/constants";

interface Props {
  fileId?: string;
  wrapperClass?: string;
  imageClass?: string;
  alt?:string
}

const props = defineProps<Props>();

const token = useCookie(KEY_TOKEN);
const url = ref();
async function getImage(id: string) {
  if (!id) return null;

  const config = useRuntimeConfig();
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${token.value}` },
  };

  try {
    console.log(options);
    const req = await fetch(
      `${config.public.uploadUrl}/files/${id}/presignedurl`,
      options
    );
    const res = await req.json();
    url.value = res.url;
  } catch (error) {}
}

onMounted(() => {
  if (props.fileId) getImage(props.fileId);
});
</script>
