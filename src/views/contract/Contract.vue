<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input v-model="filtersKeyword" placeholder="关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList" icon="el-icon-search" size="medium">查询</el-button>
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
            }
        }
    }
</script>

<style scoped>

</style>
