<template>
    <el-dialog title="缴费" :visible.sync="addFormVisible" :close-on-click-modal="false" width="40%">
        <el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm">

            <el-row :gutter="2">
                <el-col :span="8">
                    <el-form-item label="商户编号" prop="merchantCode">
                        <strong>{{addForm.merchantCode}}</strong>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="合同编号" prop="contractCode">
                        <strong>{{addForm.contractCode}}</strong>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="2">
                <el-col :span="8">
                    <el-form-item label="法人" prop="corporateBody">
                        <strong>{{addForm.coporateBody}}</strong>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="公司名称" prop="company">
                        <strong>{{addForm.company}}</strong>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="缴费类型" prop="feeType">
                <el-select v-model="addForm.feeType" placeholder="缴费类型">
                    <el-option
                            v-for="item in feeTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="缴费方式" prop="paidMethod">
                <el-select v-model="addForm.paidMethod" placeholder="缴费方式">
                    <el-option
                            v-for="item in payWays"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="缴费人" prop="paidMan">
                <el-input v-model="addForm.paidMan" style="width: 130px;"></el-input>
            </el-form-item>
            <el-form-item label="缴费金额" prop="paidFee">
                <el-input v-model.number="addForm.paidFee" style="width: 130px;"></el-input>&nbsp;元
            </el-form-item>
            <el-form-item label="缴费事由" prop="remarks">
                <el-input v-model="addForm.remarks" maxlength="50" type="textarea" rows="3"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click.native="addFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" :loading="addLoading">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {feeTypes, payWays} from "@/api/common";
    import {addCharge} from "@/api/api";

    export default {
        name: "ReceiveFee",
        data() {
            return {
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    feeType: [
                        {required: true, message: '请选择缴费类型', trigger: 'blur'},
                    ],
                    paidMethod: [
                        {required: true, message: '请选择缴费方式', trigger: 'blur'},
                    ],
                    paidMan: [
                        {required: true, message: '请输入缴费人', trigger: 'blur'},
                    ],
                    paidFee: [
                        {required: true, message: '请填写缴费金额', trigger: 'blur'},
                        {type: 'number', message: '租金必须为数字值'}
                    ],
                    remarks: [
                        {required: true, message: '请填写缴费是事由', trigger: 'blur'},
                    ]
                },
                //新增界面数据
                addForm: {},
                payWays: payWays,
                feeTypes: feeTypes
            }
        },
        methods: {
            //显示新增界面
            handleAdd: function (rowData) {
                this.addFormVisible = true;
                this.addForm = null;
                this.addForm = Object.assign({}, rowData);
                console.log(this.addForm);
            },
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let addParams = JSON.parse(JSON.stringify(this.addForm));
                            addParams.paidFee = addParams.paidFee * 100;
                            console.log(addParams);
                            addCharge(addParams).then((res) => {
                                console.log(res);
                                this.addLoading = false;
                                let {msg, success} = res;
                                if (success) {
                                    this.$message({
                                        message: msg,
                                        type: 'success'
                                    });

                                    let payDetail = res.data;
                                    payDetail.company = addParams.company;
                                    this.printConfirm(payDetail);

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
            },
            printConfirm: function (payDetail) {
                this.$confirm('缴费成功，是否打印收据?', '提示', {
                    confirmButtonText: '打印',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    // this.$message({
                    //     type: 'success',
                    //     message: '删除成功!'
                    // });
                    console.log(payDetail);
                    this.$emit('getList');
                    this.$emit('printDetail',null,payDetail);
                }).catch(() => {
                    console.log("dfads");
                    this.$emit('getList');
                });
            }
        }
    }
</script>

<style scoped>

</style>
