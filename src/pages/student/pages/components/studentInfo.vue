<template>
  <div class="family-info">
    <div class="family-info-header">
      <el-input class="input" size="small" v-model="input" placeholder="请输学生姓名" prefix-icon="el-icon-search"
                clearable></el-input>
      <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
    </div>
    <div class="family-info-body">
      <el-table
        :data="tableData"
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
          prop="admissionTime"
          label="入校时间"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="height"
          label="身高"
          width="100">
        </el-table-column>
        <el-table-column
          prop="width"
          label="体重"
          width="100">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="100">
        </el-table-column>
        <el-table-column
          prop="class"
          label="班级"
          width="100">
        </el-table-column>
        <el-table-column
          label="家属"
          width="100">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div v-for="item in scope.row.family" style="border-bottom: 1px solid #34aedf;">
                <p>姓名:{{item.name}}</p>
                <p>关系:{{item.type}}</p>
                <p>电话:{{item.phone}}</p>
                <p>地址:{{item.address}}</p>
              </div>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.family[0].name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
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
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        input: '',
        tableData: [
          {
            createDate: '2016-05-02',
            updateDate: '2016-05-02',
            admissionTime: '2016-05-02',
            name: '王小虎',
            class: '小(1)班',
            height: '120cm',
            width: '36gk',
            sex: '男',
            family: [
              {name: '王姐', type: '母亲', phone: '18285150052', address: '贵阳路南明区12号'},
              {name: '乐然', type: '父亲', phone: '18285150052', address: '贵阳路南明区12号'}
            ],
            address: '金沙江12路'
          },
          {
            createDate: '2016-05-02',
            updateDate: '2016-05-02',
            admissionTime: '2016-05-02',
            name: '王小虎',
            class: '小(1)班',
            height: '120cm',
            width: '36gk',
            sex: '男',
            family: [
              {name: '王姐', type: '母亲', phone: '18285150052', address: '贵阳路南明区12号'},
              {name: '乐然', type: '父亲', phone: '18285150052', address: '贵阳路南明区12号'}
            ],
            address: '金沙江12路'
          },
          {
            createDate: '2016-05-02',
            updateDate: '2016-05-02',
            admissionTime: '2016-05-02',
            name: '王小虎',
            class: '小(1)班',
            height: '120cm',
            width: '36gk',
            sex: '男',
            family: [
              {name: '王姐', type: '母亲', phone: '18285150052', address: '贵阳路南明区12号'},
              {name: '乐然', type: '父亲', phone: '18285150052', address: '贵阳路南明区12号'}
            ],
            address: '金沙江12路'
          },
          {
            createDate: '2016-05-02',
            updateDate: '2016-05-02',
            admissionTime: '2016-05-02',
            name: '王小虎',
            class: '小(1)班',
            height: '120cm',
            width: '36gk',
            sex: '男',
            family: [
              {name: '王姐', type: '母亲', phone: '18285150052', address: '贵阳路南明区12号'},
              {name: '乐然', type: '父亲', phone: '18285150052', address: '贵阳路南明区12号'}
            ],
            address: '金沙江12路'
          },
          {
            createDate: '2016-05-02',
            updateDate: '2016-05-02',
            admissionTime: '2016-05-02',
            name: '王小虎',
            class: '小(1)班',
            height: '120cm',
            width: '36gk',
            sex: '男',
            family: [
              {name: '王姐', type: '母亲', phone: '18285150052', address: '贵阳路南明区12号'},
              {name: '乐然', type: '父亲', phone: '18285150052', address: '贵阳路南明区12号'}
            ],
            address: '金沙江12路'
          },
          {
            createDate: '2016-05-02',
            updateDate: '2016-05-02',
            admissionTime: '2016-05-02',
            name: '王小虎',
            class: '小(1)班',
            height: '120cm',
            width: '36gk',
            sex: '男',
            family: [
              {name: '王姐', type: '母亲', phone: '18285150052', address: '贵阳路南明区12号'},
              {name: '乐然', type: '父亲', phone: '18285150052', address: '贵阳路南明区12号'}
            ],
            address: '金沙江12路'
          }
        ]
      }
    },
    methods: {
      handleClick(row) {
      }
    }
  };
</script>

<style scoped lang="scss">
  .family-info {
    margin: 0;
    padding: 0;
    .family-info-header {
      height: 32px;
      width: 100%;
      .input {
        width: 160px;
      }
    }
    .page{
      margin-top: 10px;
      padding: 0;
      margin-right: 0;
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
