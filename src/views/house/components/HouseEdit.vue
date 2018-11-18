<template>
    <!--新增界面-->
    <el-dialog title="修改商铺状态" :visible.sync="editFormVisible" :close-on-click-modal="false" width="30%">
        <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
            <el-form-item label="" prop="status">
                <el-radio-group v-model="editForm.status">
                    <el-radio :label="1">可出租</el-radio>
                    <el-radio :label="0">不可出租</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {editHouse} from "@/api/api";

    export default {
        name: "HouseEdit",
        data() {
            return {
                editFormVisible: false,//新增界面是否显示
                editLoading: false,
                editFormRules: {},
                //新增界面数据
                editForm: {
                    status: null
                }
            }
        },
        methods: {
            //显示新增界面
            handleEdit: function (rowData) {
                this.editFormVisible = true;
                this.editForm = {
                    id: rowData.id,
                    status: rowData.status
                };
                console.log(this.editForm);
            },
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let editParams = Object.assign({}, this.editForm);
                            editHouse(editParams).then((res) => {
                                console.log(res);
                                this.editLoading = false;
                                let {msg, success} = res;
                                if (success) {
                                    this.$message({
                                        message: msg,
                                        type: 'success'
                                    });
                                    this.editFormVisible = false;
                                    this.$emit('getList');
                                } else {
                                    this.$message({
                                        message: msg,
                                        type: 'error'
                                    });
                                }
                            });
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
