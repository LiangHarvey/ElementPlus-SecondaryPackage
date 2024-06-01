<script lang="ts" setup>
import { onMounted, ref } from "vue"
import city from '../lib/city.ts'
import type { CityName, ProvinceName } from './type.ts'
import provinceData from '../lib/province.json'

const emits = defineEmits(['changeCity', 'changeProvince'])

// 最终选择的城市
const result = ref<string>('选择城市')
// 是否显示prover
const visible = ref<boolean>(false)
// 单选框选定的值
const radioValue = ref<string>('findCity')
// 选择框的值
const selectValue = ref<string>('')
const options = ref<CityName[]>([])
// 城市数据
const cities = city.cities
// 省份数据
const provinces = provinceData
// 所有城市数据
let allCity: CityName[] = []

onMounted(() => {
    // 将多维数组扁平化-es6
    let values = Object.values(cities).flat(2)
    options.value = values
    allCity = values
    // console.log(values);
})

// 点击字母区域中的字母
const clickChat = (word: string) => {
    let el = document.getElementById(word)
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
    }
}

// 点击城市区域的某个城市
const clickItem = (item: CityName) => {
    result.value = item.name
    visible.value = false
    emits('changeCity', item)
}

// 点击省份区域的某个城市
const clickProvince = (item: string) => {
    result.value = item
    visible.value = false
    emits('changeProvince', item)
}

// 选择器搜索方法
const filterMethod = (val: string) => {
    let values = Object.values(cities).flat(2)
    if (!val) {
        options.value = values
    } else {
        if (radioValue.value === "findCity") {
            // 中文或拼音搜索
            options.value = values.filter((item) => {
                return item.name.includes(val) || item.spell.includes(val);
            });
        } else {
            // 中文搜索
            options.value = values.filter((item) => {
                return item.name.includes(val)
            });
        }
    }
}

// 下拉框选中
const changeSelect = (e: number) => {
    let city = allCity.find(item => item.id === e)
    result.value = city!.name
    if (radioValue.value === 'findCity') {
        emits('changeCity', city)
    } else {
        emits('changeProvince', city!.name)
    }
}

</script>

<template>
    <div class="chooseCity">
        <el-popover v-model:visible="visible" placement="bottom-start" :width="500" trigger="click">
            <!-- 触发 Popover 显示的 HTML 元素 -->
            <template #reference>
                <div class="result">
                    <div style="margin-right: 5px;">{{ result }}</div>
                    <el-icon-arrowdown :class="{ rotate: visible }"></el-icon-arrowdown>
                </div>
            </template>
            <template #default>
                <el-row>
                    <el-col :span="8">
                        <template style="display: flex;align-items: center;">
                            <el-radio-group v-model="radioValue" size="small">
                                <el-radio-button label="按城市" value="findCity" />
                                <el-radio-button label="按省份" value="findProvince" />
                            </el-radio-group>
                        </template>
                    </el-col>
                    <el-col :span="16">
                        <template style="display: flex;justify-content: center;align-items: center;">
                            <el-select v-model="selectValue" filterable placeholder="搜索城市" style="width: 240px"
                                @change="changeSelect" size="small" :filter-method="filterMethod">
                                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
                            </el-select>
                        </template>
                    </el-col>
                </el-row>
                <template v-if="radioValue === 'findCity'">
                    <div class="city">
                        <!-- 字母区域 -->
                        <div @click="clickChat(key)" class="city-item" v-for="(value, key in cities" :key="key">
                            {{ key }}
                        </div>
                    </div>
                    <!-- 城市显示区域 -->
                    <el-scrollbar height="400px">
                        <template v-for="(value, key) in cities" :key="key">
                            <el-row style="margin-bottom: 6px;" :id="key">
                                <el-col :span="2" :offset="0">
                                    {{ key }}:
                                </el-col>
                                <el-col :span="22" :offset="0" class="city-name">
                                    <div @click="clickItem(item)" v-for="(item) in value" :key="item.id"
                                        class="city-name-item">
                                        {{ item.name }}
                                    </div>
                                </el-col>
                            </el-row>
                        </template>
                    </el-scrollbar>
                </template>
                <!-- 单选框-省份 -->
                <template v-else>
                    <div class="province">
                        <!-- 字母区域 -->
                        <div @click="clickChat(key)" class="province-item" v-for="(value, key) in provinces" :key="key">
                            {{ key }}
                        </div>
                        <el-scrollbar height="400px">
                            <template v-for="(value, key) in provinces" :key="key">
                                <template v-for="(item, index) in value" :key="index">
                                    <el-row style="margin-bottom: 6px;" :id="item.id">
                                        <el-col :span="3" :offset="0">
                                            {{ item.name }}:
                                        </el-col>
                                        <el-col :span="21" :offset="0" class="province-name">
                                            <div @click="clickProvince(item1)" v-for="(item1, index1) in item.data"
                                                :key="index1" class="province-name-item">
                                                {{ item1 }}
                                            </div>
                                        </el-col>
                                    </el-row>
                                </template>
                            </template>
                        </el-scrollbar>
                    </div>
                </template>
            </template>
        </el-popover>
    </div>
</template>

<style lang="scss" scoped>
.chooseCity {
    .result {
        display: flex;
        align-items: center;
        width: fit-content;
        cursor: pointer;
    }
}

.city,
.province {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-bottom: 10px;

    .city-item,
    .province-item {
        padding: 3px 6px;
        margin-right: 8px;
        border: 1px solid #eee;
        margin-bottom: 8px;
        cursor: pointer;
    }
}

.city-name,
.province-name {
    display: flex;
    flex-wrap: wrap;

    .city-name-item,
    .province-name-item {
        margin-right: 6px;
        margin-bottom: 6px;
        cursor: pointer;
    }
}

.rotate {
    transform: rotate(180deg)
}

svg {
    width: 1em;
    height: 1em;
    position: relative;
    top: 2px;
    transition: all 0.25s linear;
}
</style>
