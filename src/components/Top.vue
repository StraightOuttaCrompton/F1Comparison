<template>
  <div class="top">
    <div class="flexCenter">
    <div  class="title">F1 Comparison</div>

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