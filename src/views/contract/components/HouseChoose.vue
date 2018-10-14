<template>
    <section>
        <el-tag
                :key="index"
                v-for="(tag,index) in houseList"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">

            商铺编号：{{tag.houseCode}}，租金：{{tag.rentFee}}(元/平/月)，物业费：{{tag.propertyFee}}(元/平/月)
        </el-tag>

        <el-input
                v-if="inputVisible"
                v-model="inputHouseCode"
                ref="saveTagInput"
                size="small"
                style="width: 140px;" placeholder="输入商铺编号"
        >
        </el-input>
        <el-input
                v-if="inputVisible"
                v-model="inputRentFee"
                size="small"
                style="width: 140px;" placeholder="输入租金"
        >
        </el-input>
        <el-input
                v-if="inputVisible"
                v-model="inputPropertyFee"
                size="small"
                style="width: 140px;" placeholder="输入物业费"
        >
        </el-input>&nbsp;&nbsp;
        <el-button v-if="inputVisible" type="success" icon="el-icon-check" round @click="handleInputConfirm"
                   size="mini">确定
        </el-button>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加商铺</el-button>

    </section>
</template>

<script>
    export default {
        name: "HouseChoose",
        data() {
            return {
                houseList: [],
                inputVisible: false,
                inputHouseCode: '',
                inputRentFee: '',
                inputPropertyFee: ''
            }
        },
        methods: {
            handleClose(tag) {
                this.houseList.splice(this.houseList.indexOf(tag), 1);
            },

            showInput() {
                this.inputHouseCode = '';
                this.inputRentFee = '';
                this.inputPropertyFee = '';
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = {
                    houseCode: '',
                    rentFee: '',
                    propertyFee: ''
                };
                inputValue.houseCode = this.inputHouseCode;
                inputValue.rentFee = this.inputRentFee;
                inputValue.propertyFee = this.inputPropertyFee;
                if (inputValue) {
                    this.houseList.push(inputValue);
                }
                this.inputVisible = false;
                console.log(this.houseList);
                this.$emit('setHouseList', this.houseList);
            },
        }
    }
</script>

<style scoped>

</style>
