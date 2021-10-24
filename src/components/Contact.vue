<template>
  <span class="flex border-2 border-dotted border-gray-300	rounded-md p-2">
    <div class="text-gray-500 font-bold uppercase ml-3 text-center">
      <span v-if="sender">From</span>
      <span v-else>To</span>
      <HomeIcon v-if="sender" class="w-12 text-gray-400 pt-2" />
      <MailIcon v-else class="w-12 text-gray-400 pt-2" />
    </div>
    <div class="flex">
      <div class="ml-7">
        <div v-if="contact.name">{{ contact.name }}</div>
        <div v-if="hasAddress">{{ formatAddress(contact.address) }}</div>
        <div v-if="hasAddress">{{ formatCity(contact.address) }}</div>
        <div v-if="contact.email">{{ contact.email }}</div>
        <div v-if="contact.telephone">{{ contact.telephone }}</div>
      </div>
    </div>
  </span>
</template>
<script>
import { MailIcon, HomeIcon } from '@heroicons/vue/outline';
import { computed } from '@vue/reactivity';

export default {
  name: 'Contact',
  components: {
    HomeIcon,
    MailIcon
  },
  props: {
    contact: {
      type: Object,
      required: true
    },
    sender: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const hasAddress = computed(() => Object.keys(props.contact.address || {}).length);
    const formatAddress = ({ street, houseNo, postalCode }) => `${street} ${houseNo} - ${postalCode}`;
    const formatCity = ({ city, country }) => `${city} - ${country}`;

    return { hasAddress, formatAddress, formatCity };
  }
};
</script>
