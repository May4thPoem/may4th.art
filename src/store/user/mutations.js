import * as MUTATIONS from '../../common/mutation-types'

export default {
  [MUTATIONS.LOG_IN](state) {
    state.isLoggedIn = true
  },
  [MUTATIONS.LOG_OUT](state) {
    state.isLoggedIn = false
  },
}
