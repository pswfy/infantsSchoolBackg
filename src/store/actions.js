import {
  ADD_USER_INFO,
  GO_PREV_MONT,
  GO_NEXT_MONT,
  SYSTEM_TWO_MENU
} from './mutation-type';
export default {
  /**
   * 添加登录用户信息
   * @param commit
   * @param userInfo
   */
  loginInfo({commit},userInfo){
      commit(ADD_USER_INFO,{userInfo});
  },
  /**
   *上一月
   * @param commit
   */
  goNextMonthAction({commit}){
    commit(GO_PREV_MONT);
  },
  /**
   * 下一月
   * @param commit
   */
  goPrevMonthAction({commit}){
    commit(GO_NEXT_MONT);
  },
  /**
   * 系统二级菜单
   * @param commit
   * @param TwoMenu
   */
  twoMenu({commit},TwoMenu){
    commit(SYSTEM_TWO_MENU,{TwoMenu});
  },
}


