<template>
<div class="tabbar-heart">
    <pull @refresh="onRefresh" @infinite="onInfinite">
        <list>
            <list-item v-for="(item, index) of total">{{ index+1 }} 列表内容</list-item>
        </list>
    </pull>
</div>
</template>

<script>
export default {
    name: 'tabbar-heart',
    data () {
        return {
            total: 10
        }
    },
    methods: {
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
                this.total += 20
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
.tabbar-heart {
    width: 100%;
    height: 100%;
}
</style>
