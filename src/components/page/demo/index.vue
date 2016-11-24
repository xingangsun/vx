<template>
<page-demo class="demo-page" title="Page(页面)">
    <page>
        <navbar slot="header" :is-light="true">
            <icon slot="left" type="arrow-left"> 返回</icon>
            <span>详情页</span>
            <icon slot="right" type="plus"></icon> 
        </navbar>
        <searchbar slot="subheader" v-model="keyword" placeholder="请输入关键字" :show-clear="true" btn="取消"></searchbar>
        <list>
            <div>
                <list-item v-for="n of 100">列表项目{{ n }}</list-item>
            </div>
        </list>
        <btn slot="footer" type="primary">标签栏</btn>
    </page>
</page-demo>
</template>

<script>
export default {
    name: 'demo-page',
    data () {
        return {
            keyword: ''
        }
    }
}
</script>

<style lang="sass">
.demo-page {

}
</style>
