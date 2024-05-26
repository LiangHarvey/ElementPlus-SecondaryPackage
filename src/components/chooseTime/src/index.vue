<script lang="ts" setup>
import { ref, watch, useAttrs } from "vue"

const props = defineProps({
    // 开始时间占位符
    startPlaceholder: {
        type: String,
        default: '选择开始时间'
    },
    // 开始时间的开始初始化
    startTimeStart: {
        type: String,
        default: '08:00'
    },
    // 开始时间的结束初始化
    startTimeEnd: {
        type: String,
        default: '24:00'
    },
    // 开始时间的步进
    startStep: {
        type: String,
        default: '00:30'
    },
    // 结束时间占位符
    endPlaceholder: {
        type: String,
        default: '选择结束时间'
    },
    // 结束时间的开始初始化
    endTimeStart: {
        type: String,
        default: '08:00'
    },
    // 结束时间的结束初始化
    endTimeEnd: {
        type: String,
        default: '24:00'
    },
    // 结束时间的步进
    endStep: {
        type: String,
        default: '00:30'
    },
})

const startTime = ref('')
const endTime = ref('')
const endTimeDisabled = ref<boolean>(true)

const emtis = defineEmits(['startChange', 'endChange'])

watch(() => startTime.value, val => {
    if (val) {
        endTimeDisabled.value = false
        emtis('startChange', val)
    } else {
        endTime.value = ''
        endTimeDisabled.value = true
    }
})

watch(() => endTime.value, val => {
    if (!val) {
        startTime.value = ''
    } else {
        emtis('endChange', {
            startTime: startTime.value,
            endTime: val
        })
    }
})

console.log(useAttrs())
</script>

<template>
    <div class="choose-time">
        <div style="margin-right: 10px;">
            <el-time-select v-model="startTime" v-bind="$attrs.startOptions" style="width: 240px" :max-time="endTime"
                class="mr-4" :placeholder="startPlaceholder" :start="startTimeStart" :step="startStep"
                :end="startTimeEnd" />
        </div>
        <div>
            <el-time-select v-model="endTime" v-bind="$attrs.endOptions" style="width: 240px" :min-time="startTime"
                :placeholder="endPlaceholder" :start="endTimeStart" :step="endStep" :end="endTimeEnd"
                :disabled="endTimeDisabled" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.choose-time {
    display: flex;
}
</style>
