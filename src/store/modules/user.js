import { login, getUserInfo, logout } from "@/api/auth/auth"
import { getToken, getCtoken, setToken, setCtoken, removeToken, removeCtoken } from "@/utils/auth"

const state = {
  token: getToken(), // token
  user: "", // 用户对象
  cToken: getCtoken()  // cToken
}

const mutations = {
  SET_TOKEN_STATE: (state, token) => {
    state.token = token
  },
  SET_USER_STATE: (state, user) => {
    state.user = user
  },
  SET_CTOKEN_STATE: (state, token) => {
    state.cToken = token
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    console.log(commit);
    const { name, pass, rememberMe } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: name.trim(), password: pass, rememberMe: rememberMe }).then(response => {
        const { data } = response
        // 存储到 vuex
        commit("SET_TOKEN_STATE", data.tokens.token)
        commit("SET_CTOKEN_STATE", data.tokens.cToken)
        // 存储到js-cookie
        setToken(data.tokens.token)
        setCtoken(data.tokens.cToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 更新 token
  renewToken({ commit }, token) {
    console.log("token: ", token);
    commit("SET_CTOKEN_STATE", token);
    setCtoken(token);
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(response => {
        const { data } = response
        if (!data) {
          commit("SET_TOKEN_STATE", "")
          commit("SET_CTOKEN_STATE", "")
          commit("SET_USER_STATE", "")
          removeToken()
          removeCToken()
          resolve()
          reject("Verification failed, please Login again.")
        }
        commit("SET_USER_STATE", data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 注销
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then((response) => {
          console.log(response);
          // 清除相应token和状态
          commit("SET_TOKEN_STATE", "");
          commit("SET_USER_STATE", "");
          commit("SET_CTOKEN_STATE", "");
          removeToken();
          removeCtoken();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
