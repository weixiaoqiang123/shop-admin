export default {
  install: function(Vue, options){
    let ctx = process.env.VUE_APP_CTX;
    Vue.ctx = ctx;
    Vue.prototype.$ctx = ctx;
  }
}