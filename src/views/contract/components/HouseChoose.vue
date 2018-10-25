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

        <el-autocomplete
                v-if="inputVisible"
                v-model="inputHouseCode"
                ref="saveTagInput"
                size="small"
                style="width: 140px;" placeholder="输入商铺编号" :fetch-suggestions="querySearchAsync"
                @select="handleSelect"
        >
        </el-autocomplete>
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
    import {loadHouseList} from "@/api/api";

    export default {
        name: "HouseChoose",
        data() {
            return {
                houseList: [],
                inputVisible: false,
                inputHouseCode: '',
                inputHouseId: null,
                inputRentFee: '',
                inputPropertyFee: '',
                allLoadHouseList: [],
                timeout: null
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
                this.inputHouseId = null;
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = {
                    id: null,
                    houseCode: '',
                    rentFee: '',
                    propertyFee: ''
                };
                inputValue.id = this.inputHouseId;
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
            loadHouseList() {
                loadHouseList().then((res) => {
                    let {msg, success} = res;
                    if (success) {
                        this.allLoadHouseList = res.data;
                        this.allLoadHouseList.forEach(function (house) {
                            house["value"] = house.houseCode;
                        })
                    } else {
                        this.$message({
                            message: msg,
                            type: 'error'
                        });
                    }
                });
            },
            querySearchAsync(queryString, cb) {
                let allLoadHouseList = this.allLoadHouseList;
                let results = queryString ? allLoadHouseList.filter(this.createStateFilter(queryString)) : allLoadHouseList;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 3000 * Math.random());
            },
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                this.inputHouseId = item.id;
            }
        },
        mounted() {
            if (this.allLoadHouseList.length === 0) {
                this.loadHouseList();
                console.log(this.allLoadHouseList);
            }
        }
    }
</script>

<style scoped>

</style>
