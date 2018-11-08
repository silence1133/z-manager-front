<template>
    <div>
        <!--列表-->
        <el-table :data="dataList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="30">
            </el-table-column>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="chargeMainInfo.merchantCode" label="商户编号" width="100">
            </el-table-column>
            <el-table-column prop="chargeMainInfo.company" label="公司" width="120">
            </el-table-column>
            <el-table-column prop="chargeMainInfo.coporateBody" label="法人">
            </el-table-column>
            <el-table-column prop="chargeMainInfo.contractCode" label="合同编号" width="120">
            </el-table-column>
            <el-table-column label="租金" header-align="center">
                <el-table-column prop="chargeMainInfo.totalRentFee" label="应缴（元）" width="100"
                                 :formatter="formatFen2Yuan">
                </el-table-column>
                <el-table-column label="已缴（元）" width="100" :formatter="formatFen2Yuan">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="left">
                            <el-table :data="scope.row.paidDetail" style="overflow:scroll;height: 200px;"
                                      v-loading="innerListLoading">
                                <el-table-column width="150" property="paidTime" label="缴费时间"></el-table-column>
                                <el-table-column width="150" property="paidFee" label="缴费金额"
                                                 :formatter="formatFen2Yuan"></el-table-column>
                                <el-table-column width="150" property="chargeMan" label="收费人"></el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="mini" @click="printDetail(scope.$index, scope.row)"
                                                   title="打印">打印收据
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-button slot="reference" type="text"
                                       @click="setPaidDetail(scope.row.chargeMainInfo.contractId,0)">
                                {{formatFen2YuanText(scope.row.chargeMainInfo.paidRentFee)}}
                            </el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="chargeMainInfo.restRentFee" label="剩余应缴（元）" width="100"
                                 :formatter="formatFen2Yuan">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="left">
                            <el-table :data="scope.row.houseFeeList" style="overflow:scroll;height: 200px;">
                                <el-table-column width="150" property="payDeadline" label="应缴日期"></el-table-column>
                                <el-table-column width="150" property="totalRentFee" label="应缴"
                                                 :formatter="formatFen2Yuan"></el-table-column>
                                <el-table-column width="150" property="paidRentFee" label="已缴"
                                                 :formatter="formatFen2Yuan"></el-table-column>
                            </el-table>
                            <el-button slot="reference" type="text">
                                {{formatFen2YuanText(scope.row.chargeMainInfo.restRentFee)}}
                            </el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="物业费" header-align="center">
                <el-table-column prop="chargeMainInfo.totalPropertyFee" label="应缴（元）" width="100"
                                 :formatter="formatFen2Yuan">
                </el-table-column>
                <el-table-column prop="chargeMainInfo.paidPropertyFee" label="已缴（元）" width="100"
                                 :formatter="formatFen2Yuan">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="left">
                            <el-table :data="scope.row.paidDetail" style="overflow:scroll;height: 200px;">
                                <el-table-column width="150" property="paidTime" label="缴费时间"></el-table-column>
                                <el-table-column width="150" property="paidFee" label="缴费金额"
                                                 :formatter="formatFen2Yuan"></el-table-column>
                                <el-table-column width="150" property="chargeMan" label="收费人"></el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="mini" @click="printDetail(scope.$index, scope.row)"
                                                   title="打印">打印收据
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-button slot="reference" type="text"
                                       @click="setPaidDetail(scope.row.chargeMainInfo.contractId,1)">
                                {{formatFen2YuanText(scope.row.chargeMainInfo.paidPropertyFee)}}
                            </el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="chargeMainInfo.restPropertyFee" label="剩余应缴（元）" width="100"
                                 :formatter="formatFen2Yuan">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="left">
                            <el-table :data="scope.row.houseFeeList">
                                <el-table-column width="150" property="payDeadline" label="应缴日期"></el-table-column>
                                <el-table-column width="150" property="totalPropertyFee" label="应缴"
                                                 :formatter="formatFen2Yuan"></el-table-column>
                                <el-table-column width="150" property="paidPropertyFee" label="已缴"
                                                 :formatter="formatFen2Yuan"></el-table-column>
                            </el-table>
                            <el-button slot="reference" type="text">
                                {{formatFen2YuanText(scope.row.chargeMainInfo.restPropertyFee)}}
                            </el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="水费" header-align="center">
                <el-table-column prop="chargeMainInfo.totalWaterFee" label="应缴（元）" width="100"
                                 :formatter="formatFen2Yuan">
                </el-table-column>
                <el-table-column prop="chargeMainInfo.paidWaterFee" label="已缴（元）" width="100">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="left">
                            <el-table :data="scope.row.paidDetail" style="overflow:scroll;height: 200px;">
                                <el-table-column width="150" property="paidTime" label="缴费时间"></el-table-column>
                                <el-table-column width="150" property="paidFee" label="缴费金额"
                                                 :formatter="formatFen2Yuan"></el-table-column>
                                <el-table-column width="150" property="chargeMan" label="收费人"></el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="mini" @click="printDetail(scope.$index, scope.row)"
                                                   title="打印">打印收据
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-button slot="reference" type="text"
                                       @click="setPaidDetail(scope.row.chargeMainInfo.contractId,2)">
                                {{formatFen2YuanText(scope.row.chargeMainInfo.paidWaterFee)}}
                            </el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="chargeMainInfo.restWaterFee" label="剩余应缴（元）" width="100"
                                 :formatter="formatFen2Yuan">
                </el-table-column>
            </el-table-column>
            <el-table-column label="电费" header-align="center">
                <el-table-column prop="chargeMainInfo.paidElectricFee" label="已缴（元）" width="100">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="left">
                            <el-table :data="scope.row.paidDetail" style="overflow:scroll;height: 200px;">
                                <el-table-column width="150" property="paidTime" label="缴费时间"></el-table-column>
                                <el-table-column width="150" property="paidFee" label="缴费金额"
                                                 :formatter="formatFen2Yuan"></el-table-column>
                                <el-table-column width="150" property="chargeMan" label="收费人"></el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="mini" @click="printDetail(scope.$index, scope.row)"
                                                   title="打印">打印收据
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-button slot="reference" type="text"
                                       @click="setPaidDetail(scope.row.chargeMainInfo.contractId,3)">
                                {{formatFen2YuanText(scope.row.chargeMainInfo.paidElectricFee)}}
                            </el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="chargeMainInfo.usedElectricFee" label="已用（元）" width="100"
                                 :formatter="formatFen2Yuan">
                </el-table-column>
                <el-table-column prop="chargeMainInfo.restElectricFee" label="剩余（元）" width="100"
                                 :formatter="formatFen2Yuan">
                </el-table-column>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="80">
                <template slot-scope="scope">
                    <el-button type="success" size="small" round @click="handleReceive(scope.$index, scope.row)"
                               title="缴费">缴费
                    </el-button>
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


        <receive-fee ref="receiveFeeRef"></receive-fee>
    </div>
