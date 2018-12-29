<template>
  <div class="title-header">
    <div class="title">
      <i class="icon iconfont icon-rili"></i>
      <span>我的日程</span>
    </div>
    <div class="time">
      <i class="icon iconfont icon-fanhui1" @click="goNextMonth"></i>
      <span>{{$store.state.nowShow.year}}年{{$store.state.nowShow.month}}月</span>
      <i class="icon iconfont icon-fanhui2" @click="goPrevMonth"></i>
    </div>
    <div class="button">
      <div class="create">
        <i class="icon iconfont icon-jia9"></i>
        <span>创建日程</span>
      </div>
      <span class="month">月</span>
      <span class="week">周</span>
      <span class="day">日</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return{

      }
    },
    methods:{
      /*上一月*/
      goNextMonth(){
        this.$emit('nextMonth');
      },
      /*下一月*/
      goPrevMonth(){
        this.$emit('prevMonth');
      }
    }
  };
</script>

<style scoped lang="scss">
  .title-header{
    box-sizing: border-box;
    border-top: 1px solid #f1f6f9;
    display: flex;
    justify-content: space-between;
    height: 40px;
    .title{
      flex: 1;
      display: flex;
      align-items: center;
      padding-left: 10px;
      box-sizing: border-box;
      & i{
        font-size: 20px;
        color: #2dbcff;
        font-weight: 400;
        padding-top: 2px;
      }
      & span{
        font-size: 15px;
        color: #777777;
        padding-left: 5px;
        font-weight: 400;
      }
    }
    .time{
      box-sizing: border-box;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      & span{
        font-size: 15px;
      }
      & i{
        font-size: 12px;
        padding: 2px 14px 0 14px;
        font-weight: 600;
        cursor: pointer;
      }

    }
    .button{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex: 1;
      .create{
        margin-right: 20px;
        background:#2dbcff;
        font-size: 14px;
        padding: 4px 10px;
        color: #FFFFFF;
        border-radius: 4px;
        cursor: pointer;
      }
      .create:hover{
        box-shadow:0 2px 4px #2dbcff;
      }
    }
  }
</style>
