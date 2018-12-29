<template>
  <div class="table-main">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="班级考勤" name="second" class="table-body">
        <s-classAttendance/>
      </el-tab-pane>
      <el-tab-pane label="学生考勤" name="third">
        <s-studentAttendance/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import classAttendance from './components/classAttendance';
  import studentAttendance from './components/studentAttendance';
  export default {
    components: {
      's-classAttendance': classAttendance,
      's-studentAttendance': studentAttendance,
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
