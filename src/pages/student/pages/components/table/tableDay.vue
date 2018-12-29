<template>
  <div class="table-week">
    <el-table
      :data="tableData"
      :stripe="true"
      style="width: 100%">
      <el-table-column
        fixed
        prop="date"
        label="班级"
        width="100"
        :filters="[
           {text: '小(1)班', value: '小(1)班'},
           {text: '小(2)班', value: '小(2)班'},
           {text: '小(3)班', value: '小(3)班'},
           {text: '小(4)班', value: '小(4)班'},
           {text: '小(5)班', value: '小(5)班'},
           {text: '小(6)班', value: '小(6)班'},
           {text: '小(7)班', value: '小(7)班'},
           {text: '小(8)班', value: '小(8)班'},
           {text: '小(9)班', value: '小(9)班'},
           {text: '小(10)班', value: '小(10)班'},
           {text: '小(11)班', value: '小(11)班'},
           {text: '小(12)班', value: '小(12)班'}
           ]"
        :filter-method="filterHandler">
      </el-table-column>
      <el-table-column
        prop="Monday"
        label="应到"
        width="100">
      </el-table-column>
      <el-table-column
        prop="Tuesday"
        label="实到"
        width="100">
      </el-table-column>
      <el-table-column
        prop="Wednesday"
        label="到勤率"
        width="100">
      </el-table-column>
      <el-table-column
        prop="Thursday"
        label="缺勤率"
        width="100">
      </el-table-column>
      <el-table-column
        prop="Friday.length"
        label="事假"
        width="100">
      </el-table-column>
      <el-table-column
        prop="Saturday.length"
        label="病假"
        width="100">
      </el-table-column>
      <el-table-column
        prop="Sunday"
        label="缺课"
        width="100">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<div class="table-day">111</div>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            date: '小(1)班',
            Monday: '100',//应到
            Tuesday: '94',//实到
            Wednesday: '94%',//到勤率
            Thursday: '4%',//缺勤率
            Friday: [
              {"student": "雯雯", "start": "2018-12-10 08:00", "end": "2018-12-11 12:00", "msg": '父母没空', "cher": "老师1"},
              {"student": "哎哎", "start": "2018-12-10 12:00", "end": "2018-12-11 14:00", "msg": '父母没空1', "cher": "老师2"}
            ],//事假
            Saturday: [
              {"student": "雯雯", "start": "2018-12-10 08:00", "end": "2018-12-11 12:00", "msg": '父母没空', "cher": "老师1"},
              {"student": "哎哎", "start": "2018-12-10 12:00", "end": "2018-12-11 14:00", "msg": '父母没空1', "cher": "老师2"}
            ],//病假
            Sunday: '0',//缺课
          },
          {
            date: '小(2)班',
            Monday: '100',//应到
            Tuesday: '94',//实到
            Wednesday: '94%',//到勤率
            Thursday: '4%',//缺勤率
            Friday: [
              {"student": "雯雯", "start": "2018-12-10 08:00", "end": "2018-12-11 12:00", "msg": '父母没空', "cher": "老师1"},
              {"student": "哎哎", "start": "2018-12-10 12:00", "end": "2018-12-11 14:00", "msg": '父母没空1', "cher": "老师2"}
            ],//事假
            Saturday: [
              {"student": "雯雯", "start": "2018-12-10 08:00", "end": "2018-12-11 12:00", "msg": '父母没空', "cher": "老师1"},
              {"student": "哎哎", "start": "2018-12-10 12:00", "end": "2018-12-11 14:00", "msg": '父母没空1', "cher": "老师2"}
            ],//病假
            Sunday: '0',//缺课
          },
          {
            date: '小(3)班',
            Monday: '100',//应到
            Tuesday: '94',//实到
            Wednesday: '94%',//到勤率
            Thursday: '4%',//缺勤率
            Friday: [
              {"student": "雯雯", "start": "2018-12-10 08:00", "end": "2018-12-11 12:00", "msg": '父母没空', "cher": "老师1"},
              {"student": "哎哎", "start": "2018-12-10 12:00", "end": "2018-12-11 14:00", "msg": '父母没空1', "cher": "老师2"}
            ],//事假
            Saturday: [
              {"student": "雯雯", "start": "2018-12-10 08:00", "end": "2018-12-11 12:00", "msg": '父母没空', "cher": "老师1"},
              {"student": "哎哎", "start": "2018-12-10 12:00", "end": "2018-12-11 14:00", "msg": '父母没空1', "cher": "老师2"}
            ],//病假
            Sunday: '0',//缺课
          },
          {
            date: '小(4)班',
            Monday: '100',//应到
            Tuesday: '94',//实到
            Wednesday: '94%',//到勤率
            Thursday: '4%',//缺勤率
            Friday: [
              {"student": "雯雯", "start": "2018-12-10 08:00", "end": "2018-12-11 12:00", "msg": '父母没空', "cher": "老师1"},
              {"student": "哎哎", "start": "2018-12-10 12:00", "end": "2018-12-11 14:00", "msg": '父母没空1', "cher": "老师2"}
            ],//事假
            Saturday: [
              {"student": "雯雯", "start": "2018-12-10 08:00", "end": "2018-12-11 12:00", "msg": '父母没空', "cher": "老师1"},
              {"student": "哎哎", "start": "2018-12-10 12:00", "end": "2018-12-11 14:00", "msg": '父母没空1', "cher": "老师2"}
            ],//病假
            Sunday: '0',//缺课
          },
          {
            date: '小(5)班',
            Monday: '100',//应到
            Tuesday: '94',//实到
            Wednesday: '94%',//到勤率
            Thursday: '4%',//缺勤率
            Friday: [
              {"student": "雯雯", "start": "2018-12-10 08:00", "end": "2018-12-11 12:00", "msg": '父母没空', "cher": "老师1"},
              {"student": "哎哎", "start": "2018-12-10 12:00", "end": "2018-12-11 14:00", "msg": '父母没空1', "cher": "老师2"}
            ],//事假
            Saturday: [
              {"student": "雯雯", "start": "2018-12-10 08:00", "end": "2018-12-11 12:00", "msg": '父母没空', "cher": "老师1"},
              {"student": "哎哎", "start": "2018-12-10 12:00", "end": "2018-12-11 14:00", "msg": '父母没空1', "cher": "老师2"}
            ],//病假
            Sunday: '0',//缺课
          },
          {
            date: '小(6)班',
            Monday: '100',//应到
            Tuesday: '94',//实到
            Wednesday: '94%',//到勤率
            Thursday: '4%',//缺勤率
            Friday: [
              {"student": "雯雯", "start": "2018-12-10 08:00", "end": "2018-12-11 12:00", "msg": '父母没空', "cher": "老师1"},
              {"student": "哎哎", "start": "2018-12-10 12:00", "end": "2018-12-11 14:00", "msg": '父母没空1', "cher": "老师2"}
            ],//事假
            Saturday: [
              {"student": "雯雯", "start": "2018-12-10 08:00", "end": "2018-12-11 12:00", "msg": '父母没空', "cher": "老师1"},
              {"student": "哎哎", "start": "2018-12-10 12:00", "end": "2018-12-11 14:00", "msg": '父母没空1', "cher": "老师2"}
            ],//病假
            Sunday: '0',//缺课
          }
        ]
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
        this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
          dangerouslyUseHTMLString: true
        });
      },
      //班级筛选
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      //道勤率筛选
      filterWeek(value, row, column) {
        const property = column['property'];
        let rowIndex = parseInt(row[property]);
        return rowIndex <= parseInt(value)
      }
    }
  }
</script>

<style scoped lang="scss">
  .table-week {
    width: 100%;
    overflow: hidden;
    .table-day {
      width: 600px;
      height: 400px;
      background: red;
      position: fixed;
      z-index: 10000;
      top: 0;
      left: 0;
    }
  }
</style>
