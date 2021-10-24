<template>
  <BaseLayout>
    <dir class="w-3/4">
      <Invoice v-if="invoice" :invoice="invoice" @add-item="addItem" @change-status="changeStatus" />
    </dir>
  </BaseLayout>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import BaseLayout from '@/layouts/BaseLayout';
import InvoicesService from '@/api/InvoicesService';
import Invoice from '@/components/invoices/Invoice';

export default {
  name: 'InvoiceView',
  components: {
    BaseLayout,
    Invoice,
  },
  setup () {
    const route = useRoute();
    const invoice = ref({});

    InvoicesService.get(route.params.id).then(({ data }) => invoice.value = data);

    const addItem = (item) => {
      invoice.value.items.push({ ...item, currency: invoice.value.currency });
      const itemsLength = invoice.value.items.length;

      InvoicesService.update(route.params.id, invoice.value)
        .catch(() => invoice.value.items.splice(itemsLength - 1, itemsLength));
    };

    const changeStatus = (status) => {
      invoice.value.status = status;
      InvoicesService.update(route.params.id, invoice.value);
    };

    return { addItem, changeStatus, invoice };
  }
};
</script>
