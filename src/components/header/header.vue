<template>
    <div class="header">
      <!--login-->
      <div class="header-logo">
        <img src="../../../static/images/login-1.png" alt="">
      </div>
      <!--线-->
      <div class="xian hidden-xs-only hidden-sm-only"></div>
      <!--content-->
      <div class="header-content hidden-xs-only">
        <div class="header-content-text">{{WelcomeText}}</div>
        <div class="header-content-input hidden-xs-only hidden-sm-only">
          <input type="text" class="search" placeholder="请输入学生姓名 / 学号">
          <i class="el-icon-search"></i>
        </div>
      </div>
      <!--线-->
      <div class="xian hidden-xs-only hidden-sm-only"></div>
      <!--nav-->
      <div class="header-list">
        <div @click="noPanelShowHide">
          <i class="icon iconfont icon-yonghu"></i>
          <span class="user-name">{{$store.state.userInfo.userName}}</span>
          <i class="el-icon-caret-bottom"></i>
          <!--面板-->
            <!--用户-->
            <s-user :panelShowHide="panelShowHide"/>
        </div>
        <div>
          <span>待办事项</span>
          <span class="panel">2</span>
        </div>
        <div>
          <span>警告信息</span>
          <span class="panel" v-show="false">2</span>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import user from './component/user';
  export default {
    components: {
      's-user': user
    },
    data(){
      return{
        userInfo:{},
        panelShowHide:false
      }
    },
    computed:{
      userInfoAction(){
        return this.$store.state.userInfo;
      },
      WelcomeText(){
        let msg =parseInt(this.userInfo.jurisdiction);
        if(msg === this.$store.state.Jurisdiction.ROOT){
          return '欢迎超级管理员进入思园后台管理系统';
        }
        if(msg === this.$store.state.Jurisdiction.ADMIN){
          return '欢迎系统管理员进入思园后台管理系统';
        }
        if(msg === this.$store.state.Jurisdiction.SCHOOL){
          return `欢迎${this.userInfo.school_name}学校超级管理员进入管理系统`;
        }
        if(msg === this.$store.state.Jurisdiction.SCHOOL_TEACHER){
          return `欢迎-${this.userInfo.school_name}学校教师进入管理系统`;
        }
        if(msg === this.$store.state.Jurisdiction.SCHOOL_LOGISTICS){
          return `欢迎-${this.userInfo.school_name}学校管理员进入管理系统`;
        }else{
          return '';
        }
      }
    },
    watch:{
      userInfoAction:{
        handler:function(val){
          this.userInfo=val;
        }
      },
      deep: true,
      immediate: true
    },
    methods:{
      noPanelShowHide(){
        this.panelShowHide = ! this.panelShowHide;
      }
    }
  };
</script>

<style scoped lang="scss">
  .header{
    display: flex;
    z-index: 101;
    flex-direction: row;
    justify-content: space-between;
    height: 50px;
    width: 100%;
    padding: 0;
    margin: 0;
    background: #4778c7;
    box-shadow:0 1px 10px #555555;
    .xian{
      width: 0;
      height: 20px;
      margin-top: 15px;
      border-left: 1px solid #3762a7;
      border-right: 1px solid #598fe9;
    }
    .header-logo{
      flex: 0 0 150px;
      width: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      margin: 0;
      img{
        height: 50px;
      }
    }
    .header-content{
      flex: 1;
      margin: 0 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      overflow: hidden;
      .header-content-text{
        color: #add9f2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        font-weight: 500;
      }
      .header-content-input{
        position: relative;
        .search{
          border: 0 solid transparent;
          box-sizing: border-box;
          outline: none;
          height: 26px;
          padding: 0 30px 0 10px;
          border-radius: 15px;
          width: 200px;
          background:#3c68b1;
          color: #add9f2;
          font-size: 12px;
        }
        .el-icon-search{
          position: absolute;
          cursor: pointer;
          font-size: 16px;
          color:#add9f2;
          top:5px;
          right: 8px;
        }
        & input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
          color: #add9f2;
          font-size: 12px;
        }
        & input:-moz-placeholder, textarea:-moz-placeholder {
          color: #add9f2;
          font-size: 12px;
        }
        & input:-ms-input-placeholder, textarea:-ms-input-placeholder {
          color: #add9f2;
          font-size: 12px;
        }
      }
    }
    .header-list{
      flex: 0 0 300px;
      margin: 0 20px;
      display: flex;
      justify-content: space-around;
      align-self: center;
      &>div{
        position: relative;
        z-index: 101;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 0 10px 0 0;
        .user-name{
          display: inline-block;
          max-width: 80px;
          align-items: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
        }
        .icon-yonghu{
          font-size: 15px;
          color: #FFFFFF;
          margin-right: 5px;
          font-weight: 700;
          vertical-align: middle;
        }
        & span{
          vertical-align: middle;
          color:#add9f2;
          font-size: 14px;
        }
        .el-icon-caret-bottom{
          font-size: 12px;
          color: #FFFFFF;
        }
        .panel{
          position: absolute;
          z-index: 101;
          top:-8px;
          right: -14px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 16px;
          height: 16px;
          padding: 2px;
          border-radius: 50%;
          color: #FFFFFF;
          background: rgba(255,0,0,0.8);
        }
      }
    }
  }
</style>
