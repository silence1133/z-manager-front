<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-row :gutter="6">
                        <el-col :span="12">
                            <el-input v-model="filtersMerchantCode" placeholder="商户编号"></el-input>
                        </el-col>
                        <el-col :span="12">
                            <el-input v-model="filtersCompany" placeholder="公司名称"></el-input>
                        </el-col>
                    </el-row>

                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <merchant-list ref="merchantListRef" :filtersMerchantCode="filtersMerchantCode" :filtersCompany="filtersCompany"></merchant-list>
    </section>
</template>

<script>
    import MerchantList from "@/views/merchant/components/MerchantList";
    export default {
        name: "Merchant",
        components: {MerchantList},
        data(){
            return{
                filtersMerchantCode:'',
                filtersCompany:''
            }
        },
        methods:{
            getList:function () {
                this.$refs.merchantListRef.getList();
            }
        }
    }
</script>

<style scoped>

</style>
