<script lang="ts" setup>
import { } from "vue"
</script>

<template>
    <div>
        <div class="flex">
            <div>
                <m-trend text="营业额" type="up"></m-trend>
            </div>
            <div>
                <m-trend text="销售额" type="down"></m-trend>
            </div>
        </div>
        <br>
        <div class="flex">
            <div>
                <m-trend text="营业额" type="up" upIconColor="blue" upTextColor="blue" upIcon="SortUp">测试人员</m-trend>
            </div>
            <div>
                <m-trend text="销售额" type="down" downIconColor="pink" reverseColor downIcon="CaretBottom"></m-trend>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.flex {
    display: flex;

    div {
        margin-right: 10px;
    }
}
</style>
