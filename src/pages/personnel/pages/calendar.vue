<template>
  <div class="calendar">
    <div class="calendar-nav">
      <s-nav/>
    </div>
    <div class="calendar-body">
      <div class="header">
        <s-title @nextMonth="nextMonth" @prevMonth="prevMonth"/>
      </div>
      <div class="table">
        <s-table ref="tableDomData"/>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import title  from './component/title';
  import table  from './component/table';
  import nav  from './component/nav';
  export default{
    components:{
      's-nav':nav,
      's-title':title,
      's-table':table
    },
    data(){
      return{}
    },
    methods:{
      /*上一月*/
      nextMonth(){
        this.$store.dispatch('goNextMonthAction');
        this.$refs.tableDomData.tableDomData()
      },
      /*下一月*/
      prevMonth(){
        this.$store.dispatch('goPrevMonthAction');
        this.$refs.tableDomData.tableDomData()
      }
    }
  }
</script>
<style scoped lang="scss">
  .calendar{
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    .calendar-nav{
      box-sizing: border-box;
      background: olive;
      flex: 0 0 200px;
    }
    .calendar-body{
      flex: 1;
      display: flex;
      flex-direction: column;
      .header{

      }
      .table{
        padding: 6px 6px 1px 6px;
        box-sizing: border-box;
      }
    }
  }
</style>

