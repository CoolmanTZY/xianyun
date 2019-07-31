// 用户管理，采用接口返回的数据
export const state = () => {
  return {
    userInfo: {
      user: '',
      token: ''
    }

  }
}
// 同步修改数据 参数state是上面用户管理的state 
// 必须是一个对象  参数data是使用调用该方法时候传入的数据
export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data
  },
  clearUserInfo(state) {
    state.userInfo = {
      user: '',
      token: ''
    }
  }
}