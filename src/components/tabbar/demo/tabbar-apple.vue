<template>
<div class="tabbar-apple">
    <div>
        <list v-for="n of 100">
            <template slot="header">基本文本展示{{ n }}</template>
            
            <list-item>基本文字点击无反馈，文字超出就隐藏了</list-item>
            <list-item :is-wrap="true">文字超出就换行了文字超出就换行了文字超出就换行了文字超出就换行了文字超出就换行了文字超出就换行了</list-item>
            <list-item>
                主要内容文字
                <template slot="extra">右边文字</template>
            </list-item>
        </list>
    </div>
</div>
</template>

<script>
export default {
    name: 'tabbar-apple'
}
</script>

<style lang="sass">
.tabbar-apple {
    
}
</style>
