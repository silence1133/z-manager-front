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
                    <el-button type="primary" @click="getList" icon="el-icon-search" size="medium">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd" icon="el-icon-circle-plus-outline" size="medium">新增</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="handleAddContract" icon="el-icon-message" size="medium">合同签约</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <merchant-list ref="merchantListRef" :filtersMerchantCode="filtersMerchantCode" :filtersCompany="filtersCompany"></merchant-list>
        <merchant-add ref="merchantAddRef" @getList="getList"></merchant-add>
        <contract-add ref="contractAddRef"></contract-add>
    </section>
</template>

<script>
    import MerchantList from "@/views/merchant/components/MerchantList";
    import MerchantAdd from "@/views/merchant/components/MerchantAdd";
    import ContractAdd from "@/views/contract/components/ContractAdd";
    export default {
        name: "Merchant",
        components: {ContractAdd, MerchantAdd, MerchantList},
        data(){
            return{
                filtersMerchantCode:'',
                filtersCompany:''
            }
        },
        methods:{
            getList:function () {
                this.$refs.merchantListRef.getList();
            },
            handleAdd:function () {
                this.$refs.merchantAddRef.handleAdd();
            },
            handleAddContract:function () {
                this.$refs.contractAddRef.handleAdd();
            }
        }
    }
</script>

<style scoped>

</style>
