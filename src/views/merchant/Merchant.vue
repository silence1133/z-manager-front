<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-row :gutter="6">
                        <el-col :span="24">
                            <el-input v-model="filtersKeyword" placeholder="商户编号/公司/法人/营业执照" style="width: 220px;"></el-input>
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
        <merchant-list ref="merchantListRef" :filtersKeyword="filtersKeyword"></merchant-list>
        <merchant-add ref="merchantAddRef" @getList="getList"></merchant-add>
    </section>
</template>

<script>
    import MerchantList from "@/views/merchant/components/MerchantList";
    import MerchantAdd from "@/views/merchant/components/MerchantAdd";
    export default {
        name: "Merchant",
        components: {MerchantAdd, MerchantList},
        data(){
            return{
                filtersKeyword:''
            }
        },
        methods:{
            getList:function () {
                this.$refs.merchantListRef.$data.page = null;
                this.$refs.merchantListRef.getList();
            },
            handleAdd:function () {
                this.$refs.merchantAddRef.handleAdd();
            },
            handleAddContract:function () {
                if(this.$refs.merchantListRef.sels.length !== 1){
                    this.$message({
                        message: "请选择一条记录进行操作",
                        type: 'error'
                    });
                    return;
                }
                let id = this.$refs.merchantListRef.sels[0].id;
                let merchantCode = encodeURIComponent(this.$refs.merchantListRef.sels[0].merchantCode);
                this.$router.push(`/contractAdd/${id}/${merchantCode}`);
            }
        }
    }
</script>

<style scoped>

</style>
