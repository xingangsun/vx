<template>
<div class="app">
    <!-- 侧栏菜单 -->
    <drawer :is-open="isSideDrawerOpen" @overlay-click="changeSideDrawerOpen(false)">
        <components slot="sidebar"></components>
    </drawer>
    <!-- 页面视图 -->
    <div class="app-body">
    <router-view></router-view>
    </div>
</div>
</template>

<script>
import Components from './views/components'

export default {
    components: {
        Components
    },
    data () {
        return {
            isSideDrawerOpen: false // 侧栏菜单是否打开
        }
    },
    created () {
        this.bus.$on('drawer-open-change', this.changeSideDrawerOpen)
        this.bus.$on('drawer-open-toggle', this.toggleSideDrawerOpen)
    },
    methods: {
        toggleSideDrawerOpen () {
            this.isSideDrawerOpen = !this.isSideDrawerOpen
        },
        changeSideDrawerOpen (isOpen) {
            this.isSideDrawerOpen = isOpen
        }
    }
}
</script>

<style lang="sass">
 @import './site/style/global.scss'; // 全局样式，只引入一次
 @import './site/style/base.scss';

.app {
    height: 100%;
    position: relative;

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
