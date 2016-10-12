<template>
<form class="vx-searchbar" :class="{ 'vx-searchbar-focus': hasFocus }" @submit.prevent>
    <div class="vx-searchbar-input">
        <input ref="search" class="vx-searchbar-val" type="search" :value="value"
        :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :maxlength="maxlength"
        @input="onInput" @change="onChange" @focus="onFocus" @blur="onBlur" @click.self="onClick">
        <div class="vx-searchbar-clear" v-if="showClear && !readonly && value" @touchstart="onClearTouchstart"></div>
    </div>
    <div class="vx-searchbar-btn" @click="onBtnClick($event)">
        <slot name="btn">{{ btn }}</slot>
    </div>
</form>
</template>

<script>
export default {
    name: 'searchbar',
    props: {
        btn: {
            type: String,
            default: ''
        },
        value: { // you should always use v-model in the parent component instead of directly using the 'value'. see: http://rc.vuejs.org/guide/components.html#Form-Input-Components-using-Custom-Events
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        maxlength: {
            type: Number,
            validator (maxlength) {
                return maxlength >= -1
            },
            default: -1
        },
        showClear: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            hasFocus: false // 是否已经获得焦点
        }
    },
    methods: {
        onInput (event) {
            this.$emit('input', event.target.value, event)
        },
        onChange (event) {
            this.$emit('change', event.target.value, event)
        },
        onFocus (event) {
            this.hasFocus = true
            this.$emit('focus', event)
        },
        onBlur (event) {
            this.hasFocus = false
            this.$emit('blur', event)
        },
        onClearTouchstart (event) { // you may cant use click event here
            this.$emit('input', '', event)
        },
        onBtnClick (event) {
            this.$emit('click', event)
        },
        onClick (event) {
            setTimeout(() => { // scroll to visible
                event.target.scrollIntoViewIfNeeded ? event.target.scrollIntoViewIfNeeded() : event.target.scrollIntoView(false)
            }, 500)
            this.$emit('input-click', event)
        }
    }
}
</script>

<style lang="sass">
@import './site/style/base.scss';

.vx-searchbar {
    display: flex;
    align-items: center;
    height: $navbar-height;
    padding: 0 $h-spacing-md;
    background-color: $search-bar-bg-color;
    overflow: hidden;
}

.vx-searchbar-input {
    width: 100%;
    flex-shrink: 1;
    height: $search-bar-input-height;
    position: relative;
}

.vx-searchbar-val {
    width: 100%;
    height: $search-bar-input-height;
    line-height: $search-bar-input-height;
    border-radius: $radius-sm;
    padding-left: $h-spacing-lg + $icon-size-xxs + $h-spacing-sm;
    padding-right: $h-spacing-lg + $icon-size-xxs + $h-spacing-sm;
    background-color: $bg-base;
    font-size: $input-font-size;
    color: $color-text-base;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14'%3E%3Cpath fill='%23ccc' d='M5 1c2.2 0 4 1.8 4 4S7.2 9 5 9 1 7.2 1 5s1.8-4 4-4m0-1C2.2 0 0 2.2 0 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z'/%3E%3Cpath stroke='%23ccc' stroke-miterlimit='10' d='M12.6 12.6L8.2 8.2'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: $h-spacing-lg center;
    background-size: $icon-size-xxs auto;

    &::-webkit-input-placeholder {
        font-size: $font-size-caption-sm;
        color: $color-text-placeholder;
    }

    &::-webkit-search-cancel-button {
        -webkit-appearance: none;
    }
}

.vx-searchbar-clear {
    position: absolute;
    top: ($search-bar-input-height - $icon-size-xxs) / 2;
    right: $h-spacing-sm;
    width: $icon-size-xxs;
    height: $icon-size-xxs;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28'%3E%3Ccircle cx='14' cy='14' r='14' fill='%23ccc'/%3E%3Cpath stroke='%23fff' stroke-width='2' stroke-miterlimit='10' d='M8 8l12 12'/%3E%3Cpath fill='none' stroke='%23fff' stroke-width='2' stroke-miterlimit='10' d='M20 8L8 20'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: $icon-size-xxs auto;
    opacity: 0;
    transition: all .3s;
    
    .vx-searchbar-focus & {
        opacity: 1;
    }
}

.vx-searchbar-btn {
    flex-shrink: 0;
    height: $search-bar-input-height;
    line-height: $search-bar-input-height;
    color: $brand-primary;
    opacity: 0;
    margin-right: -150%;
    transform: translate3d(100%, 0, 0);
    transition: all .2s;
    // width: 0;

    .vx-searchbar-focus & {
        opacity: 1;
        margin-left: $h-spacing-md;
        margin-right: 0;
        transform: translate3d(0, 0, 0);
        // width: auto;
    }
}
</style>
