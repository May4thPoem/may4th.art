import {RouteConfig} from 'vue-router'
import {
  PAGE_HOME,
  PAGE_MY,
  PAGE_WRITE,
  PAGE_POEM,
  PAGE_EDIT,
} from '../common/constants'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {name: PAGE_HOME, path: '', component: () => import('pages/Index.vue')},
      {
        name: PAGE_WRITE,
        path: 'poem/new',
        component: () => import('pages/Write.vue'),
      },
      {name: PAGE_MY, path: 'my', component: () => import('pages/My.vue')},
      {
        name: PAGE_POEM,
        path: 'poem/:id',
        component: () => import('pages/Poem.vue'),
      },
      {
        name: PAGE_EDIT,
        path: 'poem/:id/edit',
        component: () => import('pages/Write.vue'),
        props: true,
      },
    ],
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  })
}

export default routes
