<template>
    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
            <el-form-item label="原密码" prop="oldPasswd">
                <el-input v-model="editForm.oldPasswd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
                <el-input v-model="editForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkNewPasswd">
                <el-input v-model="editForm.checkNewPasswd" type="password"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
    </el-dialog>

</template>

<script>

    import {editUser} from '../../../api/api';

    export default {
        name: "UserEdit",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.editForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                editFormVisible: false,
                editForm: {
                    oldPasswd: '',
                    password: '',
                    checkNewPasswd: '',
                    id: ''
                },
                editLoading: false,
                editFormRules: {
                    oldPasswd: [
                        {required: true, message: '请输入旧密码', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                    ],
                    checkNewPasswd: [
                        {required: true, message: '请再次输入新的密码', trigger: 'blur'},
                        {validator: validatePass, trigger: 'blur'}
                    ]
                },
            }
        },
        methods: {
            editSubmit: function () {

                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.editLoading = true;
                        let editParams = Object.assign({}, this.editForm);

                        editUser(editParams).then((data) => {
                            this.editLoading = false;
                            if (data.success) {
                                this.$message({
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.editFormVisible = false;
                                this.$refs['editForm'].resetFields();
                            } else {
                                this.$message({
                                    message: data.msg,
                                    type: 'error'
                                });
                            }
                        })
                    }
                });
            },
            handleEdit: function (row) {
                this.editForm.id = row.id;
                this.editFormVisible = true;
            }
        }
    }
</script>

<style scoped>

</style>
