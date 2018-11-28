<template>
    <!--新增界面-->
    <section>
        <el-form :model="addForm" label-width="140px" :rules="addFormRules" ref="addForm">
            <el-row :gutter="2">
                <el-col :span="8">
                    <el-form-item label="商户编号">
                        {{addForm.contract.merchantCode}}
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="合同编号" prop="contract.contractCode">
                        <el-input v-model="addForm.contract.contractCode" maxlength="20"
                                  style="width: 230px;"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="经营业务" prop="contract.business">
                <el-input v-model="addForm.contract.business" maxlength="200" type="textarea" rows="3"></el-input>
            </el-form-item>
            <!--<el-row :gutter="2">-->
                <!--<el-col :span="8">-->
                    <!--<el-form-item label="经营业务" prop="contract.business">-->
                        <!--<el-input v-model="addForm.contract.business"></el-input>-->
                    <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="16">-->
                    <!--<el-form-item label="合同时间" prop="contract.contractDateRange">-->
                        <!--<el-date-picker-->
                                <!--v-model="addForm.contract.contractDateRange"-->
                                <!--type="daterange"-->
                                <!--range-separator="至"-->
                                <!--start-placeholder="开始日期"-->
                                <!--end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">-->
                        <!--</el-date-picker>-->
                    <!--</el-form-item>-->
                <!--</el-col>-->
            <!--</el-row>-->

            <el-row :gutter="6">
                <el-col :span="8">
                    <el-form-item label="合同签订时间" prop="contract.contractTime">
                        <el-date-picker type="date" placeholder="选择日期" v-model="addForm.contract.contractTime"
                                        value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="履约保证金" prop="contract.cashBledge">
                        <el-row :gutter="2">
                            <el-col :span="12">
                                <el-input v-model.number="addForm.contract.cashBledge" maxlength="20"></el-input>
                            </el-col>
                            <el-col :span="4">元</el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="2">
                <el-col :span="8">
                    <el-form-item label="电费单价" prop="contract.electricFee">
                        <el-row :gutter="2">
                            <el-col :span="12">
                                <el-input v-model.number="addForm.contract.electricFee" maxlength="20"></el-input>
                            </el-col>
                            <el-col :span="6">元/度</el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="水费单价" prop="contract.waterFee">
                        <el-row :gutter="2">
                            <el-col :span="12">
                                <el-input v-model.number="addForm.contract.waterFee" maxlength="20"></el-input>
                            </el-col>
                            <el-col :span="6">元/吨</el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="备注" prop="contract.remarks">
                <el-input v-model="addForm.contract.remarks" maxlength="200" type="textarea" rows="3"></el-input>
            </el-form-item>
            <div style="border:1px dashed darkgray;padding: 30px;">
                <el-form-item label="选择商铺" prop="houseList">
                    <house-choose @setHouseList="setHouseList"></house-choose>
                </el-form-item>
                <el-form-item label="租用商铺年限" prop="contract.rentYear">
                    <el-input-number v-model.number="addForm.contract.rentYear" @change="showPayPercent" :min="1"
                                     :max="10"></el-input-number>
                </el-form-item>
                <el-row :gutter="6">
                    <el-col :span="8">
                        <el-form-item label="合同时间范围" prop="contract.contractTime">
                            <el-date-picker type="date" placeholder="选择开始日期" v-model="addForm.contract.startDate"
                                            value-format="yyyy-MM-dd HH:mm:ss" @change="setContractEndDate"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">至
                            <el-date-picker type="date" placeholder="合同截止日期" v-model="addForm.contract.endDate"
                                            value-format="yyyy-MM-dd HH:mm:ss"  :disabled="true"></el-date-picker>
                    </el-col>
                </el-row>
                <el-form-item label="租金缴纳月数分配" prop="rentMonth">
                    <el-input style="width: 140px;" v-for="(text,index) in placeholderTextList" :key="index"
                              :placeholder="text" v-model.number="addForm.rentMonthList[index]"></el-input>
                </el-form-item>
                <el-form-item label="物业费缴纳月数分配" prop="propertyMonth">
                    <el-input style="width: 140px;" v-for="(text,index) in placeholderTextList" :key="index"
                              :placeholder="text" v-model.number="addForm.propertyMonthList[index]"></el-input>
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
    import {dateFormat} from "@/api/common";

    export default {
        name: "ContractAdd",
        components: {HouseChoose},
        data() {
            return {
                addLoading: false,
                addFormRules: {
                    contract: {
                        contractCode: [
                            {required: true, message: '请输入合同编号', trigger: 'blur'},
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
                        ]
                    },
                    houseList: [
                        {required: true, message: '请添加商铺'}
                    ],
                    rentMonthList: [{required: true, message: '不能为空'}],
                    propertyMonthList: [{required: true, message: '不能为空'}]
                },
                //新增界面数据
                addForm: {
                    contract: {
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
                        rentYear: ''
                    },
                    houseList: [],
                    rentMonthList: [],
                    propertyMonthList: []
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
                this.setContractEndDate();
            },
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let addParams = JSON.parse(JSON.stringify(this.addForm));
                            addParams.contract.cashBledge =  addParams.contract.cashBledge*100;
                            addParams.contract.electricFee = addParams.contract.electricFee*100;
                            addParams.contract.waterFee = addParams.contract.waterFee*100;

                            console.log(addParams);
                            addContract(addParams).then((res) => {
                                console.log(res);
                                this.addLoading = false;
                                let {msg, success} = res;
                                if (success) {
                                    this.$message({
                                        message: msg,
                                        type: 'success'
                                    });
                                    this.goBack();
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
                let houseList = [].concat(JSON.parse(JSON.stringify(val)));//拷贝数组,注意这行的拷贝方法
                houseList.forEach(function (x) {
                    delete x.houseCode;
                    x.rentFee = x.rentFee * 100;
                    x.propertyFee = x.propertyFee * 100;
                })
                this.addForm.houseList = houseList;
                console.log(this.addForm.houseList);
            },
            setContractEndDate(){
                // alert(this.addForm.contract.startDate);
                if(this.addForm.contract.rentYear && this.addForm.contract.startDate){
                    let start=new Date(this.addForm.contract.startDate);
                    let end=new Date(this.addForm.contract.startDate);
                    end.setFullYear(start.getFullYear()+this.addForm.contract.rentYear);
                    this.addForm.contract.endDate =  dateFormat(end,"yyyy-MM-dd hh:mm:ss");
                    console.log(this.addForm.contract.endDate);
                }
            }
        }
    }
</script>

<style scoped>

</style>
