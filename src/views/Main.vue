<template>
	<section>
		<h1>亲爱的{{sysUserName}}，欢迎使用太平洋汽车城物业管理系统</h1>
	</section>
</template>

<script>
	export default {
        name: "Main",
        data() {
            return{
                sysUserName:true
            }
        },
        mounted() {
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                this.sysUserName = user.name || '';
            }

        }
	}

</script>

<style scoped>

</style>
