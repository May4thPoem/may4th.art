import * as MUTATIONS from '../../common/mutation-types'

export default {
  [MUTATIONS.LOG_IN](state, payload) {
    state.isLoggedIn = true
    state.token = payload.token
    state.id = payload.user.id
    state.name = payload.user.name
    // this._vm.$axios
    //   .get('https://cors-anywhere.herokuapp.com/https://baidu.com')
    //   .then(res => console.log(res.data))
  },
  [MUTATIONS.LOG_OUT](state) {
    state.isLoggedIn = false
  },
}
