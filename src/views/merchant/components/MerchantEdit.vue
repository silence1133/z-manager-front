<template>
    <!--新增界面-->
    <el-dialog title="修改商户" :visible.sync="editFormVisible" :close-on-click-modal="false" width="50%">
        <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
            <el-row :gutter="2">
                <el-col :span="16">
                    <el-form-item label="身份证（营业执照号码）" prop="idCard" label-width="180px">
                        <el-input v-model="editForm.idCard" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="2">
                <el-col :span="10">
                    <el-form-item label="法人" prop="corporateBody">
                        <el-input v-model="editForm.corporateBody"  ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item label="公司名称" prop="company">
                        <el-input v-model="editForm.company"  ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="2">
                <el-col :span="10">
                    <el-form-item label="联系人" prop="linkMan">
                        <el-input v-model="editForm.linkMan"  ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item label="联系电话" prop="linkPhone">
                        <el-input v-model="editForm.linkPhone" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="入场时间" prop="enteringTime">
                <el-date-picker type="date" placeholder="选择日期" v-model="editForm.enteringTime" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="经营品牌" prop="brand">
                <el-input v-model="editForm.brand" ></el-input>
            </el-form-item>
            <el-form-item label="公司地址" prop="address">
                <el-input v-model="editForm.address"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
                <el-input v-model="editForm.remarks"  type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="商户状态" prop="status">
                <el-radio-group v-model="editForm.status">
                    <el-radio :label="1">可用</el-radio>
                    <el-radio :label="0">作废</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" :loading="editLoading">提交</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {editMerchant} from "@/api/api";

    export default {
        name: "MerchantEdit",
        data() {
            return {
                editFormVisible: false,//新增界面是否显示
                editLoading: false,
                editFormRules: {
                    idCard: [
                        {required: true, message: '请输入身份证（营业执照号码）', trigger: 'blur'},
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
                    company: rowData.company,
                    status: rowData.status,
                    corporateBody: rowData.corporateBody,
                    idCard: rowData.idCard,
                    linkMan: rowData.linkMan,
                    linkPhone: rowData.linkPhone,
                    brand: rowData.brand,
                    address: rowData.address,
                    enteringTime: rowData.enteringTime,
                    remarks: rowData.remarks
                };
            },
            addSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let addParams = Object.assign({}, this.editForm);
                            editMerchant(addParams).then((res) => {
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
