<template>
    <div>
        <!--列表-->
        <el-table :data="dataList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="40">
            </el-table-column>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="name" label="名称" width="100">
            </el-table-column>
            <el-table-column prop="type" label="类型" width="120">
            </el-table-column>
            <el-table-column prop="format" label="规格（单位）" width="120">
            </el-table-column>
            <el-table-column prop="stockNum" label="库存" width="120">
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
            <el-table-column label="操作" fixed="right" width="120">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="inStock(scope.$index, scope.row)">入库</el-button>
                    <el-button type="text" size="small" @click="outStock(scope.$index, scope.row)">出库</el-button>
                    <el-popover trigger="click" placement="left">
                        <el-table :data="scope.row.inDetail" style="overflow:scroll;height: 200px;" v-loading="innerListLoading">
                            <el-table-column width="150" property="createTime" label="入库时间"></el-table-column>
                            <el-table-column width="150" property="purchaseMan" label="采购人"></el-table-column>
                            <el-table-column width="150" property="num" label="采购数量"></el-table-column>
                            <el-table-column width="150" property="price" label="采购总额"></el-table-column>
                        </el-table>
                        <el-button slot="reference" type="text" size="mini"
                                   @click="setInDetail(scope.row.id)">
                            入库明细
                        </el-button>
                    </el-popover>
                    <el-popover trigger="click" placement="left">
                        <el-table :data="scope.row.outDetail" style="overflow:scroll;height: 200px;" v-loading="innerListLoading">
                            <el-table-column width="150" property="createTime" label="出库时间"></el-table-column>
                            <el-table-column width="150" property="depart" label="领用部门"></el-table-column>
                            <el-table-column width="150" property="num" label="出库数量"></el-table-column>
                            <el-table-column width="150" property="user" label="领用人"></el-table-column>
                        </el-table>
                        <el-button slot="reference" type="text" size="mini"
                                   @click="setOutDetail(scope.row.id)">
                            出库明细
                        </el-button>
                    </el-popover>
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

        <material-instock ref="instockRef" @getList="getList"></material-instock>
        <material-outstock ref="outstockRef" @getList="getList"></material-outstock>
    </div>
</template>

<script>
    import {getInstockList, getMaterialListPage, getOutstockList} from "@/api/api";
    import MaterialInstock from "@/views/material/components/MaterialInstock";
    import MaterialOutstock from "@/views/material/components/MaterialOutstock";

    export default {
        name: "MaterialList",
        components: {MaterialOutstock, MaterialInstock},
        props: {
            filtersKeyword: String
        },
        data() {
            return {
                dataList: [],
                total: 0,
                page: 1,
                listLoading: false,
                innerListLoading:false,
                sels: [],//列表选中列
            }
        },
        methods: {
            //获取列表数据
            getList() {
                let para = {
                    pageNum: this.page,
                    keyWord: this.filtersKeyword,
                };
                this.listLoading = true;
                console.log(para);
                getMaterialListPage(para).then((res) => {
                    let {msg, success} = res.data;
                    if (success) {
                        this.total = res.data.totalPages;
                        this.dataList = res.data.data;
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
            inStock:function (index,row) {
                this.$refs.instockRef.handleAdd(row.id);
            },
            outStock:function (index,row) {
                this.$refs.outstockRef.handleAdd(row.id);
            },
            setInDetail:function (materialId) {
                this.dataList.forEach(x => {
                    if (x.id == materialId) {
                        x.inDetail = null;
                        this.getInDetailList(materialId, x);
                    }
                })
            },
            getInDetailList:function(materialId,dataRow){
                let para = {
                    materialId: materialId
                };
                this.innerListLoading = true;
                console.log(para);
                getInstockList(para).then((res) => {
                    let {msg, success} = res.data;
                    if (success) {
                        dataRow.inDetail = res.data.data;
                        this.innerListLoading = false;
                    } else {
                        this.$message({
                            message: msg,
                            type: 'error'
                        });
                    }
                });
            },
            setOutDetail:function (materialId) {
                this.dataList.forEach(x => {
                    if (x.id == materialId) {
                        x.inDetail = null;
                        this.getOutDetailList(materialId, x);
                    }
                })
            },
            getOutDetailList:function(materialId,dataRow){
                let para = {
                    materialId: materialId
                };
                this.innerListLoading = true;
                console.log(para);
                getOutstockList(para).then((res) => {
                    let {msg, success} = res.data;
                    if (success) {
                        dataRow.outDetail = res.data.data;
                        this.innerListLoading = false;
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
        }
    }
</script>

<style scoped>

</style>
