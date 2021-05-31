import Vue from 'vue'
import Request from 'network/index.js'

const request = new Request().request()
// console.log(request);

export function login(data){
  return request({
    url: `${Vue.ctx}/user/login`,
    method: 'post',
    data
  })
}

export function findAllUser(params){
  return request({
    url: `${Vue.ctx}/user/findByPage`,
    method: 'get',
    params
  })
}