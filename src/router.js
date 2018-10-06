import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import ZUser from './views/system/ZUser.vue'
import Main from './views/Main.vue'
import House from './views/house/House'
import Merchant from './views/merchant/Merchant'
import Finance from './views/finance/Finance'
import Report from './views/finance/Report'
import Material from './views/material/Material'
import Contract from './views/contract/Contract'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '系统管理',
        iconCls: 'fa fa-tasks',//图标样式class
        children: [
            {path: '/main', component: Main, name: '主页', hidden: true},
            {path: '/zuser', component: ZUser, name: '账号管理'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '商户管理',
        iconCls: 'fa fa-address-card',//图标样式class
        children: [
            {path: '/house', component: House, name: '商铺管理'},
            {path: '/merchant', component: Merchant, name: '商户管理'},
            {path: '/contract', component: Contract, name: '合同管理'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '财务管理',
        iconCls: 'fa fa-university',//图标样式class
        children: [
            {path: '/finance', component: Finance, name: '收费管理'},
            {path: '/report', component: Report, name: '财务报表'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '设备管理',
        iconCls: 'fa fa-industry',//图标样式class
        children: [
            {path: '/material', component: Material, name: '设备列表'}
            // {path: '/zuser', component: ZUser, name: '设备出入库列表'}
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: {path: '/404'}
    }
];

export default routes;

