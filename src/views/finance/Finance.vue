<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input v-model="filtersKeyWord" placeholder="商户编号/公司/法人/合同编号" style="width: 240px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList" icon="el-icon-search" size="medium">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <receivables-list ref="receivablesListRef" :filtersKeyWord="filtersKeyWord"></receivables-list>
    </section>
</template>

<script>
    import ReceivablesList from "@/views/finance/components/ReceivablesList";

    export default {
        name: "Finance",
        components: {ReceivablesList},
        data() {
            return {
                filtersKeyWord: ''
            }
        },
        methods: {
            getList: function () {
                this.$refs.receivablesListRef.$data.page = null;
                this.$refs.receivablesListRef.getList();
            }
        }
    }
</script>

<style lang="scss" scoped>

    table {
        width: 100%;
        border-collapse: collapse;
        text-align: center;
    }

    table th, td {
        border: 1px solid #999;
    }

</style>
