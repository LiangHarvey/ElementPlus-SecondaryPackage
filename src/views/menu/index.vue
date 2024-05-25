<script lang="ts" setup>
import { } from "vue"

// 单级层级
let data = [
    {
        a: '导航1',
        b: '1',
        c: 'Document'
    },
    {
        a: '导航2',
        b: '2',
        c: 'document'
    },
    {
        a: '导航3',
        b: '3',
        c: 'document',
        d: [
            {
                a: '导航3-1',
                b: '3-1',
                c: 'document',
            },
            {
                a: '导航3-2',
                b: '3-2',
                c: 'document',
            }
        ]
    }
]

// 嵌套层级
let data2 = [
    {
        name: '导航1',
        index: '1',
        icon: 'Document'
    },
    {
        name: '导航2',
        index: '2',
        icon: 'Document'
    },
    {
        name: '导航3',
        index: '3',
        icon: 'Document',
        children: [
            {
                name: '导航3-1',
                index: '3-1',
                icon: 'Document',
                children: [
                    {
                        name: '导航3-1-1',
                        index: '3-1-1',
                        icon: 'Document',
                        children: [
                            {
                                name: '导航3-1-1-1',
                                index: '3-1-1-1',
                                icon: 'Document',
                                children: [
                                    {
                                        name: '导航3-1-1-1-1',
                                        index: '3-1-1-1-1',
                                        icon: 'Document',
                                        children: [
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
</script>

<template>
    <div class="">
        <!-- 修改了传入进去data中的键名 -->
        <!-- <m-menu :data="data" defaultActive="2" :a="1" background-color="pink" name="a" index="b" icon="c"
            children="d"></m-menu> -->
        <m-infinite-menu :data="data2" defaultActive="1" active-text-color="pink"></m-infinite-menu>
    </div>
</template>

<style lang="scss" scoped></style>
