<template>
    <el-dialog title="新增水表" :visible.sync="addFormVisible" :close-on-click-modal="false" width="30%">
        <el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm" >
            <el-form-item label="水表编号" prop="waterMeterCode">
                <el-input v-model="addForm.waterMeterCode"></el-input>
            </el-form-item>
            <el-form-item label="初始刻度" prop="initMark">
                <el-input v-model.number="addForm.initMark" ></el-input>
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
    import {addWaterMeter} from "@/api/api";

    export default {
        name: "WaterMeterAdd",
        data() {
            return {
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    waterMeterCode: [
                        {required: true, message: '请输入水表的编号', trigger: 'blur'},
                    ],
                    initMark:[
                        { required: true, message: '初始刻度不能为空'},
                        { type: 'number', message: '初始刻度必须为数字值'}
                    ]
                },
                //新增界面数据
                addForm: {
                    waterMeterCode: '',
                    initMark: '',
                    remarks:'',
                    contractId:0,
                    contractCode:''
                }
            }
        },
        methods:{
            //显示新增界面
            handleAdd: function (contractId,contractCode) {
                this.addFormVisible = true;
                this.addForm = {
                    waterMeterCode: '',
                    initMark: '',
                    remarks:'',
                    contractId:contractId,
                    contractCode:contractCode
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
