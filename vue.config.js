// vue.config.js
module.exports = {
    devServer: {
        proxy: {
            '/api':{
                target: 'x',//设置你调用的接口域名和端口号
                // target: 'http://localhost:8080/',
                changeOrigin: true,   //跨域
                pathRewrite: {
                    '^/api': '/'     //这里理解成用‘/api'代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://10.1.5.11:8080/xxx/duty?time=2017-07-07 14:57:22'，直接写‘/api/xxx/duty?time=2017-07-07 14:57:22'即可
                }
            },
            '/test':{
                target: 'http://localhost:8080/',//设置你调用的接口域名和端口号
                changeOrigin: true,   //跨域
                pathRewrite: {
                    '^/test': '/static'     //这里理解成用‘/api'代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://10.1.5.11:8080/xxx/duty?time=2017-07-07 14:57:22'，直接写‘/api/xxx/duty?time=2017-07-07 14:57:22'即可
                }
            }
        }
    }
}

