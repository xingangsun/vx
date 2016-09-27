<template>
<page class="demo-pull" title="Pull(刷新加载)">
    <pull :refresh="refresh" :load="load">
        <list>
            <list-item v-for="(item, index) of total">{{ index }}列表内容</list-item>
        </list>
    </pull>
</page>
</template>

<script>
export default {
    data () {
        return {
            total: 50
        }
    },
    methods: {
        refresh () {
            console.log('refresh')
            // this.total = 5
        },
        load () {
            console.log('load')
            // this.total += 5
        }
    }
}
</script>

<style lang="sass">

</style>
