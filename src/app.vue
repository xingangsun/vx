<template>
<div class="app">
    <div class="app-header">
        <navbar class="app-header">
            <router-link slot="left" to="/" @click.native="isDrawerOpen = false">
                <icon icon="left"> 返回</icon>
            </router-link>
            <span>首页</span>
            <icon slot="right" icon="bars" @click.native="isDrawerOpen = !isDrawerOpen"></icon>
        </navbar>
    </div>
    <div class="app-body">
        <drawer :is-open="isDrawerOpen" @overlay-click="isDrawerOpen = false">
            <components slot="sidebar" @link-click="isDrawerOpen = false"></components>
            <router-view></router-view>
        </drawer> 
    </div>
</div>
</template>

<script>
import { Navbar, Icon, Drawer } from './components'

import Components from './views/components'

export default {
    components: {
        Navbar,
        Icon,
        Drawer,

        Components
    },
    data () {
        return {
            isDrawerOpen: false
        }
    },
    created () {
        // setTimeout(() => (this.showError = true), 5000)
        // console.log(this.$refs.inputItem)
    }
}
</script>

<style lang="sass">
/* 全局样式，只引入一次 */
 @import './site/style/global.scss'; 
 @import './site/style/base.scss'; 

.app {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.app-body {
    flex: 1;
    overflow: hidden;

    .vx-drawer {
        height: 100%;

        &-sidebar {
            zoom: .8; // just zoom down a little
            width: 75%;
        }
    }
}
</style>
