<template>
<div class="vx-pull" :class="['vx-pull-' + status, { 'vx-pull-end': isTouchend }]" :style="{ transform: 'translateY(' + translateY + 'px)' }">
    <div class="vx-pull-header">
        <div class="vx-pull-ptr-pulldown">下拉</div>
        <div class="vx-pull-ptr-release">释放</div>
        <div class="vx-pull-ptr-refresh">更新</div>
    </div>
    <div ref="body" class="vx-pull-body">
    <!-- <div class="vx-pull-body" :class="{ 'vx-pull-end': isTouchend }" :style="{ transform: 'translate3d(0, ' + diff + 'px, 0)' }"> -->
        <slot></slot>
    </div>
</di>
</template>

<script>
export default {
    name: 'pull',
    props: {
        refresh: {
            type: Function,
            default: () => {}
        },
        load: {
            type: Function,
            default: () => {}
        },
        distance: {
            type: Number,
            default: 167
        }
    },
    data () {
        return {
            start: NaN,
            end: NaN,
            // translateY: 0,
            // diff: 0,
            isTouchend: false,
            canDiff: false,
            status: 'pulldown', // 'pulldown','release','refresh','end'
            isPullLoading: false
        }
    },
    computed: {
        diff () {
            /* console.log('diff-isTouchend', this.isTouchend, this.start, this.end)
            if (this.isTouchend) {
                if (this.end - this.start > this.distance)
            }
            return (this.isTouchend) && '0' || (this.end - this.start) * 0.3*/
            return this.end - this.start
        },
        translateY () {
            if (this.status === 'refresh') {
                return 50
            }
            return this.diff * 0.3
        },
        status () {
            if (this.isTouchend) {
                if (this.diff >= this.distance) {
                    return 'refresh'
                }
            } else {
                if (this.diff < this.distance) {
                    return 'pulldown'
                } else if (this.diff >= this.distance) {
                    return 'release'
                }
            }
            return 'pulldown'
        }
    },
    methods: {
        onTouchstart (e) {
            // console.log(e)
            const targetTouches = e.targetTouches
            this.isTouchend = false
            this.start = targetTouches[0].clientY
            // this.end = this.start + this.translateY
            console.log('start->', this.start)
        },
        onTouchmove (e) {
            // console.log('body.scrollTop', this.$refs.body.scrollTop)
           /* if (this.$refs.body.scrollTop === 0) {
                this.canDiff = true
                const targetTouches = e.targetTouches
                this.end = targetTouches[0].clientY
                console.log('this.end->', this.end)
                /* if (this.end - this.start > 0) {
                    this.diff = this.end - this.start
                }*/
           /* } else {
                this.canDiff = false
            }*/
            const targetTouches = e.targetTouches
            this.end = targetTouches[0].clientY
            // this.translateY = (this.end - this.start) * 0.3
        },
        onTouchend () {
            this.isTouchend = true
            console.log('diff->', this.diff)
            if (this.diff >= this.distance) {
                this.refresh()
                this.isPullLoading = true
                this.$emit('loading')
            } else if (-this.diff >= this.distance) {
                this.load()
            }
            // this.start = this.end = NaN
        },
        onScroll (e) {

        }
    },
    mounted () {
        const body = this.$refs.body
        body.addEventListener('touchstart', this.onTouchstart)
        body.addEventListener('touchmove', this.onTouchmove)
        body.addEventListener('touchend', this.onTouchend)
        body.addEventListener('scroll', this.onScroll)
    },
    beforeDestroy () {
        const body = this.$refs.body
        body.removeEventListener('touchstart', this.onTouchstart)
        body.removeEventListener('touchmove', this.onTouchmove)
        body.removeEventListener('touchend', this.onTouchend)
        body.removeEventListener('scroll', this.onScroll)
    }
}
</script>

<style lang="sass">
.vx-pull {
    height: 100%;
    transition: none;
}

.vx-pull-end {
    transition: transform 3s;
}

.vx-pull-header {
    height: 100px;
    line-height: 100px;
    margin-top: -100px;
    text-align: center;
}

.vx-pull-ptr-pulldown {
    .vx-pull-release &, .vx-pull-refresh & {
        display: none;
    }
}

.vx-pull-ptr-release {
    display: none;

    .vx-pull-release & {
        display: block;
    }
}

.vx-pull-ptr-refresh {
    display: none;

    .vx-pull-refresh & {
        display: block;
    }
}

.vx-pull-body {
    height: 100%;
    overflow-y: auto;

    .vx-pull-pulldown &, .vx-pull-release & {
        overflow: hidden;
    }
}
</style>
