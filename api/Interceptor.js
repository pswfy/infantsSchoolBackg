import axios from 'axios';
import {Loading, Message} from 'element-ui';

let loading;
//加载动画
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0,0,0,.7)'
  });
}
//关闭加载动画
function endLoading() {
  loading.close();
}

//请求拦截
axios.interceptors.request.use(config => {
  //加载动画
  startLoading();
  return config;
}, error => {
  return Promise.reject(error);
});
//相应拦截
axios.interceptors.response.use(response => {
  //结束动画
  endLoading();
  return response;
}, error => {
  return Promise.reject(error);
});

export default axios;
