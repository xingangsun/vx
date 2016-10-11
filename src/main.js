import Vue from 'vue'

import * as components from './components'

import router from './demo/router'
import App from './demo/app'
import * as demoComponents from './demo/components'

// 全局注册组件只是为了写demo方便，实际项目请不要这么用
for (const k in components) {
    Vue.component(k, components[k])
}
for (const k in demoComponents) {
    Vue.component(k, demoComponents[k])
}

// 暂时用event-bus进行跨组件通信，大型项目请考虑用vuex
const eventBus = new Vue()
Vue.mixin({
    beforeCreate () {
        this.eventBus = eventBus
    }
})

const app = new Vue({
    router,
    ...App
})

app.$mount('#app')
