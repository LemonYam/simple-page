const getters = {
    token: state => state.user.token,   // token
    user: state => state.user.user,     // 用户对象
    cToken: state => state.user.cToken,  // 一次性token
  }
export default getters