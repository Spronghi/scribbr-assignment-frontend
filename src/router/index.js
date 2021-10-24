import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import InvoiceListView from '@/views/InvoiceListView.vue';
import InvoiceView from '@/views/InvoiceView.vue';
import CreateInvoiceView from '@/views/CreateInvoiceView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/invoices',
    name: 'Invoices',
    component: InvoiceListView,
  },
  {
    path: '/invoice/:id',
    name: 'Invoice',
    component: InvoiceView,
  },
  {
    path: '/create-invoice',
    name: 'CreateInvoice',
    component: CreateInvoiceView,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
