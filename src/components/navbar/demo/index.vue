<template>
<page class="demo-navbar" title="Navbar(导航栏)">
    <navbar :is-light="true">
        <icon slot="left" type="arrow-left"> Back</icon>
        <span>详情</span>
        <icon slot="right" type="user"></icon>
        <icon slot="right" type="search"></icon> 
        <icon slot="right" type="plus"></icon> 
    </navbar>

    <navbar :is-light="false" title="爱理财首页">
        <icon slot="right" type="ellipsis"></icon>
    </navbar>
</page>
</template>

<script>
export default {

}
</script>

<style lang="sass">
.demo-navbar {

}
</style>
