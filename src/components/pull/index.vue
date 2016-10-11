<template>
<div class="vx-pull" :class="['vx-pull-' + status, { 'vx-pull-touching': isTouching, 
'vx-pull-infinite-loading': isInfiniteLoading }]" 
@touchstart="onTouchstart($event)"
@touchmove="throttle(onTouchmove, 30, $event)"
@touchend="_events.refresh ? onTouchend($event) : undefined"
@scroll="_events.infinite ? throttle(onScroll, 100, $event) : undefined">
    <div ref="inner" class="vx-pull-inner" 
    :style="{ transform: 'translate3d(0, ' + translateY + 'px, 0)' }">
    <!-- :style="{ top: translateY + 'px' }"> -->
        <div ref="ptrRefresh" class="vx-pull-ptr-refresh">
            <slot name="refresh" v-if="_events.refresh">
                <div class="vx-pull-ptr-arrow"></div>
                <div class="vx-pull-ptr-preloader"></div>
                <span class="vx-pull-ptr-pulldown">下拉可以刷新</span>
                <span class="vx-pull-ptr-release">松开立即刷新</span>
                <span class="vx-pull-ptr-refreshing">正在刷新中…</span>
            </slot>
        </div>
        <slot></slot>
        <div ref="ptrInfinite" v-if="_events.infinite" class="vx-pull-ptr-infinite"
        :class="{ 'vx-pull-ptr-infinite-nomore': nomore }">
            <slot name="infinite">
                <div class="vx-pull-ptr-preloader"></div>
                <span class="vx-pull-ptr-loading">正在加载更多数据…</span>
                <span class="vx-pull-ptr-nomore">没有更多数据</span>
            </slot>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'pull',
    props: {
        touchTranslate: {
            type: Function,
            default: function (startTouch, endTouch) {
                // return Math.pow(endTouch.clientY - startTouch.clientY, 0.8)
                return Math.round((endTouch.clientY - startTouch.clientY) * 0.35)
            }
        }
    },
    data () {
        return {
            startTouch: {}, // 触摸起点
            translateY: 0,
            isTouching: false,
            status: 'pulldown', // 'pulldown'|'release'|'refereshing'
            isInfiniteLoading: false,
            nomore: false
        }
    },
    methods: {
        onTouchstart (e) {
            // e.preventDefault()
            this.isTouching = true
            const { clientX, clientY, target } = e.targetTouches[0]
            this.startTouch = { clientX, clientY, target }
        },
        onTouchmove (e) {
            // if (this.$el.scrollTop > 0 || !this.isTouching || this.isInfiniteLoading) {
            if (this.$el.scrollTop > 0 || !this.isTouching) {
                return
            }

            const { clientX, clientY, target } = e.targetTouches[0]
            const endTouch = { clientX, clientY, target }

            if (endTouch.clientY - this.startTouch.clientY > 0) { // diff Y
                e.preventDefault()
            }

            const translateY = this.touchTranslate(this.startTouch, endTouch)
            if (this._events.refresh) {
                if (this.status === 'refreshing') {
                    this.translateY = translateY + this.ptrRefreshHeight
                    return
                }
                if (translateY >= this.ptrRefreshHeight) {
                    this.translateY = translateY
                    this.status = 'release'
                    return
                } else if (translateY >= 0) {
                    this.translateY = translateY
                    this.status = 'pulldown'
                    return
                }
            }

            if (translateY < 3 && !this.isInfiniteLoading && !this.nomore) {
                const innerHeight = this.$refs.inner.offsetHeight
                const outerHeight = this.outerClientHeight
                const ptrRefreshHeight = this._events.refresh ? this.ptrRefreshHeight : 0
                const ptrInfiniteHeight = this._events.infinite ? this.ptrInfiniteHeight : 0

                const diff = innerHeight - ptrRefreshHeight - ptrInfiniteHeight
                if (diff <= outerHeight) {
                    // e.preventDefault()
                    this.infinite()
                }
            }
        },
        onTouchend (e) {
            this.isTouching = false
            if (this.status === 'refreshing') {
                this.translateY = this.ptrRefreshHeight
                return
            }

            if (this.translateY >= this.ptrRefreshHeight) { // trigger refresh
                this.refresh()
            } else {
                this.status = 'pulldown'
                this.translateY = 0
            }
        },
        onScroll (e) {
            // if (this.isInfiniteLoading || nomore || this.status === 'refreshing') {
            if (this.isInfiniteLoading || this.nomore) {
                return
            }

            const innerHeight = this.$refs.inner.offsetHeight
            const outerHeight = this.outerClientHeight
            const scrollTop = this.$el.scrollTop
            const ptrRefreshHeight = this.ptrRefreshHeight
            const ptrInfiniteHeight = this._events.infinite ? this.ptrInfiniteHeight : 0

            const diff = innerHeight - outerHeight - scrollTop - ptrRefreshHeight
            if (diff >= 0 && diff < ptrInfiniteHeight) {
                this.infinite()
            }
        },
        refresh () {
            this.status = 'refreshing'
            this.translateY = this.ptrRefreshHeight
            this.nomore = false
            this.$emit('refresh', {
                status: this.status,
                isInfiniteLoading: this.isInfiniteLoading,
                done: (nomore = false) => {
                    this.status = 'pulldown'
                    this.isTouching = false // stop touchmoving, just reduce flickering
                    this.translateY = 0
                    this.nomore = nomore
                }
            })
        },
        infinite () {
            this.isInfiniteLoading = true
            this.$emit('infinite', {
                status: this.status,
                isInfiniteLoading: this.isInfiniteLoading,
                done: (nomore = false) => {
                    this.isInfiniteLoading = false
                    this.nomore = nomore
                }
            })
        },
        throttle (fn, ms, ...args) {
            if (this.timeout) {
                return
            } else {
                fn(...args)
            }
            this.timeout = setTimeout(() => {
                this.timeout = null
                fn(...args)
            }, ms)
        }
    },
    mounted () {
        this.ptrRefreshHeight = this.$refs.ptrRefresh.offsetHeight // 刷新指示器高度
        this.ptrInfiniteHeight = this.$refs.ptrInfinite.offsetHeight // 加载指示器高度
        this.outerClientHeight = this.$el.clientHeight // 外部客户端的高度(滚动条所在的元素)
    }
}
</script>

