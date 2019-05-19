import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import {MAY4TH_AUTH_TOKEN, PRIVATE_PAGES} from '../common/constants'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function() {
  const Router = new VueRouter({
    scrollBehavior: () => ({x: 0, y: 0}),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  })

  Router.beforeEach((to, from, next) => {
    if (
      to.name &&
      PRIVATE_PAGES.includes(to.name) &&
      !localStorage.getItem(MAY4TH_AUTH_TOKEN)
    )
      next('/')
    else next()
  })

  return Router
}
