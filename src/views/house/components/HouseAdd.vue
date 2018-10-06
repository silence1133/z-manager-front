<template>
    <!--新增界面-->
    <el-dialog title="新增商铺" :visible.sync="addFormVisible" :close-on-click-modal="false" width="40%">
        <el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm" >
            <el-form-item label="商铺编号" prop="houseCode">
                <el-input v-model="addForm.houseCode" :maxlength="maxlength"></el-input>
            </el-form-item>
            <el-form-item label="商铺地址" prop="address">
                <el-input v-model="addForm.address" :maxlength="maxlength"></el-input>
            </el-form-item>
            <el-form-item label="面积" prop="area">
                <el-row :gutter="6">
                    <el-col :span="12">
                    <el-input v-model.number="addForm.area" :maxlength="maxlength"></el-input>
                    </el-col>
                    <el-col :span="4">㎡</el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="参考租金单价" prop="rentFee">
                <el-row :gutter="6">
                    <el-col :span="12">
                    <el-input v-model.number="addForm.rentFee" :maxlength="maxlength" ></el-input>
                    </el-col>
                    <el-col :span="4">元/平/月</el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="参考物业费" prop="propertyFee">
                <el-row :gutter="6">
                    <el-col :span="12">
                        <el-input v-model.number="addForm.propertyFee" :maxlength="maxlength"></el-input>
                    </el-col>
                    <el-col :span="4">元/平/月</el-col>
                </el-row>
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
    import {addHouse} from "@/api/api";

    export default {
        name: "HouseAdd",
        data() {
            return {
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    houseCode: [
                        {required: true, message: '请输入商铺的编号', trigger: 'blur'},
                    ],
                    area: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                    ],
                    rentFee:[
                        { required: true, message: '租金不能为空'},
                        { type: 'number', message: '租金必须为数字值'}
                    ],
                    propertyFee:[
                        { required: true, message: '物业费不能为空'},
                        { type: 'number', message: '物业费必须为数字值'}
                    ],
                    area:[
                        { required: true, message: '面积不能为空'},
                        { type: 'number', message: '面积必须为数字值'}
                    ]
                },
                //新增界面数据
                addForm: {
                    houseCode: '',
                    address: '',
                    area: '',
                    rentFee: '',
                    propertyFee: '',
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
                    houseCode: '',
                    address: '',
                    area: '',
                    rentFee: '',
                    propertyFee: '',
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
