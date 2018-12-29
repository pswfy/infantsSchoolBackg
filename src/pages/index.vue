<template>
  <div class="index">
    <!--头部-->
    <s-header class="index-header"/>
    <!--logon and nav-->
    <div class="index-nav" v-show="true">
      <!--logon-->
      <div class="index-nav-left" @click.stop="OnHomePage">
        <transition name="upAndDown">
          <i class="el-icon-caret-bottom" v-show="homePage"></i>
        </transition>
        <div class="left">
          <i class="icon iconfont icon-gengduo1"></i>
          <div>
            <h3>控制中心</h3>
            <div></div>
            <p>
              <span>HOME</span>
              <span>PAGE</span>
            </p>
          </div>
        </div>
        <!--快捷菜单-->
        <div class="btn" :class="{'btn-bg':btnPanel}" @click.stop="onBtnPanel" @mouseleave.stop="mouseLeave">
          <div class="btn-text" v-show="!btnPanel">
            <div class="btn-mas">{{btnPanel?'':'设&nbsp;置'}}</div>
          </div>
          <div class="btn-icon">
            <i class="icon iconfont icon-icon-xitongshezhi"></i>
            <transition name="panelBtn">
              <div class="btn-panel" :class="{'btn-panel-form':btnPanel}" v-if="btnPanel">
                <div class="icon">
                  <i class="icon iconfont icon-icon-xitongshezhi"></i>
                </div>
                <div class="top"><i class="el-icon-arrow-up"></i></div>
                <div class="right"><i class="el-icon-arrow-right"></i></div>
                <div class="left"><i class="el-icon-arrow-left" @click="OnHomePage"></i></div>
                <div class="bottom"><i class="el-icon-arrow-down"></i></div>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <!--快捷菜单-->
      <div class="index-nav-right">
        <s-quickNav :quickNav="quickNav"/>
      </div>
    </div>
    <div class="index-body">
      <!--左边菜单-->
      <transition name="nav">
        <div class="nav" v-show="homePage">
          <vue-scroll :ops="nva">
            <div class="nav-list">
              <el-row>
                <el-col :span="24" style="background: orange;margin-left: 1px">
                  <el-menu
                    :default-active="defaultActive"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    @select="handSelect"
                    background-color="#4778c7"
                    text-color="#add9f2"
                    :unique-opened="true"
                    :router="true"
                    active-text-color="#34aedf">
                    <div :key="index" v-for="(item,index) in HomeMenu">
                      <el-submenu :index="item.path" style="margin-left: -1px">
                        <!--一级title-->
                        <template slot="title">
                          <img :src="$store.state.url+item.icon" :alt="$store.state.url+item.icon" width="22">
                          <span class="title">{{item.title}}</span>
                        </template>
                        <!--分割线-->
                        <div
                          style="position: relative;border-top: 1px solid #3762a7; border-bottom: 1px solid #598fe9;width: 120px;margin-left: 12px">
                          <i class="el-icon-caret-bottom"
                             style="position: absolute;color:#598fe9;left: 50%;top:-6px;font-weight: 500;margin-left: -10px"></i>
                        </div>
                        <!--二级title-->
                        <el-menu-item-group style="width: 150px">
                          <el-menu-item @click="homePageShowHide" :key="indexs" v-for="(ite,indexs) in item.TwoMenu"
                                        class="title-item" :index="ite.path">{{ite.title}}
                          </el-menu-item>
                        </el-menu-item-group>
                      </el-submenu>
                      <!--分割线-->
                      <div
                        style="border-top: 1px solid #3762a7; border-bottom: 1px solid #598fe9;width: 120px;margin-left: 12px"></div>
                    </div>
                  </el-menu>
                </el-col>
              </el-row>
            </div>
          </vue-scroll>
          <p class="exit" v-show="homePage">退出登录</p>
        </div>
      </transition>
      <div :class="{'body-left0':$store.state.w<=768 || !homePage}" class="body">
        <vue-scroll :ops="bodyNav">
          <router-view/>
          <s-footer/>
        </vue-scroll>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../components/header/header';
  import footer from '../components/footer/footer';
  import nav from '../components/nva/nav';
  import quickNav from '../components/nva/quickNav';

  export default {
    components: {
      's-header': header,
      's-footer': footer,
      's-nav': nav,
      's-quickNav': quickNav
    },
    data() {
      return {
        quickNav: [
          {
            title: '考勤管理',
            titles: 'SCREEN',
            path: '/student/members',
            icon: '../../../static/images/sz.png',
          },
          {
            title: '家属管理',
            titles: 'SCREEN',
            path: '/student/members',
            icon: '../../../static/images/sz.png',
          },
          {
            title: '考勤管理',
            titles: 'SCREEN',
            path: '/student/members',
            icon: '../../../static/images/sz.png',
          },
          {
            title: '家属管理',
            titles: 'SCREEN',
            path: '/student/members',
            icon: '../../../static/images/sz.png',
          },
          {
            title: '基本信息',
            titles: 'SCREEN',
            path: '/student/members',
            icon: '../../../static/images/sz.png',
          },
          {
            title: '班级管理',
            titles: 'SCREEN',
            path: '/student/members',
            icon: '../../../static/images/sz.png',
          }
        ],//快捷菜单
        btnPanel: false,//快捷设置
        fullScreen: false,//是否全屏
        userList: null,
        nva: {
          bar: {
            scrollingX: false,
            showDelay: 100,
            onlyShowBarOnScroll: false,
            keepShow: false,
            opacity: .4,
            hoverStyle: true,
            background: '#000'
          },
          rail: {
            background: '#34aedf',
            opacity: 0,
            size: '4px',
            specifyBorderRadius: false,
            gutterOfEnds: '2px',
            gutterOfSide: '1px'
          }
        },
        bodyNav: {
          bar: {
            scrollingX: false,
            showDelay: 100,
            onlyShowBarOnScroll: false,
            keepShow: false,
            opacity: .8,
            hoverStyle: true,
            background: '#34aedf'
          },
          rail: {
            background: '#34aedf',
            opacity: 0,
            size: '6px',
            specifyBorderRadius: false,
            gutterOfEnds: '2px',
            gutterOfSide: '1px'
          }
        },
        homePage: true,
        HomeMenu: [],
        defaultActive: ''
      }
    },
    created() {
      this.getSession();
      this.getAllMenu();
      this.homePageShowHide();

    },
    computed: {},
    methods: {
      mouseLeave() {
        this.btnPanel = false;
      },
      /*快捷设置*/
      onBtnPanel() {
        this.btnPanel = true;
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handSelect(key, keyPath) {
        console.log(keyPath);
      },
      //控制中心
      OnHomePage() {
        this.homePage = !this.homePage;
      },
      /*判断屏幕大小=>左边菜单默认是否显示或控制左边菜单在小屏幕下点击子菜单后隐藏*/
      homePageShowHide() {
        if (this.$store.state.w <= 768) {
          this.homePage = false
        } else {
          this.homePage = true
        }
      },
      //获取session
      getSession() {
        this.$axios.post(this.$store.state.url + '/session/user/info', {}, {
          emulateJSON: true,
          withCredentials: true
        }).then(res => {
          if (res.data.success_code === 4001) {
            this.$message.error('用户未登录,请去登录');
            this.$router.replace('/');
          } else if (res.data.success_code === 2001) {
            let userInfo = {
              '_id': res.data.result_data._id,
              'userName': res.data.result_data.userName,
              'userAvatar': res.data.result_data.userAvatar,
              'jurisdiction': res.data.result_data.jurisdiction,
              'school_id': res.data.result_data.school_id,
              'school_name': res.data.result_data.school_name
            };
            this.$store.dispatch('loginInfo', userInfo);
          }
        }).catch(err => {
          this.$message.error('错误');
          this.$router.replace('/');
        })
      },
      //获取nav菜单
      getAllMenu() {
        this.$axios.post(this.$store.state.url + '/system/nav/menu', {}, {
          emulateJSON: true,
          withCredentials: true
        }).then(res => {
          if (res.data.success_code !== 200) {
            this.$message.error('错误');
            this.$router.replace('/');
          }
          this.HomeMenu = res.data.result_data;
          let TwoMenu =[];
          for(let i= 0;i<this.HomeMenu.length;i++){
            for(let j = 0;j< this.HomeMenu[i].TwoMenu.length;j++){
              TwoMenu.push(this.HomeMenu[i].TwoMenu[j])
            }
          }
          this.$store.dispatch('twoMenu', TwoMenu);
          this.$nextTick(() => {
            this.defaultActive = res.data.result_data[0].TwoMenu[0].path;
          });
        }).catch(err => {
          this.$message.error('错误');
          this.$router.replace('/');
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .index {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: #fdfefe;
    .index-header {
      position: fixed;
      z-index: 1000;
      top: 0;
      left: 0;
    }
    .index-nav {
      display: flex;
      flex-direction: row;
      margin-top: 50px;
      width: 100%;
      height: 80px;
      background: #f1f6f9;
      .index-nav-left {
        position: relative;
        z-index: 200;
        flex: 0 0 150px;
        display: flex;
        background: #34aedf;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        .upAndDown-enter-active, .upAndDown-leave-active {
          transition: all 0.5s ease-out;
        }
        .upAndDown-enter, .upAndDown-leave-active {
          transform: translate3D(0, -18px, 0);
        }
        .left {
          display: flex;
          align-items: center;
          .icon-gengduo1 {
            font-size: 40px;
            color: #FFFFFF;
          }
          & > div {
            display: flex;
            flex-direction: column;
            margin-left: 5px;
            & > h3 {
              font-size: 16px;
              margin: 0;
              color: #FFFFFF;
            }
            & > div {
              width: 32px;
              height: 1px;
              margin-top: 1px;
              border-radius: 1px;
              background: #FFFFFF;
            }
            & > p {
              display: flex;
              font-size: 10px;
              margin: 1px 0 0 0;
              color: #FFFFFF;
              & span:last-child {
                margin-left: 3px;
              }
            }
          }
        }
        .right {
          margin-right: 20px;
          .el-icon-caret-top {
          }
        }
        .el-icon-caret-bottom {
          position: absolute;
          font-size: 30px;
          color: #34aedf;
          bottom: -18px;
        }
      ;
        /*快捷菜单*/
        .btn {
          transition: transform 0.3s ease-out;
          cursor: pointer;
          z-index: 102;
          position: absolute;
          top: -40px;
          left: 50%;
          margin-left: -20px;
          width: 40px;
          height: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: #598fe9;
          &:hover {
            transform: translate(0, 40px);
            .btn-icon {
              transform: rotate(360deg);
            }
          }
          .btn-text {
            position: absolute;
            z-index: 101;
            top: 0;
            left: 0;
            width: 100%;
            height: 30px;
            color: #add9f2;
            font-size: 14px;
            .btn-mas {
              text-align: center;
              height: 20px;
              font-size: 14px;
              font-weight: 400;
              line-height: 26px;
            }
          }
          .btn-icon {
            transition: transform 0.3s ease-out;
            color: #FFFFFF;
            top: 22px;
            position: absolute;
            z-index: 101;
            left: 0;
            width: 100%;
            height: 40px;
            background: #4778c7;
            border-radius: 50%;
            justify-content: center;
            align-items: center;
            text-align: center;
            line-height: 40px;
            i {
              font-size: 26px;
            }
            .panelBtn-enter-active, .panelBtn-leave-active {
              transform-origin: 50% 50%;
              transition: all 0.5s ease-out;
            }

            .panelBtn-enter, .panelBtn-leave-active {
              transform: rotate(90deg);
              opacity: 0;
            }
            .btn-panel {
              transition: all 2s ease-out;
              position: absolute;
              z-index: 101;
              top: -21px;
              left: -20px;
              width: 80px;
              height: 80px;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              background: rgba(57, 99, 164, .9);
              font-size: 14px;
              .icon {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 40px;
                background: #4778c7;
                border-radius: 50%;
              }
              .top {
                width: 20px;
                height: 20px;
                position: absolute;
                z-index: 101;
                margin-left: -10px;
                display: flex;
                justify-content: center;
                align-items: center;
                top: 0;
                left: 50%;
                i {
                  font-size: 14px;
                }
              }
              .right {
                width: 20px;
                height: 20px;
                position: absolute;
                margin-top: -10px;
                z-index: 101;
                display: flex;
                justify-content: center;
                align-items: center;
                left: 60px;
                top: 50%;
                i {
                  font-size: 14px;
                }
              }
            ;
              .left {
                width: 20px;
                height: 20px;
                position: absolute;
                z-index: 101;
                margin-top: -10px;
                display: flex;
                justify-content: center;
                align-items: center;
                left: 0;
                top: 50%;
                i {
                  font-size: 14px;
                }
              }
            ;
              .bottom {
                width: 20px;
                height: 20px;
                position: absolute;
                margin-left: -10px;
                z-index: 101;
                display: flex;
                text-align: center;
                line-height: 20px;
                justify-content: center;
                align-items: center;
                left: 50%;
                top: 60px;
                i {
                  color: #FFFFFF;
                  font-size: 14px;
                }
              }
            ;
            }
            .btn-panel-form {
              transform: rotate(360deg);
            }
          }
        }
        .btn-bg {
          background: transparent;
        }
      }
      .index-nav-right {
        position: relative;
        z-index: 100;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;;
      }
    }
    .index-body {
      display: flex;
      width: 100%;
      height: 100%;
      margin-top: 10px;
      .nav-enter-active, .nav-leave-active {
        transition: all 0.8s ease-out;
      }
      .nav-enter, .nav-leave-active {
        transform: translate3D(-150px, 0, 0);
      }
      .nav {
        flex: 0 0 150px;
        width: 150px;
        position: fixed;
        z-index: 100;
        top: 140px;
        left: 0;
        padding: 0;
        margin: 0;
        height: 100%;
        background: #4679c7;
        overflow: hidden;
        .nav-list {
          padding-bottom: 170px;
          user-select: none;
        }
        .el-menu-item.is-active {
          box-sizing: border-box !important;
          background-color: rgb(52, 174, 223) !important;
          color: #FFFFFF !important;
          border-left: 4px solid #e6a201 !important;
        }
        .el-menu-item-group__title {
          margin: 0 !important;
        }
        .exit {
          position: fixed;
          z-index: 100;
          left: 0;
          bottom: 0;
          margin: 0;
          width: 150px;
          height: 30px;
          background: #3c68b1;
          color: #add9f2;
          cursor: pointer;
          line-height: 30px;
          text-align: center;
          font-size: 13px;
        }
      }
      .body {
        flex: 1;
        margin: 0 0 0 150px;
        margin-bottom: 170px;
        overflow: hidden;
      }
      .body-left0 {
        margin-left: 0;
      }
    }
  }
</style>
