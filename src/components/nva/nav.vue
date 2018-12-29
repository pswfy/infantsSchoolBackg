<template>
  <div class="nav">
    <div class="nav-left">
      <img src="../../../static/images/v-1.png" alt="">
    </div>
    <div class="nav-right">
      <div class="name">系统简介</div>
      <div class="xian"></div>
      <div class="name-inc">HOME</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style scoped lang="scss">
  .nav{
    display: flex;
    height: 40px;
    cursor: pointer;
    .nav-left{
      width: 40px;
      height: 40px;
      border-radius: 4px;
      overflow: hidden;
      & img{
        width: 40px;
        height: 40px;
        border-radius: 4px;
      }
    }
    .nav-right{
      height: 40px;
      width: 70px;
      margin:0 6px;
      color: #555555;
      .name{
        margin: 0;
        padding: 0;
        height: 20px;
        line-height: 24px;
        font-size: 14px;
        font-weight: 600;

      }
      .xian{
        margin: 0;
        padding: 0;
        height: 1px;
        width: 28px;
        background: #4778c7;
        font-weight: 600;
        border-radius: 1px;
      }
      .name-inc{
        margin: 0;
        padding: 0;
        height: 19px;
        font-size: 12px;
        color: #999999;
        font-weight: 200;
      }
    }
  }
</style>
