<template>
<div class="demo-components">
    <list v-for="component of components">
        <template slot="header">{{ component.cls }}</template>
        <list-item v-if="!item.list" v-for="item of component.list" :arrow="true" @click.native="go({ name: item.name })">
            {{ item.name }}<template slot="extra.brief">{{ item.zhName }}</template>
        </list-item>
        <list-item v-else>
            <list>
                <template slot="header">{{ item.name }}</template>
                <list-item v-for="item2 of item.list" :arrow="true" @click.native="go({ name: item2.name })">
                    {{ item2.name }}<template slot="extra.brief">{{ item2.zhName }}</template>
                </list-item>
            </list>
        </list-item>
    </list>
</div>
</template>

<script>
// 组件配置
const components = [{
    cls: 'UI Bars',
    list: [{
        name: 'Navbar',
        zhName: '导航栏'
    }, {
        name: 'Searchbar',
        zhName: '搜索栏'
    }, {
        name: 'Tabbar',
        zhName: '标签栏'
    }]
}, {
    cls: 'UI Controls',
    list: [{
        name: 'Btn',
        zhName: '按钮'
    }, {
        name: 'InputItem',
        zhName: '文本输入'
    }, {
        name: 'Pull',
        zhName: '刷新加载'
    }, {
        name: 'Swiper',
        zhName: '触摸滑动'
    }]
}, {
    cls: 'UI Views',
    list: [{
        name: 'ActionSheet',
        zhName: '动作面板'
    }, {
        name: 'Card',
        zhName: '卡片'
    }, {
        name: 'Drawer',
        zhName: '抽屉'
    }, {
        name: '列表',
        list: [{
            name: 'List',
            zhName: '列表'
        }, {
            name: 'ListItem',
            zhName: '列表项'
        }]
    }, {
        name: 'Modal',
        zhName: '对话框'
    }, {
        name: 'Page',
        zhName: '页面'
    }, {
        name: 'Toast',
        zhName: '轻提示'
    }]
}, {
    cls: 'Other',
    list: [{
        name: 'Icon',
        zhName: '图标'
    }]
}]

export default {
    name: 'components',
    data () {
        return {
            components
        }
    },
    methods: {
        go (location) {
            this.eventBus.$emit('drawer-open-change', false)
            this.$router.push(location)
        }
    }
}
</script>

<style lang="sass">

</style>
