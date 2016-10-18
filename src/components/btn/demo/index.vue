<template>
<page-demo class="demo-btn" title="Btn(按钮)">
    <btn type="default">default 按钮</btn>
    <btn type="primary">primary 按钮</btn>
    <btn type="outline">outling 按钮</btn>
    <btn type="outline" :disabled="loading" @touchstart.native="submit">
        <icon v-if="loading" type="loading"> 正在提交…</icon>
        <span v-else>提 交</span>
    </btn>
    <btn type="primary" :disabled="true">disabled 按钮</btn>
    <btn type="primary" size="inline">primary inline 按钮</btn>
    <btn type="primary" size="sm">primary sm 按钮</btn>
    <btn type="outline" size="inline">outling inline 按钮</btn>
    <btn type="outline" size="sm">outling sm 按钮</btn>
</page-demo>
</template>

<script>
export default {
    name: 'demo-btn',
    beforeRouteLeave (to, from, next) {
        console.log(to, from)
        if (confirm('离开？')) {
            next()
        } else {
            this.$router.go(1)
        }
    },
    data () {
        return {
            loading: false
        }
    },
    methods: {
        submit () {
            this.loading = true
            setTimeout(() => (this.loading = false), 1500)
        }
    }
}
</script>

<style lang="sass">
.demo-btn {
    // display: flex;
    
    .vx-page-body {
        padding: 16px;

        button {
            margin-bottom: 16px;
        }
    }
}
</style>
