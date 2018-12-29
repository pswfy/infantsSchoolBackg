<template>
  <div class="login">
    <div class="login-panel">
      <!--logo-->
      <div class="login-header">
        <img src="../../static/images/login.png" alt="">
      </div>
      <div class="login-content">
        <!--用户名-->
        <div class="item">
          <label class="label" for="user_name">
            <i class="icon iconfont icon-ai-user"></i>
          </label>
          <div class="input">
            <input type="text" id="user_name" @blur="onUserName" v-model="userName" placeholder="请输入用户名"
                   autocomplete="new-password"/>
            <i class="el-icon-success" v-show="userNameSuccess" style="color: #67C23A;margin-right: 5px"></i>
            <i class="el-icon-error" @click="onUserError" v-show="userNameError"
               style="color: #F56C6C;margin-right: 5px"></i>
          </div>
        </div>
        <!--密码-->
        <div class="item">
          <label class="label" for="user_password">
            <i class="icon iconfont icon-mima"></i>
          </label>
          <div class="input">
            <input type="password" v-model="password" id="user_password" placeholder="请输入密码" autocomplete="new-password"/>
            <i class="el-icon-success" v-show="passwordSuccess" style="color: #67C23A"></i>
            <i class="el-icon-error" @click="onPasswordError" v-show="passwordError" style="color: #F56C6C"></i>
          </div>
        </div>
        <!--验证码-->
        <div class="item">
          <label class="label" for="svg">
            <i class="icon iconfont icon-tupian" style="font-size: 13px;"></i>
          </label>
          <div class="input">
            <input type="text" class="error" @blur="onSvg" v-model="svgTest" id="svg" placeholder="请输入验证码" autocomplete="new-password"/>
            <transition name="success">
              <i v-show="svgSuccess" class="el-icon-success" style="color: #67C23A"></i>
            </transition>
            <transition name="error">
              <i @click="onSvgError" v-show="svgError" class="el-icon-error" style="color: #F56C6C"></i>
            </transition>
          </div>
          <div class="mvg-img" v-html="svg" @click="getSvg"></div>
        </div>
        <div class="item login-button" @click="onLogin">登录</div>
        <!--loading-->
        <transition name="fade">
          <div @click="onLoginHide" class="login-loading" v-show="loading"><i class="el-icon-loading"></i></div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        loading: false,
        svg: null,
        svgTest: '',
        svgError: false,
        svgSuccess: false,
        userName: '',
        userNameError: false,
        userNameSuccess: false,
        password: '',
        passwordError: false,
        passwordSuccess: false,
      }
    },
    created() {
      this.getSvg();
    },
    methods: {
      /*获取svg*/
      getSvg() {
        this.$axios.get(this.$store.state.url+'/svg', {}, {emulateJSON: true, withCredentials: true}).then(res => {
          this.svg = res.data;
        }).catch(err => {
          this.$message.error('请检测网络,如果还是不行请联系管理员(18285150052)');
        });
      },
      /*用户名检验*/
      onUserName() {
        this.userNameSuccess = false;
        this.userNameError = false;
        if (this.userName !== '') {
          this.$axios.post(this.$store.state.url+'/users/login/user/name', {'userName': this.userName}, {
            emulateJSON: true,
            withCredentials: true
          }).then(res => {
            if (res.data.success_code === 402) {
              this.$message.error('请输入用户名');
              return;
            }
            if (res.data.success_code === 205) {
              this.$message.error('用户不存在');
              this.userNameError = true;
              return;
            }
            if (res.data.success_code === 206) {
              this.userNameSuccess = true;
            }
          }).catch(err => {
            this.$message.error('请检测网络,如果还是不行请联系管理员(18285150052)');
          });
        }
      },
      /*登录*/
      onLogin() {
        this.passwordSuccess = false;
        this.passwordError = false;
        if (this.userName === '') {
          this.$message.error('请输入用户名');
          return;
        }
        if (!this.userNameSuccess) {
          this.$message.error('用户名错误');
          return;
        }
        if (this.password === '') {
          this.$message.error('请输入密码');
          return;
        }
        if (this.svgTest === '') {
          this.$message.error('请输入验证码');
          return;
        }
        if (!this.svgSuccess) {
          this.$message.error('验证码错误');
          return;
        }
        this.loading = true;
        this.$axios.post(this.$store.state.url+'/users/login', {'userName': this.userName, 'password': this.password}, {
          emulateJSON: true,
          withCredentials: true
        }).then(res => {
          if (res.data.success_code === 402) {
            this.loading = false;
            this.$message.error('请输入密码');
            return;
          }
          if (res.data.success_code === 205) {
            this.loading = false;
            this.$message.error('密码错误');
            this.passwordError = true;
            return;
          }
          if (res.data.success_code === 200) {
            this.loading = false;
            this.$message.success('登录成功');
            this.userName = '';
            this.password = '';
            this.svgTest = '';
            this.userNameSuccess = false;
            this.userNameError = false;
            this.passwordError = false;
            this.passwordSuccess = false;
            this.svgSuccess = false;
            this.svgError = false;
            this.$router.replace('/index');
          }
        }).catch(err => {
          this.loading = false;
          this.$message.error('错误');
        })
      },
      /*关闭loading*/
      onLoginHide() {
        this.loading = false;
      },
      /*验证svg*/
      onSvg() {
        this.svgError = false;
        this.svgSuccess = false;
        if (this.svgTest !== '') {
          this.$axios.post(this.$store.state.url+'/svg/test', {'svg': this.svgTest}, {
            emulateJSON: true,
            withCredentials: true
          }).then(res => {
            if (res.data) {
              this.svgError = false;
              this.svgSuccess = true;
            } else {
              this.svgSuccess = false;
              this.svgError = true;
            }
          }).catch(err => {
            this.$message.error('请检测网络,如果还是不行请联系管理员(18285150052)');
          });
        }
      },
      /*清空svgtext*/
      onSvgError() {
        this.svgTest = '';
        this.svgError = false;
      },
      /*清空用户名*/
      onUserError() {
        this.userName = '';
        this.userNameError = false;
      },
      /*清空密码*/
      onPasswordError() {
        this.password = '';
        this.passwordError = false;
      }
    }
  };
