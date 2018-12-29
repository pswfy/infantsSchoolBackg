import ajax from './ajax';
const BASE_URL = 'http://localhost:3000';

/*请求nav*/
export const apiNav = () => ajax(BASE_URL+'/system/nav/menu');

