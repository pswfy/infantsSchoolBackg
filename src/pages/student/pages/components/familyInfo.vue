<template>
    <div class="family-info">
      <div class="family-info-header">
        <el-input class="input" size="small" v-model="input" placeholder="请输入家属姓名"  prefix-icon="el-icon-search" clearable></el-input>
        <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="family-info-body">
        <s-tableFamily/>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import tableFamily from './table/tableFamily.vue';
  export default {
    components: {
      's-tableFamily':tableFamily
    },
    data(){
      return{
        input:''
      }
    }
  };
</script>

<style scoped lang="scss">
  .family-info{
    margin: 0;
    padding: 0;
    .family-info-header{
      height: 32px;
      width: 100%;
      .input{
        width: 160px;
      }
    }
  }
</style>
