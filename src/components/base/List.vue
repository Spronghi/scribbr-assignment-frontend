<template>
  <table class="w-full">
    <thead>
      <tr class="bg-white border-b border-gray-200 text-gray-600 uppercase text-base">
        <th
          v-for="header in headers"
          :key="`${header.key}`"
          :class="customCss('py-3 px-6', header.css)"
        >
          <div :class="cssAlign('flex', header.align)">{{ header.name }}</div>
        </th>
      </tr>
    </thead>
    <tbody class="text-gray-600 text-base font-light">
      <tr v-for="(element, elementIndex) in items" :key="element.id" class="border-b border-gray-200">
        <td
          v-for="(header, index) in headers"
          :key="`${element.id}-${index}`"
          class="py-3 px-6 whitespace-nowrap"
        >
          <div :class="cssAlign('flex', header.align)">
            <span v-if="$slots[header.prop]" :class="header.class">
              <slot
                :name="header.prop"
                :prop="JSON.parse(JSON.stringify(element))"
                :header="header"
                :index="elementIndex"
              ></slot>
            </span>
            <span v-else :class="header.class">{{ element[header.prop] }}</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  components: {},
  props: {
    items: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const cssAlign = (css, align) => `${css} justify-${align || 'left'}`;
    const customCss = (...args) => args.filter(c => !!c).join(' ');

    return { customCss, cssAlign };
  }
};
</script>
