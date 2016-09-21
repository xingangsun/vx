<template>
<div class="component-list">
    <list v-for="component of components">
        <template slot="header">{{ component.cls }}</template>
        <router-link v-if="!item.list" v-for="item of component.list" :to="item.link" @click.native="$emit('link-click', $event)">
            <list-item :arrow="true">{{ item.name }}<template slot="extra.brief">{{ item.zhName }}</template></list-item>
        </router-link>
        <list-item v-else>
            <list>
                <template slot="header">{{ item.name }}</template>
                <router-link v-for="item2 of item.list" :to="item2.link" @click.native="$emit('link-click', $event)">
                    <list-item :arrow="true">{{ item2.name }}<template slot="extra.brief">{{ item2.zhName }}</template></list-item>
                </router-link>
            </list>
        </list-item>
    </list>
</div>
</template>

<script>
import { List, ListItem } from '../components'

// 组件配置
const components = [{
    cls: 'UI Bars',
    list: [{
        name: 'Navbar',
        zhName: '顶部导航',
        link: '/navbar/demo'
    }]
}, {
    cls: 'UI Controls',
    list: [{
        name: 'InputItem',
        zhName: '文本输入',
        link: '/'
    }]
}, {
    cls: 'UI Views',
    list: [{
        name: 'ActionSheet',
        zhName: '动作面板',
        link: '/'
    }, {
        name: 'Card',
        zhName: '卡片',
        link: '/'
    }, {
        name: 'Drawer',
        zhName: '抽屉',
        link: '/drawer/demo'
    }, {
        name: '列表',
        list: [{
            name: 'List',
            zhName: '列表',
            link: '/'
        }, {
            name: 'ListItem',
            zhName: '列表项',
            link: '/'
        }]
    }, {
        name: 'Model',
        zhName: '对话框',
        link: '/'
    }]
}, {
    cls: 'Other',
    list: [{
        name: 'Icon',
        zhName: '图标',
        link: '/'
    }]
}]

export default {
    components: {
        List,
        ListItem
    },
    data () {
        return {
            components
        }
    }
}
</script>

<style lang="sass">

</style>
