<template>
  <div class="w-full">
    <List :items="invoices" :headers="headers">
      <template #amount="{ prop: invoice }">
        {{ formatCurrency(invoice.amount, invoice.currency) }}
      </template>
      <template #from="{ prop: invoice }">
        {{ invoice.from.name }}
      </template>
      <template #to="{ prop: invoice }">
        <div class="flex justify-center">{{ invoice.to.name }}</div>
        <div class="flex justify-center">{{ invoice.to.email }}</div>
      </template>
      <template #status="{ prop: invoice }">
        <InvoiceStatus :status="invoice.status" @change-status="(status) => changeStatus(invoice._id, status)"/>
      </template>
      <template #actions="{ prop: invoice }">
        <div class="flex justify-center cursor-pointer">
          <ShowInvoice :invoice="invoice" />
          <SendInvoice :invoice="invoice" />
          <DeleteInvoice :invoice="invoice" @deleted="itemDeleted" />
        </div>
      </template>
    </List>
  </div>
</template>

<script>
import { ref } from 'vue';
import { formatCurrency } from '@/utils';
import List from '@/components/base/List';
import SendInvoice from '@/components/invoices/SendInvoice';
import DeleteInvoice from '@/components/invoices/DeleteInvoice';
import ShowInvoice from '@/components/invoices/ShowInvoice';
import InvoiceStatus from '@/components/invoices/InvoiceStatus';

export default {
  name: 'InvoiceList',
  components: {
    List,
    DeleteInvoice,
    SendInvoice,
    ShowInvoice,
    InvoiceStatus
  },
  emits: ['itemDeleted', 'itemsChanged', 'changeStatus'],
  props: {
    invoices: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const headers = ref([
      { name: 'Invoice Number', prop: 'invoiceNo', align: 'center' },
      { name: 'To', prop: 'to', align: 'center' },
      { name: 'Amount', prop: 'amount', align: 'center' },
      { name: 'Status', prop: 'status', align: 'center' },
      { name: 'Actions', prop: 'actions', align: 'center' },
    ]);

    const itemDeleted = (...args) => emit('itemDeleted', ...args);
    const changeStatus = (id, status) => emit('changeStatus', { id, status });
    const formatInfo = (contact) => `${contact.name} <${contact.email}>`;

    return { headers, formatInfo, itemDeleted, formatCurrency, changeStatus };
  }
};
</script>
