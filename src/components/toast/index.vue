<template>
<div class="vx-toast" v-show="show">
    <div class="vx-toast-text">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    name: 'toast',
    props: {
        show: {
            type: Boolean,
            required: true
        },
        duration: {
            type: Number,
            default: 1500
        }
    },
    watch: {
        show (val) {
            this.setTimer(val)
        }
    },
    methods: {
        setTimer (show) {
            if (show) {
                setTimeout(() => {
                    this.$emit('hide')
                }, this.duration)
            }
        }
    },
    mounted () {
        this.setTimer(this.show)
    }
}
</script>

<style lang="sass">
@import './site/style/base.scss';

.vx-toast {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: $z-index-toast;
}

.vx-toast-text {
    display: inline-block;
    min-width: 120px;
    margin: auto $h-spacing-lg;
    padding: $v-spacing-md $h-spacing-lg;
    // line-height: 1.18;
    text-align: center;
    border-radius: $radius-sm;
    font-size: $font-size-base;
    background-color: $bg-overlay-inverse;
    color: $color-text-base-inverse;
}
</style>
