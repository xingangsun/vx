<template>
<page-demo class="demo-drawer" title="Drawer(抽屉)">
    <navbar :is-light="true" title="基本">
        <icon slot="left" type="ellipsis" @touchstart.native="isOpen = !isOpen"></icon>
        <template slot="right">状态：{{ isOpen ? '开' : '关'}}</template>
    </navbar>
    <drawer :is-open="isOpen" position="left" :is-dock="true" :show-overlay="true" @overlay-click="isOpen = false">
        <section slot="sidebar">
            <list>
                <template slot="header">屉里的内容</template>
                <list-item v-for="n of 5">{{ n }}我是侧栏菜单内容</list-item>
            </list>
        </section>
        <div>
            点击导航栏左侧的按钮，开关侧栏菜单
        </div>
    </drawer>

    <div class="demo-drawer-container">
        这个组件必须用一个定位容器进行包装，并设置<code>overflow: hidden;</code>
        <drawer :is-open="isOpen" position="bottom" :show-overlay="false" @overlay-click="isOpen = false">
            <template slot="sidebar">
                <list-item v-for="n of 3">{{ n }} 我就是在底部</list-item>
            </template>
            <div>
                点击导航栏左侧的按钮，开关底部菜单
            </div>
        </drawer>
    </div>
    
</page-demo>
</template>

<script>
export default {
    name: 'demo-drawer',
    data () {
        return {
            isOpen: true
        }
    }
}
</script>

<style lang="sass">
.demo-drawer {
    
    .vx-drawer {
        height: 350px;
    }

    .vx-drawer-content {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #108ee9;
    }

    .demo-drawer-container {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
    }
}
</style>
