<template>
    <div>
        <!--列表-->
        <el-table :data="dataList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="40">
            </el-table-column>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="waterMeterCode" label="水表编号" width="100">
            </el-table-column>
            <el-table-column prop="contractCode" label="归属合同编号" width="120">
            </el-table-column>
            <el-table-column prop="initMark" label="初始刻度" width="120">
            </el-table-column>
            <el-table-column prop="totalWater" label="总用水（吨）" width="120">
                <template slot-scope="scope">
                    <el-popover trigger="click" placement="left">
                        <el-table :data="scope.row.useWaterList" style="overflow:scroll;height: 200px;" v-loading="innerListLoading">
                            <el-table-column width="150" property="createTime" label="抄表时间"></el-table-column>
                            <el-table-column width="150" property="startMark" label="起始刻度"></el-table-column>
                            <el-table-column width="150" property="endMark" label="截止刻度"></el-table-column>
                        </el-table>
                        <el-button slot="reference" type="text" @click="setUseDetail(scope.row.id)">{{scope.row.totalWater}}</el-button>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="totalWaterFee" label="总水费" :formatter="formatFen2Yuan" width="120">
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
            <el-table-column prop="status" label="状态" :formatter="showStatusText">
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
            <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange"
                           :page-count="total" style="float:right;">
            </el-pagination>
        </el-col>
    </div>
</template>

<script>
    import {getWaterMeterListPage, getWaterMeterRecordList} from "@/api/api";

    export default {
        name: "WaterMeterList",
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
                getWaterMeterListPage(para).then((res) => {
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
                    waterMeterId: id
                };
                this.innerListLoading = true;
                console.log(para);
                getWaterMeterRecordList(para).then((res) => {
                    let {msg, success} = res.data;
                    if (success) {
                        this.total = res.data.totalPages;
                        this.dataList.forEach(x=>{
                            if(x.id == id){
                                x.useWaterList = res.data.data;
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
            this.getList();
        }
    }
</script>

<style scoped>

</style>
