<template>
  <div :class="colorCss('py-1 px-2 rounded-full border text-xs')">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Chip',
  props: {
    color: {
      type: String,
      default: 'gray'
    }
  },
  setup (props) {
    const colorCss = (css) => `${css} text-${props.color}-700 bg-${props.color}-100 border-${props.color}-300`;

    return {colorCss};
  }
};
</script>
