<script lang="ts" setup>
import { } from "vue"

interface endValue {
    startTime: string,
    endTime: string
}

const startOptions = {
    effect: 'light',
    size: 'default'
}
const handleStartChange = (startTime: string) => {
    console.log('startTime', startTime)
}

const handleEndChange = (endTime: endValue) => {
    console.log('endTime', endTime)
}

const dateStartChange = (startDate: string) => {
    console.log('startDate', startDate)
}

const dateEndChange = (endDate: string) => {
    console.log('endDate', endDate)
}
</script>

<template>
    <div class="">
        <m-choose-time @startChange="handleStartChange" @endChange="handleEndChange"
            :startOptions="startOptions"></m-choose-time>
        <br />
        <br />
        <m-choose-date :disabledToday="true" @startChange="dateStartChange" @endChange="dateEndChange"></m-choose-date>
    </div>
</template>

<style lang="scss" scoped></style>
