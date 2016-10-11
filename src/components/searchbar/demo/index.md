Searchbar(搜索栏)
-
### <a name="props">Props</a>
|名称|类型|默认值|说明|
|---|---|---|---|
|btn|`String`|`''`|标签文本。也可以通过slot设置HTML文本|
|value|`String`|`''`|input输入框的初始值。<br>**注意：**大多数情况你都应该用v-model进行数据绑定，除非你不希望用户修改输入的值|
|placeholder|`String`|`''`|search输入框的placeholer值|
|disabled|`Boolean`|`false`|是否禁用|
|readonly|`Boolean`|`false`|是否只读|
|maxlength|`Number`|`-1`|最大输入长度。必须大于等于-1，值为-1时无限制|
|showClear|`Boolean`|`false`|是否显示清除按钮。如果为`true`，清除按钮只在输入框值不为空并且获焦情况下显示|

### <a name="events">Events</a>
|描述|参数|说明|
|---|---|---|
|`vm.$emit('input', value, event)`|<li>`value` 用户输入的值<li>`event` 事件对象|组件通过该事件进行双向数据绑定。参见：[使用自定义事件的表单输入组件](http://rc.vuejs.org/guide/components.html#Form-Input-Components-using-Custom-Events)|
|`vm.$emit('change', value, event)`|<li>`value` 变化后的新值<li>`event`事件对象|值改变后触发|
|`vm.$emit('focus', event)`|<li>`event`事件对象|输入框获焦时触发|
|`vm.$emit('blur', event)`|<li>`event`事件对象|输入框失焦时触发|
|`vm.$emit('click', event)`|<li>`event`事件对象|点击搜索按钮是触发|

### <a name="slots">Slots</a>
|名称|说明|
|---|---|
|btn|按钮内容|

***
### <a name="usage">Usage</a>
+ 你可以通过vm.$refs.search引用到search输入框，可以通过vm.$refs.btn引用到搜索按钮元素
