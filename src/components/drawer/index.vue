<template>
<div class="vx-drawer" :class="['vx-drawer-' + position, { 'vx-drawer-open': isOpen }]">
    <div class="vx-drawer-sidebar" ref="sidebar">
        <slot name="sidebar"></slot>
    </div>
    <div class="vx-drawer-overlay" :class="{ 'vx-drawer-overlay-transparent': !showOverlay }" 
    @touchstart.prevent="onOverlayTouchstart($event)"></div>
    <div class="vx-drawer-content" ref="content" :style="styleObjContent">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    name: 'drawer',
    props: {
        position: { // 'left'(default), 'right', 'top', 'bottom'
            type: String,
            validator (position) {
                return ['left', 'right', 'top', 'bottom'].indexOf(position) !== -1
            },
            default: 'left'
        },
        isOpen: {
            type: Boolean,
            required: true
        },
        showOverlay: {
            type: Boolean,
            default: true
        },
        isDock: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            styleObjContent: {} // 内容的样式，dock状态下用
        }
    },
    watch: {
        isOpen (val, oldVal) {
            this.setContentStyle(val)
        }
    },
    methods: {
        onOverlayTouchstart (event) {
            this.$emit('overlay-click', event)
        },
        setContentStyle (isOpen) { // 设置内容的transform
            if (!this.isDock) {
                return
            }
            let w, h, translate
            if (this.$refs.sidebar) {
                switch (this.position) {
                    case 'left':
                        w = isOpen ? this.$refs.sidebar.clientWidth : 0
                        translate = `translate3d(${w}, 0, 0)`
                        break
                    case 'right':
                        w = isOpen ? '-' + this.$refs.sidebar.clientWidth : 0
                        translate = `translate3d(${w}, 0, 0)`
                        break
                    case 'top':
                        h = isOpen ? this.$refs.sidebar.clientHeight : 0
                        translate = `translate3d(0, ${h}, 0)`
                        break
                    case 'bottom':
                        h = isOpen ? '-' + this.$refs.sidebar.clientHeight : 0
                        translate = `translate3d(0, ${h}, 0)`
                        break
                    default:
                        translate = 'none'
                }
            }
            this.styleObjContent = { transform: translate }
        }
    },
    mounted () {
        this.setContentStyle(this.isOpen)
    }
}
</script>

<style lang="sass">
@import './site/style/base.scss';

.vx-drawer {
    /* position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden; */
    position: relative;
    // z-index: 0;
    /* width: 100%;
    height: 100%; */
}

.vx-drawer-sidebar {
    position: absolute;
    z-index: 3;
    overflow-y: auto;
    // will-change: transform;
    backface-visibility: hidden;
    transition: transform .3s ease-out;
    background-color: $bg-base;

    .vx-drawer-left &, .vx-drawer-right & {
        top: 0;
        bottom: 0;
    }

    .vx-drawer-top &, .vx-drawer-bottom & {
        left: 0;
        right: 0;
    }

    .vx-drawer-left & {
        left: 0;
        // transform: translateX(-100%);
        transform: translate3d(-100%, 0, 0);
    }

    .vx-drawer-right & {
        right: 0;
        // transform: translateX(100%);
        transform: translate3d(100%, 0, 0);
    }

    .vx-drawer-top & {
        top: 0;
        // transform: translateY(-100%);
        transform: translate3d(0, -100%, 0);
    }

    .vx-drawer-bottom & {
        bottom: 0;
        // transform: translateY(100%);
        transform: translate3d(0, 100%, 0);
    }

    .vx-drawer-left.vx-drawer-open &, .vx-drawer-right.vx-drawer-open & {
        // transform: translateX(0);
        transform: translate3d(0, 0, 0);
    }

    .vx-drawer-top.vx-drawer-open &, .vx-drawer-bottom.vx-drawer-open & {
        // transform: translateY(0);
        transform: translate3d(0, 0, 0);
    }

    .vx-drawer-left.vx-drawer-open & {
        box-shadow: 2px 0 4px rgba(0, 0, 0, .15);
    }

    .vx-drawer-right.vx-drawer-open & {
        box-shadow: -2px 0 4px rgba(0, 0, 0, .15);
    }

    .vx-drawer-top.vx-drawer-open & {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .15);
    }

    .vx-drawer-bottom.vx-drawer-open & {
        box-shadow: 0 -2px 4px rgba(0, 0, 0, .15);
    }
}

.vx-drawer-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    opacity: 0;
    visibility: hidden;
    transition: opacity .3s ease-out .2s;
    background-color: $bg-mask;

    &.vx-drawer-overlay-transparent {
        transition: none;
        background-color: transparent;
    }

    .vx-drawer-open & {
        opacity: 1;
        visibility: visible;
    }
}

.vx-drawer-content {
    /* position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0; */
    width: 100%;
    height: 100%;
    overflow-y: auto;
    transition: transform .3s ease-out;
}
</style>