<style lang="sass">
@import './site/style/base.scss';

.vx-pull {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
.vx-pull-inner {
    position: absolute;
    left: 0;
    top: -$navbar-height;
    width: 100%;
    // height: 100%;
    // margin-top: -$navbar-height;
    backface-visibility: hidden;
    will-change: transform;
    transition: transform .3s;

    .vx-pull-touching & {
        transition: none;
    }
}

.vx-pull-ptr-refresh {
    height: $navbar-height;
    display: flex;
    justify-content: center;
    align-items: center;
}

.vx-pull-ptr-pulldown {
    display: none;

    .vx-pull-pulldown & {
        display: inline-block;
    }
}

.vx-pull-ptr-release {
    display: none;

    .vx-pull-release & {
        display: inline-block;
    }
}

.vx-pull-ptr-refreshing {
    display: none;

    .vx-pull-refreshing & {
        display: inline-block;
    }
}

.vx-pull-ptr-arrow {
    width: $icon-size-sm;
    height: $icon-size-sm;
    margin-right: $h-spacing-sm;
    // background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2026%2040'%3E%3Cpolygon%20points%3D'9%2C22%209%2C0%2017%2C0%2017%2C22%2026%2C22%2013.5%2C40%200%2C22'%20fill%3D'%238c8c8c'%2F%3E%3C%2Fsvg%3E");
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'-80%204%2024%2024'%3E%3Cpath%20d%3D'M-69%2C8v12.2l-5.6-5.6L-76%2C16l8%2C8l8-8l-1.4-1.4l-5.6%2C5.6V8H-69z'%20fill%3D'%238c8c8c'%2F%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    transition: transform .3s;

    .vx-pull-pulldown & {
        transform: rotate(0deg);
    }

    .vx-pull-release & {
        transform: rotate(180deg);
    }

    .vx-pull-refreshing & {
        // visibility: hidden;
        display: none;
    }
}

.vx-pull-ptr-preloader {
    display: none;
    width: $icon-size-sm;
    height: $icon-size-sm;
    margin-right: $h-spacing-sm;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;

    .vx-pull-refreshing &, .vx-pull-infinite-loading & {
        animation: vx-pull-ptr-preloader 1s steps(12) infinite;
        display: inline-block;
    }
}

@keyframes vx-pull-ptr-preloader {
    100% {
        transform: rotate(360deg)
    }
}

.vx-pull-ptr-infinite {
    height: $navbar-height;
    display: flex;
    justify-content: center;
    align-items: center;
}

.vx-pull-ptr-loading {
    visibility: hidden;

    .vx-pull-infinite-loading & {
        visibility: visible;
    }

    .vx-pull-ptr-infinite-nomore & {
        display: none;
    }
}
.vx-pull-ptr-nomore {
    display: none;

    .vx-pull-ptr-infinite-nomore & {
        display: inline-block;
    }
}
</style>
