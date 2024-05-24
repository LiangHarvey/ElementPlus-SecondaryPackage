<script lang="ts" setup>
import { } from "vue"
import { list, actions } from './data.ts'

const clickItem = (e: any) => {
    console.log(e)
}

const clickAction = (e: any) => {
    console.log(e)
}
</script>

<template>
    <div class="">
        <!-- <m-notification :value="50"></m-notification>
        <br/>
        <m-notification :value="50" :max="30"></m-notification>
        <br/>
        <m-notification :value="50" isDot></m-notification>
        <br/>
        <m-notification :value="50" icon="ChatRound"></m-notification> -->
        <m-notification :value="50">
            <template #default>
                <m-list :list="list" :actions="actions" @clickItem="clickItem" @clickAction="clickAction"></m-list>
            </template>
        </m-notification>
    </div>
</template>

<style lang="scss" scoped></style>
