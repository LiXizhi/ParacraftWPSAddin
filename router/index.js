
function createRouter(createRouter, createWebHistory, createWebHashHistory) {
  const router = createRouter({
    history:  window.location.protocol === 'file:' ? createWebHashHistory('') : createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: '默认页',
        component: () => import('../components/Root.vue')
      },
      {
        path: '/dialog',
        name: '对话框',
        component: () => import('../components/Dialog.vue')
      },
      {
        path: '/taskpane',
        name: '任务窗格',
        component: () => import('../components/TaskPane.vue')
      },
      {
        path: '/addkeepworkmod',
        name: 'AddKeepworkMod',
        component: () => import('../components/AddKeepworkMod.vue')
      }
    ]
  })
  return router
}

export default {
  createRouter,
}
