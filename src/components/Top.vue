<template>
  <div class="top">
    <div class="flexCenter">
    <div  class="title">F1 Driver Comparison</div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'top'
}
</script>

<style scoped>
  .top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    background-color: #3F51B5;
    height: 60px;
    border-bottom: 2px solid #c9c9c9;
  }
  .flex {
    display: flex;
    justify-content: center;
  }
  .title {
    color: white;
    text-align: center;
  }
</style>