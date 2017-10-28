<template>
  <div class="middleContent">
    <div class="inner">
      <div class="middleContentItem"><driverSearchBar></driverSearchBar></div>
      <drivers class="middleContentItem"></drivers>
    </div>
  </div>
</template>

<script>
  import DriverSearchBar from './DriverSearchBar.vue'
  import Drivers from './Drivers.vue'
  export default {
    name: 'middleContent',
    components: {
      Drivers,
      DriverSearchBar
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
  .middleContentItem:nth-child(n) {
    margin-top: 25px;
  }
</style>
