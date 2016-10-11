<template>
<page-demo class="demo-navbar" title="Navbar(导航栏)">
    <navbar :is-light="true">
        <icon slot="left" type="arrow-left"> Back</icon>
        <span>详情</span>
        <icon slot="right" type="user"></icon>
        <icon slot="right" type="search"></icon> 
        <icon slot="right" type="plus"></icon> 
    </navbar>

    <navbar :is-light="false" title="首页">
        <icon slot="right" type="ellipsis"></icon>
    </navbar>
</page-demo>
</template>

<script>
export default {
    name: 'demo-navbar'
}
</script>

<style lang="sass">
.demo-navbar {

}
</style>
