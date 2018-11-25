<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input v-model="filtersHouseCode" placeholder="商铺编号/描述"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList" icon="el-icon-search" size="medium">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd" icon="el-icon-circle-plus-outline" size="medium">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <house-list ref="houseListRef" :filtersHouseCode="filtersHouseCode"></house-list>
        <house-add ref="houseAddRef" @getList="getList"></house-add>
    </section>
</template>

<script>
    import HouseList from "@/views/house/components/HouseList";
    import HouseAdd from "@/views/house/components/HouseAdd";
    export default {
        name: "House",
        components: {HouseAdd, HouseList},
        data(){
            return{
                filtersHouseCode:''
            }
        },
        methods:{
            getList:function () {
                this.$refs.houseListRef.getList();
            },
            handleAdd:function () {
                this.$refs.houseAddRef.handleAdd();
            }
        }
    }
</script>

<style scoped>

</style>
