<template>
    <div>
        <div class="form">
            <div class="header">
                <div style="font-size: 30px;font-weight:bold;text-align: center;letter-spacing:60px;">收据</div>
                <div style="border-bottom-style:double;width: 300px;margin-left: 200px;"></div>
                <div style="height: 5px;text-align: center;letter-spacing:5px;margin-top: 6px;padding-right: 53px;">
                    入账日期：{{$route.query.paidTime}}
                </div>

            </div>
            <div class="content">
                <table>
                    <tr>
                        <td>交款单位</td>
                        <td style="width: 250px;border-bottom:solid 1px black;text-align: left;">
                            {{$route.query.company}}
                        </td>
                        <td>收款方式</td>
                        <td style="width: 250px;border-bottom:solid 1px black;text-align: left;">
                            <span v-if="$route.query.paidMethod == 0">现金</span>
                            <span v-else-if="$route.query.paidMethod == 1">微信</span>
                            <span v-else-if="$route.query.paidMethod == 2">支付宝</span>
                            <span v-else-if="$route.query.paidMethod == 3">银行转账</span>
                            <span v-else-if="$route.query.paidMethod == 4">刷卡</span>
                        </td>
                    </tr>
                    <tr>
                        <td>人民币<span style="font-size: 10px;">(大写)</span></td>
                        <td style="width: 250px;border-bottom:solid 1px black;text-align: left;">
                            {{$route.query.paidFee}}
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>收款事由</td>
                        <td colspan="3" style="width: 250px;border-bottom:solid 1px black;text-align: left;">
                            {{$route.query.remarks}}
                        </td>
                    </tr>
                </table>
            </div>
            <div class="footer">
                <tr style="font-size: 18px;">
                    <td style="width: 300px;">单位盖章</td>
                    <td></td>
                    <td>收款人</td>
                    <td>&nbsp;&nbsp;&nbsp; {{$route.query.chargeMan}}</td>
                </tr>
            </div>
        </div>

        <div class="form">
            <div class="header">
                <div style="font-size: 30px;font-weight:bold;text-align: center;letter-spacing:60px;">收据</div>
                <div style="border-bottom-style:double;width: 300px;margin-left: 200px;"></div>
                <div style="height: 5px;text-align: center;letter-spacing:5px;margin-top: 6px;padding-right: 53px;">
                    入账日期：{{$route.query.paidTime}}
                </div>

            </div>
            <div class="content">
                <table>
                    <tr>
                        <td>交款单位</td>
                        <td style="width: 250px;border-bottom:solid 1px black;text-align: left;">
                            {{$route.query.company}}
                        </td>
                        <td>收款方式</td>
                        <td style="width: 250px;border-bottom:solid 1px black;text-align: left;">
                            <span v-if="$route.query.paidMethod == 0">现金</span>
                            <span v-else-if="$route.query.paidMethod == 1">微信</span>
                            <span v-else-if="$route.query.paidMethod == 2">支付宝</span>
                            <span v-else-if="$route.query.paidMethod == 3">银行转账</span>
                            <span v-else-if="$route.query.paidMethod == 4">刷卡</span>
                        </td>
                    </tr>
                    <tr>
                        <td>人民币<span style="font-size: 10px;">(大写)</span></td>
                        <td style="width: 250px;border-bottom:solid 1px black;text-align: left;">
                            {{$route.query.paidFee}}
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>收款事由</td>
                        <td colspan="3" style="width: 250px;border-bottom:solid 1px black;text-align: left;">
                            {{$route.query.remarks}}
                        </td>
                    </tr>
                </table>
            </div>
            <div class="footer">
                <tr style="font-size: 18px;">
                    <td style="width: 300px;">单位盖章</td>
                    <td></td>
                    <td>收款人</td>
                    <td>&nbsp;&nbsp;&nbsp; {{$route.query.chargeMan}}</td>
                </tr>
            </div>
        </div>

        <div class="form">
            <div class="header">
                <div style="font-size: 30px;font-weight:bold;text-align: center;letter-spacing:60px;">收据</div>
                <div style="border-bottom-style:double;width: 300px;margin-left: 200px;"></div>
                <div style="height: 5px;text-align: center;letter-spacing:5px;margin-top: 6px;padding-right: 53px;">
                    入账日期：{{$route.query.paidTime}}
                </div>

            </div>
            <div class="content">
                <table>
                    <tr>
                        <td>交款单位</td>
                        <td style="width: 250px;border-bottom:solid 1px black;text-align: left;">
                            {{$route.query.company}}
                        </td>
                        <td>收款方式</td>
                        <td style="width: 250px;border-bottom:solid 1px black;text-align: left;">
                            <span v-if="$route.query.paidMethod == 0">现金</span>
                            <span v-else-if="$route.query.paidMethod == 1">微信</span>
                            <span v-else-if="$route.query.paidMethod == 2">支付宝</span>
                            <span v-else-if="$route.query.paidMethod == 3">银行转账</span>
                            <span v-else-if="$route.query.paidMethod == 4">刷卡</span>
                        </td>
                    </tr>
                    <tr>
                        <td>人民币<span style="font-size: 10px;">(大写)</span></td>
                        <td style="width: 250px;border-bottom:solid 1px black;text-align: left;">
                            {{$route.query.paidFee}}
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>收款事由</td>
                        <td colspan="3" style="width: 250px;border-bottom:solid 1px black;text-align: left;">
                            {{$route.query.remarks}}
                        </td>
                    </tr>
                </table>
            </div>
            <div class="footer">
                <tr style="font-size: 18px;">
                    <td style="width: 300px;">单位盖章</td>
                    <td></td>
                    <td>收款人</td>
                    <td>&nbsp;&nbsp;&nbsp; {{$route.query.chargeMan}}</td>
                </tr>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FeePrint",
        data() {
            return {
                showPrint: true
            }
        },
        methods: {
            print: function () {
                window.print();
            }
        },
        mounted() {
            window.print();
        }
    }
</script>

<style scoped>

    .form {
        width: 750px;
        height: 350px;
        margin: 0 auto;
    }

    .header {
        height: 80px;
    }

    .content {
        border: 1px solid #aaa;
        height: 180px;
        width: 700px;
        text-align: center;
        margin-left: 20px;
        padding-left: 20px;
        padding-top: 20px;
    }

    .footer {
        height: 80px;
        padding: 20px;
    }

    tr {
        height: 50px;
        font-size: 20px;
    }


</style>
