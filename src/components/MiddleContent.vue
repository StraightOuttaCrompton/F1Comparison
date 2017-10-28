<template>
  <div id="middleContent">
    <div class="inner column">
      <div>hello</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'middleContent'
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
