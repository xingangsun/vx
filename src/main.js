import Vue from 'vue'

import router from './demo/router'
import App from './demo/app'
import { Page } from './demo/components'

// 全局注册只是为了写demo使用方便
Vue.component('page', Page)

// 暂时用event-bus进行跨组件通信，大型项目请考虑用vuex
const bus = new Vue()
Vue.mixin({
    data () {
        return {
            bus
        }
    }
})

const app = new Vue({
    router,
    ...App
})

app.$mount('#app')
