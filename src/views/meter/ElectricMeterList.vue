<template>
    <div>
        <!--列表-->
        <el-table :data="dataList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="40">
            </el-table-column>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="electricMeterCode" label="电表编号" width="100">
            </el-table-column>
            <el-table-column prop="contractCode" label="归属合同编号" width="120">
            </el-table-column>
            <el-table-column prop="initMark" label="初始刻度" width="120">
            </el-table-column>
            <el-table-column prop="totalUseElectric" label="总用电（度）" width="120">
                <template slot-scope="scope">
                    <el-popover trigger="click" placement="left">
                        <el-table :data="scope.row.useElectricList" style="overflow:scroll;height: 200px;" v-loading="innerListLoading">
                            <el-table-column width="150" property="createTime" label="抄表时间"></el-table-column>
                            <el-table-column width="150" property="startMark" label="起始刻度"></el-table-column>
                            <el-table-column width="150" property="endMark" label="截止刻度"></el-table-column>
                        </el-table>
                        <el-button slot="reference" type="text" @click="setUseDetail(scope.row.id)">{{scope.row.totalUseElectric}}</el-button>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="totalUseElectricFee" label="总电费" :formatter="formatFen2Yuan" width="120">
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
            <el-table-column label="操作" fixed="right" width="160">
                <template slot-scope="scope">
                    <el-button type="warning" size="small" icon="el-icon-edit" round @click="handleEdit(scope.$index, scope.row)" title="录入电表刻度">录入电表刻度</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange"
                           :page-count="total" style="float:right;">
            </el-pagination>
        </el-col>


        <el-dialog title="录入用电情况" :visible.sync="addFormVisible" :close-on-click-modal="false" width="30%">
            <el-form :model="addForm" :rules="addFormRules" ref="addForm">
                <el-form-item label="当前电表刻度" prop="currentMark" label-width="30%">
                    <el-input v-model.number="addForm.currentMark"></el-input>
                </el-form-item>
                <el-form-item label="抄表时间" prop="markDate" label-width="30%">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addForm.markDate"
                                    value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {addElectricRecord, getElectricMeterListPage, getElectricMeterRecordList} from "@/api/api";

    export default {
        name: "ElectricMeterList",
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
                addFormVisible:false,
                addLoading:false,
                addForm:{
                    electricMeterId:null,
                    currentMark:null,
                    markDate:null
                },
                addFormRules:{
                    currentMark: [
                        {required: true, message: '请输入当前电表刻度', trigger: 'blur'},
                        {type: 'number', message: '必须为数值'}
                    ],
                    markDate: [
                        {required: true, message: '请选择抄表日期', trigger: 'blur'}
                    ]
                },
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
                getElectricMeterListPage(para).then((res) => {
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
                this.addFormVisible = true;
                this.addForm = {};
                this.addForm.electricMeterId = row.id
                console.log(this.addForm);
            },
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let addParams = Object.assign({}, this.addForm);
                            console.log(addParams);
                            addElectricRecord(addParams).then((res) => {
                                console.log(res);
                                this.addLoading = false;
                                let {msg, success} = res;
                                if (success) {
                                    this.$message({
                                        message: msg,
                                        type: 'success'
                                    });
                                    this.addFormVisible = false;
                                    this.getList();
                                } else {
                                    this.$message({
                                        message: msg,
                                        type: 'error'
                                    });
                                }
                            });
                        });
                    }
                });
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
