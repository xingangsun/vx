Pull(刷新加载)
-
### <a name="props">Props</a>
|名称|类型|默认值|说明|
|---|---|---|---|
|touchTranslate|`Function`<li>`startTouch`触摸起点<li>`endTouch`触摸终点|[返回触摸在Y轴分量*0.3](#touchTranslate-default)|触摸转换为下拉距离。使用该函数可以自定义触摸到下拉高度的转换，也可以自定义下拉指示器的效果(参见demo中的“变”字效果)|

<a name="touchTranslate-default"></a>touchTranslate的默认值：

```
function (startTouch, endTouch) {
    // return Math.pow(endTouch.clientY - startTouch.clientY, 0.8)
    return (endTouch.clientY - startTouch.clientY) * 0.3
}
```

### <a name="events">Events</a>
|描述|参数|说明|
|---|---|---|
|refresh|`Object`<li>`status`下拉刷新状态<li>`isInfiniteLoading`是否正在加载<li>`done`刷新完成后的回调`Function`<ul><li>`nomore`是否没有更多。默认`false`|监听触发刷新事件|
|infinite|`Object`*同refresh参数*|监听触发无限加载事件|

### <a name="slots">Slots</a>
|名称|说明|
|---|---|
|refresh|刷新指示器。可以自定义指示器样式|
|infinite|无线刷新指示器。可以自定义指示器样式|
|*default*|内容|

***
### <a name="usage">Usage</a>
+ 通过slots和touchTranslate属性可以修改指示器默认文字和样式  
	
	示例：通过slots修改刷新和加载指示器的提示文字

 	```
    <template slot="refresh">
		<div class="vx-pull-ptr-arrow"></div>
		<div class="vx-pull-ptr-preloader"></div>
		<span class="vx-pull-ptr-pulldown">你正在下拉</span>
		<span class="vx-pull-ptr-release">你可以松开了</span>
		<span class="vx-pull-ptr-refreshing">玩命刷新中…</span>
	</template>
	```
	```
	<template slot="infinite">
	    <span class="vx-pull-ptr-loading">正在加载更多数据…</span>
	    <span class="vx-pull-ptr-nomore">没有更多数据</span>
	</template>
	```
