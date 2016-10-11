<template>
<div class="tabbar-home">
    <list>
        <list-item v-for="n of 100">首页{{ n }}</list-item>
    </list>
</div>
</template>

<script>
export default {
    name: 'tabbar-home'
}
</script>

<style lang="sass">
.tabbar-home {
    
}
</style>
