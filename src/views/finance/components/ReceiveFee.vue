<template>
    <el-dialog title="缴费" :visible.sync="addFormVisible" :close-on-click-modal="false" width="30%">
        <el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm" >
            <el-form-item label="法人" prop="corporateBody">
                <strong>{{addForm.corporateBody}}</strong>
            </el-form-item>
            <el-form-item label="公司名称" prop="company">
                <strong>{{addForm.company}}</strong>
            </el-form-item>
            <el-form-item label="商户编号" prop="merchantCode">
                <strong>{{addForm.merchantCode}}</strong>
            </el-form-item>
            <el-form-item label="合同编号" prop="contractCode">
                <strong>{{addForm.contractCode}}</strong>
            </el-form-item>
            <el-form-item label="应缴费用">
                <strong>{{addForm.needFee}}</strong>
            </el-form-item>
            <el-form-item label="缴费类型" prop="contractCode">
                <el-select v-model="addForm.payType" placeholder="缴费类型">
                    <el-option
                            v-for="item in payTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="缴费方式" prop="contractCode">
                <el-select v-model="addForm.payWay" placeholder="缴费方式">
                    <el-option
                            v-for="item in payWays"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="本次缴费" prop="payFee">
                <el-input v-model="addForm.payFee" style="width: 130px;"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click.native="addFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" :loading="addLoading">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "ReceiveFee",
        data() {
            return {
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                },
                needFee:5000,
                //新增界面数据
                addForm: {
                    merchantCode:'',
                    company:'',
                    corporateBody:'',
                    contractCode:'',
                    needFee:5000,
                    payFee:null
                },
                payWays: [{
                    value: '1',
                    label: '现金'
                }, {
                    value: '2',
                    label: '刷卡'
                }, {
                    value: '3',
                    label: '支付宝'
                }, {
                    value: '4',
                    label: '微信'
                }, {
                    value: '5',
                    label: '转账'
                }],
                payTypes: [{
                    value: '1',
                    label: '租金'
                }, {
                    value: '2',
                    label: '物业费'
                }, {
                    value: '3',
                    label: '水费'
                }, {
                    value: '4',
                    label: '电费'
                }]
            }
        },
        methods:{
            //显示新增界面
            handleAdd: function (row) {
                this.addFormVisible = true;
                this.addForm = {
                    merchantCode:row.merchantCode,
                    company:row.company,
                    corporateBody:row.corporateBody,
                    contractCode:row.contractCode,
                    needFee:5000,
                    payFee:null
                };
                console.log(this.addForm);
            },
            addSubmit:function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let addParams = Object.assign({}, this.addForm);
                            addWaterMeter(addParams).then((res) => {
                                console.log(res.data);
                                this.addLoading = false;
                                let {msg, success} = res.data;
                                if (success) {
                                    this.$message({
                                        message: msg,
                                        type: 'success'
                                    });
                                    this.$refs['addForm'].resetFields();
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
