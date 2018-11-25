<template>
    <div>
        <!--列表-->
        <el-table :data="dataList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="40">
            </el-table-column>
            <el-table-column prop="contractCode" label="合同编号" width="100">
            </el-table-column>
            <el-table-column prop="coporateBody" label="法人" width="80">
            </el-table-column>
            <el-table-column prop="company" label="公司名称" width="120">
            </el-table-column>
            <el-table-column prop="receiptCode" label="收据编号" width="100">
            </el-table-column>
            <el-table-column prop="feeType" label="收费类型" width="120" :formatter="formatFeeType">
            </el-table-column>
            <el-table-column prop="paidFee" label="收款金额（元）" width="120" :formatter="formatFen2Yuan">
            </el-table-column>
            <el-table-column prop="paidMan" label="缴款人">
            </el-table-column>
            <el-table-column prop="paidMethod" label="缴费方式" :formatter="formatPayWay">
            </el-table-column>
            <el-table-column prop="paidTime" label="缴费时间" >
            </el-table-column>
            <el-table-column prop="chargeMan" label="收费人" >
            </el-table-column>
            <el-table-column label="缴费事由">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>备注: {{ scope.row.remarks }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">查看</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange"
                           :page-count="total" style="float:right;">
            </el-pagination>
        </el-col>
    </div>
</template>

<script>
    import { getReportListPage} from "@/api/api";

    export default {
        name: "ReportList",
        props: {
            filtersKeyword: String,
            filtersStartDate: String,
            filtersEndDate: String
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
                    pageNum: this.page,
                    keyWord: this.filtersKeyword,
                    startPayTime:this.filtersStartDate,
                    endPayTime:this.filtersEndDate
                };
                this.listLoading = true;
                console.log(para);
                getReportListPage(para).then((res) => {
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
                //
                this.$confirm('确认要删除吗？', '提示', {}).then(() => {

                    removeHouse(row.id).then((data) => {
                        if (data.success) {
                            this.$message({
                                message: data.msg,
                                type: 'success'
                            });
                            this.getUsers();
                        } else {
                            this.$message({
                                message: data.msg,
                                type: 'error'
                            });
                        }
                    })
                })
            },
            formatFeeType: function (row, column, cellValue) {
                switch (cellValue) {
                    case 0:
                        return "租金";
                    case 1:
                        return "物业";
                    case 2:
                        return "水费";
                    case 3:
                        return "电费";
                }
            },
            handleCurrentChange: function (val) {
                this.page = val;
                this.getList();
            },
            formatPayWay: function (row, column, cellValue) {
                switch (cellValue) {
                    case 0:
                        return "现金";
                    case 1:
                        return "微信";
                    case 2:
                        return "支付宝";
                    case 3:
                        return "银行转账";
                    case 4:
                        return "刷卡";
                }
            },
            formatFen2Yuan: function (row, column, cellValue) {
                return cellValue / 100;
            },
        },
        mounted() {
            this.getList();
        }
    }
</script>

<style scoped>

</style>
