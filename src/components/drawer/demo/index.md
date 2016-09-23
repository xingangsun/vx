Drawer(抽屉)
-
### <a name="props">Props</a>
|名称|类型|默认值|说明|
|---|---|---|---|
|position|`String`|`'left'`|抽屉所在的位置。可选值： `'left'` \| `'right'` \| `'top'` \| `'bottom'`|
|isOpen|`Boolean`|<i>required</i>|抽屉是否打开。父组件通过修改该属性值控制抽屉开关|
|showOverlay|`Boolean`|`true`|是否显示遮罩层。如果为`true`，则点击遮罩层会触发`overlay-click`事件。为防止点透问题，在组件内部通过在遮罩层上绑定`touchstart`，并阻止了默认行为

### <a name="events">Events</a>
|描述|参数|说明|
|---|---|---|
|`vm.$emit('overlay-click', $event)`|<li>`$event` touchstart事件对象|父组件可以监听该事件对点击遮罩操作进行处理|

### <a name="slots">Slots</a>
|名称|说明|
|---|---|
|sidebar|抽屉里的内容|
|*default*|主要内容|
