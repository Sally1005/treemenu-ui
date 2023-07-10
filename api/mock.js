import Mock from 'mockjs';
import userApi from './mockData/user'
Mock.mock(/api\/users\/getUser/,'get',userApi.getUserList)