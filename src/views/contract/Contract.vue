<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input v-model="filtersContractCode" placeholder="合同编号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filtersMerchantCode" placeholder="商户编号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filtersCompany" placeholder="公司名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList" icon="el-icon-search" size="medium">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <contract-list :filtersContractCode="filtersContractCode" :filtersMerchantCode="filtersMerchantCode"
                       :filtersCompany="filtersCompany" ref="contractListRef"></contract-list>
    </section>
</template>

<script>
    import ContractList from "@/views/contract/components/ContractList";

    export default {
        name: "Contract",
        components: {ContractList},
        data() {
            return {
                filtersContractCode: '',
                filtersMerchantCode: '',
                filtersCompany: ''
            }
        },
        methods:{
            getList:function () {
                this.$refs.contractListRef.getList();
            }
        }
    }
</script>

<style scoped>

</style>
