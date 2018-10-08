<template>
    <!--新增界面-->
    <el-dialog title="签订合同" :visible.sync="addFormVisible" :close-on-click-modal="false" width="40%">
        <el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm" >
            <el-form-item label="合同编号" prop="contractCode">
                <el-input v-model="addForm.contractCode"></el-input>
            </el-form-item>
            <el-form-item label="经营业务" prop="business">
                <el-input v-model="addForm.business"></el-input>
            </el-form-item>

            <el-form-item label="合同时间" prop="contractDateRange">
                <el-date-picker
                        v-model="addForm.contractDateRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="履约保证金" prop="cashBledge">
                <el-row :gutter="6">
                    <el-col :span="12">
                        <el-input v-model.number="addForm.cashBledge" :maxlength="maxlength"></el-input>
                    </el-col>
                    <el-col :span="4">元</el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="电费单价" prop="electricFee">
                <el-row :gutter="6">
                    <el-col :span="12">
                        <el-input v-model.number="addForm.electricFee" :maxlength="maxlength" ></el-input>
                    </el-col>
                    <el-col :span="4">元/平/月</el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="水费单价" prop="waterFee">
                <el-row :gutter="6">
                    <el-col :span="12">
                        <el-input v-model.number="addForm.waterFee" :maxlength="maxlength"></el-input>
                    </el-col>
                    <el-col :span="4">元/平/月</el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="合同签订时间" prop="contractTime">
                <el-date-picker type="date" placeholder="选择日期" v-model="addForm.contractTime" ></el-date-picker>
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
    export default {
        name: "ContractAdd",
        data() {
            return {
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    contractCode: [
                        {required: true, message: '请输入商铺的编号', trigger: 'blur'},
                    ],
                    contractDateRange: [
                        {required: true, message: '请选择合同时间', trigger: 'blur'},
                    ],
                    electricFee:[
                        { required: true, message: '租金不能为空'},
                        { type: 'number', message: '租金必须为数字值'}
                    ],
                    waterFee:[
                        { required: true, message: '物业费不能为空'},
                        { type: 'number', message: '物业费必须为数字值'}
                    ]
                },
                //新增界面数据
                addForm: {
                    contractCode: '',
                    business: '',
                    contractDateRange: '',
                    cashBledge: '',
                    electricFee: '',
                    waterFee:'',
                    contractTime:'',
                    remarks:''
                },
                maxlength: 10
            }
        },
        methods:{
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.$refs['addForm'].resetFields();
                this.addForm = {
                    contractCode: '',
                    business: '',
                    contractDateRange: '',
                    cashBledge: '',
                    electricFee: '',
                    waterFee:'',
                    contractTime:'',
                    remarks:''
                };
            },
            addSubmit:function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let addParams = Object.assign({}, this.addForm);
                            addHouse(addParams).then((res) => {
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
