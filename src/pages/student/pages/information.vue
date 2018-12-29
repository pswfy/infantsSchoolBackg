<template>
  <div class="table-main">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="学生信息" name="second" class="table-body">
        <s-studentInfo/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import studentInfo from './components/studentInfo';
  export default {
    components: {
      's-studentInfo':studentInfo
    },
    data() {
      return {
        activeName: 'second',
      };
    },
    mounted() {

    },
    methods: {

      /*tab*/
      handleClick(tab, event) {
        //console.log(tab, event);
      },
    }
  };
</script>

<style scoped lang="scss">
  .table-main {
    display: flex;
    flex-direction: column;
    margin:0;
    box-sizing: border-box;
  }

</style>
