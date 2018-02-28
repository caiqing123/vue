import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import VueResource from 'vue-resource'
//引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入手机端ul mint
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
//引入编辑器
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.config.debug = true;

Vue.use(VueQuillEditor, /* { default global options } */)
Vue.use(Mint);
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueResource);

// 定义组件, 也可以像教程之前教的方法从别的文件引入
const First = { template: '<div><h2>我是第 1 个子页面</h2></div>' }
import secondcomponent from './component/secondcomponent.vue'

// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/first',
            component: First
        },
        {
            path: '/second',
            component: secondcomponent
        },
        {
            path: '/edit',
            component: resolve => require(['./component/editcomponent.vue'], resolve),
        },
        {
            path: '/table',
            component: resolve => require(['./component/tablecomponent.vue'], resolve),
            // children:[
            //     {
            //         path: '/',
            //         component: resolve => require(['../components/page/Readme.vue'], resolve)
            //     },
            //     {
            //         path: '/basetable',
            //         component: resolve => require(['../components/page/BaseTable.vue'], resolve)
            //     },
            //     {
            //         path: '/vuetable',
            //         component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
            //     },
            //     {
            //         path: '/baseform',
            //         component: resolve => require(['../components/page/BaseForm.vue'], resolve)
            //     },
            //     {
            //         path: '/vueeditor',
            //         component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
            //     },
            //     {
            //         path: '/markdown',
            //         component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
            //     },
            //     {
            //         path: '/upload',
            //         component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
            //     },
            //     {
            //         path: '/basecharts',
            //         component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
            //     },
            //     {
            //         path: '/drag',
            //         component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
            //
            //     },
            //     {
            //         path: '/chat',
            //         component: resolve => require(['../components/page/Chat.vue'], resolve)    // 拖拽列表组件
            //     }
            // ]
        },
    ]
})

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app')
