<script lang="ts" setup>
import { PropType } from "vue"
import { toLine } from '../../utils/index'
import type { MenuItem } from './type.ts'


const props = defineProps({
    // 导航菜单数据
    data: {
        type: Array as PropType<any[]>,
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
    },
    // 菜单数据的键名
    // 菜单标题键名
    name: {
        type: String,
        default: 'name'
    },
    // 菜单标识键名
    index: {
        type: String,
        default: 'index'
    },
    // 菜单图标键名
    icon: {
        type: String,
        default: 'icon'
    },
    // 子数据键名
    children: {
        type: String,
        default: 'children'
    }
})

</script>

<template>
    <div class="menu">
        <!-- {{ $attrs }} -->
        <el-menu :default-active="defaultActive" :router="router" v-bind="$attrs">
            <template v-for="(item, i) in data" :key="i">
                <!-- 只有1级菜单 -->
                <el-menu-item v-if="!item[children] || !item[children].length" :index="item[index]">
                    <component :is='`el-icon-${toLine(item[icon])}`'></component>
                    <span>{{ item[name] }}</span>
                </el-menu-item>
                <!-- 有2级菜单 -->
                <el-sub-menu v-if="item[children] && item[children].length" :index="item[index]">
                    <template #title>
                        <component :is='`el-icon-${toLine(item[icon])}`'></component>
                        <span>{{ item[name] }}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item v-for="(item1, index1) in item[children]" :key="index1" :index="item1[index]">
                            <component :is='`el-icon-${toLine(item1[icon])}`'></component>
                            <span>{{ item1[name] }}</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
            </template>
        </el-menu>
    </div>
</template>

<style lang="scss" scoped>
.menu {
    // width: 200px;
    width: auto;

    svg {
        margin-right: 5px;
        width: 1em;
        height: 1em;
    }
}
</style>
