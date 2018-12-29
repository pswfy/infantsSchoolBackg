import Vue from 'vue';
import router from './router';
import store from './store';
import axios from "../api/Interceptor"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';
import echarts from 'echarts';



import underscore from "../lib/underscore-min";

const App = () => import('./App');

Vue.use(ElementUI);
Vue.use(vuescroll);

axios.defaults.withCredentials=true;
Vue.prototype.$axios=axios;
Vue.prototype._=underscore;
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h (App)
});
