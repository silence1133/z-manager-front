<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input v-model="filtersKeyWord" placeholder="关键字" style="width: 150px;"></el-input>
                    <el-date-picker v-model="filtersStartDate" type="date" placeholder="选择起始时间" style="width: 150px;" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                    <el-date-picker v-model="filtersEndDate" type="date" placeholder="选择截止时间" style="width: 150px;" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList" icon="el-icon-search" size="medium">查询</el-button>
                </el-form-item>
            </el-form>
            <report-list></report-list>
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
                filtersKeyWord: '',
                filtersStartDate: null,
                filtersEndDate: null
            }
        }
    }
</script>

<style scoped>

</style>
