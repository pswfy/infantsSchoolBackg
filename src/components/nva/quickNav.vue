<template>
  <div class="quick-nav"
       @mouseleave.stop="onQuickOut"
       @mousedown.stop="onMouseDown"
       @mouseup.stop="onMouseUp"
       ref="quickNav"
  >
    <div class="quick-nav-body">
      <div class="quick-nav-inner" :style="{'left':BarMove+'px'}">
        <div class="inner" :style="{'width':screenContentW+'px'}">
          <div class="item" :key="index" v-for="(item,index) in quickNav">
            <div class="item-icon" :style="{'background':color[index]}">
              <img :src="item.icon" width="30" alt="">
            </div>
            <div class="item-msg">
              <div class="title">{{item.title}}</div>
              <div class="xian"></div>
              <div class="title-msg">{{item.titles}}</div>
            </div>
          </div>
          <div class="item-right" @click.stop="updateQuickav" >
            <i class="el-icon-edit"></i>
            <span>编辑快捷菜单</span>
          </div>
        </div>
      </div>
    </div>
    <!--经度条-->
    <div class="quick-nav-nav" v-show="screenContentW > screenW">
      <div v-show="showHideFull" class="quick-nav-nav-bg"
           :style="{'width':bgBarW+'px','left':'-'+(bgBarW/2 + 80)+'px'}">
        <div class="quick-nav-nav-inner" :style="{'width':barX+'px','left':barMoveWidth + 'px'}"></div>
      </div>
    </div>
    <!--设置快捷菜单-->
    <s-setQuickNavDialog :dialog="dialog"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import setQuickNavDialog from '../../components/dialog/setQuickNavDialog';
  export default {
    components:{
      's-setQuickNavDialog':setQuickNavDialog
    },
    props: {
      quickNav: {
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    data() {
      return {
        dialog:{
          show:false
        },
        fullScreen: false,//是否全屏
        showHideFull: true,//鼠标移入移除
        color: ['#99CCCC', '#3399CC', '#99CCCC', '#999933', '#9999FF', '#CC6666', '#336699',
          '#669999', '#66CC99', '#993399', '#FF99CC', '#FF6666', '#339999', '#FF99CC', '#003399',
          '#CCFF00', '#66CC99', '#CC6699', '##CC6699', '#FF6666', '#993366', '#666699', '#CC6699',
          '#663366', '#CC3399', '#CCCCCC', '#CC99CC', '#CC3399', '#CCCC33', '#CC9933', '#CC9966',
          '#999933', '#006633', '#003300', '#CCFFCC', '#CC9966', '#663366', '#666633', '#993366',
          '#6699CC', '#CCCC99', '#666699', '#003366', '##666699', '#336699', '#99CCFF', '#336666',
          '#333366', '#99CC33', '#336699', '#999999', '#99CC33', '#669999', '#CCCC33', '#666699',
          '#99CCCC', '#3399CC', '#99CCCC', '#999933', '#9999FF', '#CC6666', '#336699',
          '#669999', '#66CC99', '#993399', '#FF99CC', '#FF6666', '#339999', '#FF99CC', '#003399',
          '#CCFF00', '#66CC99', '#CC6699', '##CC6699', '#FF6666', '#993366', '#666699', '#CC6699',
          '#663366', '#CC3399', '#CCCCCC', '#CC99CC', '#CC3399', '#CCCC33', '#CC9933', '#CC9966',
          '#999933', '#006633', '#003300', '#CCFFCC', '#CC9966', '#663366', '#666633', '#993366',
          '#6699CC', '#CCCC99', '#666699', '#003366', '##666699', '#336699', '#99CCFF', '#336666',
          '#333366', '#99CC33', '#336699', '#999999', '#99CC33', '#669999', '#CCCC33', '#666699'],//快捷菜单背景色
        startX: 0,//起点
        endFlag: 0,//结束点
        barMoveWidth: 0,//移动的距离小滚动条
        BarMove: 0,//大滚动条滚动的距离

      }
    },
    computed: {
      //屏幕宽减左边菜单
      screenW() {
        return (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 150
      },
      //滚动区宽度
      screenContentW() {
        return 115 + this.quickNav.length * 131
      },
      //滚动背景宽度
      bgBarW() {
        return parseInt((this.screenW / 3))
      },
      //滚动条长度
      barX() {
        return parseInt(this.bgBarW * (this.screenW / this.screenContentW));
      }
    },
    mounted() {

    },
    methods: {
      /*编辑快捷菜单*/
      updateQuickav(){
        this.dialog.show = true;
      },
      /*鼠标按下*/
      onMouseDown(event) {
        if(this.screenContentW >= this.screenW){
          this.$refs.quickNav.addEventListener('mousemove', this.onMouseMove, false);
          let CurrentEvent = event || ev;
          this.startX = Number(CurrentEvent.screenX);
        }
      },
      /*鼠标按抬起*/
      onMouseUp() {
        if(this.screenContentW >= this.screenW){
          this.$refs.quickNav.removeEventListener('mousemove', this.onMouseMove, false);
          this.endFlag = this.barMoveWidth;
        }
      },
      /*鼠标移动*/
      onMouseMove(event) {
        if(this.screenContentW >= this.screenW){
          let CurrentEvent = event || ev;
          let MoveWidth = Number(CurrentEvent.screenX) - this.startX;
          this.barMoveWidth = (this.barX / this.bgBarW) * (MoveWidth + this.endFlag);
          if (this.barMoveWidth <= 0) {
            this.barMoveWidth = 0;
          }
          if (this.barMoveWidth >= (this.bgBarW - this.barX)) {
            this.barMoveWidth = (this.bgBarW - this.barX)
          }
          this.BarMove = -((this.screenContentW / this.screenW) * (MoveWidth + this.endFlag));
          if ((this.BarMove * -1) <= 0) {
            this.BarMove = 0;
          }
          if ((this.BarMove * -1) > ((this.screenContentW) - (this.screenW))) {
            this.BarMove = -((this.screenContentW) - (this.screenW));
          }
        }

      },
      //鼠标移出隐藏移动条
      onQuickOut() {
        if(this.screenContentW >= this.screenW){
          this.endFlag = this.barMoveWidth;
          this.$refs.quickNav.removeEventListener('mousemove', this.onMouseMove, false);
        }
      },
      //是否全屏
      onFullScreen() {
        let el = document.documentElement;
        if (!this.fullScreen) {
          this.fullScreen = true;
          let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
          if (typeof rfs !== "undefined" && rfs) {
            rfs.call(el);
          }
        } else {
          this.fullScreen = false;
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
          else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          }
          else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          }
          else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
          if (typeof cfs !== "undefined" && cfs) {
            cfs.call(el);
          }
        }
      },
    }
  };
</script>

<style scoped lang="scss">
  .quick-nav {
    cursor: pointer;
    user-select: none;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    flex: 1;
    .quick-nav-body {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 80px;
      overflow-x: scroll;
      .quick-nav-inner {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        .inner {
          height: 80px;
          display: flex;
          font-size: 0;
          .item {
            width: 116px;
            font-size: 14px;
            height: 100%;
            margin-right: 15px;
            display: flex;
            align-items: center;
            .item-icon {
              height: 44px;
              width: 44px;
              background: #99CCFF;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 4px;
            }
            .item-msg {
              box-sizing: border-box;
              margin: 0 6px;
              height: 44px;
              .title {
                font-size: 15px;
                font-weight: 700;
              }
              .xian {
                width: 50%;
                height: 1px;
                margin: 2px 0 3px 0;
                background: #898989;
              }
              .title-msg {
                font-size: 12px;
              }
            }
          }
          .item:first-child {
            margin-left: 15px;
          }
          .item-right {
            color: #999999;
            font-size: 12px;
            display: flex;
            align-items: center;
            width: 85px;
            height: 100%;
            margin-right: 15px;
            &:hover{
              color: #3399CC;
            }
          }
        }
      }
    }
    .quick-nav-body::-webkit-scrollbar {
      display: none;
    }
    .quick-nav-nav {
      position: relative;
      z-index: 10;
      width: 100%;
      height: 10px;
      .quick-nav-nav-bg {
        position: absolute;
        z-index: 10;
        margin-left: 50%;
        top: -8px;
        height: 4px;
        border-radius: 2px;
        background: rgba(25, 25, 65, 0.2);
        .quick-nav-nav-inner {
          position: absolute;
          z-index: -10;
          border-radius: 2px;
          width: 0;
          height: 4px;
          background: #3399CC;
          left: 0;
          top: 0;
        }
      }

    }
  }
</style>
