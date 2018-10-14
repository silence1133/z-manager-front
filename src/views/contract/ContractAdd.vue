<template>
    <!--新增界面-->
    <section>
        <el-form :model="addForm" label-width="140px" :rules="addFormRules" ref="addForm">
            <el-row :gutter="2">
                <el-col :span="8">
                    <el-form-item label="商户编号">
                        {{addForm.merchantCode}}
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="合同编号" prop="contractCode">
                        <el-input v-model="addForm.contractCode" maxlength="20" style="width: 230px;"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="2">
                <el-col :span="8">
                    <el-form-item label="经营业务" prop="business">
                        <el-input v-model="addForm.business"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="合同时间" prop="contractDateRange">
                        <el-date-picker
                                v-model="addForm.contractDateRange"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="6">
                <el-col :span="8">
                    <el-form-item label="合同签订时间" prop="contractTime">
                        <el-date-picker type="date" placeholder="选择日期" v-model="addForm.contractTime"
                                        value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="履约保证金" prop="cashBledge">
                        <el-row :gutter="2">
                            <el-col :span="12">
                                <el-input v-model.number="addForm.cashBledge" maxlength="20"></el-input>
                            </el-col>
                            <el-col :span="4">元</el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="2">
                <el-col :span="8">
                    <el-form-item label="电费单价" prop="electricFee">
                        <el-row :gutter="2">
                            <el-col :span="12">
                                <el-input v-model.number="addForm.electricFee" maxlength="20"></el-input>
                            </el-col>
                            <el-col :span="6">元/度</el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="水费单价" prop="waterFee">
                        <el-row :gutter="2">
                            <el-col :span="12">
                                <el-input v-model.number="addForm.waterFee" maxlength="20"></el-input>
                            </el-col>
                            <el-col :span="6">元/吨</el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="备注" prop="remarks">
                <el-input v-model="addForm.remarks" maxlength="20" type="textarea" rows="3"></el-input>
            </el-form-item>
            <div style="border:1px dashed darkgray;padding: 30px;">
                <el-form-item label="选择商铺" prop="houseList">
                    <house-choose @setHouseList="setHouseList"></house-choose>
                </el-form-item>
                <el-form-item label="租用商铺年限" prop="rentYear">
                    <el-input-number v-model.number="addForm.rentYear" @change="showPayPercent" :min="1"
                                     :max="10"></el-input-number>
                </el-form-item>
                <el-form-item label="租金缴纳月数分配" prop="rentMonth">
                    <el-input style="width: 140px;" v-for="(text,index) in placeholderTextList" :key="index"
                              :placeholder="text" v-model.number="addForm.rentMonth[index]"></el-input>
                </el-form-item>
                <el-form-item label="物业费缴纳月数分配" prop="propertyMonth">
                    <el-input style="width: 140px;" v-for="(text,index) in placeholderTextList" :key="index"
                              :placeholder="text" v-model.number="addForm.propertyMonth[index]"></el-input>
                </el-form-item>
            </div>
            <el-form-item>
                <el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
                <el-button @click="goBack">返回</el-button>
            </el-form-item>

        </el-form>
    </section>
</template>

<script>
    import {addContract} from "@/api/api";
    import HouseChoose from "@/views/contract/components/HouseChoose";

    export default {
        name: "ContractAdd",
        components: {HouseChoose},
        data() {
            return {
                addLoading: false,
                addFormRules: {
                    contractCode: [
                        {required: true, message: '请输入商铺的编号', trigger: 'blur'},
                    ],
                    contractDateRange: [
                        {required: true, message: '请选择合同时间', trigger: 'blur'},
                    ],
                    cashBledge: [
                        {required: true, message: '保证金不能为空'},
                        {type: 'number', message: '金额必须为数字值'}
                    ],
                    electricFee: [
                        {required: true, message: '租金不能为空'},
                        {type: 'number', message: '租金必须为数字值'}
                    ],
                    waterFee: [
                        {required: true, message: '物业费不能为空'},
                        {type: 'number', message: '物业费必须为数字值'}
                    ],
                    houseList: [
                        {required: true, message: '请添加商铺'}
                    ],
                    rentMonth: [{required: true, message: '不能为空'}],
                    propertyMonth: [{required: true, message: '不能为空'}]
                },
                //新增界面数据
                addForm: {
                    merchantId: this.$route.params.id,
                    merchantCode: this.$route.params.merchantCode,
                    contractCode: '',
                    business: '',
                    contractDateRange: '',
                    startDate: '',
                    endDate: '',
                    cashBledge: '',
                    electricFee: '',
                    waterFee: '',
                    contractTime: '',
                    remarks: '',
                    rentYear: '',
                    rentMonth: [],
                    houseList: [],
                    propertyMonth: []
                },
                placeholderTextList: ['第1年缴纳月数']
            }
        },
        methods: {
            showPayPercent: function (value) {
                this.placeholderTextList = [];
                for (let i = 0; i < value; i++) {
                    this.placeholderTextList.push(`第${i + 1}年缴纳月数`);
                }
            },
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            this.addForm.startDate = this.addForm.contractDateRange[0];
                            this.addForm.endDate = this.addForm.contractDateRange[1];
                            let addParams = Object.assign({}, this.addForm);
                            console.log(Object.assign({}, addParams));
                            addContract(addParams).then((res) => {
                                console.log(res.data);
                                this.addLoading = false;
                                let {msg, success} = res.data;
                                if (success) {
                                    this.$message({
                                        message: msg,
                                        type: 'success'
                                    });
                                    this.$refs['addForm'].resetFields();
                                    goBack();
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
            goBack() {
                this.$router.push('/merchant');
            },
            setHouseList(val) {
                this.addForm.houseList = val;
                console.log(this.addForm);
            }
        }
    }
</script>

<style scoped>

</style>
