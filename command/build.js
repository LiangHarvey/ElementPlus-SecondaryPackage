const { defineConfig, build } = require("vite")
const vue = require("@vitejs/plugin-vue")
const vueJSX = require("@vitejs/plugin-vue-jsx")
const path = require("path")
const fs = require("fs")
const fsExtra = require("fs-extra")

// 打包入口文件夹
const entryDir = path.resolve(__dirname, "../packages")
// 打包出口文件夹
const outDir = path.resolve(__dirname, "../lib")

// vite基础配置
const baseConfig = defineConfig({
    configFile: false,
    publicDir: false,
    plugins: [vue(), vueJSX()],
})

// vite基于rollup打包
// rollup配置
const rollupOptions = {
    external: ["vue", "vue-router"],
    output: {
        globals: {
            vue: "Vue",
        },
    },
}

//全量打包构建方法
const buildAll = async () => {
    await build({
        ...baseConfig,
        build: {
            rollupOptions,
            // 打包的库
            lib: {
                // 入口文件
                entry: path.resolve(entryDir, "index.ts"),
                name: "Liang-element-components",
                fileName: "Liang-element-components",
                // 输出格式
                formats: ["es", "umd"],
            },
            // 输出文件夹
            outDir,
        },
    })
}

//单组件打包
//name:组件名称
const buildSingle = async (name) => {
    await build({
        ...baseConfig,
        build: {
            rollupOptions,
            lib: {
                entry: path.resolve(entryDir, name),
                name: "index",
                fileName: "index",
                formats: ["es", "umd"],
            },
            outDir: path.resolve(outDir, name),
        },
    });
};

//每个组件生成package.json
const createPackageJson = (name) => {
    const file = `
	{
		"name":"${name}",
		"main":"index.umd.js",
		"module":"index.es.js",
		"style":"style.css"
	}`;
    //创建package.json文件
    //输出
    //npm i fs-extra
    fsExtra.outputFile(
        path.resolve(outDir, `${name}/package.json`),
        file,
        "utf-8"
    )
}

// 打包成库
const buildLib = async () => {
    await buildAll()

    // 获取组件名称组成的数组
    const components = fs.readdirSync(entryDir).filter(name => {
        const componentDir = path.resolve(entryDir, name)
        // 是否为目录
        const isDir = fs.lstatSync(componentDir).isDirectory()
        // 是文件夹且文件夹下有index.ts
        return isDir && fs.readdirSync(componentDir).includes('index.ts')
    })

    // 循环构建
    for (const name of components) {
        await buildSingle(name)
        createPackageJson(name)
    }
}

buildLib()