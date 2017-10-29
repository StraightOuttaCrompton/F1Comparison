<template>
  <div class="middleContent">
    <div class="inner">
      <div class="middleContentItem"><driverSearchBar></driverSearchBar></div>
      <div class="middleContentItem"><selectedDrivers></selectedDrivers></div>
    </div>
  </div>
</template>

<script>
  import DriverSearchBar from './DriverSearchBar.vue'
  import SelectedDrivers from './SelectedDrivers.vue'
  export default {
    name: 'middleContent',
    components: {
      DriverSearchBar,
      SelectedDrivers
    },
    events:{
      'driver_selected' : function(driver){
          this.$broadcast('driver_selected', driver);
      }
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
	  max-width: 1200px;
		width: 100%;
		border: 1px solid #f1f1f1;
    background-color: #ffffff;
  }
  .middleContentItem:nth-child(n) {
    margin-top: 25px;
  }
</style>
