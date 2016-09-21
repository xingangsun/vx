<template>
<div class="vx-drawer" :class="['vx-drawer-' + position, {'vx-drawer-open': isOpen}]">
    <div class="vx-drawer-sidebar">
        <slot name="sidebar"></slot>
    </div>
    <div class="vx-drawer-overlay" v-if="hasOverlay" @touchstart.prevent="$emit('overlay-click', $event)"></div>
    <div class="vx-drawer-content">
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
            validator (val) {
                return ['left', 'right', 'top', 'bottom'].indexOf(val) !== -1
            },
            default: 'left'
        },
        isOpen: {
            type: Boolean,
            required: true
        },
        hasOverlay: {
            type: Boolean,
            default: true
        }
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
    /* width: 100%;
    height: 100%; */
}

.vx-drawer-sidebar {
    position: absolute;
    z-index: 3;
    overflow-y: auto;
    will-change: transform;
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
        transform: translateX(-100%);
    }

    .vx-drawer-right & {
        right: 0;
        transform: translateX(100%);
    }

    .vx-drawer-top & {
        top: 0;
        transform: translateY(-100%);
    }

    .vx-drawer-bottom & {
        bottom: 0;
        transform: translateY(100%);
    }

    .vx-drawer-left.vx-drawer-open &, .vx-drawer-right.vx-drawer-open & {
        transform: translateX(0%);
    }

    .vx-drawer-top.vx-drawer-open &, .vx-drawer-bottom.vx-drawer-open & {
        transform: translateY(0%);
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
    transition: opacity .5s ease-out;
    background-color: $bg-mask;

    .vx-drawer-open & {
        opacity: 1;
        visibility: visible;
    }
}

.vx-drawer-content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
</style>
