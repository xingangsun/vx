<template>
<div class="app">
    <!-- 侧栏菜单 -->
    <drawer :is-open="isSideDrawerOpen" :show-overlay="false" @overlay-click="changeSideDrawerOpen(false)">
        <components slot="sidebar"></components>
        <!-- 页面视图 -->
        <router-view></router-view>
    </drawer>
    <!-- 页面视图 -->
    <!-- <router-view></router-view> -->
</div>
</template>

<script>
/* document.addEventListener('touchstart', function (e) {
    e.preventDefault()
}, false)
document.addEventListener('touchmove', function (e) {
    e.preventDefault()
}, false)*/
/* document.body.addEventListener('touchstart', function (e) {
    e.stopPropagation()
}, false)
document.body.addEventListener('touchmove', function (e) {
    e.stopPropagation()
}, false)*/
if (window.indexedDB) {
    console.log("I'm in WKWebView!")
} else {
    console.log("I'm in UIWebView")
}
export default {
    data () {
        return {
            isSideDrawerOpen: false // 侧栏菜单是否打开
        }
    },
    created () {
        this.eventBus.$on('drawer-open-change', this.changeSideDrawerOpen)
        this.eventBus.$on('drawer-open-toggle', this.toggleSideDrawerOpen)
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
 @import './src/assets/fonts/iconfont.scss'; // 全局样式，只引入一次
 @import './site/style/base.scss';

::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: #F5F5F5;
    width: 0;
    display: none;
}

/* ::-webkit-scrollbar:window-inactive {
    display: none;
} */

::-webkit-scrollbar-thumb {
    min-height: 50px;
    border-radius: 10px;
    background-color: $brand-primary;
    background-image: linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);
}

::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
}
.app {
    height: 100%;
    position: relative;
    overflow: hidden;

    > .vx-drawer {
        height: 100%;

        > .vx-drawer-sidebar {
            top: $navbar-height;
            zoom: .8; // just zoom-down a little
            width: 70%;
        }

        > .vx-drawer-overlay {
            top: $navbar-height;
        }
    }
}
</style>
