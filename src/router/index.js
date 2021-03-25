import Vue from 'vue'
import Router from 'vue-router'

// route-level code splitting
// const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))
const AboutView = () => import('../views/about.vue')
const UserView = () => import('../views/user-view.vue')
// import AboutView from '../views/about.vue'
// import UserView from '../views/user-view.vue'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    // fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
    //   { path: '/user/:page(\\d+)?', component: UserView },
    //   { path: '/top/:page(\\d+)?', component: createListView('top') },
    //   { path: '/new/:page(\\d+)?', component: createListView('new') },
    //   { path: '/show/:page(\\d+)?', component: createListView('show') },
    //   { path: '/ask/:page(\\d+)?', component: createListView('ask') },
    //   { path: '/job/:page(\\d+)?', component: createListView('job') },
    //   { path: '/item/:id(\\d+)', component: ItemView },
      { path: '/user', component: UserView },
      { path: '/about', component: AboutView },
      { path: '/', redirect: '/user' }
    ]
  })
}
