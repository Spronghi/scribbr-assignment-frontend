<template>
  <BaseLayout>
    <CreateInvoice />
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/layouts/BaseLayout';
import CreateInvoice from '@/components/invoices/CreateInvoice';

export default {
  name: 'CreateInvoiceView',
  components: {
    BaseLayout,
    CreateInvoice,
  }
};
</script>
