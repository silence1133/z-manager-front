<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input v-model="filtersKeyword" placeholder="关键字" style="width: 150px;"></el-input>
                    <el-date-picker v-model="filtersStartDate" type="date" placeholder="选择起始时间" style="width: 150px;" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                    <el-date-picker v-model="filtersEndDate" type="date" placeholder="选择截止时间" style="width: 150px;" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList" icon="el-icon-search" size="medium">查询</el-button>
                    <el-button type="warning" @click="getListPrint" icon="el-icon-printer" size="medium">打印报表</el-button>
                </el-form-item>
            </el-form>
            <report-list ref="reportListRef" :filtersKeyword="filtersKeyword" :filtersStartDate="filtersStartDate" :filtersEndDate="filtersEndDate"></report-list>
        </el-col>
    </section>
</template>

<script>
    import ReportList from "@/views/finance/components/ReportList";
    export default {
        name: "report",
        components: {ReportList},
        data() {
            return {
                filtersKeyword: '',
                filtersStartDate: null,
                filtersEndDate: null
            }
        },
        methods: {
            getList: function () {
                this.$refs.reportListRef.getList();
            },
            getListPrint: function () {
                let routeData = this.$router.resolve({
                    path: '/feeReportPrint', query: {
                        keyWord: this.filtersKeyword,
                        startPayTime: this.filtersStartDate,
                        endPayTime: this.filtersEndDate
                    }
                });
                window.open(routeData.href, '_blank');
            }
        }
    }
</script>

<style scoped>

</style>
