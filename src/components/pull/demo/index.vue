<template>
<page-demo class="demo-pull" title="Pull(刷新加载)">
    <pull @refresh="onRefresh" @infinite="onInfinite" :touch-translate="touchTranslate">
        <div class="ptr-refresh" slot="refresh" ref="ptrRefresh">
            <span :style="{ 'font-size': diff + 'px' }">变</span>
            <div class="vx-pull-ptr-arrow"></div>
            <div class="vx-pull-ptr-preloader"></div>
            <span class="vx-pull-ptr-pulldown">你再下拉试试</span>
            <span class="vx-pull-ptr-release">你可以松开了</span>
            <span class="vx-pull-ptr-refreshing">玩命刷新中…</span>
        </div>
        <list>
            <list-item v-for="(item, index) of total">{{ index+1 }} 列表内容</list-item>
        </list>
        <template slot="infinite">
            <span class="vx-pull-ptr-loading">玩命加载中…</span>
            <span class="vx-pull-ptr-nomore">- 😁最多加载100条数据 -</span>
        </template>
    </pull>
</page-demo>
</template>

<script>
export default {
    name: 'demo-pull',
    data () {
        return {
            total: 10,
            diff: 0
        }
    },
    methods: {
        touchTranslate (startTouch, endTouch) {
            // const diff = Math.pow(endTouch.pageY - startTouch.pageY, 0.8)
            const diff = (endTouch.pageY - startTouch.pageY) * 0.3
            const ptrRefreshHeight = this.$refs.ptrRefresh.parentElement.clientHeight
            this.diff = diff <= ptrRefreshHeight ? diff : ptrRefreshHeight
            this.diff *= 0.75
            return diff
        },
        onRefresh ({ done }) {
            console.log('refresh...')
            setTimeout(() => {
                this.total = 10
                done()
            }, 500)
        },
        onInfinite ({ done }) {
            console.log('load...')
            setTimeout(() => {
                this.total += 10
                let nomore = false
                if (this.total >= 100) {
                    nomore = true
                }
                done(nomore)
            }, 500)
        }
    }
}
</script>

<style lang="sass">
.ptr-refresh {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
