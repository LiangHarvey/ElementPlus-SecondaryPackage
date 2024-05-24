<script lang="ts" setup>
import { computed, useSlots } from "vue"
import { toLine } from "../../../utils"

// 判断插槽是否有值
let slots = useSlots()
// 判断是up还是down的文字颜色
let textColor = computed(() => {
    return props.type === 'up' ? props.upTextColor : props.downTextColor
})

const props = defineProps({
    text: {
        type: String,
        default: '文字'
    },
    type: {
        type: String,
        default: 'up'
    },
    upIconColor: {
        type: String,
        default: '#f5222d'
    },
    downIconColor: {
        type: String,
        default: '52c41a'
    },
    // 颜色反转，默认的颜色才能够实现，传入自定义颜色无该功能
    reverseColor: {
        type: Boolean,
        default: false
    },
    // 文字颜色
    upTextColor: {
        type: String,
        default: 'black'
    },
    downTextColor: {
        type: String,
        default: 'black'
    },
    // 自定义传入图标
    upIcon: {
        type: String,
        default: 'ArrowUp'
    },
    downIcon: {
        type: String,
        default: 'ArrowDown'
    }
})
</script>

<template>
    <div class="trend">
        <div class="text" :style="{ color: textColor }">
            <slot v-if="slots.default"></slot>
            <div v-else>{{ text }}</div>
        </div>
        <div class="icon">
            <!-- <el-icon-arrowup v-if="type === 'up'"
                :style="{ color: !reverseColor ? upIconColor : '52c41a' }"></el-icon-arrowup>
            <el-icon-arrowdown v-else :style="{ color: !reverseColor ? downIconColor : '#f5222d' }"></el-icon-arrowdown> -->
            <component :is="`el-icon-${toLine(upIcon)}`" v-if="type === 'up'"
                :style="{ color: !reverseColor ? upIconColor : '52c41a' }"></component>
            <component :is="`el-icon-${toLine(downIcon)}`" v-else
                :style="{ color: !reverseColor ? downIconColor : '#f5222d' }"></component>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.trend {
    display: flex;
    align-items: center;

    .text {
        margin: 5px;
    }

    .icon {
        svg {
            width: 0.8em;
            height: 0.8em;
        }
    }
}
</style>
