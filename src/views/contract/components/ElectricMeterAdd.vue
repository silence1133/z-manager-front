<template>
    <el-dialog title="新增电表" :visible.sync="addFormVisible" :close-on-click-modal="false" width="30%">
        <el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm">
            <el-form-item label="电表编号" prop="electricMeterCode">
                <el-input v-model="addForm.electricMeterCode"></el-input>
            </el-form-item>
            <el-form-item label="初始刻度" prop="initMark">
                <el-input v-model.number="addForm.initMark"></el-input>
            </el-form-item>
            <el-form-item label="电压(V)" prop="voltage">
                <el-input v-model.number="addForm.voltage"></el-input>
            </el-form-item>
            <el-form-item label="电流(A)" prop="electricCurrent">
                <el-input v-model.number="addForm.electricCurrent"></el-input>
            </el-form-item>
            <el-form-item label="倍率" prop="magnification">
                <el-input v-model.number="addForm.magnification"></el-input>
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
    import {addElectricMeter} from "@/api/api";
    import {isNumber} from "@/api/common";

    export default {
        name: "ElectricMeterAdd",
        data() {
            return {
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    electricMeterCode: [
                        {required: true, message: '请输入电表的编号', trigger: 'blur'},
                    ],
                    voltage: [
                        {required: true, message: '请输入电压', trigger: 'blur'},
                    ],
                    electricCurrent: [
                        {required: true, message: '请输入电流', trigger: 'blur'},
                    ],
                    magnification: [
                        {required: true, message: '请输入倍率', trigger: 'blur'},
                    ],
                    initMark: [
                        {required: true, message: '初始刻度不能为空'},
                        {type: 'number', message: '初始刻度必须为数字值'}
                    ]
                },
                //新增界面数据
                addForm: {
                    electricMeterCode: '',
                    initMark: '',
                    remarks: '',
                    voltage: '',
                    electricCurrent: '',
                    magnification: '',
                    contractId: 0
                }
            }
        },
        methods: {
            //显示新增界面
            handleAdd: function (contractId) {
                this.addFormVisible = true;
                this.addForm = {
                    electricMeterCode: '',
                    initMark: '',
                    remarks: '',
                    voltage: '',
                    electricCurrent: '',
                    magnification: '',
                    contractId: contractId
                };
                console.log(this.addForm);
            },
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        if(isNumber(this.addForm.electricMeterCode)){
                            this.$message({
                                message: "编号不要使用数字",
                                type: 'error'
                            });
                            return;
                        }
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let addParams = Object.assign({}, this.addForm);
                            addElectricMeter(addParams).then((res) => {
                                console.log(res.data);
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
