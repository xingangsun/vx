<template>
<page-demo class="demo-tabbar" title="Tabbar(标签栏)">
    <tabbar>
        <div slot="nav" :class="{ 'active': active === 'home' }" @click="onNavClick('home')">
            <icon type="home"></icon>首页
        </div>
        <div slot="nav" :class="{ 'active': active === 'android' }" @click="onNavClick('android')">
            <icon type="android"></icon>安卓
        </div>
        <div slot="nav" :class="{ 'active': active === 'apple' }" @click="onNavClick('apple')">
            <icon type="apple"></icon>苹果
        </div>
        <div slot="nav" :class="{ 'active': active === 'heart' }" @click="onNavClick('heart')">
            <icon :type="active === 'heart' ? 'heart' : 'heart-o'"></icon>关注
        </div>

        <router-view name="home" :class="{ 'active': active === 'home' }"></router-view>
        <router-view name="android" :class="{ 'active': active === 'android' }"></router-view>
        <router-view name="apple" :class="{ 'active': active === 'apple' }"></router-view>
        <router-view name="heart" :class="{ 'active': active === 'heart' }"></router-view>
    </tabbar>
</page-demo>
</template>

<script>
export default {
    name: 'demo-tabbar',
    data () {
        return {
            active: 'home'
        }
    },
    methods: {
        onNavClick (name) {
            this.active = name
        }
    }
}
</script>

<style lang="sass">
.demo-tabbar {

}
</style>
