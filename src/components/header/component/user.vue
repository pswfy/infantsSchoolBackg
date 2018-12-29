<template>
  <transition name="panel">
    <div class="user-panel" v-show="panelShowHide">
      <div class="avatar-userName">
        <img :src="$store.state.url + $store.state.userInfo.userAvatar" alt="头像" width="50px">
        <span class="jurisdiction">超级管理员</span>
      </div>
      <div class="user-list">
        <span>个人中心</span>
        <i class="icon iconfont icon-xiangyou"></i>
      </div>
      <div class="user-list">
        <span>消息通知</span>
        <i class="icon iconfont icon-xiangyou"></i>
      </div>
      <div class="user-list">
        <span>我的办公</span>
        <i class="icon iconfont icon-xiangyou"></i>
      </div>
      <div class="user-list">退出</div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      panelShowHide: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  .panel-enter-active, .panel-leave-active {
    transform-origin: 50% 0;
    transition: all 0.5s ease-out;
  }

  .panel-enter, .panel-leave-active {
    transform: scale(1.00, 0.00);
    opacity: 0;
  }

  .user-panel {
    position: absolute;
    transform-origin: 50% 0;
    width: 140px;
    height: 180px;
    background: #3c68b1;
    top: 34px;
    right: 0;
    padding: 10px;
    z-index: 10;
    .avatar-userName {
      display: flex;
      align-items: center;
      height: 60px;
      width: 100%;
      & img {
        border-radius: 50%;
      }
      & span {
        margin-left: 10px;
        font-size: 12px;
        color: #add9f2;
      }
    }
    .user-list {
      height: 30px;
      width: 100%;
      display: flex;
      align-items: center;
      line-height: 30px;
      color: #add9f2;
      justify-content: space-between;
      margin-top: 2px;
      font-size: 12px;
      & span {
        color: #add9f2;
        font-size: 12px;
      }
      & i {
        font-size: 12px;
      }
      &:hover {
        color: #FFFFFF;
        & span {
          color: #FFFFFF;
        }
      }
    }
  }
</style>
