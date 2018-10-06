<template>
    <div class="mainContain">
        <el-form :model="loginForm" :rules="loginRule" ref="loginForm" label-position="left" label-width="0px"
                 class="demo-ruleForm login-container">
            <h2 style="text-align: center">xxxx管理系统</h2>
            <h3 class="title">系统登录</h3>
            <el-form-item prop="account">
                <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="passwd">
                <el-input type="password" v-model="loginForm.passwd" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleLogin" :loading="logining">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {requestLogin} from '../api/api';

    export default {
        data() {
            return {
                logining: false,
                loginForm: {
                    account: '',
                    passwd: ''
                },
                loginRule: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                    ],
                    passwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ]
                },
                checked: true
            };
        },
        methods: {
            // handleReset2() {
            //     this.$refs.loginForm.resetFields();
            // },
            handleLogin() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        //_this.$router.replace('/table');
                        this.logining = true;
                        //NProgress.start();
                        var loginParams = {account: this.loginForm.account, password: this.loginForm.passwd};
                        requestLogin(loginParams).then(data => {
                            this.logining = false;

                            let {msg,success} = data;
                            if (!success) {
                                this.$message({
                                    message: msg,
                                    type: 'error'
                                });
                            } else {
                                // alert(data.data);
                                console.log(data.data);
                                data.data.avatar = 'http://pbl9wvifs.bkt.clouddn.com/head.jpeg';
                                sessionStorage.setItem('user', JSON.stringify(data.data));
                                this.$router.push({path: '/main'});
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }

</script>

<style lang="scss" scoped>
    .mainContain {
        background: url("../assets/login-bg.jpg");
        background-size: 100%;
        width: 100%;
        height: 100%;
        position: absolute;
        overflow-y: hidden;
        .login-container {
            /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
            -webkit-border-radius: 5px;
            border-radius: 5px;
            -moz-border-radius: 5px;
            background-clip: padding-box;
            margin: 180px auto;
            width: 350px;
            padding: 35px 35px 15px 35px;
            background: #97a8be;
            border: 1px solid #eaeaea;
            box-shadow: 0 0 25px #cac6c6;
            .title {
                margin: 0px auto 20px auto;
                text-align: center;
                color: #505458;
            }
            .remember {
                margin: 0px 0px 15px 0px;
            }
        }
    }
</style>
