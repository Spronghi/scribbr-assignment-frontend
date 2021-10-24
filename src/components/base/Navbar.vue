<template>
  <div class="border-b border-gray-200 items-center flex bg-white bg-gradient-to-l bg-opacity-90 px-6 py-4 w-full">
    <div class="text-xl text-gray-700 font-semibold inline-flex items-center">
      <span>Scribbr Assignment</span>
    </div>
    <div>
      <ul class="flex text-white ml-4">
        <router-link to="/invoices" class="ml-5 px-3 py-1 rounded font-semibold text-gray-700">Invoices</router-link>
        <router-link to="/create-invoice" class="ml-5 px-3 py-1 rounded font-semibold text-gray-700">Create an invoice</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
.router-link-active {
  @apply bg-white text-yellow-500;
}
</style>
