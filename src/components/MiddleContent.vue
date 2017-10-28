<template>
  <div id="middleContent">
    <div class="inner column">
      <div class="drivers">
        <driver></driver>
        <driver></driver>
        <driver></driver>
        <driver></driver>
        <driver></driver>
        <driver></driver>
        <driver></driver>
        <driver></driver>
        <driver></driver>
        <driver></driver>
        <driver></driver>
        <driver></driver>
      </div>
    </div>
  </div>
</template>

<script>
  import Driver from './Driver.vue'
  export default {
    name: 'middleContent',
    components: {
      Driver,
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
  .drivers {
    display: flex;
    flex-wrap: wrap;
  }
  .drivers:nth-child(n) {
    flex: 1;
  }

</style>
