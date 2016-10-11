<template>
<div class="vx-navbar" :class="{ 'vx-navbar-light': isLight }">
    <div class="vx-navbar-left">
        <slot name="left"></slot>
    </div>
    <div class="vx-navbar-title">
        <slot>{{ title }}</slot>
    </div>
    <div class="vx-navbar-right">
        <slot name="right"></slot>
    </div>
</div>
</template>

<script>
export default {
    name: 'navbar',
    props: {
        isLight: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="sass">
@import './site/style/base.scss';

.vx-navbar {
    display: flex;
    justify-content: space-between;
    height: $navbar-height;
    line-height: $navbar-height - $v-spacing-sm * 2;
    padding: $v-spacing-sm $h-spacing-lg;
    background-color: $brand-primary;
    color: $bg-base;

    &-light {
        background-color: $bg-base;
        color: $brand-primary;
    }

    &-left {
        flex: 1;
        font-size: $btn-link-font-size;
    }

    &-title {
        flex: 2.5;
        // max-width: 50%;
        font-size: $font-size-display-sm;
        text-align: center;
        @include ellipsis();
    }

    &-right {
        flex: 1;
        text-align: right;
        font-size: $btn-link-font-size;
    }
}
</style>
