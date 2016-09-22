<template>
<div class="app">
    <drawer :is-open="isDrawerOpen" @overlay-click="isDrawerOpen = false">
        <components slot="sidebar"></components>
        <router-view></router-view>
    </drawer> 
</div>
</template>

<script>
import { Navbar, Icon, Drawer } from '../components'

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
            isDrawerOpen: true // 侧栏菜单是否打开
        }
    },
    created () {
        this.bus.$on('drawer-open-change', (isOpen) => (this.isDrawerOpen = isOpen))
        this.bus.$on('drawer-open-toggle', (isOpen) => (this.isDrawerOpen = !this.isDrawerOpen))
    }
}
</script>

<style lang="sass">
 @import './site/style/global.scss'; // 全局样式，只引入一次
 @import './site/style/base.scss';

.app {
    height: 100%;

    > .vx-drawer {
        height: 100%;

        > .vx-drawer-sidebar {
            top: $navbar-height;
            zoom: .8; // just zoom-down a little
            width: 75%;
        }

        > .vx-drawer-overlay {
            top: $navbar-height;
        }
    }
}
</style>
