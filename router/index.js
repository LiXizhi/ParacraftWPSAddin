
function createRouter(createRouter, createWebHistory, createWebHashHistory) {
  const baseTag = document.querySelector('base');
  let base = ''
  if (baseTag) {
    let href = baseTag.href
    if (href.endsWith('/')) {
      href = href.slice(0, -1)
    }
    base = new URL(href).pathname
  }

  const router = createRouter({
    history:  window.location.protocol === 'file:' ? createWebHashHistory('') : createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: base + '/',
        name: '默认页',
        component: () => import('../components/Root.vue')
      },
      {
        path: base + '/dialog',
        name: '对话框',
        component: () => import('../components/Dialog.vue')
      },
      {
        path: base + '/taskpane',
        name: '任务窗格',
        component: () => import('../components/TaskPane.vue')
      },
      {
        path: base + '/addkeepworkmod',
        name: 'AddKeepworkMod',
        component: () => import('../components/AddKeepworkMod.vue')
      },
      {
        path: base + '/login',
        name: '登录',
        component: () => import('../components/Login.vue')
      }
    ]
  })
  return router
}

export default {
  createRouter,
}
