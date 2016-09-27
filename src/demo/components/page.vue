<template>
<div class="page">
    <div class="page-header">
        <navbar>
            <router-link v-if="showBack" slot="left" to="/" @touchstart.native="bus.$emit('drawer-open-change', false)">
                <icon type="left"> 返回</icon>
            </router-link>
            <span><slot name="title">{{ title }}</slot></span>
            <icon slot="right" type="bars" @touchstart.native="bus.$emit('drawer-open-toggle')"></icon>
        </navbar>
    </div>
    <div class="page-body">
        <slot></slot>
    </div>
</div>
</template>

<script>
import { Navbar, Icon } from '../../components'

export default {
    components: {
        Navbar,
        Icon
    },
    props: {
        title: {
            type: String
        },
        showBack: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style lang="sass">
.page {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.page-body {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>
