<template>
<div class="vx-input-item" :class="{'vx-input-focus': hasFocus, 'vx-input-disabled': disabled, 'vx-input-error': showError}">
    <div class="vx-input-label" :class="'vx-input-label-' + labelSize" v-if="label || $slots.label">
        <slot name="label">{{ label }}</slot>
    </div>
    <div class="vx-input-control">
        <input ref="input" :type="type" :value="value"
        :placeholder="placeholder" :disabled="disabled" :readonly="readonly"
        @input="onInput" @change="onChange" @focus="onFocus" @blur="onBlur"
        @keydown="$emit('keydown', $event)" @keypress="$emit('keypress', $event)" @keyup="$emit('keyup', $event)"
        @click="$emit('click', $event)">
    </div>
    <div class="vx-input-clear" v-if="showClear && !readonly && value" @touchstart="onClearTouchstart"></div>
    <div class="vx-input-extra" v-if="$slots.extra">
        <slot name="extra"></slot>
    </div>
    <div class="vx-input-error-extra" v-if="showError"></div>
</div>
</template>

<script>
export default {
    name: 'input-item',
    props: {
        label: {
            type: String,
            default: null
        },
        labelSize: {
            type: Number,
            default: 0
        },
        type: {
            type: String,
            default: 'text'
        },
        value: { // you should always use v-model in the parent component instead of directly using the 'value'. see: http://rc.vuejs.org/guide/components.html#Form-Input-Components-using-Custom-Events
            type: String
        },
        placeholder: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        showClear: {
            type: Boolean,
            default: false
        },
        showError: {
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
        onClearTouchstart (event) { // you cant use click event here
            this.$emit('input', '', event)
        }
    }
}
</script>

<style lang="sass">
@import './site/style/base.scss';

.vx-input-item {
    position: relative;
    display: flex;
    align-items: center;
    height: $list-item-height;
    padding-left: $h-spacing-lg;
    padding-right: $h-spacing-lg;

    &:after {
        @include border-pseudo();
    }
}

.vx-input-label {
    margin-right: $h-spacing-lg;
    text-align: left;
    font-size: $font-size-heading;
    color: $color-text-base;
    @include ellipsis();

    @for $n from 2 through 5 {
        &-#{$n} {
            width: $font-size-heading * $n;
        }
    }

    .vx-input-disabled & {
        color: $color-text-disabled;
    }
}

.vx-input-control {
    flex: 1;
    font-size: $input-font-size;

    input {
        width: 100%;
        appearance: none;
        border: none;
        font-size: $font-size-heading;
        color: $color-text-base;
        background-color: transparent;

        &:disabled {
            color: $color-text-disabled;
        }

        &::-webkit-input-placeholder {
            font-size: $font-size-caption;
            color: $color-text-placeholder;
        }

        .vx-input-error & {
            color: $color-error;
        }
    }
}

.vx-input-clear {
    visibility: hidden;
    display: block;
    width: $icon-size-sm;
    height: $icon-size-sm;
    border-radius: 50%;
    background-color: $input-color-icon;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg fill='%23fff' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: contain;
    
    &:active {
        background-color: $input-color-icon-tap;
    }

    .vx-input-focus & {
        visibility: visible;
    }
}

.vx-input-extra {
    flex: initial;
    min-width: 0;
    max-height: $icon-size-sm;
    overflow: hidden;
    line-height: 1;
    color: $color-text-caption;
    font-size: $font-size-subhead;
    margin-left: $h-spacing-sm;
}

.vx-input-error-extra {
    width: $icon-size-sm;
    height: $icon-size-sm;
    margin-left: $h-spacing-sm;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='18' height='18' viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 1.266a7.69 7.69 0 0 1 5.469 2.264c.71.71 1.269 1.538 1.657 2.459.404.954.608 1.967.608 3.011a7.69 7.69 0 0 1-2.264 5.469 7.694 7.694 0 0 1-2.459 1.657A7.675 7.675 0 0 1 9 16.734a7.69 7.69 0 0 1-5.469-2.264 7.694 7.694 0 0 1-1.657-2.459A7.675 7.675 0 0 1 1.266 9 7.69 7.69 0 0 1 3.53 3.531a7.694 7.694 0 0 1 2.459-1.657A7.675 7.675 0 0 1 9 1.266zM9 0a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9zm0 11.25a.703.703 0 0 1-.703-.703V4.06a.703.703 0 1 1 1.406 0v6.486A.703.703 0 0 1 9 11.25zm-.791 1.916a.791.791 0 1 1 1.582 0 .791.791 0 0 1-1.582 0z' fill='%23F50' fill-rule='evenodd'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: contain;
}
</style>
