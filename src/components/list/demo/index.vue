<template>
<page-demo class="demo-list" title="List(列表)">
    <list>
        <template slot="header">列表头部</template>
        <main>
            列表主体内容
        </main>
        <template slot="footer">列表底部</template>
    </list>
</page-demo>
</template>

<script>
export default {
    name: 'demo-list'
}
</script>

<style lang="sass">
.demo-list {
    
    main {
        padding: 30px;
    }
}
</style>
