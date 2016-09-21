<template>
<div class="vx-list">
    <div class="vx-list-header" v-if="$slots.header">
        <slot name="header"></slot>
    </div>
    <div class="vx-list-body">
        <slot></slot>
    </div>
    <div class="vx-list-footer" v-if="$slots.footer">
        <slot name="footer"></slot>
    </div>
</div>
</template>

<script>
export default {
    name: 'list'
}
</script>

<style lang="sass">
@import './site/style/base.scss';

.vx-list {
    
}

.vx-list-header {
    padding: $v-spacing-lg $h-spacing-lg $v-spacing-md;
    font-size: $font-size-base;
    color: $color-text-caption;
}

.vx-list-body {
    position: relative;
    background-color: $bg-base;
    
    &:before {
        @include border-pseudo($position: top);
    }
    &:after {
        @include border-pseudo($position: bottom);
    }
}

.vx-list-footer {
    padding: $v-spacing-md $h-spacing-lg $v-spacing-lg;
    font-size: $font-size-base;
    color: $color-text-caption;
}
</style>
