import {getToken, removeToken} from 'util/auth.js'

export const arr = ['admin', 'business']
const state = {
  token: getToken(),
  // 用户角色
  role: -1
}

const mutations = {
  SET_TOKEN: (state,token) => {
    // console.log(token);
    state.token = token;
  },
  SET_ROLE: (state,role) => {
    state.role = role;
  }
}

const actions = {
  getInfo({commit, state}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = state.token.role
        const role = arr[index]
        // console.log(role);
        commit('SET_ROLE',role)
        resolve({role})
      }, 1000)
    })
  },
  // 重置令牌
  resetToken({ commit }){
    return new Promise(resolve => {
      commit('SET_TOKEN','')
      commit('SET_ROLE', -1)
      removeToken();
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}