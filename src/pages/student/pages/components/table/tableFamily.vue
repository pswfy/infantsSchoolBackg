<template>
  <div class="table">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="createDate"
        label="创建时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="updateDate"
        label="最后修改"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="type"
        label="关系"
        width="100">
      </el-table-column>
      <el-table-column
        prop="bodyName"
        label="宝宝"
        width="100">
      </el-table-column>
      <el-table-column
        prop="bodyClass"
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
        prop="phone"
        label="手机"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="家庭地址">
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
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        tableData: [
          {
            createDate: '2016-05-02',
            updateDate: '2016-05-02',
            name: '李姐',
            type: '母亲',
            bodyName: '雯雯',
            bodyClass: '小(1)班',
            phone: '18285150052',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            createDate: '2016-05-02',
            updateDate: '2016-05-02',
            name: '李姐',
            type: '母亲',
            bodyName: '雯雯',
            bodyClass: '小(1)班',
            phone: '18285150052',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            createDate: '2016-05-02',
            updateDate: '2016-05-02',
            name: '李姐',
            type: '母亲',
            bodyName: '雯雯',
            bodyClass: '小(2)班',
            phone: '18285150052',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            createDate: '2016-05-02',
            updateDate: '2016-05-02',
            name: '李姐',
            type: '母亲',
            bodyName: '雯雯',
            bodyClass: '小(2)班',
            phone: '18285150052',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            createDate: '2016-05-02',
            updateDate: '2016-05-02',
            name: '李姐',
            type: '母亲',
            bodyName: '雯雯',
            bodyClass: '小(3)班',
            phone: '18285150052',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            createDate: '2016-05-02',
            updateDate: '2016-05-02',
            name: '李姐',
            type: '母亲',
            bodyName: '雯雯',
            bodyClass: '小(3)班',
            phone: '18285150052',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            createDate: '2016-05-02',
            updateDate: '2016-05-02',
            name: '李姐',
            type: '母亲',
            bodyName: '雯雯',
            bodyClass: '小(4)班',
            phone: '18285150052',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            createDate: '2016-05-02',
            updateDate: '2016-05-02',
            name: '李姐',
            type: '母亲',
            bodyName: '雯雯',
            bodyClass: '小(4)班',
            phone: '18285150052',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            createDate: '2016-05-02',
            updateDate: '2016-05-02',
            name: '李姐',
            type: '母亲',
            bodyName: '雯雯',
            bodyClass: '小(5)班',
            phone: '18285150052',
            address: '上海市普陀区金沙江路 1518 弄',
          }
        ]
      }
    },
    methods: {
      handleClick(rowData) {

      },
      //班级筛选
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
    }
  };
</script>

<style scoped lang="scss">
  .table {
    margin: 0;
    padding: 0;
    .page{
      margin-top: 10px;
      padding: 0;
      margin-right: 0;
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
