<template>
<page class="page-demo">
    <navbar slot="header">
        <icon v-if="showBack" slot="left" type="left" @touchstart.native="back"> 返回</icon>
        <span><slot name="title">{{ title }}</slot></span>
        <icon slot="right" type="bars" @touchstart.native="eventBus.$emit('drawer-open-toggle')"></icon>
    </navbar>
    <slot></slot>
</page>
</template>

<script>
export default {
    name: 'page-demo',
    props: {
        title: {
            type: String
        },
        showBack: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        back () {
            this.eventBus.$emit('drawer-open-change', false)
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="sass">
.page-demo {

}
</style>
