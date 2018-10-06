<template>
    <div>
        <!--列表-->
        <el-table :data="merchantList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="40">
            </el-table-column>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="merchantCode" label="商户编号" width="100">
            </el-table-column>
            <el-table-column prop="company" label="公司" width="120">
            </el-table-column>
            <el-table-column prop="corporateBody" label="法人">
            </el-table-column>
            <el-table-column prop="idCard" label="身份证（营业执照）"  width="100">
            </el-table-column>
            <el-table-column prop="linkMan" label="联系人"  width="100">
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
            <el-table-column prop="brand" label="经营品牌" width="120">
            </el-table-column>
            <el-table-column prop="address" label="联系地址">
            </el-table-column>
            <el-table-column prop="modifyTime" label="修改时间" width="120">
            </el-table-column>
            <el-table-column prop="enteringTime" label="进场时间" width="120">
            </el-table-column>
            <el-table-column prop="modifyEmp" label="修改人">
            </el-table-column>
            <el-table-column prop="status" label="状态" :formatter="showStatusText">
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="140">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>
    </div>
</template>

<script>

    import {getMerchantListPage} from "@/api/api";

    export default {
        name: "MerchantList",
        props: {
            filtersMerchantCode: String,
            filtersCompany:String
        },
        data() {
            return {
                merchantList: [],
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
                    page: this.page,
                    name: this.filtersHouseCode,
                };
                this.listLoading = true;
                console.log(para);
                getMerchantListPage(para).then((res) => {
                    let {msg, success} = res.data;
                    if (success) {
                        this.total = res.data.totalPages;
                        this.merchantList = res.data.data;
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

            },
            handleDel: function (index, row) {
                //
                this.$confirm('确认要删除吗？', '提示', {}).then(() => {

                    removeHouse(row.id).then((data)=>{
                        if(data.success){
                            this.$message({
                                message: data.msg,
                                type: 'success'
                            });
                            this.getUsers();
                        }else{
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
            showStatusText:function (row) {
                switch (row.status) {
                    case 0:return "未签约";
                    case 1:return "已签约";
                }
            }
        },
        mounted() {
            this.getList();
        }
    }
</script>

<style scoped>

</style>
