<script lang="ts" setup>
import { PropType, onMounted, ref, watch } from "vue"
import { Calendar, EventClickArg } from '@fullcalendar/core'
import daygrid from '@fullcalendar/daygrid'
import interaction from '@fullcalendar/interaction'
import type { DateClickArg } from '@fullcalendar/interaction'
import type { EventItem } from './types'

const props = defineProps({
    // 日历组件的配置项
    //语言
    local: {
        type: String,
        default: 'zh-cn',
    },
    //视图模式
    initialView: {
        type: String,
        default: 'dayGridMonth',
    },
    //按钮文字
    buttonText: {
        type: Object,
        default: () => {
            return {
                today: '今天',
                month: '月',
                week: '日',
                prevYear: '上一年',
                nextYear: '下一年',
                prev: '上一月',
                next: '下一月',
            };
        },
    },
    // 头部工具栏
    headerToolbar: {
        type: Object,
        default: () => {
            return {
                start: 'title',
                center: '',
                end: 'prev today next',
            };
        },
    },
    footerToolbar: {
        type: Object,
        default: () => {
            return {};
        },
    },
    // 事件源
    events: {
        type: Array as PropType<EventItem[]>,
        default: []
    }
})

const emits = defineEmits(['dateClick', 'eventClick'])

// 日历实例
const calendar = ref<Calendar>()
// 渲染日历方法
const renderCalendar = () => {
    const el = document.getElementById('calendar')
    if (el) {
        calendar.value = new Calendar(el, {
            // 日历插件
            plugins: [daygrid, interaction],
            // 日历配置项
            locale: props.local,
            initialView: props.initialView,
            buttonText: props.buttonText,
            headerToolbar: props.headerToolbar,
            footerToolbar: props.footerToolbar,
            eventSources: [
                {
                    // 渲染日历的事件
                    events(e, callback) {
                        if (props.events.length) {
                            callback(props.events)
                        } else {
                            callback([])
                        }
                    }
                }
            ],
            //日期点击事件
            dateClick(info: DateClickArg) {
                emits("dateClick", info)
            },
            eventClick(info: EventClickArg) {
                emits("eventClick", info)
            },
        })
        calendar.value.render()
    }
}

onMounted(() => {
    renderCalendar()
})

watch(() => props.events, val => {
    console.log('val', val)
    renderCalendar()
}, { deep: true })

</script>

<template>
    <div class="" id="calendar">
    </div>
</template>

<style lang="scss" scoped></style>
