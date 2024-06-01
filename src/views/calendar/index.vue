<script lang="ts" setup>
import { ref } from "vue"
import { EventItem } from "../../components/calendar/src/types"
import type { DateClickArg } from '@fullcalendar/interaction'
import type { EventClickArg, EventContentArg } from '@fullcalendar/core'

// 这个数据是需要被用在页面渲染的，所以要用响应式数据
// 当ref数据被修改时，触发追踪了该ref数据的组件的重新渲染
// 新的events重新传进m-calendar组件
const events = ref<EventItem[]>([
    {
        title: '吃饭',
        start: '2024-05-31 08:00',
        end: '2024-05-31 12:00',
        editable: true
    },
    {
        title: '运动',
        start: '2024-06-01 10:00',
        end: '2024-06-01 18:00'
    }
])

// 点击某一天
const dataClick = (info: DateClickArg) => {
    console.log(info)
    events.value.push({
        title: '睡觉',
        start: '2024-05-30 08:00',
        end: '2024-05-30 12:00',
        editable: true
    })
}

// 点击某一日程
const eventClick = (info: EventClickArg) => {
    console.log(info)
}

// 自定义显示日程UI
const eventContent = (arg: EventContentArg) => {
    let el = document.createElement("div")
    let timeTextArr = arg.timeText.split("-")

    let start = timeTextArr[0]
        .replace("上午", "")
        .replace("下午", "")
        .replace("时", "");
    let end = timeTextArr[1]
        .replace("上午", "")
        .replace("下午", "")
        .replace("时", "")
    el!.innerHTML = `
                    <div class="eventContent">开始时间:${start}</div>
                    <div>结束时间:${end}</div>
                    <div>标题:${arg.event._def.title}</div>
                `
    console.log(arg);
    return { domNodes: [el] }
}
</script>

<template>
    <div class="">
        <m-calendar @dateClick="dataClick" @eventClick="eventClick" :events="events" displayEventEnd
            :eventContent="eventContent"></m-calendar>
    </div>
</template>

<style lang="scss" scoped>

</style>
