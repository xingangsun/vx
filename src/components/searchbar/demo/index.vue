<template>
<page-demo class="demo-searchbar" title="Searchbar(搜索栏)">
    <list>
        <template slot="header">基本</template>

        <searchbar v-model="keyword" placeholder="请输入关键字" :show-clear="true" btn="取消"></searchbar>
    </list>
    <list>
        <template slot="header">定制按钮文本</template>
        
        <searchbar v-model="keyword" placeholder="请输入关键字" :show-clear="true" @click="onSearch">
            <template slot="btn">搜索一下</template>
        </searchbar>
    </list>
    <list>
        <template slot="header">禁用</template>

        <searchbar v-model="keyword" placeholder="请输入关键字" :show-clear="true" :disabled="true"></searchbar>
    </list>
</page-demo>
</template>

<script>
export default {
    name: 'demo-searchbar',
    data () {
        return {
            keyword: ''
        }
    },
    methods: {
        onSearch (event) {
            console.log('doSearch', event)
            alert(this.keyword)
        }
    }
}
</script>

<style lang="sass">
.demo-searchbar {

}
</style>
