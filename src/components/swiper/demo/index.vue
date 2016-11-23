<template>
<page-demo class="demo-swiper" title="Swiper(触摸滑动)">
    <list>
        <template slot="header">环路模式，播放间隔2.5s，显示分页器</template>

        <swiper :loop="true" :autoplay="2500" :show-pagination="true">
            <swiper-slide v-for="n of 3" :class="'swiper-slide-' + n">
                slide{{n}}
            </swiper-slide>
        </swiper>
    </list>

    <list>
        <template slot="header">非环路模式，自定义分页器，分页可点击</template>

        <swiper class="demo-swiper-pagination" :loop="false" :autoplay="3000"
        :show-pagination="true" :paginationBulletRender="paginationBulletRender"
        :pagination-clickable="true">
            <swiper-slide v-for="n of 10" :class="'swiper-slide-' + n">
                slide{{n}}
            </swiper-slide>
        </swiper>
    </list>


    <list>
        <template slot="header">允许滑动角度值90deg，完全响应slide列表变化(5s后变为0，再过5s变为30)，事件展示(请在控制台查看)</template>

        <swiper :loop="true" :autoplay="false" :show-pagination="true" :touch-angle="90"
        @init="onInit" @slide-start="onSlideStart" @slide-move="onSlideMove" 
        @slide-move-opposite="onSlideMoveOpposite" @slide-end="onSlideEnd"
        :pagination-clickable="true" @pagination-click="onPaginationClick"
        @touchstart="onTouchstart" @touchmove="onTouchmove" @touchend="onTouchend">
            <swiper-slide v-for="n of num" :class="'swiper-slide-' + n"
            @click="onSlideClick($event, n)">
                slide{{n}}
            </swiper-slide>
        </swiper>

        <template slot="footer">SwiperSlide组件上绑定原生事件请<b>不要</b>加<code>.native</code>修饰符</template>
    </list>

    <list>
        <template slot="header">丰富API展示</template>

        <swiper :class="{ 'demo-swiper-api': paginationBulletRenderFun }" ref="swiper" :loop="true"
        :threshold="threshold" :touch-angle="touchAngle" :autoplay="autoplay" :speed="speed"
        :show-pagination="showPagination" :paginationBulletRender="paginationBulletRenderFun" :pagination-clickable="paginationClickable">
            <swiper-slide v-for="n of 5" :class="'swiper-slide-' + n">slide{{n}}</swiper-slide>
        </swiper>

        <template slot="footer">
            <btn size="sm" @click.native="slidePrev">上一个</btn>
            <btn size="sm" @click.native="slideNext">下一个</btn>
            <btn size="sm" @click.native="slideTo(4)">第4个</btn>
            <btn size="sm" @click.native="slideTo(2, 2000)">2s到第2个</btn>
            <btn size="sm" @click.native="stopAutoplay">停止播放</btn>
            <btn size="sm" @click.native="startAutoplay(5000)">开始5s间隔播放</btn>

            <btn size="sm" @click.native="threshold = 100">最小滑动距离100</btn>
            <btn size="sm" @click.native="touchAngle = 90">滑动角度90</btn>
            <btn size="sm" @click.native="autoplay = 2000">播放间隔2s</btn>
            <btn size="sm" @click.native="speed = 500">动画过渡500ms</btn>
            <btn size="sm" @click.native="showPagination = true">显示分页器</btn>
            <btn size="sm" @click.native="paginationBulletRenderFun = paginationBulletRender">修改分页点样式</btn>
            <btn size="sm" @click.native="paginationClickable = true">分页器可以点击</btn>
        </template>
    </list>

    <list>
        <template slot="header">垂直滑动</template>

        <swiper direction="vertical" :loop="true" :autoplay="false"
        :show-pagination="true" :pagination-clickable="true">
            <swiper-slide v-for="n of 5" :class="'swiper-slide-' + n">
                slide{{n}}
            </swiper-slide>
        </swiper>
    </list>

    <list>
        <template slot="header">不同宽度(实验性质)</template>

        <swiper class="demo-swiper-slide-size" direction="horizontal" :loop="false" :autoplay="false"
        :show-pagination="true" :pagination-clickable="true">
            <swiper-slide v-for="n of 3" :class="'swiper-slide-' + n">
                slide{{n}}
            </swiper-slide>
        </swiper>
    </list>

</page-demo>
</template>

<script>
export default {
    name: 'demo-swiper',
    data () {
        return {
            num: 5,

            threshold: 30,
            touchAngle: 45,
            autoplay: 3000,
            speed: 300,
            showPagination: false,
            paginationBulletRenderFun: undefined,
            paginationClickable: false
        }
    },
    created () {
        setTimeout(() => {
            this.num = 0
            console.log('after 5s...')
        }, 5000)
        setTimeout(() => {
            console.log('after 5s...')
            this.num = 30
        }, 10000)
    },
    methods: {
        onSlideClick (event, n) {
            console.log(event, n)
        },

        onInit () {
            console.log('组件初始化完成了。')
        },
        onSlideStart (evt) {
            console.log('slide-start', evt)
        },
        onSlideMove (evt) {
            console.log('slide-move', evt)
        },
        onSlideMoveOpposite (evt) {
            console.log('slide-move-opposite', evt)
        },
        onSlideEnd (evt) {
            console.log('slide-end', evt)
        },

        onTouchstart (event) {
            console.log('touchstart', event)
        },
        onTouchmove (event) {
            console.log('touchmove', event)
        },
        onTouchend (event) {
            console.log('touchend', event)
        },

        paginationBulletRender (index) {
            return `<span>${index + 1}</span>`
        },
        onPaginationClick (event, index) {
            console.log('pagination-click', event, index)
        },

        slidePrev () {
            this.$refs.swiper.slidePrev()
        },
        slideNext () {
            this.$refs.swiper.slideNext()
        },
        slideTo (no, speed) {
            this.$refs.swiper.slideTo(no - 1, speed)
        },
        stopAutoplay () {
            this.$refs.swiper.stopAutoplay()
        },
        startAutoplay (autoplay) {
            this.autoplay = autoplay
            this.$refs.swiper.startAutoplay()
        }
    }
}
</script>

<style lang="sass">
.demo-swiper {
    .vx-swiper {
        height: 300px;
    }
    .vx-swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .demo-swiper-pagination, .demo-swiper-api {
        .vx-swiper-pagination-bullet {
            width: 32px;
            height: 32px;
            line-height: 32px;
            text-align: center;
        }
    }

    .demo-swiper-slide-size {
        @for $n from 1 through 5 {
            .swiper-slide-#{$n} {
                width: 200px * $n;
            }
        }
    }

    @for $n from 1 through 11 {
        .swiper-slide-#{$n} {
            background-color: lighten(#6abf47, (11 - $n) * 4%);
        }
    }

    @for $n from 11 through 20 {
        .swiper-slide-#{$n} {
            background-color: lighten(#f86e21, (21 - $n) * 4%);
        }
    }

    @for $n from 21 through 30 {
        .swiper-slide-#{$n} {
            background-color: lighten(#f4333c, (31 - $n) * 4%);
        }
    }
}
</style>
