const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Day.vue') }
    ]
  },
  {
    path: '/lists',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/All.vue') }
    ]
  },
  {
    path: '/focus',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Day.vue') }
    ]
  },
  {
    path: '/week',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Week.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
