<template>
    <div>
        <!--列表-->
        <el-table :data="dataList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="40">
            </el-table-column>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="electricMeterCode" label="合同编号" width="100">
            </el-table-column>
            <el-table-column prop="contractCode" label="法人" width="120">
            </el-table-column>
            <el-table-column prop="contractCode" label="公司名称" width="120">
            </el-table-column>
            <el-table-column prop="initMark" label="缴费人" width="120">
            </el-table-column>
            <el-table-column prop="initMark" label="收据号" width="120">
            </el-table-column>
            <el-table-column prop="status" label="缴费金额">
            </el-table-column>
            <el-table-column prop="status" label="缴费类型" :formatter="showStatusText">
            </el-table-column>
            <el-table-column prop="status" label="缴费时间" :formatter="showStatusText">
            </el-table-column>
            <el-table-column prop="status" label="收费人" :formatter="showStatusText">
            </el-table-column>
            <el-table-column prop="status" label="缴费事由" :formatter="showStatusText">
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
    import {getElectricMeterListPage, getElectricMeterRecordList} from "@/api/api";

    export default {
        name: "ReportList",
        props: {
            filtersKeyword: String
        },
        data() {
            return {
                dataList: [],
                total: 0,
                page: 1,
                listLoading: false,
                innerListLoading:false,
                sels: [],//列表选中列
            }
        },
        methods: {
            //获取列表数据
            getList() {
                let para = {
                    pageNum: this.page,
                    keyWord: this.filtersKeyword,
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
            setUseDetail(id){
                let para = {
                    electricMeterId: id
                };
                this.innerListLoading = true;
                console.log(para);
                getElectricMeterRecordList(para).then((res) => {
                    let {msg, success} = res.data;
                    if (success) {
                        this.total = res.data.totalPages;
                        this.dataList.forEach(x=>{
                            if(x.id == id){
                                x.useElectricList = res.data.data;
                            }
                        })
                        console.log(this.dataList);
                        this.innerListLoading = false;
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
            batchRemove: function () {

            },
            handleCurrentChange: function (val) {
                this.page = val;
                this.getList();
            },
            showStatusText: function (row) {
                switch (row.status) {
                    case 0:
                        return "停止使用";
                    case 1:
                        return "使用中";
                }
            },
            formatFen2Yuan: function (row, column, cellValue) {
                return cellValue / 100;
            },
        },
        mounted() {
            // this.getList();
        }
    }
</script>

<style scoped>

</style>
