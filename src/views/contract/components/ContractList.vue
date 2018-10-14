<template>
    <div>
        <!--列表-->
        <el-table :data="dataList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="40">
            </el-table-column>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="contractCode" label="合同编号" width="100">
            </el-table-column>
            <el-table-column prop="business" label="经营业务" width="120">
            </el-table-column>
            <el-table-column prop="cashBledge" label="履约保证金（元）" :formatter="formatFen2Yuan">
            </el-table-column>
            <el-table-column prop="startDate" label="起始日期" width="100">
            </el-table-column>
            <el-table-column prop="endDate" label="终止日期" width="100">
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
            <el-table-column prop="electricFee" label="电费单价（元/度）" width="120" :formatter="formatFen2Yuan">
            </el-table-column>
            <el-table-column prop="waterFee" label="水费单价（元/度）">
            </el-table-column>
            <el-table-column prop="contractTime" label="合同签订时间" width="120">
            </el-table-column>
            <el-table-column prop="rentYear" label="租用年限" width="120">
            </el-table-column>
            <el-table-column prop="status" label="状态" :formatter="showStatusText">
            </el-table-column>
            <el-table-column label="租用商铺信息" width="120">
                <template slot-scope="scope">
                    <el-popover trigger="click" placement="left">
                        <el-table :data="scope.row.house">
                            <el-table-column width="150" property="houseCode" label="商铺编号"></el-table-column>
                            <el-table-column width="300" property="rentFee" label="租金(元/平/月)" :formatter="formatFen2Yuan"></el-table-column>
                            <el-table-column width="300" property="propertyFee" label="物业费(元/平/月)" :formatter="formatFen2Yuan"></el-table-column>
                        </el-table>
                        <el-button slot="reference" size="small" type="info">查看商铺详情</el-button>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="120">
                <template slot-scope="scope">
                    <el-button type="warning" size="small" icon="el-icon-edit" circle
                               @click="handleEdit(scope.$index, scope.row)" title="编辑"></el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" circle
                               @click="handleDel(scope.$index, scope.row)" title="删除"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>
    </div>
</template>

<script>

    import {getContractListPage} from "@/api/api";

    export default {
        name: "ContractList",
        props: {
            filtersContractCode: String,
            filtersMerchantCode: String,
            filtersCompany: String
        },
        data() {
            return {
                dataList: [],
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
                    page: this.page,
                    contractCode: this.filtersContractCode,
                    merchantCode: this.filtersMerchantCode,
                    company: this.filtersCompany,
                };
                this.listLoading = true;
                console.log(para);
                getContractListPage(para).then((res) => {
                    let {msg, success} = res.data;
                    if (success) {
                        this.total = res.data.totalPages;
                        this.dataList = res.data.data;
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

            },
            handleDel: function (index, row) {

                this.$confirm('确认要删除吗？', '提示', {}).then(() => {

                })
            },
            batchRemove: function () {

            },
            handleCurrentChange: function (val) {
                this.page = val;
                this.getList();
            },
            showStatusText: function (row) {
                switch (row.status) {
                    case 0:
                        return "未签约";
                    case 1:
                        return "已签约";
                }
            },
            formatFen2Yuan:function (row, column, cellValue) {
                return cellValue/100;
            }
        },
        mounted() {
            this.getList();
        }
    }
</script>

<style scoped>

</style>
