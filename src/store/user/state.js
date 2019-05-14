import {MAY4TH_USER, MAY4TH_AUTH_TOKEN} from '../../common/constants'

const user = JSON.parse(localStorage.getItem(MAY4TH_USER))
const authToken = JSON.parse(localStorage.getItem(MAY4TH_AUTH_TOKEN))

const isLoggedIn =
  authToken && authToken.expiresAt ? authToken.expiresAt > Date.now() : false

export default {
  isLoggedIn,
  token: authToken && authToken.token ? authToken.token : undefined,
  id: user && user.id ? user.id : undefined,
  name: user && user.name ? user.name : undefined,
  email: user && user.email ? user.email : undefined,
}
