export default {
  url: 'http://192.168.1.102:3000',//服务器跟路径
  Jurisdiction: {//权限常量
    ROOT: 0,
    ADMIN: 1,
    SCHOOL: 2,
    SCHOOL_TEACHER: 3,
    SCHOOL_LOGISTICS: 4,
    SCHOOL_FAMILY: 5,
    ORDINARY: 6
  },
  //workTile:年月
  nowShow:{
    year:2017,
    month:5
  },
  userInfo: {},//用户登录信息
  TwoMenu:[],//二级菜单
  w: window.innerWidth ||document.documentElement.clientWidth || document.body.clientWidth,
  h: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}
