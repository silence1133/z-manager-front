<template>
    <!--新增界面-->
    <el-dialog title="修改商铺" :visible.sync="editFormVisible" :close-on-click-modal="false" width="40%">
        <el-form :model="editForm" label-width="110px" :rules="editFormRules" ref="editForm">
            <el-form-item label="商铺描述" prop="address">
                <el-input v-model="editForm.address" :maxlength="maxlength"></el-input>
            </el-form-item>
            <el-form-item label="面积" prop="area">
                <el-row :gutter="6">
                    <el-col :span="12">
                        <el-input v-model.number="editForm.area" :maxlength="maxlength"></el-input>
                    </el-col>
                    <el-col :span="4">㎡</el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="参考租金单价" prop="rentFee">
                <el-row :gutter="6">
                    <el-col :span="12">
                        <el-input v-model.number="editForm.rentFee" :maxlength="maxlength"></el-input>
                    </el-col>
                    <el-col :span="4">元/平/月</el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="参考物业费" prop="propertyFee">
                <el-row :gutter="6">
                    <el-col :span="12">
                        <el-input v-model.number="editForm.propertyFee" :maxlength="maxlength"></el-input>
                    </el-col>
                    <el-col :span="4">元/平/月</el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="商铺状态" prop="status">
                <el-radio-group v-model="editForm.status">
                    <el-radio :label="1">可出租</el-radio>
                    <el-radio :label="0">不可出租</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
                <el-input v-model="editForm.remarks" :maxlength="maxlength" type="textarea"></el-input>
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
                editFormRules: {
                    area: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                    ],
                    rentFee: [
                        {required: true, message: '租金不能为空'},
                        {type: 'number', message: '租金必须为数字值'}
                    ],
                    propertyFee: [
                        {required: true, message: '物业费不能为空'},
                        {type: 'number', message: '物业费必须为数字值'}
                    ],
                    area: [
                        {required: true, message: '面积不能为空'},
                        {type: 'number', message: '面积必须为数字值'}
                    ]
                },
                //新增界面数据
                editForm: {

                }
            }
        },
        methods: {
            //显示新增界面
            handleEdit: function (rowData) {
                this.editFormVisible = true;
                this.editForm = {
                    id:rowData.id,
                    address: rowData.address,
                    area: rowData.area,
                    rentFee: rowData.rentFee/100,
                    propertyFee: rowData.propertyFee/100,
                    remarks: rowData.remarks,
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
                            //元转化为分提交给后段
                            editParams.rentFee = editParams.rentFee * 100;
                            editParams.propertyFee = editParams.propertyFee * 100;
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
