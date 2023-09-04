const { createApp } = Vue
const { loadModule } = window['vue3-sfc-loader']

const app = createApp({
    components: {
        // 引入页面
        'my-page': getVueFile('./static/App.vue')
    }
})
app.use(ElementPlus);
app.use(router)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}