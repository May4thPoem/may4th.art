import * as MUTATIONS from '../../common/mutation-types'
import {MAY4TH_USER, MAY4TH_AUTH_TOKEN} from '../../common/constants'

export default {
  [MUTATIONS.LOG_IN](state, payload) {
    state.isLoggedIn = true
    state.token = payload.jwt.token
    state.id = payload.user.id
    state.name = payload.user.name
    state.email = payload.user.email
    localStorage.setItem(
      MAY4TH_USER,
      JSON.stringify({
        name: state.name,
        id: state.id,
        email: state.email,
      }),
    )
    localStorage.setItem(
      MAY4TH_AUTH_TOKEN,
      JSON.stringify({
        token: state.token,
        expiresAt: payload.jwt.expiresAt,
      }),
    )
  },
  [MUTATIONS.LOG_OUT](state) {
    state.isLoggedIn = false
  },
}
