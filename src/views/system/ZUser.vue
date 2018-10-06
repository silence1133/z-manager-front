<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input v-model="filtersName" placeholder="姓名"></el-input>
                    <el-input v-model="filtersAccount" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getUsers">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <user-list ref="userListRef" :filtersName="filtersName" :filtersAccount="filtersAccount" @editUser="editUser"></user-list>
        <user-edit ref="userEditRef" ></user-edit>
        <user-add ref="userAddRef" @getUsers="getUsers"></user-add>

    </section>
</template>

<script>

    import UserList from "./components/UserList";
    import UserEdit from "./components/UserEdit";
    import UserAdd from "./components/UserAdd";

    export default {
        name: "ZUser",
        components: {UserList,UserAdd,UserEdit},
        data() {
            return{
                filtersName:'',
                filtersAccount:''
            }
        },
        methods:{
            getUsers:function () {
                this.$refs.userListRef.getUsers();
            },
            handleAdd:function () {
                this.$refs.userAddRef.handleAdd();
            },
            editUser:function (row) {
                this.$refs.userEditRef.handleEdit(row);
            }

        }
    }
</script>

<style scoped>

</style>
