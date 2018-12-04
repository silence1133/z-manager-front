<template>
    <div>
        <!--列表-->
        <el-table :data="dataList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="40">
            </el-table-column>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="contract.contractCode" label="合同编号" width="100">
            </el-table-column>
            <el-table-column prop="contract.company" label="公司" width="100">
            </el-table-column>
            <el-table-column prop="contract.business" label="经营业务" width="120">
            </el-table-column>
            <el-table-column prop="contract.cashBledge" label="履约保证金（元）" :formatter="formatFen2Yuan">
            </el-table-column>
            <!--<el-table-column prop="contract.startDate" label="起始日期" width="100">-->
            <!--</el-table-column>-->
            <el-table-column prop="contract.endDate" label="签约时间范围" width="200" :formatter="formatDateRange">
            </el-table-column>
            <el-table-column label="备注">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>备注: {{ scope.row.contract.remarks }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">查看备注</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="contract.electricFee" label="电费单价（元/度）" width="120" :formatter="formatFen2Yuan">
            </el-table-column>
            <el-table-column prop="contract.waterFee" label="水费单价（元/吨）" :formatter="formatFen2Yuan">
            </el-table-column>
            <el-table-column prop="contract.contractTime" label="合同签订时间" width="120" :formatter="formatDate">
            </el-table-column>
            <el-table-column prop="contract.rentYear" label="租用年限" width="120">
            </el-table-column>
            <el-table-column prop="contract.status" label="状态" :formatter="showStatusText" >
            </el-table-column>
            <el-table-column label="租用商铺信息" width="120">
                <template slot-scope="scope">
                    <el-popover trigger="click" placement="left">
                        <el-table :data="scope.row.houseList" style="overflow:scroll;height: 400px;">
                            <el-table-column width="150" property="houseCode" label="商铺编号"></el-table-column>
                            <el-table-column width="150" property="area" label="商铺面积"></el-table-column>
                            <el-table-column width="150" property="rentFee" label="租金(元/平/月)"
                                             :formatter="formatFen2Yuan"></el-table-column>
                            <el-table-column width="150" property="propertyFee" label="物业费(元/平/月)"
                                             :formatter="formatFen2Yuan"></el-table-column>
                        </el-table>
                        <el-button slot="reference" size="mini" type="primary" plain>查看商铺</el-button>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="电表" width="70">
                <template slot-scope="scope">
                    <el-popover trigger="click" placement="left">
                        <el-table :data="scope.row.electricMeterList">
                            <el-table-column width="150" property="electricMeterCode" label="电表编号"></el-table-column>
                            <el-table-column width="150" property="initMark" label="初使刻度"></el-table-column>
                            <el-table-column width="150" property="totalUseElectric" label="总用电（度）"></el-table-column>
                        </el-table>
                        <el-button slot="reference" size="mini" type="primary" plain>查看</el-button>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="水表" width="70">
                <template slot-scope="scope">
                    <el-popover trigger="click" placement="left">
                        <el-table :data="scope.row.waterMeterList">
                            <el-table-column width="150" property="waterMeterCode" label="水表编号"></el-table-column>
                            <el-table-column width="150" property="initMark" label="初使刻度"></el-table-column>
                            <el-table-column width="150" property="totalWater" label="总用水（吨）"></el-table-column>
                        </el-table>
                        <el-button slot="reference" size="mini" type="primary" plain>查看</el-button>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="合同处理" width="120">
                <template slot-scope="scope">
                    <el-button type="info" size="small" icon="el-icon-message" circle
                               @click="handleEdit(scope.$index, scope.row)" title="解约"></el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" circle
                               @click="handleDel(scope.$index, scope.row)" title="删除"></el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="130">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="addWaterMeter(scope.$index, scope.row)">添加水表</el-button>
                    <el-button type="text" size="small" @click="addElectricMeter(scope.$index, scope.row)">添加电表
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :page-count="total" style="float:right;">
            </el-pagination>
        </el-col>

        <water-meter-add ref="waterMeterAddRef" @getList="getList"></water-meter-add>
        <electric-meter-add ref="electricMeterAddRef" @getList="getList"></electric-meter-add>
    </div>
</template>

<script>

    import {editContractStatus, getContractListPage} from "@/api/api";
    import WaterMeterAdd from "@/views/contract/components/WaterMeterAdd";
    import ElectricMeterAdd from "@/views/contract/components/ElectricMeterAdd";
    import {dateFormat} from "@/api/common";

    export default {
        name: "ContractList",
        components: {ElectricMeterAdd, WaterMeterAdd},
        props: {
            filtersKeyword: String
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
                    keyWord: this.filtersKeyword
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
                this.$confirm('确认要终止合同吗？', '提示', {}).then(() => {
                    let para = {
                        id:row.contract.id,
                        status:2
                    };
                    console.log(para);
                    editContractStatus(para).then((data) => {
                        if (data.success) {
                            this.$message({
                                message: data.msg,
                                type: 'success'
                            });
                            this.getList();
                        } else {
                            this.$message({
                                message: data.msg,
                                type: 'error'
                            });
                        }
                    })
                })
            },
            handleDel: function (index, row) {
                this.$confirm('确认要作废合同吗？', '提示', {}).then(() => {
                    let para = {
                        id:row.contract.id,
                        status:0
                    };
                    console.log(para);
                    editContractStatus(para).then((data) => {
                        if (data.success) {
                            this.$message({
                                message: data.msg,
                                type: 'success'
                            });
                            this.getList();
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
                switch (row.contract.status) {
                    case 0:
                        return "无效";
                    case 1:
                        return "履约中";
                    case 2:
                        return "合同终止";
                }
            },
            formatFen2Yuan: function (row, column, cellValue) {
                return cellValue / 100;
            },
            addWaterMeter: function (index, row) {
                this.$refs.waterMeterAddRef.handleAdd(row.contract.id);
            },
            addElectricMeter: function (index, row) {
                this.$refs.electricMeterAddRef.handleAdd(row.contract.id);
            },
            formatDate: function (row, column, cellValue) {
                return dateFormat(new Date(cellValue),"yyyy-MM-dd");
            },
            formatDateRange: function (row, column, cellValue) {
                return dateFormat(new Date(row.contract.startDate),"yyyy-MM-dd")+" ～ "+dateFormat(new Date(cellValue),"yyyy-MM-dd");
            }
        },
        mounted() {
            this.getList();
        }
    }
</script>

<style scoped>

</style>
