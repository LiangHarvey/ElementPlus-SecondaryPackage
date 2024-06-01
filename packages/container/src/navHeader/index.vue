<script lang="ts" setup>
import { } from "vue"

const props = defineProps<{
    collapse: boolean
}>()

const emits = defineEmits(['update:collapse'])

const toggle = () => {
    emits('update:collapse', !props.collapse)
}
</script>

<template>
    <div class="header" @click="toggle">
        <el-icon-expand v-if="collapse"></el-icon-expand>
        <el-icon-fold v-else></el-icon-fold>
    </div>

</template>

<style lang="scss" scoped>
.header{
    height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
}
</style>
