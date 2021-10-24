<template>
  <input
    v-model="model"
    @input="handleInput"
    :type="type || 'text'"
    :placeholder="placeholder"
    class="px-3 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring"
  />
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'Input',
  props: {
    modelValue: {},
    placeholder: {
      type: String
    },
    type: {
      type: String
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const model = ref(props.modelValue);
    const handleInput = () => emit('update:modelValue', props.type === 'number' ? parseInt(model.value) : model.value);

    return { model, handleInput };
  }
};
</script>