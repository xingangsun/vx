<template>
<div class="vx-swiper" :class="'vx-swiper-' + direction"
@touchstart.stop="_onTouchstart"
@touchmove.stop="_onTouchmove"
@touchend.stop="_onTouchend">
    <div class="vx-swiper-wrapper" ref="swiperWrapper"
    :style="{ transform: 'translate3d(' + translateX + 'px, '+ translateY +'px, 0)',
    'transition-duration': transitionDuration + 'ms' }"
    @transitionend.stop.prevent="_onTransitionend">
       <slot></slot>
    </div>
    <div class="vx-swiper-pagination" v-if="showPagination">
        <div class="vx-swiper-pagination-bullet" v-for="(n, index) of slideCount"
        :class="{ 'vx-swiper-pagination-bullet-active': index === activeIndex }"
        @click.stop.prevent="paginationClickable ? _onPaginationClick($event, index) : undefined"
        v-html="paginationBulletRenderList[index]"></div>
    </div>
</div>
</template>

<script>
export default {
    name: 'swiper',
    props: {
        direction: {
            type: String,
            default: 'horizontal',
            validator (direction) {
                return ['horizontal', 'vertical'].indexOf(direction) > -1
            }
        },
        threshold: {
            type: Number,
            default: 30
        },
        touchAngle: {
            type: Number,
            default: 45
        },
        loop: { // 环路
            type: Boolean,
            default: true
        },
        autoplay: {
            type: [Boolean, Number],
            default: false,
            validator (autoplay) { // false | >=500ms，轮播速度太快可能有问题
                return autoplay === false || parseInt(autoplay) >= 500
            }
        },
        speed: {
            type: Number,
            default: 300
        },
        showPagination: {
            type: Boolean,
            default: false
        },
        paginationClickable: {
            type: Boolean,
            default: false
        },
        paginationBulletRender: {
            type: Function,
            default (index) {
                return `&nbsp;`
            }
        }
    },
    data () {
        return {
            isHorizontal: this.direction === 'horizontal',
            offsetPropName: this.direction === 'horizontal' ? 'offsetWidth' : 'offsetHeight',
            activeIndex: 0, // 当前激活索引
            previousIndex: 0, // 先前索引

            translateX: 0, // 水平位移
            translateY: 0, // 垂直位移
            transitionDuration: 0, // 过渡时间
            translateOffset: 0, // swiperWrapper的初始偏移量

            touchDistance: 0, // 滑动距离

            isSlideChanged: false, // 标明子组件(slide)发生过改变，父组件需要据此重建副本或分页器
            slideCount: 0 // slide个数
        }
    },
    computed: {
        paginationBulletRenderList () {
            const list = [] // 缓存分页点渲染的结果，避免每次slide切换都重新调用渲染方法，可以提高性能
            for (let i = 0, len = this.slideCount, render = this.paginationBulletRender; i < len; i++) {
                list.push(render(i))
            }
            return list
        }
    },
    watch: {
        // 如果在环路loop模式下，为了保证slide的响应式，如果首尾slide被销毁或重建，需要重建首尾slide的副本
        isSlideChanged (val, oldVal) {
            if (val) {
                this.isSlideChanged = false

                this.slideCount = this.$children.length
                if (this.loop) {
                    this._createDuplicateSlide()
                }
                this.startAutoplay()
            }
        }
    },
    mounted () {
        this._init()
    },
    beforeDestory () {
        this._destroy()
    },
    methods: {
        _init () {
            this.slideCount = this.$children.length
            if (this.loop) {
                this.isSlideChanged = false
                this._createDuplicateSlide()
            }
            parseInt(this.autoplay) >= 500 && this.startAutoplay(this.autoplay)
            this._events['init'] && this.$emit('init')
        },
        _destroy () {
            this.stopAutoplay()
            if (this.loop) {
                const swiperWrapperEl = this.$refs.swiperWrapper
                this.duplicateFirstSlideVm._unbindEvents(this.duplicateFirstSlideEl)
                swiperWrapperEl.removeChild(this.duplicateFirstSlideEl)

                this.duplicateLastSlideVm._unbindEvents(this.duplicateLastSlideEl)
                swiperWrapperEl.removeChild(this.duplicateLastSlideEl)
            }
        },
        startAutoplay () {
            this.stopAutoplay()
            const autoplay = parseInt(this.autoplay)
            if (this.slideCount > 0 && autoplay >= 500) {
                this.autoplayTimer = setTimeout(() => {
                    this.slideNext()
                    this.startAutoplay()
                }, autoplay)
            }
        },
        stopAutoplay () {
            this.autoplayTimer && clearTimeout(this.autoplayTimer)
        },
        slidePrev () {
            // 外部调用时this.noReset=false，环路模式下保证动画的过渡方向一致
            if (this.loop && !this.noReset && (this.activeIndex === 0 || this.activeIndex === this.$children.length - 1)) {
                this._setTranslate(this._getTranslateOfIndex(this.activeIndex))
            }
            this.slideTo(this.activeIndex - 1)
        },
        slideNext () {
            // 外部调用时this.noReset=false，环路模式下保证动画的过渡方向一致
            if (this.loop && !this.noReset && (this.activeIndex === 0 || this.activeIndex === this.$children.length - 1)) {
                this._setTranslate(this._getTranslateOfIndex(this.activeIndex))
            }
            this.slideTo(this.activeIndex + 1)
        },
        slideTo (index, speed = this.speed) {
            this.noReset = false
            const slideCount = this.$children.length
            const start = this.loop ? -1 : 0
            const end = this.loop ? slideCount : slideCount - 1
            // start <= index <= end
            index = index < start ? start : index > end ? end : index

            this.previousIndex = this.activeIndex
            this.activeIndex = index >= slideCount ? 0 : index <= -1 ? slideCount - 1 : index
            // console.log('slideTo------->', start, '<=', index, '<=', end)
            this.$nextTick(function () {
                this.transitionDuration = speed
                this._setTranslate(this._getTranslateOfIndex(index))
                this._events['slide-start'] && this.$emit('slide-start', {
                    previousIndex: this.previousIndex,
                    activeIndex: this.activeIndex
                })
            })
        },
        _onTouchstart (event) {
            const { pageX, pageY } = event.targetTouches[0]
            this.startPoint = { pageX, pageY }
            this.startTranslate = this._getTranslateOfIndex(this.activeIndex)
            this.touchDistance = 0
            this.transitionDuration = 0
            this._events['touchstart'] && this.$emit('touchstart', event)
        },
        _onTouchmove (event) {
            this._events['touchmove'] && this.$emit('touchmove', event)
            const { pageX, pageY } = event.targetTouches[0]
            const startPoint = this.startPoint

            const touchAngle = Math.atan2(Math.abs(pageY - startPoint.pageY), Math.abs(pageX - startPoint.pageX)) * 180 / Math.PI
            if (this.isHorizontal && touchAngle > this.touchAngle || !this.isHorizontal && touchAngle < this.touchAngle) {
                this.touchDistance = 0
                this.transitionDuration = this.speed
                this._events['slide-move-opposite'] && this.$emit('slide-move-opposite', event, {
                    touchDistance: 0,
                    touchAngle
                })
            } else {
                this.transitionDuration = 0
                event.preventDefault()
                const touchDistance = this.touchDistance = this.isHorizontal ? pageX - startPoint.pageX : pageY - startPoint.pageY
                if (Math.abs(touchDistance) > 0) {
                    // 交互时禁用自动滚动
                    this.autoplayDisableOnInteraction = true
                    this.stopAutoplay()

                    this._events['slide-move'] && this.$emit('slide-move', event, {
                        touchDistance,
                        touchAngle
                    })
                }
            }
            this._setTranslate(this.startTranslate + this.touchDistance)
        },
        _onTouchend (event) {
            if (this.touchDistance > this.threshold) {
                this.noReset = true
                this.slidePrev()
            } else if (this.touchDistance < -this.threshold) {
                this.noReset = true
                this.slideNext()
            } else if (this.touchDistance !== 0) {
                this.slideTo(this.activeIndex)
            }
            this._events['touchend'] && this.$emit('touchend', event)
        },
        // slideIndex(loop) for 5 slides: -1 0 1 2 3 4 5
        // slideIndex(no-loop) for 5 slides: 0 1 2 3 4
        _getTranslateOfIndex (slideIndex) {
            if (this.loop && slideIndex === -1 || !this.loop && slideIndex === 0) {
                return 0
            }
            const propName = this.offsetPropName
            // 获得translate到activeIndex的位移
           /* return -this.$children.reduce((totalWidth, { $el }, index) => {
                console.log(index)
                return (index > slideIndex - 1) ? totalWidth : (totalWidth + $el[propName])
            }, 0) + this.translateOffset*/
            let translate = this.translateOffset
            for (let i = 0, slideVms = this.$children; i <= slideIndex - 1; i++) {
                translate -= slideVms[i].$el[propName]
            }
            return translate
        },
        _setTranslate (translate) {
            this[this.isHorizontal ? 'translateX' : 'translateY'] = translate
        },
        _onTransitionend (event) {
            this.transitionDuration = 0
            this.touchDistance = 0

            // 交互结束
            if (this.autoplayDisableOnInteraction) {
                this.autoplayDisableOnInteraction = false
                this.startAutoplay()
            }

            this._events['slide-end'] && this.$emit('slide-end', {
                previousIndex: this.previousIndex,
                activeIndex: this.activeIndex
            })
        },
        _onPaginationClick (event, index) {
            if (this._events['pagination-click']) {
                this.$emit('pagination-click', event, index)
            } else {
                this.slideTo(index)
            }
        },
        _createDuplicateSlide () {
            const swiperWrapperEl = this.$refs.swiperWrapper

            // 1.1首slide的副本，追加在后面
            if (this.duplicateFirstSlideEl) {
                // 如果已经存在副本则直接删了重建，因为实在很难判断是否应该复用
                this.duplicateFirstSlideVm._unbindEvents(this.duplicateFirstSlideEl)
                swiperWrapperEl.removeChild(this.duplicateFirstSlideEl)
            }

            // 2.1尾slide的副本，放在最前面
            if (this.duplicateLastSlideEl) {
                this.duplicateLastSlideVm._unbindEvents(this.duplicateLastSlideEl)
                swiperWrapperEl.removeChild(this.duplicateLastSlideEl)
            }

            let duplicateLastSlideEl
            if (this.$children.length > 0) {
                // 1.2
                const firstSlideVm = this.$children[0]
                const duplicateFirstSlideEl = firstSlideVm.$el.cloneNode(true)
                firstSlideVm._bindEvents(duplicateFirstSlideEl)
                swiperWrapperEl.appendChild(duplicateFirstSlideEl)

                this.duplicateFirstSlideEl = duplicateFirstSlideEl
                this.duplicateFirstSlideVm = firstSlideVm

                // 2.2
                const lastSlideVm = this.$children[this.$children.length - 1]
                duplicateLastSlideEl = lastSlideVm.$el.cloneNode(true)
                lastSlideVm._bindEvents(duplicateLastSlideEl)
                swiperWrapperEl.insertBefore(duplicateLastSlideEl, swiperWrapperEl.firstElementChild)

                this.duplicateLastSlideEl = duplicateLastSlideEl
                this.duplicateLastSlideVm = lastSlideVm
            }

            // 设置偏移量
            this.activeIndex = 0
            this.translateOffset = !!duplicateLastSlideEl && (-duplicateLastSlideEl[this.offsetPropName]) || 0
            this._setTranslate(this.translateOffset)
        }
    }
}
</script>

<style lang="sass">
@import './site/style/base.scss';

.vx-swiper {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
}
.vx-swiper-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    transition-property: transform;

    .vx-swiper-horizontal & {
        flex-direction: row;
    }
    
    .vx-swiper-vertical & {
        flex-direction: column;
    }
}
.vx-swiper-pagination {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate3d(0, 0, 0);

    .vx-swiper-horizontal & {
        flex-direction: row;
        flex-flow: row wrap;
        width: 100%;
        // height: 0;
        left: 0;
        bottom: $swiper-pagination-bullet-marign;
    }
    
    .vx-swiper-vertical & {
        flex-flow: column wrap-reverse;
        width: $swiper-pagination-bullet-size + $swiper-pagination-bullet-marign * 2; // fixed ios bug, wrap-reverse need
        height: 100%;
        top: 0;
        right: $swiper-pagination-bullet-marign;
    }
}
.vx-swiper-pagination-bullet {
    float: right;
    width: $swiper-pagination-bullet-size;
    height: $swiper-pagination-bullet-size;
    margin: $swiper-pagination-bullet-marign;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, .2);
    transition-duration: .3s;
}
.vx-swiper-pagination-bullet-active {
    background-color: $brand-primary;
}
</style>
