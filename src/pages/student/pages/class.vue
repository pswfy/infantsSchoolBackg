<template>
  <div class="table-main">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="班级信息" name="second" class="table-body">
        班级信息
      </el-tab-pane>
      <el-tab-pane label="创建信息" name="third">
        创建班级
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    components: {
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
