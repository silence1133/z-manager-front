<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input v-model="filtersKeyword" placeholder="水表编号/合同编号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList" icon="el-icon-search" size="medium">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-upload
                            class="upload-demo"
                            action="/api/waterMeter/record/upload"
                            :on-success="uploadSuccess" :on-error="uploadError" :before-upload="beforeUpload"
                            name="excel" :show-file-list="false"
                    >
                        <el-tooltip placement="bottom" >
                            <div slot="content">1、上传前请严格检查数据是否正确，导入后数据将无法回退！<br/>2、文件大小不能超过2m</div>
                            <el-button size="medium" type="warning" icon="el-icon-upload" :loading="loading">导入用水Excel</el-button>
                        </el-tooltip>
                    </el-upload>
                </el-form-item>
            </el-form>
        </el-col>

        <water-meter-list ref="meterList" :filtersKeyword="filtersKeyword"></water-meter-list>
    </section>
</template>

<script>
    import WaterMeterList from "@/views/meter/WaterMeterList";

    export default {
        name: "WaterMeter",
        components: {WaterMeterList},
        data() {
            return {
                loading: false,
                filtersKeyword:''
            }
        },
        methods: {
            getList: function () {
                this.$refs.meterList.getList();
            },
            uploadSuccess: function (response, file, fileList) {
                this.loading = false;
                if (!response.success) {
                    this.$message({
                        message: response.msg+","+JSON.stringify(response.data),
                        type: 'error'
                    });
                } else {
                    this.$message({
                        message: "上传数据成功！",
                        type: 'success'
                    });
                }
            },
            uploadError: function (err, file, fileList) {
                this.loading = false;
                alert(err);
            },
            beforeUpload: function (file) {
                this.loading = true;
                let fileType = file.name.slice(file.name.lastIndexOf(".")+1,file.name.length);
                console.log(file);
                if(!(fileType.toLowerCase() === "xlsx") || (fileType.toLowerCase() === "xls")){
                    this.$message({
                        message: "请上传xls或者xlsx文件格式！",
                        type: 'error'
                    });Å
                    this.loading = false;
                    return false;
                }
                if(file.size > 2*1024*1024){
                    this.$message({
                        message: "文件大小不允许超过2兆！",
                        type: 'error'
                    });
                    this.loading = false;
                    return false;
                }
            }
        }
    }
</script>

<style scoped>

</style>
