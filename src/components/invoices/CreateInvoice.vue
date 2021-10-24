<template>
  <div class="top-24 right-20 absolute">
    <Button @click="togglePreview()" class="">
      <span v-if="!showPreview">Preview</span>
      <span v-else>Return to editor</span>
    </Button>
    <Button @click="createInvoice()" class="ml-2">Create Invoice</Button>
  </div>

  <div v-if="showPreview" class="w-3/4 m-4">
    <Invoice :invoice="invoice" />
  </div>

  <div v-if="!showPreview" class="flex flex-col w-3/4 m-4">
    <div class="flex mb-5 py-3">
      <span class="text-xl">Total Amount: </span>
      <span class="mx-3 font-bold text-xl">{{ formatCurrency(totalAmount, invoice.currency) }}</span>
    </div>
    <span class="font-bold text-xl mb-4">Receiver Address</span>
    <div class="flex items-center">
      <span class="font-semibold">Invoice Number:</span>
      <span class="ml-2">
        <Input v-model="invoice.invoiceNo" class="w-md" placeholder="123456789" />
      </span>
    </div>

    <span class="font-bold text-xl my-10">Receiver</span>
    <div class="grid grid-cols-2 xl:grid-cols-3 gap-4">
      <div class="flex items-center">
        <span class="font-semibold">Name:</span>
        <span class="ml-2">
          <Input v-model="invoice.to.name" class="w-md" />
        </span>
      </div>
      <div class="flex items-center">
        <span class="font-semibold">Email:</span>
        <span class="ml-2">
          <Input v-model="invoice.to.email" class="w-md" />
        </span>
      </div>
      <div class="flex items-center">
        <span class="font-semibold">Telephone Number:</span>
        <span class="ml-2">
          <Input v-model="invoice.to.telephone" class="w-md" />
        </span>
      </div>
      <div class="flex items-center">
        <span class="font-semibold">Address:</span>
        <span class="ml-2">
          <Input v-model="invoice.to.address.street" class="w-md" />
        </span>
      </div>
      <div class="flex items-center">
        <span class="font-semibold">House Number:</span>
        <span class="ml-2">
          <Input v-model="invoice.to.address.houseNo" class="w-md" />
        </span>
      </div>
      <div class="flex items-center">
        <span class="font-semibold">Postal Code:</span>
        <span class="ml-2">
          <Input v-model="invoice.to.address.postalCode" class="w-md" />
        </span>
      </div>
      <div class="flex items-center">
        <span class="font-semibold">City:</span>
        <span class="ml-2">
          <Input v-model="invoice.to.address.city" class="w-md" />
        </span>
      </div>
      <div class="flex items-center">
        <span class="font-semibold">Country:</span>
        <span class="ml-2">
          <Input v-model="invoice.to.address.country" class="w-md" />
        </span>
      </div>
    </div>

    <div class="mt-10">
      <List :items="invoice.items" :headers="itemsHeader">
        <template #subtotal="{ prop: item }">
          {{ formatCurrency(item.subtotal, item.currency) }}
        </template>
        <template #actions="{ index }">
          <TrashIcon @click="deleteItem(index)" class="cursor-pointer w-5 mr-2 transform hover:text-purple-500 hover:scale-110" />
        </template>
      </List>

      <div class="flex p-4">
        <Input v-model="item.description" placeholder="Description.." class="w-2/3 mr-4" />
        <Input v-model="item.subtotal" type="number" placeholder="Subtotal" class="w-1/3" />
      </div>
      <Button class="float-right" @click="addItem()">Add an item</Button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { DateTime } from 'luxon';
import { TrashIcon } from '@heroicons/vue/outline';

import InvoicesService from '@/api/InvoicesService';
import { formatCurrency, formatISODate } from '@/utils';
import List from '@/components/base/List';
import Button from '@/components/base/Button';
import Input from '@/components/base/Input';
import Invoice from '@/components/invoices/Invoice';

export default {
  name: 'CreateInvoice',
  components: {
    List,
    Invoice,
    Button,
    Input,
    TrashIcon,
  },
  setup() {
    const router = useRouter();
    const showPreview = ref(false);
    const item = ref({});
    const invoice = ref({
      items: [],
      currency: 'EUR',
      invoiceNo: '',
      to: {
        address: {}
      },
      from: {
        name: 'Scribbr',
        email: 'info@scribbr.com',
        telephone: '+1 (510) 822-8066',
        address: {
          street: 'Singel',
          houseNo: '542',
          postalCode: '1017AZ',
          city: 'Amsterdam',
          country: 'The Netherlands'
        }
      }
    });
    const itemsHeader = ref([
      { name: 'Item Description', prop: 'description' },
      { name: 'Subtotal', prop: 'subtotal', align: 'center' },
      { prop: 'actions', align: 'center', css: "w-1/12" },
    ]);

    const subtotal = (item) => formatCurrency(item.subtotal, item.currency);
    const calculateAmount = () => invoice.value.items.map(i => i.subtotal || 0).reduce((a, b) => a + b, 0);
    const totalAmount = computed(() => calculateAmount());

    const addItem = () => invoice.value.items.push({ ...item.value, currency: invoice.value.currency });
    const additionalInfo = () => {
      invoice.value.amount = calculateAmount();
      invoice.value.created = DateTime.now().toISO();
    };

    const togglePreview = () => {
      additionalInfo();
      showPreview.value = !showPreview.value;
    };

    const deleteItem = (index) => invoice.value.items.splice(index, 1);
    const createInvoice = () => {
      additionalInfo();
      InvoicesService.create(invoice.value).then(({ data }) => router.push({ name: 'Invoice', params: { id: data._id } }));
    };

    return { item, createInvoice, addItem, deleteItem, invoice, itemsHeader, formatCurrency, formatISODate, subtotal, totalAmount, showPreview, togglePreview };
  }
};
</script>
