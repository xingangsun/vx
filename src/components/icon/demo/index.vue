<template>
<page-demo class="demo-icon" title="Icon(图标)">
    <icon type="android">安卓</icon>
    <icon type="apple">苹果</icon>
    <icon type="like"> ❤️</icon>
    <icon type="loading"> ➕</icon>
    <icon type="question-circle-o"> ❓</icon>
</page-demo>
</template>

<script>
export default {
    name: 'demo-icon'
}
</script>

<style lang="sass">
.demo-icon {

    .vx-page-body {
        display: flex;
        flex-flow: row wrap;
        align-content: flex-start;

        .vx-if {
            width: 25%;
            font-size: 40px;
            text-align: center;
        }
    }
}
</style>
