import * as MUTATIONS from '../../common/mutation-types'

export default {
  [MUTATIONS.LOG_IN](state, payload) {
    state.isLoggedIn = true
    state.token = payload.token
    state.id = payload.user.id
    state.name = payload.user.name
  },
  [MUTATIONS.LOG_OUT](state) {
    state.isLoggedIn = false
  },
}
