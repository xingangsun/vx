<template>
<page class="demo-list-item" title="ListItem(列表项)">
    <list>
        <template slot="header">基本文本展示</template>
        
        <list-item>基本文字点击无反馈，文字超出就隐藏了</list-item>
        <list-item :is-wrap="true">文字超出就换行了文字超出就换行了文字超出就换行了文字超出就换行了文字超出就换行了文字超出就换行了</list-item>
        <list-item>
            主要内容文字
            <template slot="extra">右边文字</template>
        </list-item>
    </list>

    <list>
        <template slot="header">缩略图，箭头</template>
        
        <list-item :arrow="true">
            <img slot="thumb" src="https://zos.alipayobjects.com/rmsportal/zotStpFiYpNtZNl.png">缩略图
        </list-item>
        <list-item :arrow="'down'">
            <img slot="thumb" src="https://zos.alipayobjects.com/rmsportal/zotStpFiYpNtZNl.png">缩略图
        </list-item>
    </list>

    <list>
        <template slot="header">多行，对齐，右边内容</template>
        
        <list-item valign="top" :arrow="true">
            垂直顶部对齐
            <span slot="extra">右边内容</span>
            <span slot="extra.brief">右边辅助内容</span>
        </list-item>
        <list-item :arrow="true">
            默认垂直居中对齐
            <span slot="brief">左边辅助内容</span>
            <span slot="extra.brief">右边辅助内容</span>
        </list-item>
        <list-item valign="bottom" :arrow="true">
            垂直底部对齐
            <span slot="extra">右边内容</span>
            <span slot="extra.brief">右边辅助内容</span>
        </list-item>
        <list-item :arrow="true" :is-wrap="true">
            默认垂直居中对齐超出换行
            <span slot="extra">右边内容</span>
            <span slot="extra.brief">右边辅助内容</span>
        </list-item>
        <list-item valign="bottom" :arrow="true">
            <span>左边内容</span>
            <span slot="brief">左边辅助内容超出肯定要省略的了</span>
            <span slot="extra">右边辅助内容 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAm0lEQVR4Ae2Whw0DMQwD5Q24gfbfRTslaPlGCGb6vyAe2tdzty1uArAlyz2RMgJLoggsSTUBfUwCSkD49jKCFnhgYegCaZgSIAGlokCHBDk1BR6YspMteHIfRqWbhMc714Y/aMF/Bdgw5mJh5HgmU2u2qITatEAQCEvCe53cp+v3T9ct0E92HH01bcGlBIEVRfDWMGUBU0aQ04I7BEwkp1QhR1sAAAAASUVORK5CYII="></span>
        </list-item>
    </list>
</page>
</template>

<script>
export default {

}
</script>

<style lang="sass">
.demo-list-item {
    img {
        width: 40px;
        height: 40px;
        vertical-align: text-bottom;
    }
}
</style>
