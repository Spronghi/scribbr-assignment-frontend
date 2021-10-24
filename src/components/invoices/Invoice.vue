<template>
  <div v-if="invoice.from || invoice.to" class="flex flex-col w-full">
    <div class="flex mb-5 py-3 rounded-l">
      <span class="text-xl">Total Amount: </span>
      <span class="mx-3 font-bold text-xl">{{ formatCurrency(invoice.amount, invoice.currency) }}</span>
      <div class="block">
        <InvoiceStatus v-if="invoice.status" :status="invoice.status" class="object-contain" @change-status="changeStatus"  />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <Contact v-if="invoice.from" :contact="invoice.from" :sender="true" />
      <Contact v-if="invoice.to" :contact="invoice.to" :sender="false" />
    </div>

    <div class="mt-10">
      <div>
        <span class="font-semibold">Invoice Number:</span>
        <span class="ml-2">{{ invoice.invoiceNo }}</span>
      </div>
      <div class="mt-4">
        <span class="font-semibold">Invoice Date:</span>
        <span class="ml-2">{{ formatISODate(invoice.created) }}</span>
      </div>
      <div v-if="invoice.dueDate" class="mt-4">
        <span class="font-semibold">Due Date:</span>
        <span class="ml-2">{{ formatISODate(invoice.dueDate) }}</span>
      </div>
    </div>

    <div class="mt-10">
      <List :items="invoice.items" :headers="itemsHeader">
        <template #subtotal="{ prop: item }">
          {{ formatCurrency(item.subtotal, item.currency) }}
        </template>
      </List>
      <div class="flex p-4">
        <Input v-model="item.description" class="w-2/3 mr-4" />
        <Input v-model="item.subtotal" type="number" class="w-1/3" />
      </div>
      <Button class="float-right" @click="addItem()">Add an item</Button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { formatCurrency, formatISODate } from '@/utils';

import Input from '@/components/base/Input';
import Button from '@/components/base/Button';
import List from '@/components/base/List';
import Contact from '@/components/Contact';
import InvoiceStatus from '@/components/invoices/InvoiceStatus';

export default {
  name: 'Invoice',
  components: {
    Contact,
    List,
    InvoiceStatus,
    Button,
    Input,
  },
  props: {
    invoice: {
      type: Object,
      required: true
    }
  },
  emits: ['addItem', 'changeStatus'],
  setup(props, { emit }) {
    const item = ref({});
    const itemsHeader = ref([
      { name: 'Item Description', prop: 'description' },
      { name: 'Subtotal', prop: 'subtotal', align: 'center' },
    ]);

    const addItem = () => emit('addItem', item.value);
    const changeStatus = (status) => emit('changeStatus', status);

    return { addItem, changeStatus, item, itemsHeader, formatISODate, formatCurrency };
  }
};
</script>
