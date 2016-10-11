<template>
<page-demo class="demo-page" title="Page(页面)">
    <page>
        <navbar slot="header" :is-light="true">
            <icon slot="left" type="arrow-left"> 返回</icon>
            <span>详情页</span>
            <icon slot="right" type="plus"></icon> 
        </navbar>
        <search-bar slot="subheader">搜索栏</search-bar>
        <list>
            <list-item v-for="n of 100">列表项目{{ n }}</list-item>
        </list>
        <btn slot="footer" type="primary">标签栏</btn>
    </page>
</page-demo>
</template>

<script>
export default {
    name: 'demo-page'
}
</script>

<style lang="sass">
.demo-page {

}
</style>
