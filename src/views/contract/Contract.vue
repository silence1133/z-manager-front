<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input v-model="filtersKeyword" placeholder="合同编号/公司/经营业务"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList" icon="el-icon-search" size="medium">查询</el-button>
                    <el-button type="warning" @click="printContract" icon="el-icon-printer" size="medium">打印</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <contract-list :filtersKeyword="filtersKeyword" ref="contractListRef"></contract-list>
    </section>
</template>

<script>
    import ContractList from "@/views/contract/components/ContractList";

    export default {
        name: "Contract",
        components: {ContractList},
        data() {
            return {
                filtersKeyword: ''
            }
        },
        methods:{
            getList:function () {
                this.$refs.contractListRef.getList();
            },
            printContract:function () {
                if(this.$refs.contractListRef.sels.length !== 1){
                    this.$message({
                        message: "请选择一条记录进行操作",
                        type: 'error'
                    });
                    return;
                }
                let contract = this.$refs.contractListRef.sels[0].contract;
                let routeData = this.$router.resolve({
                    path: '/ContractPrint'
                });
                sessionStorage.setItem("contractPrint",JSON.stringify(this.$refs.contractListRef.sels[0]));
                console.log(contract);
                window.open(routeData.href, '_blank');
            }
        }
    }
</script>

<style scoped>

</style>
