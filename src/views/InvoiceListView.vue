<template>
  <BaseLayout>
    <div class="mt-4 w-3/4">
      <InvoiceList :invoices="invoices" @items-changed="loadInvoices" @change-status="changeStatus" @item-deleted="itemDeleted"/>
    </div>
  </BaseLayout>
</template>

<script>
import { ref } from 'vue';
import BaseLayout from '@/layouts/BaseLayout';
import InvoicesService from '@/api/InvoicesService';
import InvoiceList from '@/components/invoices/InvoiceList';

export default {
  name: 'InvoiceListView',
  components: {
    BaseLayout,
    InvoiceList
  },
  setup () {
    const invoices = ref([]);

    const loadInvoices = () => InvoicesService.getAll().then(({ data }) => {
      invoices.value.push(...data);
    }).catch(error => console.error(error));

    const itemDeleted = (invoice) => invoices.value.splice(invoices.value.findIndex(i => i._id === invoice._id), 1);
    const changeStatus = ({ id, status }) => {
      const invoice = invoices.value.find(i => i._id === id);

      invoice.status = status;

      InvoicesService.update(id, invoice);
    };

    loadInvoices();

    return { invoices, itemDeleted, loadInvoices, changeStatus };
  }
};
</script>
