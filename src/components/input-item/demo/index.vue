<template>
<page class="demo-input-item" title="InputItem(文本输入项)">
    <list>
        <template slot="header">
            标签，标签宽度，无标签，占位文本，类型，默认值，清除按钮，报错样式
        </template>

        <input-item label="用户名" :label-size="4" v-model="username" 
        :show-clear="true" placeholder="请输入用户名"></input-item>
        <input-item label="密码" :label-size="4" v-model="password" 
        :show-clear="true" placeholder="请输入密码"></input-item>
        <input-item label="确认密码" :label-size="4" v-model="password2" 
        type="password" :show-clear="true" :show-error="true"
        placeholder="请输入确认密码"></input-item>
        <input-item :show-clear="true" :show-error="true" 
        placeholder="无标签" v-model="other"></input-item>
    </list>

    <list>
        <template slot="header">只读，禁用</template>
        
        <input-item label="姓名" value="不可编辑" :readonly="true"></input-item>
        <input-item label="姓名" :disabled="true"></input-item>
    </list>

    <list>
        <template slot="header">标签自定义，右侧显示额外内容</template>
        
        <input-item label="姓名" :label-size="1" placeholder="关键词">
            <label slot="label">
                <img slot="label" src="https://os.alipayobjects.com/rmsportal/zumwvwrngNMGSWe.png">搜索
            </label>
        </input-item>
        <input-item label="价格" placeholder="0.00">
            <template slot="extra">元</template>
        </input-item>
        <input-item label="邮箱地址">
            <div slot="extra">@qq.com</div>
        </input-item>
        <input-item label="上传照片" type="file" value="">
            <img slot="extra" src="https://avatars0.githubusercontent.com/u/11802814" alt="头像">
        </input-item>
    </list>

    <list>
        <template slot="header">标签宽度，标签宽度默认只提供（2-5）个字符宽</template>
        
        <input-item label="姓名" :label-size="2"></input-item>
        <input-item label="手机号" :label-size="3"></input-item>
        <input-item label="确认密码" :label-size="4"></input-item>
        <input-item label="身份证号码" :label-size="5"></input-item>
        <input-item label="超过五个字符" :label-size="5"></input-item>
    </list>

    <list>
        <template slot="header">其他事件绑定</template>
        
        <input-item label="click事件" ref="inputItem" :value="inputItemValue"></input-item>
    </list>
</page>
</template>

<script>
export default {
    data () {
        return {
            username: '小亲冈',
            password: '',
            password2: '',
            other: '',

            inputItemValue: ''
        }
    },
    mounted () {
        this.onInputItemClick = (event) => {
            console.log('clicked', event)
            this.inputItemValue = '你点击了我'
        }
        this.$refs.inputItem.$refs.input.addEventListener('click', this.onInputItemClick)
    },
    beforeDestroy () {
        this.$refs.inputItem.$refs.input.removeEventListener('click', this.onInputItemClick)
    }
}
</script>

<style lang="sass">
.demo-input-item {
    img {
        width: 40px;
        height: 40px;
        vertical-align: text-bottom;
    }
}
</style>
