<template>
    <!--新增界面-->
    <el-dialog title="新增账号" :visible.sync="addFormVisible" :close-on-click-modal="false" width="40%">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="addForm.name" :maxlength="maxlength"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="account">
                <el-input v-model="addForm.account" :maxlength="maxlength"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="addForm.password" :maxlength="maxlength"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPasswd">
                <el-input type="password" v-model="addForm.checkPasswd" :maxlength="maxlength"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="roleType">
                <el-radio-group v-model="addForm.roleType">
                    <el-radio class="radio" label="1">老板</el-radio>
                    <el-radio class="radio" label="2">主管</el-radio>
                    <el-radio class="radio" label="3">普通职员</el-radio>
                    <el-radio class="radio" label="4">助理</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click.native="addFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
    </el-dialog>
</template>

<script>

    import util from '../../../common/js/util'
    //import NProgress from 'nprogress'
    import {addUser} from '../../../api/api';

    export default {
        name: "UserAdd",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.addForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                    checkPasswd: [
                        {required: true, message: '请再次输入密码', trigger: 'blur'},
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    roleType: [
                        {required: true, message: '请选择角色类型', trigger: 'blur'}
                    ]
                },
                //新增界面数据
                addForm: {
                    name: '',
                    account: '',
                    password: '',
                    checkPasswd: '',
                    roleType: ''
                },
                maxlength: 10
            }
        },
        methods: {
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    account: '',
                    password: '',
                    checkPasswd: '',
                    roleType: 0
                };
            },
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {

                            this.addLoading = true;
                            //NProgress.start();
                            let addParams = Object.assign({}, this.addForm);
                            addUser(addParams).then((res) => {
                                console.log(res.data);
                                console.log(this);
                                this.addLoading = false;
                                let {msg, success} = res.data;
                                if (success) {
                                    this.$message({
                                        message: msg,
                                        type: 'success'
                                    });
                                    this.$refs['addForm'].resetFields();
                                    this.addFormVisible = false;
                                    this.$emit('getUsers');
                                } else {
                                    this.$message({
                                        message: msg,
                                        type: 'error'
                                    });
                                }
                            });
                        });
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>
