<template>
<div class="vx-tabbar">
    <div class="vx-tabbar-nav">
        <slot name="nav"></slot>
    </div>
    <div class="vx-tabbar-body">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    name: 'tabbar'
}
</script>

<style lang="sass">
@import './site/style/base.scss';

.vx-tabbar {
    position: relative;
    width: 100%;
    height: 100%;
}

.vx-tabbar-nav {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: $tab-bar-height;
    display: flex;

    > div {
        text-align: center;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: $font-size-caption-sm;

        &.active {
            color: $tabs-color;
        }

        .vx-if {
            line-height: 1;
            font-size: $icon-size-md;
            display: block;
        }
    }

    &:before {
        @include border-pseudo($position: top, $width: 1px);
    }
}

.vx-tabbar-body {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: $tab-bar-height;
    overflow: hidden;

    > div {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        // visibility: hidden;
        // display: none;
        // transform: translateX(-100%);
        backface-visibility: hidden;
        transform: translate3d(-100%, 0, 0); //  high-performance toggle-show
        // will-change: transform;

        &.active {
            // visibility: visible;
            // display: block;
            // transform: translateX(0);
            transform: translate3d(0, 0, 0);
        }
    }
}
</style>
