import {loginStore} from "stores/loginStore";

const routes = [

  {
    path: '/',
    component: () => import('layouts/LoggedLayout.vue'),
    children: [
  { path: '', component: () => import('pages/IndexPage.vue') }
]
  },
  {
    path: '/Favourite',
    component: () => import('layouts/LoggedLayout.vue'),
    children: [
      { path: '', component: () => import('pages/favouritePage.vue') }
    ]
  },
  {
    path: `/city/:name`,
    component: () => import('layouts/cityLayout.vue'),
    children: [
      { path: '', component: () => import('pages/cityPage.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
