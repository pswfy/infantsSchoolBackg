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
        width="80"
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
        label="一月"
        width="60"
        :filters="tableMsg"
        :filter-method="filterWeek">
      </el-table-column>
      <el-table-column
        prop="Tuesday"
        label="二月"
        width="60"
        :filters="tableMsg"
        :filter-method="filterWeek">
      </el-table-column>
      <el-table-column
        prop="Wednesday"
        label="三月"
        width="60"
        :filters="tableMsg"
        :filter-method="filterWeek">
      </el-table-column>
      <el-table-column
        prop="Thursday"
        label="四月"
        width="60"
        :filters="tableMsg"
        :filter-method="filterWeek">
      </el-table-column>
      <el-table-column
        prop="Friday"
        label="五月"
        width="60"
        :filters="tableMsg"
        :filter-method="filterWeek">
      </el-table-column>
      <el-table-column
        prop="Saturday"
        label="六月"
        width="60"
        :filters="tableMsg"
        :filter-method="filterWeek">
      </el-table-column>
      <el-table-column
        prop="Saturday"
        label="七月"
        width="60"
        :filters="tableMsg"
        :filter-method="filterWeek">
      </el-table-column>
      <el-table-column
        prop="Sunday"
        label="八月"
        width="60"
        :filters="tableMsg"
        :filter-method="filterWeek">
      </el-table-column>
      <el-table-column
        prop="Sunday"
        label="九月"
        width="60"
        :filters="tableMsg"
        :filter-method="filterWeek">
      </el-table-column>
      <el-table-column
        prop="Sunday"
        label="十月"
        width="60"
        :filters="tableMsg"
        :filter-method="filterWeek">
      </el-table-column>
      <el-table-column
        prop="Sunday"
        label="十一月"
        width="80"
        :filters="tableMsg"
        :filter-method="filterWeek">
      </el-table-column>
      <el-table-column
        prop="Sunday"
        label="十二月"
        width="80"
        :filters="tableMsg"
        :filter-method="filterWeek">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableMsg:[
          {text: '小于100%', value: '100%'},
          {text: '小于90%', value: '90%'},
          {text: '小于80%', value: '80%'},
          {text: '小于70%', value: '70%'},
          {text: '小于60%', value: '60%'},
          {text: '小于50%', value: '50%'},
          {text: '小于40%', value: '40%'},
          {text: '小于30%', value: '30%'},
          {text: '小于20%', value: '20%'},
          {text: '小于10%', value: '10%'}
        ],
        tableData: [{
          date: '小(1)班',
          Monday: '99%',
          Tuesday: '98%',
          Wednesday: '100%',
          Thursday: '95%',
          Friday: '87%',
          Saturday: '0%',
          Sunday: '0%',
        },
          {
            date: '小(2)班',
            Monday: '49%',
            Tuesday: '68%',
            Wednesday: '100%',
            Thursday: '95%',
            Friday: '68%',
            Saturday: '0%',
            Sunday: '0%',
          },
          {
            date: '小(3)班',
            Monday: '69%',
            Tuesday: '98%',
            Wednesday: '100%',
            Thursday: '95%',
            Friday: '88%',
            Saturday: '0%',
            Sunday: '0%',
          },
          {
            date: '小(4)班',
            Monday: '89%',
            Tuesday: '98%',
            Wednesday: '100%',
            Thursday: '95%',
            Friday: '88%',
            Saturday: '0%',
            Sunday: '0%',
          },
          {
            date: '小(5)班',
            Monday: '59%',
            Tuesday: '98%',
            Wednesday: '100%',
            Thursday: '95%',
            Friday: '88%',
            Saturday: '0%',
            Sunday: '0%',
          },
          {
            date: '小(6)班',
            Monday: '99%',
            Tuesday: '98%',
            Wednesday: '100%',
            Thursday: '95%',
            Friday: '88%',
            Saturday: '0%',
            Sunday: '0%',
          },
          {
            date: '小(7)班',
            Monday: '99%',
            Tuesday: '98%',
            Wednesday: '100%',
            Thursday: '95%',
            Friday: '88%',
            Saturday: '0%',
            Sunday: '0%',
          },
          {
            date: '小(8)班',
            Monday: '19%',
            Tuesday: '98%',
            Wednesday: '100%',
            Thursday: '95%',
            Friday: '88%',
            Saturday: '0%',
            Sunday: '0%',
          },
          {
            date: '小(9)班',
            Monday: '59%',
            Tuesday: '98%',
            Wednesday: '100%',
            Thursday: '95%',
            Friday: '88%',
            Saturday: '0%',
            Sunday: '0%',
          },
          {
            date: '小(10)班',
            Monday: '19%',
            Tuesday: '98%',
            Wednesday: '100%',
            Thursday: '95%',
            Friday: '88%',
            Saturday: '0%',
            Sunday: '0%',
          },
          {
            date: '小(11)班',
            Monday: '59%',
            Tuesday: '98%',
            Wednesday: '100%',
            Thursday: '95%',
            Friday: '88%',
            Saturday: '0%',
            Sunday: '0%',
          },
          {
            date: '小(12)班',
            Monday: '69%',
            Tuesday: '98%',
            Wednesday: '100%',
            Thursday: '95%',
            Friday: '88%',
            Saturday: '0%',
            Sunday: '0%',
          }
        ]
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
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
  }
</style>
