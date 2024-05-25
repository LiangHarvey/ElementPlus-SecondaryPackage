<script lang="ts" setup>
import { PropType } from "vue"
import { toLine } from '../../../utils/index'
import type { MenuItem } from './type.ts'

const props = defineProps({
    // 导航菜单数据
    data: {
        type: Array as PropType<MenuItem[]>,
        required: true
    },
    defaultActive: {
        type: String,
        default: ''
    },
    // menu菜单是否是路由模式
    router: {
        type: Boolean,
        default: false
    }
})

</script>

<template>
    <div class="menu">
        {{ $attrs }}
        <el-menu :default-active="defaultActive" :router="router" v-bind="$attrs">
            <template v-for="(item, index) in data" :key="index">
                <!-- 只有1级菜单 -->
                <el-menu-item v-if="!item.children || !item.children.length" :index="item.index">
                    <component :is='`el-icon-${toLine(item.icon)}`'></component>
                    <span>{{ item.name }}</span>
                </el-menu-item>
                <!-- 有2级菜单 -->
                <el-sub-menu v-if="item.children && item.children.length" :index="item.index">
                    <template #title>
                        <component :is='`el-icon-${toLine(item.icon)}`'></component>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item v-for="(item1, index1) in item.children" :key="index1" :index="item1.index">
                            <component :is='`el-icon-${toLine(item1.icon)}`'></component>
                            <span>{{ item1.name }}</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
            </template>
        </el-menu>
    </div>
</template>

<style lang="scss" scoped>
.menu {
    width: 400px;

    svg {
        margin-right: 5px;
    }
}
</style>
