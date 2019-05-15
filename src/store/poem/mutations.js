import * as MUTATIONS from '../../common/mutation-types'

export default {
  [MUTATIONS.NEW_POEM](state) {
    state.newPoem = true
  },
  [MUTATIONS.NEW_POEM_FETCHED](state) {
    state.newPoem = false
  },
}
