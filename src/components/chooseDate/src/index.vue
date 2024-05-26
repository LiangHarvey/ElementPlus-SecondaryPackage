<script lang="ts" setup>
import { ref, watch } from "vue"

const props = defineProps({
    startPlaceholder: {
        type: String,
        default: '选择开始日期'
    },
    endPlaceholder: {
        type: String,
        default: '选择结束日期'
    },
    // 是否要禁用今天之前的日期
    disabledToday: {
        type: Boolean,
        default: false
    }
})

const startDate = ref<Date | null>(null)
const endDate = ref<Date | null>(null)
// 结束时间是否禁用标识
const endDateDisabled = ref<boolean>(false)
// 禁用开始日期的函数
const startDisabledDate = (date: Date) => {
    if (props.disabledToday) {
        const today = new Date(); // 获取当前日期
        today.setHours(0, 0, 0, 0); // 将时间部分设为 00:00:00
        // 比较日期部分，如果 date 小于今天，则禁用
        return date < today;
    }
}
// 禁用结束日期的函数
const endDisabledDate = (date: Date) => {
    if (startDate.value) {
        return date.getTime() < startDate.value.getTime() + 1000 * 60 * 60 * 24
    }
}

const emits = defineEmits(['startChange', 'endChange'])

watch(() => startDate.value, val => {
    if (!val) {
        endDateDisabled.value = true
    } else {
        emits('startChange', val)
        endDateDisabled.value = false
    }
})

watch(() => endDate.value, val => {
    if (val) {
        emits('endChange', {
            startDate: startDate.value,
            endDate: endDate.value
        })
    }
})
</script>

<template>
    <div class="" style="display:flex;">
        <div style="margin-right: 10px;">
            <el-date-picker v-bind="$attrs.startOptions" v-model="startDate" type="date" :placeholder="startPlaceholder"
                :disabled-date="startDisabledDate" size="default" />
        </div>
        <div>
            <el-date-picker v-bind="$attrs.endOptions" v-model="endDate" type="date" :placeholder="endPlaceholder"
                size="default" :disabled-date="endDisabledDate" :disabled="endDateDisabled" />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
