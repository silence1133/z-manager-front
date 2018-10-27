<template>
    <div>
        <!--列表-->
        <el-table :data="dataList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="30">
            </el-table-column>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="merchantCode" label="商户编号" width="100">
            </el-table-column>
            <el-table-column prop="company" label="公司" width="120">
            </el-table-column>
            <el-table-column prop="corporateBody" label="法人">
            </el-table-column>
            <el-table-column prop="contractCode" label="合同编号" width="120">
            </el-table-column>
            <el-table-column label="租金" header-align="center">
                <el-table-column prop="rentFeeNeed" label="应缴（元）" width="100">
                </el-table-column>
                <el-table-column prop="rentFeePaid" label="已缴（元）" width="100">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="left">
                            <el-table :data="scope.row.payDetail" style="overflow:scroll;height: 200px;">
                                <el-table-column width="150" property="payDate" label="缴费时间"></el-table-column>
                                <el-table-column width="150" property="fee" label="缴费金额"></el-table-column>
                                <el-table-column width="150" property="dealMan" label="收费人"></el-table-column>
                            </el-table>
                            <el-button slot="reference" type="text">{{scope.row.rentFeePaid}}</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="rentFeeLeft" label="剩余应缴（元）" width="100">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="left">
                            <el-table :data="scope.row.rentFeeDetail" style="overflow:scroll;height: 200px;">
                                <el-table-column width="150" property="feeDate" label="应缴日期"></el-table-column>
                                <el-table-column width="150" property="needFee" label="应缴"></el-table-column>
                                <el-table-column width="150" property="paidFee" label="已缴"></el-table-column>
                            </el-table>
                            <el-button slot="reference" type="text">{{scope.row.rentFeeLeft}}</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="物业费" header-align="center">
                <el-table-column prop="propertyFeeNeed" label="应缴（元）" width="100">
                </el-table-column>
                <el-table-column prop="propertyFeePaid" label="已缴（元）" width="100">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="left">
                            <el-table :data="scope.row.payDetail" style="overflow:scroll;height: 200px;">
                                <el-table-column width="150" property="payDate" label="缴费时间"></el-table-column>
                                <el-table-column width="150" property="fee" label="缴费金额"></el-table-column>
                                <el-table-column width="150" property="dealMan" label="收费人"></el-table-column>
                            </el-table>
                            <el-button slot="reference" type="text">{{scope.row.propertyFeePaid}}</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="propertyFeeLeft" label="剩余应缴（元）" width="100">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="left">
                            <el-table :data="scope.row.rentFeeDetail">
                                <el-table-column width="150" property="feeDate" label="应缴日期"></el-table-column>
                                <el-table-column width="150" property="needFee" label="应缴"></el-table-column>
                                <el-table-column width="150" property="paidFee" label="已缴"></el-table-column>
                            </el-table>
                            <el-button slot="reference" type="text">{{scope.row.propertyFeeLeft}}</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="水费" header-align="center">
                <el-table-column prop="waterFeeNeed" label="应缴（元）" width="100">
                </el-table-column>
                <el-table-column prop="waterFeePaid" label="已缴（元）" width="100">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="left">
                            <el-table :data="scope.row.payDetail" style="overflow:scroll;height: 200px;">
                                <el-table-column width="150" property="payDate" label="缴费时间"></el-table-column>
                                <el-table-column width="150" property="fee" label="缴费金额"></el-table-column>
                                <el-table-column width="150" property="dealMan" label="收费人"></el-table-column>
                            </el-table>
                            <el-button slot="reference" type="text">{{scope.row.waterFeePaid}}</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="waterFeeLeft" label="剩余应缴（元）" width="100">
                </el-table-column>
            </el-table-column>
            <el-table-column label="电费" header-align="center">
                <el-table-column prop="electricFeeNeed" label="已缴（元）" width="100">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="left">
                            <el-table :data="scope.row.payDetail" style="overflow:scroll;height: 200px;">
                                <el-table-column width="150" property="payDate" label="缴费时间"></el-table-column>
                                <el-table-column width="150" property="fee" label="缴费金额"></el-table-column>
                                <el-table-column width="150" property="dealMan" label="收费人"></el-table-column>
                            </el-table>
                            <el-button slot="reference" type="text">{{scope.row.electricFeeNeed}}</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="electricFeePaid" label="已用（元）" width="100">
                </el-table-column>
                <el-table-column prop="electricFeeLeft" label="剩余（元）" width="100">
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

    export default {
        name: "ReceivablesList",
        components: {ReceiveFee},
        props: {
            filtersKeyWord: String
        },
        data() {
            return {
                dataList: [{
                    merchantCode: '213123',
                    company: '汽车止家',
                    corporateBody: '李想',
                    contractCode: 's232',
                    rentFeeNeed: 25000,
                    rentFeePaid: 5000,
                    rentFeeLeft: 20000,
                    propertyFeeNeed: 7000,
                    propertyFeePaid: 5000,
                    propertyFeeLeft: 2000,
                    waterFeeNeed: 500,
                    waterFeePaid: 0,
                    waterFeeLeft: 500,
                    electricFeeNeed: 230,
                    electricFeePaid: 230,
                    electricFeeLeft: 0,
                    rentFeeDetail: [{
                        feeDate: '2018-11-11',
                        needFee: 10000,
                        paidFee: 5000
                    },
                        {
                            feeDate: '2019-11-11',
                            needFee: 10000,
                            paidFee: 0
                        },
                        {
                            feeDate: '2020-11-11',
                            needFee: 5000,
                            paidFee: 0
                        }
                    ],
                    payDetail:[{
                        payDate:'2018-11-12 12:30',
                        fee:500,
                        dealMan:'zxy'
                    },{
                        payDate:'2018-11-12 12:30',
                        fee:500,
                        dealMan:'zxy'
                    },{
                        payDate:'2018-11-12 12:30',
                        fee:500,
                        dealMan:'zxy'
                    },{
                        payDate:'2018-11-12 12:30',
                        fee:500,
                        dealMan:'zxy'
                    },{
                        payDate:'2018-11-12 12:30',
                        fee:500,
                        dealMan:'zxy'
                    },{
                        payDate:'2018-11-12 12:30',
                        fee:500,
                        dealMan:'zxy'
                    }

                    ]
                }],
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
                    keyWord: this.filtersKeyWord,
                };
                this.listLoading = true;
                console.log(para);
                getHouseListPage(para).then((res) => {
                    let {msg, success} = res.data;
                    if (success) {
                        this.total = res.data.totalPages;
                        this.houseList = res.data.data;
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
            handleReceive: function (index, row) {
                this.$refs.receiveFeeRef.handleAdd(row);
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
            formatRentFee: function (row) {
                return row.rentFee / 100;
            },
            formatPropertyFee: function (row) {
                return row.propertyFee / 100;
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
            }
        },
        mounted() {
            // this.getList();
        }
    }
</script>

<style scoped>

</style>
