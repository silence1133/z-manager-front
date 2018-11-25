<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input v-model="filtersKeyword" placeholder="名称/类型"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList" icon="el-icon-search" size="medium">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd" icon="el-icon-circle-plus-outline" size="medium">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <material-list ref="materialListRef" :filtersKeyword="filtersKeyword"></material-list>
        <material-add ref="materialAddRef" @getList="getList"></material-add>

    </section>
</template>

<script>
    import MaterialList from "@/views/material/components/MaterialList";
    import MaterialAdd from "@/views/material/components/MaterialAdd";
    export default {
        name: "Material",
        components: {MaterialAdd, MaterialList},
        data(){
            return{
                filtersKeyword:''
            }
        },
        methods:{
            getList:function () {
                this.$refs.materialListRef.getList();
            },
            handleAdd:function () {
                this.$refs.materialAddRef.handleAdd();
            }
        }
    }
</script>

<style scoped>

</style>
