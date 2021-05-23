import Request from 'network/index.js'

const request = new Request().request()
// console.log(request);

export function login(data){
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}