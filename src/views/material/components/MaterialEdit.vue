<template>
    <!--新增界面-->
    <el-dialog title="修改资产" :visible.sync="editFormVisible" :close-on-click-modal="false" width="30%">
        <el-form :model="editForm" label-width="110px" :rules="editFormRules" ref="editForm">
            <el-form-item label="资产类型" prop="houseCode">
                <el-input v-model="editForm.type"></el-input>
            </el-form-item>
            <el-form-item label="资产名称" prop="editress">
                <el-input v-model="editForm.name"></el-input>
            </el-form-item>
            <el-form-item label="规格（单位）" prop="editress">
                <el-input v-model="editForm.format"></el-input>
            </el-form-item>
            <el-form-item label="存放位置" prop="stockAddr">
                <el-input v-model="editForm.stockAddr"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
                <el-input v-model="editForm.remarks" type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {editMaterial} from "@/api/api";

    export default {
        name: "MaterialEdit",
        data() {
            return {
                editFormVisible: false,//新增界面是否显示
                editLoading: false,
                editFormRules: {},
                //新增界面数据
                editForm: {
                    type: '',
                    name: '',
                    format: '',
                    stockeditr: '',
                    remarks: ''
                }
            }
        },
        methods: {
            //显示新增界面
            handleEdit: function (rowData) {
                console.log(rowData);
                this.editFormVisible = true;
                this.editForm = {
                    id:rowData.id,
                    type: rowData.type,
                    name: rowData.name,
                    format: rowData.format,
                    stockAddr: rowData.stockAddr,
                    remarks: rowData.remarks
                };
            },
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let editParams = Object.assign({}, this.editForm);
                            editMaterial(editParams).then((res) => {
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
