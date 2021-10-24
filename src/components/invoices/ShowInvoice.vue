<template>
  <EyeIcon @click="showInvoice" class="w-5 mr-2 transform hover:text-purple-500 hover:scale-110" />
</template>

<script>
import { useRouter } from 'vue-router';
import { EyeIcon } from '@heroicons/vue/outline';

export default {
  name: 'ShowInvoice',
  components: {
    EyeIcon
  },
  props: {
    invoice: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter();
    const showInvoice = () => router.push({ name: 'Invoice', params: { id: props.invoice._id } });

    return { showInvoice };
  }
};
</script>
