<template>
    <div>
        <!--列表-->
        <el-table :data="zusers" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="account" label="账号">
            </el-table-column>
            <el-table-column prop="roleType" label="角色类型" :formatter="showRoleTypeText">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column prop="updateTime" label="修改时间">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :page-count="total" style="float:right;">
            </el-pagination>
        </el-col>
    </div>
</template>

<script>

    import {getZUserListPage,removeUser} from '../../../api/api';

    export default {
        name: "UserList",
        props: {
            filtersName: String,
            filtersAccount:String
        },
        data() {
            return {
                zusers: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
            }
        },
        methods: {
            //获取用户列表
            getUsers() {
                let para = {
                    page: this.page,
                    name: this.filtersName,
                    account: this.filtersAccount
                };
                this.listLoading = true;
                console.log(para);
                getZUserListPage(para).then((res) => {
                    let {msg, success} = res.data;
                    if (success) {
                        this.total = 1;
                        this.zusers = res.data.data;
                        console.log(res.data);
                        this.listLoading = false;
                    } else {
                        this.$message({
                            message: msg,
                            type: 'error'
                        });
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            handleEdit: function (index, row) {
                this.$emit('editUser', row);
            },
            handleDel: function (index, row) {
                //
                this.$confirm('确认要删除吗？', '提示', {}).then(() => {

                    removeUser(row.id).then((data)=>{
                        if(data.success){
                            this.$message({
                                message: data.msg,
                                type: 'success'
                            });
                            this.getUsers();
                        }else{
                            this.$message({
                                message: data.msg,
                                type: 'error'
                            });
                        }
                    })
                })
            },
            batchRemove: function () {

            },
            handleCurrentChange: function (val) {
                this.page = val;
                this.getUsers();
            },
            showRoleTypeText:function (row) {
                switch (row.roleType) {
                    case 1:return "管理员";
                    case 2:return "普通职员";
                }
            }
        },
        mounted() {
            this.getUsers();
        }
    }
</script>

<style scoped>

</style>
