<script lang="ts" setup>
import { onMounted, ref } from "vue"

const props = defineProps({
    // 百分比所占多少
    percentage: {
        type: Number,
        default: 0
    },
    // 是否开启动画效果
    isAnimation: {
        type: Boolean,
        default: false
    },
    // 动画时长-ms
    time: {
        type: Number,
        default: 3000
    }
})

const p = ref(0)

onMounted(() => {
    if (props.isAnimation) {
        // 
        let t = Math.ceil(props.time / (props.percentage))
        let time = setInterval(() => {
            p.value += 1
            if (p.value >= props.percentage) {
                p.value = props.percentage
                clearInterval(time)
            }
        }, t)
    } else {
        p.value = props.percentage
    }
})
</script>

<template>
    <div class="">
        <el-progress :percentage="p" v-bind="$attrs"/>
        <el-progress type="circle" :percentage="25" />
    </div>
</template>

<style lang="scss" scoped>
:deep(svg) {
    width: 126px;
    height: 126px;
}
</style>
