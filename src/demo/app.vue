<template>
<div class="app">
    <!-- 侧栏菜单 -->
    <drawer :is-open="isSideDrawerOpen" :show-overlay="false" @overlay-click="changeSideDrawerOpen(false)">
        <components slot="sidebar"></components>
        <!-- 页面视图 -->
        <router-view></router-view>
    </drawer>
    <!-- 页面视图 -->
    <!-- <router-view></router-view> -->
</div>
</template>

<script>
/* document.body.addEventListener('touchstart', function (e) {
    e.stopPropagation()
}, false)

document.body.addEventListener('touchmove', function (e) {
    e.stopPropagation()
}, false)*/
// https://github.com/joelambert/ScrollFix/blob/master/scrollfix.js
(function (global) {
    // Stores the Y position where the touch started
    var startY = 0

    // Store enabled status
    // var enabled = false

    var handleTouchmove = function (evt) {
        // Get the element that was scrolled upon
        var el = evt.target
        // console.log('el---->', el)

        // Check all parent elements for scrollability
        while (el !== document.body) {
            // Get some style properties
            var style = window.getComputedStyle(el)

            if (!style) {
                // If we've encountered an element we can't compute the style for, get out
                break
            }

            // Ignore range input element
            if (el.nodeName === 'INPUT' && el.getAttribute('type') === 'range') {
                return
            }

            var scrolling = style.getPropertyValue('-webkit-overflow-scrolling')
            var overflowY = style.getPropertyValue('overflow-y')
            var height = parseInt(style.getPropertyValue('height'), 10)

            // Determine if the element should scroll
            var isScrollable = scrolling === 'touch' && (overflowY === 'auto' || overflowY === 'scroll')
            var canScroll = el.scrollHeight > el.offsetHeight

            if (isScrollable && canScroll) {
                // Get the current Y position of the touch
                var curY = evt.touches ? evt.touches[0].screenY : evt.screenY

                // Determine if the user is trying to scroll past the top or bottom
                // In this case, the window will bounce, so we have to prevent scrolling completely
                var isAtTop = (startY <= curY && el.scrollTop === 0)
                var isAtBottom = (startY >= curY && el.scrollHeight - el.scrollTop === height)
                // Stop a bounce bug when at the bottom or top of the scrollable element
                if (isAtTop || isAtBottom) {
                    console.log('阻止默认了', el)
                    el.scrollTop -= 1
                    evt.preventDefault()
                    evt.stopPropagation()
                }

                // No need to continue up the DOM, we've done our job
                return
            }

            // Test the next parent
            el = el.parentNode
        }

        // Stop the bouncing -- no parents are scrollable
        evt.preventDefault()
    }

    var handleTouchstart = function (evt) {
        // Store the first Y position of the touch
        startY = evt.touches ? evt.touches[0].screenY : evt.screenY
    }

    var enable = function () {
        // Listen to a couple key touch events
        document.body.addEventListener('touchstart', handleTouchstart, false)
        document.body.addEventListener('touchmove', handleTouchmove, false)
        // enabled = true
    }

   /* var disable = function () {
        // Stop listening
        window.removeEventListener('touchstart', handleTouchstart, false)
        window.removeEventListener('touchmove', handleTouchmove, false)
        enabled = false
    }

    var isEnabled = function () {
        return enabled
    }*/

    // Enable by default if the browser supports -webkit-overflow-scrolling
    // Test this by setting the property with JavaScript on an element that exists in the DOM
    // Then, see if the property is reflected in the computed style
    var testDiv = document.createElement('div')
    document.documentElement.appendChild(testDiv)
    testDiv.style.WebkitOverflowScrolling = 'touch'
    var scrollSupport = 'getComputedStyle' in window && window.getComputedStyle(testDiv)['-webkit-overflow-scrolling'] === 'touch'
    document.documentElement.removeChild(testDiv)

    if (scrollSupport) {
        console.log('=======scrollSupport======')
        enable()
    }
}(this))

if (window.indexedDB) {
    console.log("I'm in WKWebView!")
} else {
    console.log("I'm in UIWebView")
}
export default {
    data () {
        return {
            isSideDrawerOpen: false // 侧栏菜单是否打开
        }
    },
    created () {
        this.eventBus.$on('drawer-open-change', this.changeSideDrawerOpen)
        this.eventBus.$on('drawer-open-toggle', this.toggleSideDrawerOpen)
    },
    methods: {
        toggleSideDrawerOpen () {
            this.isSideDrawerOpen = !this.isSideDrawerOpen
        },
        changeSideDrawerOpen (isOpen) {
            this.isSideDrawerOpen = isOpen
        }
    }
}
</script>

<style lang="sass">
 @import './site/style/global.scss'; // 全局样式，只引入一次
 @import './src/assets/fonts/iconfont.scss'; // 全局样式，只引入一次
 @import './site/style/base.scss';

::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: #F5F5F5;
    width: 0;
    display: none;
}

/* ::-webkit-scrollbar:window-inactive {
    display: none;
} */

::-webkit-scrollbar-thumb {
    min-height: 50px;
    border-radius: 10px;
    background-color: $brand-primary;
    background-image: linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);
}

::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
}
.app {
    height: 100%;
    position: relative;
    overflow: hidden;

    > .vx-drawer {
        height: 100%;

        > .vx-drawer-sidebar {
            top: $navbar-height;
            zoom: .8; // just zoom-down a little
            width: 70%;
        }

        > .vx-drawer-overlay {
            top: $navbar-height;
        }
    }
}
</style>
