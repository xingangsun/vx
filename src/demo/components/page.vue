<template>
<div class="page">
    <div class="page-header">
        <navbar>
            <router-link v-if="showBack" slot="left" to="/" @click.native="bus.$emit('drawer-open-change', false)">
                <icon icon="left"> 返回</icon>
            </router-link>
            <span><slot name="title"></slot></span>
            <icon slot="right" icon="bars" @click.native="bus.$emit('drawer-open-toggle')"></icon>
        </navbar>
    </div>
    <div class="page-body">
        <slot name="body"></slot>
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
        showBack: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style lang="sass">
.page {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.page-body {
    flex: 1;
    overflow: hidden;
}
</style>
