import Vue from 'vue'
import Request from 'network/index.js'

const request = new Request().request()

export function listCate(){
  return request({
    url: `${Vue.ctx}/cate`,
    method: 'get'
  })
}

export function addCate(data){
  return request({
    url: `${Vue.ctx}/cate`,
    method: 'post',
    data
  })
}

export function findById(id){
  return request({
    url: `${Vue.ctx}/cate/${id}`,
    method: 'get'
  })
}

export function update(data){
  return request({
    url: `${Vue.ctx}/cate`,
    method: 'put',
    data
  })
}

export function remove(id){
  return request({
    url: `${Vue.ctx}/cate/${id}`,
    method: 'delete'
  })
}