<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input v-model="filtersHouseCode" placeholder="门牌号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <house-list ref="houseListRef" :filtersHouseCode="filtersHouseCode"></house-list>

    </section>
</template>

<script>
    import HouseList from "@/views/house/components/HouseList";
    export default {
        name: "House",
        components: {HouseList},
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

            }
        }
    }
</script>

<style scoped>

</style>
