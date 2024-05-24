<script lang="ts" setup>
import { PropType } from "vue"
import type { ListOptions, ActionOptions, ListItem } from './types'
import { toLine } from "../../../utils";

const props = defineProps({
    // 列表内容
    list: {
        type: Array as PropType<ListOptions[]>,
        required: true
    },
    // 操作
    actions: {
        type: Array as PropType<ActionOptions[]>,
        default: []
    }
})

const emits = defineEmits(['clickItem', 'clickAction'])

const clickItem = (item: ListItem, index: number) => {
    emits('clickItem', { item, index })
}

const clickAction = (item: ActionOptions, index: number) => {
    emits('clickAction', { item, index })
}
</script>

<template>
    <div class="list">
        <el-tabs stretch>
            <el-tab-pane v-for="(item, index) in list" :key="index" :label="item.title">
                <el-scrollbar max-height="300px">
                    <div class="container" @click="clickItem(item1, index1)" v-for="(item1, index1) in item.content"
                        :key="index1">
                        <div class="avatar">
                            <el-avatar size="small" :src="item1.avatar" />
                        </div>
                        <div class="content">
                            <div class="title" v-if="item1.title">
                                <div>{{ item1.title }}</div>
                                <el-tag v-if="item1.tag" :type="item1.tagType" size="small">{{ item1.tag }}</el-tag>
                            </div>
                            <div class="desc" v-if="item1.desc">{{ item1.desc }}</div>
                            <div class="time" v-if="item1.time">{{ item1.time }}</div>
                        </div>
                    </div>
                </el-scrollbar>
                <div class="actions">
                    <div class="a-item" @click="clickAction(item2, index2)" v-for="(item2, index2) in actions"
                        :key="index2" :class="{ border: index2 === 0 }">
                        <component class="a-icon" :is='`el-icon-${toLine(item2!.icon)}`'></component>
                        <div>{{ item2.text }}</div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style lang="scss" scoped>
.list {

    .container {
        display: flex;
        padding: 12px 20px;
        align-items: center;

        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .avatar {
            flex: 1;
            width: 100%;
            height: 100%;
        }

        .content {
            flex: 4;

            .desc {
                margin-top: 5px;
                font-size: 12px;
                color: gray;
            }

            .time {
                font-size: 12px;
                color: gray;
            }
        }

        &:hover {
            background-color: #e6f6ff;
            cursor: pointer;
        }
    }

    .actions {
        display: flex;
        align-items: center;
        height: 50px;
        border-top: 3px solid #eee;

        .a-item {
            display: flex;
            flex: 1;
            height: 50px;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            .a-icon {
                margin-right: 2px;
            }
        }
    }
}

.border {
    border-right: 1px solid #eee !important;
}
</style>
