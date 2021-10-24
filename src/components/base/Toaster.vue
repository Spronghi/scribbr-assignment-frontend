<template>
  <div class="absolute top-5 right-5 bg-white border mr-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg">
    <div class="bg-green-400 text-white opacity-75 font-semibold p-3 mb-0 border-b border-solid border-gray-100 uppercase rounded-t-lg">
      {{ title }}
    </div>
    <div class="text-gray-700 p-3">
        <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toaster',
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
};
</script>
