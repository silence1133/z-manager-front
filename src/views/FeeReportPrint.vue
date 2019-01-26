<template>
    <div>
        <div class="form">
            <table>
                <tr>
                    <th>合同编号</th>
                    <th>法人</th>
                    <th>公司</th>
                    <th>收据编号</th>
                    <th>收费类型</th>
                    <th>收款金额（元）</th>
                    <th>缴款人</th>
                    <th>缴费方式</th>
                    <th>缴费时间</th>
                    <th>收费人</th>
                </tr>
                <tr v-for="item in printData">
                    <td>{{ item.contractCode }}</td>
                    <td>{{ item.coporateBody }}</td>
                    <td>{{ item.company }}</td>
                    <td>{{ item.receiptCode }}</td>
                    <td>
                        <span v-if="item.feeType == 0">租金</span>
                        <span v-if="item.feeType == 1">物业</span>
                        <span v-if="item.feeType == 2">水费</span>
                        <span v-if="item.feeType == 3">电费</span>
                    </td>
                    <td>{{ item.paidFee/100 }}</td>
                    <td>{{ item.paidMan }}</td>
                    <td>
                        <span v-if="item.paidMethod == 0">现金</span>
                        <span v-if="item.paidMethod == 1">微信</span>
                        <span v-if="item.paidMethod == 2">支付宝</span>
                        <span v-if="item.paidMethod == 3">银行转账</span>
                        <span v-if="item.paidMethod == 4">刷卡</span>
                    </td>
                    <td>{{ item.paidTime }}</td>
                    <td>{{ item.chargeMan }}</td>
                </tr>
                <tr>
                    <td colspan="8"></td>
                    <td>合计：</td>
                    <td>{{ totalFee/100 }}（元）</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>

    import {getReportList} from "@/api/api";

    export default {
        name: "FeeReportPrint",
        data() {
            return {
                printData: [],
                totalFee: 0
            }
        },
        methods: {
            print: function () {
                window.print();
            },
            getList: function () {
                let para = {
                    pageNum: this.page,
                    keyWord: this.$route.query.keyWord,
                    startPayTime: this.$route.query.startPayTime,
                    endPayTime: this.$route.query.endPayTime,
                    payType: this.$route.query.payType,
                    feeType: this.$route.query.feeType
                };
                console.log(para);
                getReportList(para).then((res) => {
                    let {msg, success} = res.data;
                    if (success) {
                        this.printData = res.data.data;
                        this.printData.forEach(x => {
                            this.totalFee = x.paidFee + this.totalFee;
                        })
                        console.log(this.dataList);
                    } else {
                        this.$message({
                            message: msg,
                            type: 'error'
                        });
                    }
                });
            }
        },
        mounted() {
            this.getList();
        },
        updated() {
            this.print();
        }
    }
</script>

<style scoped>

    .form {
        width: 95%;
        margin: 0 auto;
    }

    table {
        width: 100%;
        margin: 15px 0;
    }

    table, table th, table td {
        font-size: 0.95em;
        text-align: center;
        padding: 4px;
        border: 1px solid #dddddd;
        border-collapse: collapse
    }

    th {
        background-color: #999999
    }

    tr {
        height: 25px;
        font-size: 15px;
    }


</style>
