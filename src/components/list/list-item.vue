<template>
<div class="vx-list-item" :class="'vx-list-item-' + valign">
    <div class="vx-list-thumb" v-if="$slots.thumb">
        <slot name="thumb"></slot>
    </div>
    <div class="vx-list-line" :class="{'vx-list-line-wrap': isWrap, 'vx-list-line-multiple': $slots['brief'] || $slots['extra'] && $slots['extra.brief']}">
        <div class="vx-list-content">
            <slot></slot>
            <div class="vx-list-brief" v-if="$slots['brief']">
                <slot name="brief"></slot>
            </div>
        </div>
        <div class="vx-list-extra" v-if="$slots['extra'] || $slots['extra.brief']">
            <slot name="extra"></slot>
            <div class="vx-list-brief" v-if="$slots['extra.brief']">
                <slot name="extra.brief"></slot>
            </div>
        </div>
        <div class="vx-list-arrow" :class="arrow===true ? 'vx-list-arrow-right' : 'vx-list-arrow-' + arrow" v-if="arrow"></div>
    </div>
</div>
</template>

<script>
export default {
    name: 'list-item',
    props: {
        valign: { // vertical align: 'top' | 'middle' | 'bottom'
            type: String,
            validator (valign) {
                return ['top', 'middle', 'bottom'].indexOf(valign) !== -1
            },
            default: 'middle'
        },
        isWrap: {
            type: Boolean,
            default: false
        },
        arrow: {
            type: [String, Boolean],
            validator (arrow) {
                return typeof arrow === 'boolean' ? true : ['up', 'down', 'left', 'right'].indexOf(arrow) !== -1
            },
            default: false
        }
    }
}
</script>

<style lang="sass">
@import './site/style/base.scss';

$line-wrap-v-spacing: ($list-item-height - $font-size-heading * $line-height-base) / 2;

.vx-list-item {
    position: relative;
    display: flex;
    padding-left: $h-spacing-lg;
    min-height: $list-item-height;
    background-color: $bg-base;
    vertical-align: middle;
    overflow: hidden;
    align-items: center;
    transition: background-color .2s;
}

.vx-list-thumb {
    margin-right: $h-spacing-lg;
}

.vx-list-line {
    position: relative;
    display: flex;
    flex: 1;
    align-self: stretch;
    padding-right: $h-spacing-lg;
    min-height: $list-item-height;
    overflow: hidden;

    &:after {
        @include border-pseudo($position: bottom, $width: 1px);
    }

    .vx-list-item-middle & {
        align-items: center;
    }

    .vx-list-item-top & {
        align-items: flex-start;
    }

    .vx-list-item-bottom & {
        align-items: flex-end;
    }
}

.vx-list-line-multiple {
    padding: $line-wrap-v-spacing $h-spacing-lg $line-wrap-v-spacing 0;
    // line-height: 1.2;
    &.vx-list-line-wrap {
        padding-top: 0;
        padding-bottom: 0;
    } 
}

.vx-list-content {
    flex: 1;
    font-size: $font-size-heading;
    color: $color-text-base;
    text-align: left;
    @include ellipsis();

    .vx-list-line-wrap & {
        white-space: normal;
        padding-top: $line-wrap-v-spacing;
        padding-bottom: $line-wrap-v-spacing;
        line-height: 1.2;
    }
}

.vx-list-brief {
    font-size: $font-size-subhead;
    color: $color-text-caption;
    // margin-top: $v-spacing-sm;
    @include ellipsis();
}

.vx-list-extra {
    flex: 1;
    font-size: $font-size-heading;
    color: $color-text-caption;
    text-align: right;
    @include ellipsis();
}

.vx-list-arrow {
    width: $icon-size-xxs;
    height: $icon-size-xxs;
    margin-left: $h-spacing-md;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='27' viewBox='0 0 16 27' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.533 13.041l.038-.038L2.57 0 0 2.569 10.472 13.04 0 23.513l2.569 2.569L15.57 13.079l-.038-.038z' fill='%23CCC'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
    visibility: hidden;

    &.vx-list-arrow-up {
        visibility: visible;
        transform: rotate(-90deg);
    }

    &.vx-list-arrow-down {
        visibility: visible;
        transform:  rotate(90deg);
    }

    &.vx-list-arrow-left {
        visibility: visible;
        transform:  rotate(180deg);
    }

    &.vx-list-arrow-right {
        visibility: visible;
        transform:  rotate(0deg);
    }

    $item-margin-v-spacing: ($font-size-heading * $line-height-base - $icon-size-xxs) / 2;
    .vx-list-item-top & {
        margin-top: $item-margin-v-spacing;
    }

    .vx-list-item-bottom & {
        margin-bottom: $item-margin-v-spacing;
    }
}
</style>
