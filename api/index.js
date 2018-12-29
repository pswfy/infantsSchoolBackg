import ajax from './ajax';
const BASE_URL = 'http://localhost:3000';

/*首页菜单*/
export const systemNavMenu = () => ajax(BASE_URL+'/system/nav/menu');



