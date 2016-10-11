InputItem(文本输入项)
-
### <a name="props">Props</a>
|名称|类型|默认值|说明|
|---|---|---|---|
|label|`String`|`''`|标签文本。也可以通过slot设置HTML文本|
|labelSize|`Number`|`0`|标签宽度，一般用来对其多个输入项。默认支持（2-5）个字符宽的样式，不指定则为标签文本内容的宽度|
|type|`String`|`text`|input输入框的`type`字段值。仅在**多行**文本输入模式下有效|
|value|`String`|`''`|input输入框的初始值。<br>**注意：**大多数情况你都应该用v-model进行数据绑定，除非你不希望用户修改输入的值|
|placeholder|`String`|`''`|input输入框的placeholer值|
|disabled|`Boolean`|`false`|是否禁用|
|readonly|`Boolean`|`false`|是否只读|
|maxlength|`Number`|`-1`|最大输入长度。必须大于等于-1，值为-1时无限制|
|showClear|`Boolean`|`false`|是否显示清除按钮。如果为`true`，清除按钮只在输入框值不为空并且获焦情况下显示|
|showError|`Boolean`|`false`|是否显示报错样式|
|multiline|`Boolean`\|`Number`|`false`|是否为多行输入模式。值为`true`时为多行输入`<textarea>`，multiline值为`Number`类型时将作为textarea的rows属性|
|showCount|`Boolean`|`false`|是否显示字数统计。仅在**多行**文本输入模式下有效|
|autoHeight|`Boolean`|`false`|是否自动高度。仅在**多行**文本输入模式下有效|

### <a name="events">Events</a>
|描述|参数|说明|
|---|---|---|
|`vm.$emit('input', value, event)`|<li>`value` 用户输入的值<li>`event` 事件对象|组件通过该事件进行双向数据绑定。参见：[使用自定义事件的表单输入组件](http://rc.vuejs.org/guide/components.html#Form-Input-Components-using-Custom-Events)|
|`vm.$emit('change', value, event)`|<li>`value` 变化后的新值<li>`event`事件对象|值改变后触发|
|`vm.$emit('focus', event)`|<li>`event`事件对象|输入框获焦时触发|
|`vm.$emit('blur', event)`|<li>`event`事件对象|输入框失焦时触发|
|`vm.$emit('click', event)`|<li>`event`事件对象|输入框被点击时触发|

### <a name="slots">Slots</a>
|名称|说明|
|---|---|
|label|标签插值。主要用于自定义HTML文本标签|
|extra|右侧额外内容|

***
### <a name="usage">Usage</a>
+ 你应该必须通过v-model将输入项的值与data属性值进行双向数据绑定
+ 因为组件对input输入框进行了封装，所以除了上述提供的事件，你不能通过Vue语法直接对input输入框绑定事件。你可以在父组件中通过vm.$refs.child.$refs.input获得input输入框元素，然后通过原生API操作：

	```jsx
	<input-item ref="inputItem"></input-item>
	
	new Vue({
		mounted () {
	        this.onInputClick = (event) => {
	            console.log('clicked', event)
	        }
	        this.$refs.inputItem.$refs.input.addEventListener('click', this.onInputClick)
	    },
	    beforeDestroy () {
	        this.$refs.inputItem.$refs.input.removeEventListener('click', this.onInputClick)
	    }
	})
	```
