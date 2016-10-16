<template>
<i class="vx-if" :class="'if-' + type">
    <slot></slot>
</i>
</template>

<script>
export default {
    name: 'icon',
    props: {
        type: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="sass">
@import './site/style/base.scss';

.#{$iconfont-cls-prefix} {
    display: inline-block;
    font-style: normal;
    text-transform: none;
    text-rendering: auto;
    // line-height: 1; // 只是为了保证默认占用的是正方形空间
    // -webkit-font-smoothing: antialiased;
    -webkit-font-smoothing: auto;

    &:before {
        display: inline-block;
        font-family: "iconfont" !important;
    }
}
</style>
