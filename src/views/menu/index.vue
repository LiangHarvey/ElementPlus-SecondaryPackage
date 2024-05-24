<script lang="ts" setup>
import { } from "vue"

let data = [
    {
        name: '导航1',
        index: '1',
        icon: 'document'
    },
    {
        name: '导航2',
        index: '2',
        icon: 'document'
    },
    {
        name: '导航3',
        index: '3',
        icon: 'document',
        children: [
            {
                name: '导航3-1',
                index: '3-1',
                icon: 'document',
            },
            {
                name: '导航3-2',
                index: '3-2',
                icon: 'document',
            }
        ]
    }
]
</script>

<template>
    <div class="">
        <m-menu :data="data" defaultActive="2" :a="1" background-color="pink"></m-menu>
    </div>
</template>

<style lang="scss" scoped></style>
