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
/* 全局iconfont，只引入一次 */
@import '../../assets/fonts/iconfont.scss';

// ICONFONT
$iconfont-cls-prefix        : vx-if;
$iconfont-url               : "../../assets/fonts/iconfont" !default;

// font-face
@font-face {
    font-family: 'iconfont';
    // src: url('#{$iconfont-url}.eot'); /* IE9*/
    src: //url('#{$iconfont-url}.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('#{$iconfont-url}.woff') format('woff'), /* chrome、firefox */
        url('#{$iconfont-url}.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
        url('#{$iconfont-url}.svg#iconfont') format('svg'); /* iOS 4.1- */
}

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
