import {
  ADD_USER_INFO,
  GO_NEXT_MONT,
  GO_PREV_MONT,
  SYSTEM_TWO_MENU
} from './mutation-type';

export default {
  /**
   * 保存登录用户信息
   * @param state
   * @param userInfo
   */
  [ADD_USER_INFO](state, {userInfo}) {
    state.userInfo =userInfo;
  },
  /**
   * 系统三级菜单
   * @param state
   * @param TwoMenu
   */
  [SYSTEM_TWO_MENU](state, {TwoMenu}){
    state.TwoMenu =TwoMenu;
  },
  /**
   * 下一个月
   * @param state
   */
  [GO_NEXT_MONT](state) {
    if ((state.nowShow.month) ===12 ){
      state.nowShow.year ++;
      state.nowShow.month =1;
    }else{
      state.nowShow.month ++;
    }
  },
  /**
   * 上一个月
   * @param state
   */
  [GO_PREV_MONT](state) {
    if ((state.nowShow.month) ===1 ){
      state.nowShow.year --;
      state.nowShow.month =12;
    }else{
      state.nowShow.month --;
    }
  }

}
