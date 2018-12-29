<template>
  <div class="table-main">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="家属信息" name="second" class="table-body">
        <s-familyInfo/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import familyInfo from './components/familyInfo';
  export default {
    components: {
      's-familyInfo':familyInfo,
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
