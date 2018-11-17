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

let user = JSON.parse(sessionStorage.getItem('user'));
if(user && user.roleType == 2){
    routes.forEach(x => {
        if(x.children){
            x.children.forEach( y => {
                if(y.path == '/zuser'){
                    console.log(y);
                    y.hidden = true;
                }
            })
        }
    })
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
