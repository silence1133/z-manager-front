<template>
    <div>
        <div class="form">
            <h1>商户合同信息</h1>
            <table>
                <tr>
                    <td class="thTd">合同编号</td>
                    <td>{{ printData.contract.contractCode }}</td>
                    <td class="thTd">经营业务</td>
                    <td>{{ printData.contract.business }}</td>
                </tr>
                <tr>
                    <td class="thTd">公司名称</td>
                    <td>{{ printData.contract.company }}</td>
                    <td class="thTd">法人</td>
                    <td>{{ printData.contract.coporateBody }}</td>
                </tr>
                <tr>
                    <td class="thTd">履约保证金</td>
                    <td>{{ printData.contract.cashBledge/100 }}元</td>
                    <td class="thTd">签约时间范围</td>
                    <td>{{ printData.contract.startDate.split(" ")[0] }} ~ {{ printData.contract.endDate.split(" ")[0] }}</td>
                </tr>
                <tr>
                    <td class="thTd">电费单价</td>
                    <td>{{ printData.contract.electricFee/100 }}元/度</td>
                    <td class="thTd">水费单价</td>
                    <td>{{ printData.contract.waterFee/100 }}元/吨</td>
                </tr>
                <tr>
                    <td class="thTd">租用年限</td>
                    <td>{{ printData.contract.rentYear }}年</td>
                    <td class="thTd">合同签订时间</td>
                    <td>{{ printData.contract.contractTime }}</td>
                </tr>
            </table>
            <h2>租赁商铺信息</h2>
            <table>
                <tr v-for="item in printData.houseList">
                    <td class="thTd">商铺编号</td>
                    <td>{{item.houseCode }}</td>
                    <td class="thTd">商铺面积</td>
                    <td>{{ item.area }}m²</td>
                    <td class="thTd">租金</td>
                    <td>{{ item.rentFee/100 }}(元/m²/月)</td>
                    <td class="thTd">物业费</td>
                    <td>{{ item.propertyFee/100 }}(元/m²/月)</td>
                </tr>
            </table>
            <h2>电表</h2>
            <table>
                <tr v-for="item in printData.electricMeterList">
                    <td class="thTd">电表编号</td>
                    <td>{{item.electricMeterCode }}</td>
                    <td class="thTd">总用电</td>
                    <td>{{ item.totalUseElectric }}度</td>
                </tr>
            </table>
            <h2>水表</h2>
            <table>
                <tr v-for="item in printData.waterMeterList">
                    <td class="thTd">水表编号</td>
                    <td>{{item.waterMeterCode }}</td>
                    <td class="thTd">总用水</td>
                    <td>{{ item.totalWater }} 吨</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>

    export default {
        name: "ContractPrint",
        data() {
            return {
                printData: JSON.parse(sessionStorage.getItem("contractPrint"))
            }
        },
        methods: {
            print: function () {
                window.print();
            }
        },
        mounted() {
            console.log(this.printData);
            this.print();
        }
    }
</script>

<style scoped>

    .form {
        width: 95%;
        margin: 0 auto;
    }

    table{
        width:100%;
        margin:15px 0;
    }

    table,table th,table td
    {
        font-size:0.95em;
        text-align:center;
        padding:4px;
        border:1px solid #dddddd;
        border-collapse:collapse
    }

    .thTd{
        font-weight:450;
    }

    tr {
        height: 40px;
        font-size: 20px;
    }


</style>
