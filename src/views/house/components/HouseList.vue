<template>
    <div>
        <!--列表-->
        <el-table :data="houseList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="40">
            </el-table-column>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="houseCode" label="商铺编号" width="100">
            </el-table-column>
            <el-table-column prop="address" label="商铺描述" width="120">
            </el-table-column>
            <el-table-column prop="area" label="面积（㎡）" width="120">
            </el-table-column>
            <el-table-column prop="rentFee" label="参考出租单价（元/㎡）" :formatter="formatFen2Yuan" width="120">
            </el-table-column>
            <el-table-column prop="propertyFee" label="参考物业费（元/㎡）" :formatter="formatFen2Yuan" width="120">
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
            <el-table-column prop="createTime" label="创建时间" width="120">
            </el-table-column>
            <el-table-column prop="createEmp" label="创建人">
            </el-table-column>
            <el-table-column prop="modifyTime" label="修改时间" width="120">
            </el-table-column>
            <el-table-column prop="modifyEmp" label="修改人">
            </el-table-column>
            <el-table-column prop="status" label="状态" :formatter="showStatusText">
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="110">
                <template slot-scope="scope">
                    <el-button type="warning" size="small" icon="el-icon-edit" circle
                               @click="handleEdit(scope.$index, scope.row)" title="编辑"></el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" circle
                               @click="handleDel(scope.$index, scope.row)" title="删除"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange"
                           :page-count="total" style="float:right;">
            </el-pagination>
        </el-col>


        <house-edit ref="houseEditRef" @getList="getList"></house-edit>
    </div>
</template>

<script>
    import {getHouseListPage, removeHouse} from "@/api/api";
    import HouseEdit from "@/views/house/components/HouseEdit";

    export default {
        name: "HouseList",
        components: {HouseEdit},
        props: {
            filtersHouseCode: String
        },
        data() {
            return {
                houseList: [],
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
                    keyWord: this.filtersHouseCode,
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
            handleEdit: function (index, row) {
                if (row.status == 2) {
                    this.$message({
                        message: "已经出租的不允许操作！",
                        type: 'error'
                    });
                    return;
                }
                this.$refs.houseEditRef.handleEdit(row);
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
                switch (row.status) {
                    case 0:
                        return "不可出租";
                    case 1:
                        return "可出租";
                    case 2:
                        return "已出租";
                }
            },
            formatFen2Yuan: function (row, column, cellValue) {
                return cellValue / 100;
            }
        },
        mounted() {
            this.getList();
        }
    }
</script>

<style scoped>

</style>
