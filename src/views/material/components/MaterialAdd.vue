<template>
    <!--新增界面-->
    <el-dialog title="新增资产" :visible.sync="addFormVisible" :close-on-click-modal="false" width="30%">
        <el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm">
            <el-form-item label="资产类型" prop="houseCode">
                <el-input v-model="addForm.type"></el-input>
            </el-form-item>
            <el-form-item label="资产名称" prop="address">
                <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="规格（单位）" prop="address">
                <el-input v-model="addForm.format"></el-input>
            </el-form-item>
            <el-form-item label="存放位置" prop="address">
                <el-input v-model="addForm.stockAddr"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
                <el-input v-model="addForm.remarks" type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click.native="addFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {addMaterial} from "@/api/api";

    export default {
        name: "MaterialAdd",
        data() {
            return {
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {},
                //新增界面数据
                addForm: {
                    type: '',
                    name: '',
                    format: '',
                    stockAddr: '',
                    remarks: ''
                }
            }
        },
        methods: {
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    type: '',
                    name: '',
                    format: '',
                    stockAddr: '',
                    remarks: ''
                };
            },
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let addParams = Object.assign({}, this.addForm);
                            addMaterial(addParams).then((res) => {
                                console.log(res);
                                this.addLoading = false;
                                let {msg, success} = res;
                                if (success) {
                                    this.$message({
                                        message: msg,
                                        type: 'success'
                                    });
                                    this.addFormVisible = false;
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
