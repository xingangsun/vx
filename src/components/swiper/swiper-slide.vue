<template>
<div class="vx-swiper-slide">
    <slot></slot>
</div>
</template>

<script>
export default {
    name: 'swiper-slide',
    mounted () {
        this._init()
    },
    beforeDestroy () {
        this._beforeDestroy()
    },
    methods: {
        // 默认绑定事件到组件自己，如果传入el，则将事件绑定到传入的el上，即代理该el的事件
        _bindEvents (el = this.$el) {
            Object.keys(this._events).forEach((eventName) => {
                if (eventName.indexOf('hook:') === -1) {
                    let callback = this[eventName + 'Callback']
                    if (!callback) {
                        callback = this[eventName + 'Callback'] = (event) => {
                            this.$emit(eventName, event)
                        }
                    }
                    el.addEventListener(eventName, callback)
                }
            })
        },
        // 如果传入el，则移除el被代理在该组件的事件
        _unbindEvents (el = this.$el) {
            Object.keys(this._events).forEach((eventName) => {
                if (eventName.indexOf('hook:') === -1) {
                    const callback = this[eventName + 'Callback']
                    el.removeEventListener(eventName, callback)
                }
            })
        },
        _init () {
            // 我自己绑定事件
            this._bindEvents()

            const swiperVm = this.$parent
            // 在父组件中标记子slide已经发生了改变，可能需要重建副本或分页器
            swiperVm.isSlideChanged = true
        },
        _beforeDestroy () {
            // 移除我自己绑定的事件
            this._unbindEvents()

            const swiperVm = this.$parent
            if (swiperVm.loop) {
                // 将与之关联的副本清空
                if (this === swiperVm.duplicateFirstSlideVm) {
                    this._unbindEvents(swiperVm.duplicateFirstSlideEl)
                    swiperVm.duplicateFirstSlideEl.parentNode.removeChild(swiperVm.duplicateFirstSlideEl)
                    swiperVm.duplicateFirstSlideEl = swiperVm.duplicateFirstSlideVm = null
                } else if (this === swiperVm.duplicateLastSlideVm) {
                    this._unbindEvents(swiperVm.duplicateLastSlideEl)
                    swiperVm.duplicateLastSlideEl.parentNode.removeChild(swiperVm.duplicateLastSlideEl)
                    swiperVm.duplicateLastSlideEl = swiperVm.duplicateLastSlideVm = null
                }
            }
            // 在父组件中标记子slide已经发生了改变，可能需要重建副本或分页器
            swiperVm.isSlideChanged = true
        }
    }
}
</script>

<style lang="sass">
.vx-swiper-slide {
    position: relative;
    flex: none;
    width: 100%;
    height: 100%;
}
</style>
