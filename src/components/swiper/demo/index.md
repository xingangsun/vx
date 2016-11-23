Swiper(触摸滑动)
-
### <a name="props">Props</a>
|名称|类型|默认值|说明|
|---|---|---|---|
|direction|`String`|`horizontal`|拖动方向*(非响应)*。可设置`horizontal(水平)`\|`vertical(垂直)`|
|threshold|`Number`|`30`|拖动最小临界值*(响应)*|
|touchAngle|`Number`|`45`|允许拖动的角度值*(响应)*。touchAngle为x轴与点(x,y)的<=90deg的夹角。在拖动过程中超出该范围则拖动被取消|
|loop|`Boolean`|`false`|是否为环路模式*(非响应)*|
|autoplay|`Boolean`\|`Number`|`false`|自动播放的间隔时间(ms)*(响应)*。作为`Boolean`类型**必须**为`false`值，`Number`类型做值**必须**`>=500`|
|speed|`Number`|`300`|过渡动画时间(ms)|
|showPagination|`Boolean`|`false`|是否显示分页器*(响应)*|
|paginationClickable|`Boolean`|`false`|分页是否可点击*(响应)*。默认行为是滚动到对应的slide|
|paginationBulletRender|`Function`|返回`空格(&nbsp;)`|允许完全自定义分页器的指示点*(响应)*。接受指示点索引作为参数|


### <a name="events">Events</a>
|描述|参数|说明|
|---|---|---|
|init||swiper初始化完成触发|
|slide-start|`{previousIndex, activeIndex}`<li>先前slide索引<li>当前slide索引|滑块释放时触发slide切换时触发|
|slide-move|`event, {touchDistance, touchAngle}`<li>原生的touchmove事件对象<li>触摸距离，触摸角度|拖动slide时触发|
|slide-move-opposite|同*slide-move参数*|不符合拖动slide条件时触发。如果在拖动过程中触发，则本次拖动会被取消|
|slide-end|同*slide-start参数*|slide切换结束时触发|
|pagination-click|`event, index`<li>点击事件对象<li>被点击的分页点索引|分页点被点击时触发|
|touchstart|`event`<li>原生事件对象|触摸开始时触发|
|touchmove|`event`<li>原生事件对象|触摸滑动时触发|
|touchend|`event`<li>原生事件对象|触摸结束时触发|

### <a name="slots">Slots</a>
|名称|说明|
|---|---|
|*defult*|swiper的内容。**注意：**swiper必须由SwiperSlide组件作为**直接**子组件，并用`v-for`指令输出|

***
### <a name="usage">Usage</a>
+ 可以通过ref属性获得swiper组件实例调用API
+ *非响应性*属性在组件初始化完成后改变不能得到预期的效果
