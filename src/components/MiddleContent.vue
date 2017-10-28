<template>
  <div class="middleContent">
    <div class="inner">
      <drivers></drivers>
    </div>
  </div>
</template>

<script>
  import Drivers from './Drivers.vue'
  export default {
    name: 'middleContent',
    components: {
      Drivers,
    }
  }
</script>

<style scoped>
  .middleContent {
    display: flex;
    justify-content: center;
    flex: 1;
  }
  .inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
