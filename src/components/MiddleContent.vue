<template>
  <div id="middleContent">
    <div class="inner column">
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
  #middleContent {
    display: flex;
    justify-content: center;
    height: 100%;
  }
  .column {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