</template>

<script>
    import ReceiveFee from "@/views/finance/components/ReceiveFee";
    import {getFinanceListPage, getPaidDetailList} from "@/api/api";
    import {digitUppercase} from "@/api/common";

    export default {
        name: "ReceivablesList",
        components: {ReceiveFee},
        props: {
            filtersKeyWord: String
        },
        data() {
            return {
                dataList: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                innerListLoading: false
            }
        },
        methods: {
            //获取列表数据
            getList() {
                let para = {
                    pageNum: this.page,
                    keyWord: this.filtersKeyWord,
                };
                this.listLoading = true;
                console.log(para);
                getFinanceListPage(para).then((res) => {
                    let {msg, success} = res.data;
                    if (success) {
                        this.total = res.data.totalPages;
                        this.dataList = res.data.data;
                        console.log(this.dataList);
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
            handleReceive: function (index, row) {
                this.$refs.receiveFeeRef.handleAdd(row.chargeMainInfo);
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
            formatFen2Yuan: function (row, column, cellValue) {
                return cellValue / 100;
            },
            formatFen2YuanText: function (cellValue) {
                return cellValue / 100;
            },
            showStatusText: function (row) {
                switch (row.status) {
                    case 0:
                        return "不可出租";
                    case 1:
                        return "可出租";
                    case 2:
                        return "已出租";
                }
            },
            printDetail: function (index, row) {
                console.log(row);
                let routeData = this.$router.resolve({
                    path: '/print', query: {
                        company: row.company,
                        chargeMan: row.chargeMan,
                        remarks: row.remarks,
                        paidMethod: row.paidMethod,
                        paidTime: row.paidTime,
                        paidFee: digitUppercase(this.formatFen2YuanText(row.paidFee))
                    }
                });
                window.open(routeData.href, '_blank');
            },
            //获取列表数据
            getPaidDetailList(contractId, type, paidObj) {
                let para = {
                    contractId: contractId,
                    feeType: type,
                };
                this.innerListLoading = true;
                console.log(para);
                getPaidDetailList(para).then((res) => {
                    let {msg, success} = res.data;
                    if (success) {
                        paidObj.paidDetail = res.data.data;
                        paidObj.paidDetail.forEach(x => {
                            x.company = paidObj.chargeMainInfo.company;
                        });
                        console.log(paidObj);
                        this.innerListLoading = false;
                    } else {
                        this.$message({
                            message: msg,
                            type: 'error'
                        });
                    }
                });
            },
            setPaidDetail: function (contractId, type) {
                this.dataList.forEach(x => {
                    if (x.chargeMainInfo.contractId == contractId) {
                        x.paidDetail = null;
                        this.getPaidDetailList(contractId, type, x);
                    }
                })
            }
        },
        mounted() {
            this.getList();
        }
    }
</script>

<style scoped>

</style>
