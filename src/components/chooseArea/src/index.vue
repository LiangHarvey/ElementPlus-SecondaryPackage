<script lang="ts" setup>
import { ref, watch } from "vue"
// import allAreas from '../lib/pca-code.json'
import allAreas from '../lib/pcas-code.json'

export interface AreaItem {
    code: string,
    name: string,
    children?: AreaItem[]
}

export interface Data {
    code: string,
    name: string
}

const emits = defineEmits(['change'])

// 省市区编码
const province = ref<string>('')
const city = ref<string>('')
const area = ref<string>('')
const country = ref<string>('')
// 所有省市区数据
const areas = ref(allAreas)
// 关联的市级数据
const selectCity = ref<AreaItem>()
// 关联的区域数据
const selectArea = ref<AreaItem>()
const selectCountry = ref<AreaItem>()

watch(() => province.value, (val) => {
    // 当省份的值修改时
    if (val) {
        let cities = areas.value.find(item => item.code === val)!.children
        selectCity.value = cities
    }
    city.value = ''
    area.value = ''
    country.value = ''
})

watch(() => city.value, val => {
    // 当市区的值修改时
    if (val) {
        let areas = selectCity.value.find(item => item.code === val)!.children
        selectArea.value = areas
    }
    area.value = ''
    country.value = ''
})

// 监听区域变化
watch(() => area.value, val => {
    if (val) {
        let countrys = selectArea.value.find(item => item.code === val)!.children
        selectCountry.value = countrys
    }
    country.value = ''
})

watch(() => country.value, val => {
    if (val) {
        let provinceData: Data = {
            code: province.value,
            name: areas.value.find(item => item.code === province.value)!.name
        }
        let cityData: Data = {
            code: city.value,
            name: selectCity.value.find(item => item.code === city.value)!.name
        }
        let areaData: Data = {
            code: area.value,
            name: selectArea.value.find(item => item.code === area.value)!.name
        }
        let countryData: Data = {
            code: country.value,
            name: selectCountry.value.find(item => item.code === val)!.name
        }
        emits('change', {
            province: provinceData,
            city: cityData,
            area: areaData,
            country: countryData
        })
    }
})

</script>

<template>
    <el-select clearable style="width: 240px;margin-right: 20px;" placeholder="请选择省份" v-model="province">
        <el-option v-for="(item) in areas" :label="item.name" :value="item.code"></el-option>
    </el-select>
    <el-select clearable :disabled="!province" style="width: 240px;margin-right: 20px;" placeholder="请选择城市"
        v-model="city">
        <el-option v-for="item in selectCity" :label="item.name" :value="item.code"></el-option>
    </el-select>
    <el-select clearable :disabled="!province || !city" style="width: 240px" placeholder="请选择区县" v-model="area">
        <el-option v-for="item in selectArea" :label="item.name" :value="item.code"></el-option>
    </el-select>
    <el-select clearable :disabled="!province || !city || !area" style="width: 240px" placeholder="请选择乡镇"
        v-model="country">
        <el-option v-for="item in selectCountry" :label="item.name" :value="item.code"></el-option>
    </el-select>
</template>

<style lang="scss" scoped></style>
