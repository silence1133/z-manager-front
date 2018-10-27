import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css'

//使用插件
Vue.use(ElementUI)
Vue.use(VueRouter)

Vue.config.productionTip = false


const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    //NProgress.start();
    if (to.path == '/login') {
        sessionStorage.removeItem('user');
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user && to.path != '/login') {
        next({ path: '/login' })
    } else {
        next();
    }
})

export const toLogin = ()  => {router.push("/login")};


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
