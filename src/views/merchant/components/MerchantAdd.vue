<template>
    <!--新增界面-->
    <el-dialog title="新增商户" :visible.sync="addFormVisible" :close-on-click-modal="false" width="50%">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
            <el-row :gutter="2">
                <el-col :span="8">
                    <el-form-item label="商户编号" prop="merchantCode">
                        <el-input v-model="addForm.merchantCode" :maxlength="maxlength"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="身份证（营业执照号码）" prop="idCard" label-width="180px">
                        <el-input v-model.number="addForm.idCard" :maxlength="maxlength"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="2">
                <el-col :span="10">
                    <el-form-item label="法人" prop="corporateBody">
                        <el-input v-model.number="addForm.corporateBody" :maxlength="maxlength"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item label="公司名称" prop="company">
                        <el-input v-model="addForm.company" :maxlength="maxlength"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="2">
                <el-col :span="10">
                    <el-form-item label="联系人" prop="linkMan">
                        <el-input v-model="addForm.linkMan" :maxlength="maxlength"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item label="联系电话" prop="linkPhone">
                        <el-input v-model="addForm.linkPhone" :maxlength="maxlength"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="入场时间" prop="enteringTime">
                <el-date-picker type="date" placeholder="选择日期" v-model="addForm.enteringTime" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="经营品牌" prop="brand">
                <el-input v-model="addForm.brand" ></el-input>
            </el-form-item>
            <el-form-item label="公司地址" prop="address">
                <el-input v-model="addForm.address" :maxlength="maxlength"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
                <el-input v-model="addForm.remarks" :maxlength="maxlength" type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click.native="addFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {addMerchant} from "@/api/api";

    export default {
        name: "MerchantAdd",
        data() {
            return {
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    merchantCode: [
                        {required: true, message: '请输入商户编号', trigger: 'blur'},
                    ],
                    idCard: [
                        {required: true, message: '请输入身份证（营业执照号码）', trigger: 'blur'},
                    ]
                },
                //新增界面数据
                addForm: {
                    merchantCode: '',
                    company: '',
                    corporateBody: '',
                    idCard: '',
                    linkMan: '',
                    linkPhone: '',
                    brand: '',
                    address: '',
                    enteringTime: '',
                    remarks: ''
                },
                maxlength: 10
            }
        },
        methods: {
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.$refs['addForm'].resetFields();
                this.addForm = {
                    merchantCode: '',
                    company: '',
                    corporateBody: '',
                    idCard: '',
                    linkMan: '',
                    linkPhone: '',
                    brand: '',
                    address: '',
                    enteringTime: '',
                    remarks: ''
                };
            },
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let addParams = Object.assign({}, this.addForm);
                            addMerchant(addParams).then((res) => {
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
