<template>
<div class="vx-page">
    <div v-if="$slots.header" class="vx-page-header">
        <slot name="header"></slot>
    </div>
    <div v-if="$slots.header && $slots.subheader" class="vx-page-subheader">
        <slot name="subheader"></slot>
    </div>
    <div v-if="$slots.footer" class="vx-page-footer">
        <slot name="footer"></slot>
    </div>
    <div class="vx-page-body">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    name: 'page'
}
</script>

<style lang="sass">
@import './site/style/base.scss';

.vx-page {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
}

.vx-page-header {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: $navbar-height;
}

.vx-page-subheader {
    position: absolute;
    left: 0;
    top: $navbar-height;
    right: 0;
    height: $navbar-height;
}

.vx-page-footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: $navbar-height;

    .vx-btn {
        height: $navbar-height;
        line-height: $navbar-height;
        border-radius: 0;
    }
}

.vx-page-body {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    .vx-page-header ~ & {
        top: $navbar-height;
    }

    .vx-page-subheader ~ & {
        top: $navbar-height * 2;
    }
    
    .vx-page-footer ~ & {
        bottom: $navbar-height;
    }
}
</style>
