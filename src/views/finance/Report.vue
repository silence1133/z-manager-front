<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input v-model="filtersKeyword" placeholder="合同编号/法人/公司名称/收据编号" style="width: 240px;"></el-input>
                    <el-date-picker v-model="filtersStartDate" type="date" placeholder="选择起始时间" style="width: 150px;"
                                    value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                    <el-date-picker v-model="filtersEndDate" type="date" placeholder="选择截止时间" style="width: 150px;"
                                    value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                    <el-select v-model="feeType" placeholder="缴费类型">
                        <el-option
                                v-for="item in feeTypes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="payType" placeholder="缴费方式">
                        <el-option
                                v-for="item in payWays"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList" icon="el-icon-search" size="medium">查询</el-button>
                    <el-button type="warning" @click="getListPrint" icon="el-icon-printer" size="medium">打印报表
                    </el-button>
                </el-form-item>
            </el-form>
            <report-list ref="reportListRef" :filtersKeyword="filtersKeyword" :filtersStartDate="filtersStartDate"
                         :filtersEndDate="filtersEndDate" :feeType="feeType" :payType="payType"></report-list>
        </el-col>
    </section>
</template>

<script>
    import ReportList from "@/views/finance/components/ReportList";
    import {feeTypes, payWays} from "@/api/common";

    export default {
        name: "report",
        components: {ReportList},
        data() {
            return {
                filtersKeyword: '',
                filtersStartDate: null,
                filtersEndDate: null,
                payType: null,
                feeType: null,
                payWays: payWays,
                feeTypes: feeTypes
            }
        },
        methods: {
            getList: function () {
                if ((this.filtersStartDate != null && this.filtersEndDate == null) ||
                    (this.filtersStartDate == null && this.filtersEndDate != null)) {
                    this.$message({
                        message: "查询起始时间不能空",
                        type: 'error'
                    });
                    return;
                }
                this.$refs.reportListRef.getList();
            },
            getListPrint: function () {
                if ((this.filtersStartDate != null && this.filtersEndDate == null) ||
                    (this.filtersStartDate == null && this.filtersEndDate != null)) {
                    this.$message({
                        message: "查询起始时间不能空",
                        type: 'error'
                    });
                    return;
                }
                let routeData = this.$router.resolve({
                    path: '/feeReportPrint', query: {
                        keyWord: this.filtersKeyword,
                        startPayTime: this.filtersStartDate,
                        endPayTime: this.filtersEndDate,
                        payType:this.payType,
                        feeType:this.feeType
                    }
                });
                window.open(routeData.href, '_blank');
            }
        }
    }
</script>

<style scoped>

</style>
