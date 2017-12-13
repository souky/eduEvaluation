<template>
<div id="login" ref="loginHight">
	<div class="main-conment">
		<mt-field class="login-user" label="用户名" placeholder="用户名"></mt-field>
		<mt-field class="login-password" label="用户名" placeholder="请输入密码"></mt-field>
	</div>
	<div class="login-go">
		<mt-button type="danger" @click="demo()">登录</mt-button>
	</div>
</div>
</template>
<script>
export default {
	data(){
		return{

		}
	},
	mounted:function(){
		let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		this.$refs.loginHight.style.height=h+"px";
		this.$refs.loginHight.getElementsByClassName("main-conment")[0].getElementsByClassName("login-user")[0].getElementsByClassName("mint-cell-text")[0].innerHTML="<img src='../../static//img/login/1.png' alt=''>";
		this.$refs.loginHight.getElementsByClassName("main-conment")[0].getElementsByClassName("login-password")[0].getElementsByClassName("mint-cell-text")[0].innerHTML="<img src='../../static//img/login/2.png' alt=''>";
	},
	methods:{
		demo:function(){
			alert(123);
			this.$router.push({path:'/list'});
		}
	}
}
</script>
<style>
#login{
	width: 100%;
	height: 100%;
	background-color: #19AFFF;
	overflow: hidden;
}
.main-title{
	text-align: center;
	margin-top: 20%;
	font-size: 18px;
	color: #FFFFFF;
	letter-spacing: 0;
}
.main-conment{
	width: 89.3%;
	margin: auto;
	height: 18%;
	margin-top: 47.4%;
	background-color: #fff;
	border-radius: 3px;
	overflow: hidden;
}
.login-user{
	width: 80.3%;
	height: 8%;
	margin: auto;
	margin-top: 3%;
}
.mint-field .mint-cell-title{
	width: 40px;
}
.login-user .mint-cell-wrapper{
	border-bottom: 1px solid #D7F1FF;
}
.mint-cell-value{
	margin-left: 10px;
}
.login-password{
	width: 80.3%;
	height: 8%;
	margin: auto;
}
.login-go{
	width: 89.3%;
	height: 7%;
	margin: auto;
	margin-top: 7%;
}
.login-go button{
	width: 100%;
	background-color: #FFC200;
}
.mint-button{
	height: 100%;
}
</style>