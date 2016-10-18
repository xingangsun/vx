import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
// http://router.vuejs.org/zh-cn/installation.html
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    // base: __dirname,
    routes
})

export default router
