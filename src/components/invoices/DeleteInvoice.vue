<template>
  <TrashIcon @click="deleteInvoice" class="w-5 mr-2 transform hover:text-purple-500 hover:scale-110" />
</template>

<script>
import { TrashIcon } from '@heroicons/vue/outline';
import InvoicesService from '@/api/InvoicesService';

export default {
  name: 'DeleteInvoice',
  components: {
    TrashIcon
  },
  emits: ['deleted'],
  props: {
    invoice: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const deleteInvoice = () => InvoicesService.delete(props.invoice._id).then(() => emit('deleted', props.invoice));

    return { deleteInvoice };
  }
};
</script>
