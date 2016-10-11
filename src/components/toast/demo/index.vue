<template>
<page-demo class="demo-toast" title="Toast(轻提示)">
    <toast :show="show" @hide="onHide">
        <template v-if="type === 'text'">这是一个toast提示！</template>
        <icon v-if="type === 'loading'" type="loading"> 正在加载中…</icon>
        <template v-if="type === 'frown'">
            <icon type="frown"></icon><br>网络连接失败
        </template>
    </toast>
    <btn type="outline" @click.native="showToast('text')">纯文字提示</btn>
    <btn type="outline" @click.native="showToast('loading')">加载中提示</btn>
    <btn type="outline" @click.native="showToast('frown')">网络连接失败</btn>
</page-demo>
</template>

<script>
export default {
    name: 'demo-toast',
    data () {
        return {
            show: false,
            type: 'text'
        }
    },
    methods: {
        showToast (type) {
            this.type = type
            this.show = true
        },
        onHide () {
            this.show = false
        }
    }
}
</script>

<style lang="sass">
.demo-toast {
    
    .vx-page-body {
        padding: 16px;

        button {
            margin-bottom: 16px;
        }

        .vx-if {
            font-size: 55px;
        }
    }
}
</style>
