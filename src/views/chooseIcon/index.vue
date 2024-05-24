<script lang="ts" setup>
import { ref } from "vue"
// import mChooseIcon from '../../components/chooseIcon/src/index.vue'

let visible = ref<boolean>(false)

</script>

<template>
    <div class="">
        <m-choose-icon title="选择图标" v-model:visible="visible">
            选择图标
        </m-choose-icon>
    </div>
</template>

<style lang="scss" scoped></style>
