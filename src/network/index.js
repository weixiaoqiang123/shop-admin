import axios from 'axios'

class AjaxRequest {
  constructor(config={}){
    this.baseURL = config.baseURL || '',
    this.timeout = config.timeout || 3000

    return this
  }

  request () {
    const that = this
    return function(config){
      const instance = axios.create({
        baseURL: that.baseURL,
        timeout: that.timeout
      })
  
      instance.interceptors.request.use(config => {
        return config
      }, err => {
        console.log(err)
      })
  
      instance.interceptors.response.use(res => {
        // console.log(res.data);
        return res.data
      }, err => {
        console.log(err)
      })
  
      return instance(config)
    }
  }
}

export default AjaxRequest