</script>

<style scoped lang="scss">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    width: 100%;
    height: 100%;
    background: #3e4e67;
    .login-panel {
      width: 400px;
      height: 360px;
      .login-header {
        height: 60px;
        display: flex;
        align-items: center;
      }
      .login-content {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 260px;
        box-sizing: border-box;
        background: #4a5d7b;
        border-radius: 2px;
        padding: 20px 60px;
        .item {
          flex: 1;
          display: flex;
          flex-direction: row;
          align-items: center;
          background: #CCCCCC;
          margin: 10px 0;
          box-sizing: border-box;
          .label {
            flex: 0 0 40px;
            display: flex;
            cursor: pointer;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 100%;
            background: #dce2f8;
            & i {
              font-size: 16px;
              color: #4a5d7b;
            }
          }
          .input {
            flex: 1;
            display: flex;
            align-items: center;
            height: 100%;
            background: #ebeef5;
            & i {
              margin-right: 5px;
              cursor: pointer;
              font-size: 12px;
            }
            & input {
              width: 100%;
              height: 100%;
              border: 0 solid #dce6f2;
              background-color: transparent;
              outline: none;
              box-sizing: border-box;
              font-size: 14px;
              text-indent: 2px;
              color: #666666;
            }
            & input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
              color: #c0c9d3;
              font-size: 12px;
            }
            & input:-moz-placeholder, textarea:-moz-placeholder {
              color: #c0c9d3;
              font-size: 12px;
            }
            & input:-ms-input-placeholder, textarea:-ms-input-placeholder {
              color: #c0c9d3;
              font-size: 12px;
            }
            .success-enter-active, .success-leave-active {
              transition: all 0.3s ease-out;
            }
            .success-enter, .success-leave-active {
              opacity: 0;
            }
            .error-enter-active, .error-leave-active {
              transition: all 0.3s ease-out;
            }
            .error-enter, .error-leave-active {
              opacity: 0;
            }
          }
          .mvg-img {
            flex: 0 0 80px;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            background: #f3f8fb;
          }
        }
        .login-button {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          background: #23af94;
          letter-spacing: 10px;
          cursor: pointer;
          color: #FFFFFF;
        }
        .login-loading {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border-radius: 2px;
          font-size: 30px;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: #FFFFFF;
          background: rgba(62, 78, 100, .9);
        }
        .fade-enter-active, .fade-leave-active {
          transition: all 0.5s ease-out;
        }
        .fade-enter, .fade-leave-active {
          opacity: 0;
        }
      }
    }
  }
</style>
