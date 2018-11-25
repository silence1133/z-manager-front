<template>
    <div>
        <!--列表-->
        <el-table :data="merchantList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="40">
            </el-table-column>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="merchantCode" label="商户编号" width="100">
            </el-table-column>
            <el-table-column prop="company" label="公司" width="120">
            </el-table-column>
            <el-table-column prop="corporateBody" label="法人">
            </el-table-column>
            <el-table-column prop="idCard" label="身份证（营业执照）"  width="100">
            </el-table-column>
            <el-table-column prop="linkMan" label="联系人"  width="100">
            </el-table-column>
            <el-table-column label="备注">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>备注: {{ scope.row.remarks }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">查看备注</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="brand" label="经营品牌" width="120">
            </el-table-column>
            <el-table-column prop="address" label="联系地址">
            </el-table-column>
            <el-table-column prop="enteringTime" label="进场时间" width="120">
            </el-table-column>
            <el-table-column prop="status" label="状态" :formatter="showStatusText">
            </el-table-column>
            <el-table-column prop="modifyTime" label="修改时间" width="120">
            </el-table-column>
            <el-table-column prop="modifyEmp" label="修改人">
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="110">
                <template slot-scope="scope">
                    <el-button type="warning" size="small" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)" title="编辑"></el-button>
                    <el-button type="danger" size="small"  icon="el-icon-delete" circle @click="handleDel(scope.$index, scope.row)" title="作废商户资料"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange"
                           :page-count="total" style="float:right;">
            </el-pagination>
        </el-col>

        <merchant-edit ref="merchantEditRef" @getList="getList"></merchant-edit>
    </div>
</template>

<script>

    import {getMerchantListPage, removeMerchant} from "@/api/api";
    import MerchantEdit from "@/views/merchant/components/MerchantEdit";

    export default {
        name: "MerchantList",
        components: {MerchantEdit},
        props: {
            filtersKeyword: String
        },
        data() {
            return {
                merchantList: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
            }
        },
        methods: {
            //获取列表数据
            getList() {
                let para = {
                    pageNum: this.page,
                    keyWord: this.filtersKeyword
                };
                this.listLoading = true;
                console.log(para);
                getMerchantListPage(para).then((res) => {
                    let {msg, success} = res.data;
                    if (success) {
                        this.total = res.data.totalPages;
                        this.merchantList = res.data.data;
                        console.log(res.data);
                        this.listLoading = false;
                    } else {
                        this.$message({
                            message: msg,
                            type: 'error'
                        });
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            handleEdit: function (index, row) {
                this.$refs.merchantEditRef.handleEdit(row);
            },
            handleDel: function (index, row) {
                this.$confirm('确认要删除商户资料吗？', '提示', {}).then(() => {
                    let params = {
                        merchantId:row.id
                    };
                    removeMerchant(params).then((res)=>{
                        console.log(res);
                        this.addLoading = false;
                        let {msg, success} = res;
                        if (success) {
                            this.$message({
                                message: msg,
                                type: 'success'
                            });
                            this.getList();
                        } else {
                            this.$message({
                                message: msg,
                                type: 'error'
                            });
                        }
                    })
                })
            },
            batchRemove: function () {

            },
            handleCurrentChange: function (val) {
                this.page = val;
                this.getList();
            },
            showStatusText:function (row) {
                switch (row.status) {
                    case 0:return "作废";
                    case 1:return "可用";
                }
            }
        },
        mounted() {
            this.getList();
        }
    }
</script>

<style scoped>

</style>
