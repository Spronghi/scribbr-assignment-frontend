<template>
  <MailIcon @click="sendInvoice" class="w-5 mr-2 transform hover:text-purple-500 hover:scale-110" />

  <Toaster v-if="showToaster" title="Emal Sent" @click="closeToaster">
    Email sent to {{ invoice.to.email }}!
  </Toaster>
</template>

<script>
import { MailIcon } from '@heroicons/vue/outline';
import Toaster from '@/components/base/Toaster';
import { ref } from '@vue/reactivity';

export default {
  name: 'DeleteInvoice',
  components: {
    MailIcon,
    Toaster,
  },
  emits: ['deleted'],
  props: {
    invoice: {
      type: Object,
      required: true
    }
  },
  setup() {
    const showToaster = ref(false);
    const timeout = ref(null);

    const closeToaster = () => {
      clearTimeout(timeout.value);
      showToaster.value = false;
    };

    const sendInvoice = () => {
      showToaster.value = true;
      timeout.value = setTimeout(closeToaster, 2000);
    };

    return { showToaster, sendInvoice, closeToaster };
  }
};
</script>
