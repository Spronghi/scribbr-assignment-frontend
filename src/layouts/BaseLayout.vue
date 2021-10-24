<template>
  <div>
    <Navbar />
    <div class="flex justify-center">
      <slot />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/base/Navbar';

export default {
  name: 'BaseLayout',
  components: {
    Navbar
  }
};
</script>
