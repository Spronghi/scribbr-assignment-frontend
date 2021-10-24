<template>
  <Chip :color="color" class="cursor-pointer" @click="toggleDropdown()">
    <span class="capitalize">{{ status }}</span>
  </Chip>
  <div v-if="showDropdown && editable" class="absolute bg-white">
    <ul class="py-1" aria-labelledby="dropdown">
      <li v-for="(status, index) in statuses" :key="index" class="flex">
        <a @click="changeStatus(status)"
           class="text-sm cursor-pointer capitalize hover:bg-gray-100 text-gray-700 block px-4 py-2">
           <InvoiceStatus :status="status" :editable="false" />
        </a>
      </li>
    </ul>
  </div>

</template>

<script>
import { computed, ref } from 'vue';

import Chip from '@/components/base/Chip';

export default {
  name: 'InvoiceStatus',
  components: {
    Chip,
  },
  props: {
    status: {
      type: String,
      required: true
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  emits: ['changeStatus'],
  setup(props, { emit }) {
    const statuses = ref(['open', 'paid', 'outstanding', 'late']);
    const showDropdown = ref(false);

    const color = computed(() => {
      switch (props.status) {
        case 'open': return 'yellow';
        case 'paid': return 'green';
        case 'outstanding': return 'green';
        case 'late': return 'red';
        default: return 'gray';
      }
    });

    const toggleDropdown = () => showDropdown.value = !showDropdown.value;
    const changeStatus = (status) => {
      toggleDropdown();
      emit('changeStatus', status);
    };
    return { color, statuses, changeStatus, toggleDropdown, showDropdown };
  }
};
</script>
