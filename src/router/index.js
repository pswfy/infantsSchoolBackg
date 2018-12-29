import Vue from 'vue';
import Router from 'vue-router';
/*一级路由*/
const login = () => import('@/pages/login');//登录
const index = () => import('@/pages/index');//首页
import error from '../pages/404';//404页面

/*系统管理二级路由*/
const system = () => import('@/pages/system/system');//系统管理
/*系统管理三级路由*/
const frequency = () => import('@/pages/system/pages/frequency');//

/*个人中心二级路由*/
const personal = () => import('@/pages/personnel/personal');//个人中心
/*个人中心三级路由*/
const calendar = () => import('@/pages/personnel/pages/calendar');

/*学生管理二级路由*/
const student = () => import('@/pages/student/student');
/*学生管理三级路由*/
const attendance = () => import('@/pages/student/pages/attendance');
const classPages = () => import('@/pages/student/pages/class');
const information = () => import('@/pages/student/pages/information');
const members = () => import('@/pages/student/pages/members');

/*学校基本信息二级路由*/
const basics = () => import('@/pages/basics/basics');
/*学校基本信息三级路由*/
const info = () => import('@/pages/basics/pages/info');

Vue.use(Router);


const router= new Router({
  mode: "history",
  routes: [
    {path: '/', component: login},
    {
      path: '/index', component: index,
      children: [
        {
          path: '/system', component: system,
          children: [
            {path: 'frequency', component: frequency},
            {path: '/system', redirect: '/system/frequency'}
          ]
        },
        {
          path: '/personal', component: personal,
          children: [
            {path: 'calendar', component: calendar},
            {path: '/personal', redirect: '/personal/calendar'}
          ]
        },
        {
          path: '/student', component: student,
          children: [
            {path: 'attendance', component: attendance},
            {path: 'members', component: members},
            {path: 'information', component: information},
            {path: 'class', component: classPages},
            {path: '/student', redirect: '/student/attendance'}
          ]
        },
        {
          path: '/basics', component: basics,
          children: [
            {path: 'info', component: info},
            {path: '/basics', redirect: '/basics/info'}
          ]
        },
      ]
    },
    {path: '*', component: error}
  ]
});

export default router;
