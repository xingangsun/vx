<template>
<button class="vx-btn" :disabled="disabled" :class="['vx-btn-' + type, 'vx-btn-' + size, 
active ? 'vx-btn-active' : '', disabled ? 'vx-btn-disabled' : '']"
@touchstart="onTouchstart" @touchend="onTouchend" @touchcancel="onTouchcancel">
    <slot></slot>
</button>
</template>

<script>
export default {
    name: 'btn',
    props: {
        type: {
            type: String,
            validator (type) {
                return ['default', 'primary', 'outline'].indexOf(type) !== -1
            },
            default: 'default'
        },
        size: {
            type: String,
            validator (size) {
                return ['lg', 'inline', 'sm'].indexOf(size) !== -1
            },
            default: 'lg'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            active: false
        }
    },
    methods: {
        onTouchstart () {
            if (!this.disabled) {
                this.active = true
            }
        },
        onTouchend () {
            this.active = false
        },
        onTouchcancel () {
            this.active = false
        }
    }
}
</script>

<style lang="sass">
@import './site/style/base.scss';

.vx-btn {
    position: relative;
    display: inline-block;
    width: 100%;
    border-radius: $radius-md;
}

.vx-btn-default {
    border: $border-width-sm solid $border-color-base;
    background-color: $bg-base;
    color: $color-text-base;

    &.vx-btn-active {
        background-color: $bg-tap;
    }
}

.vx-btn-primary {
    background-color: $btn-primary-bg;
    color: $color-text-base-inverse;

    &.vx-btn-active {
        background-color: $btn-primary-bg-tap;
    }
}

.vx-btn-outline {
    border: $border-width-sm solid $btn-primary-bg;
    background-color: transparent;
    color: $btn-primary-bg;

    &.vx-btn-active {
        background-color: $btn-primary-bg-tap;
        color: $color-text-base-inverse;
        border: $border-width-sm solid $btn-primary-bg-tap;
    }
}

.vx-btn-lg {
    height: $btn-height;
    line-height: $btn-height;
    font-size: $btn-font-size;
}

.vx-btn-inline {
    @extend .vx-btn-lg;
    width: auto;
    padding: 0 $h-spacing-lg;
}

.vx-btn-sm {
    height: $btn-height-sm;
    line-height: $btn-height-sm;
    font-size: $btn-font-size-sm;
    padding: 0 $h-spacing-sm;
    width: auto;
}

.vx-btn-disabled, .vx-btn-active.vx-btn-disabled {
    background-color: $bg-disabled;
    color: $color-text-disabled;
    border: $border-width-sm solid $bg-disabled;
}
</style>
