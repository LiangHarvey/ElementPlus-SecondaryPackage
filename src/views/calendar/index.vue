<script lang="ts" setup>
import { ref } from "vue"
import { EventItem } from "../../components/calendar/src/types"
import type { DateClickArg } from '@fullcalendar/interaction'
import type { EventClickArg } from '@fullcalendar/core'


let events = ref<EventItem[]>([
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

const dataClick = (info: DateClickArg) => {
    console.log(info)
    events.value.push({
        title: '睡觉',
        start: '2024-05-30 08:00',
        end: '2024-05-30 12:00',
        editable: true
    })
}

const eventClick = (info: EventClickArg) => {
    console.log(info)
}
</script>

<template>
    <div class="">
        <m-calendar @dateClick="dataClick" @eventClick="eventClick" :events="events"></m-calendar>
    </div>
</template>

<style lang="scss" scoped></style>
