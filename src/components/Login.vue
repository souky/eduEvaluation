<template>
	<div id="login" ref="loginHight" @keyup.enter.native="onSubmit">
		<div class="login-main">
			<div class="login-main-header">
				<p>登录</p>
			</div>
			<div class="login-main-body">
				<el-form ref="form" :rules="rules" :model="form">
				  <el-form-item prop="userName">
				    <el-input placeholder="用户名" v-model="form.userName" @keyup.enter.native="onSubmit">
				    	<template slot="prepend"><img src="../../static/img/login/user.png" alt=""></template>
				    </el-input>
				  </el-form-item>
				  <el-form-item prop="psw">
				    <el-input type="password" placeholder="请输入密码" v-model="form.psw" @keyup.enter.native="onSubmit">
				    	<template slot="prepend"><img src="../../static/img/login/password.png" alt=""></template>
				    </el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="onSubmit" >登录</el-button>
				  </el-form-item>
				  <el-form-item class="login-main-foot">
				  		<p @click="forgetPsw">忘记密码？</p>
				  </el-form-item>
				</el-form>
			</div>
		</div>
		<div class="login-foot">
			<p>© 2017-2018 苏州金瑞阳信息科技有限公司 苏ICP备17029802号</p>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return{
			form:{
				userName:"",
				psw:"",
			},
			rules:{
				userName:[
					 { required: true, message: '请输入用户名', trigger: 'blur' },
				],
				psw:[
					 { required: true, message: '请输入密码', trigger: 'blur' },
				]
			}
		}
	},
	mounted:function(){
		document.getElementById("header").style.display = 'none';
		document.getElementById("menu").style.display = 'none';
		let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		this.$refs.loginHight.style.height=h+"px";
	},
	methods:{
		onSubmit:function(){
			this.postHttp(this,this.form,'login',function(obj,res){
				if(res.code == '10000'){
					document.getElementById("header").style.display = 'block';
					document.getElementById("menu").style.display = 'block';
					sessionStorage.setItem('JY_EDU_EVALUATION', res.result);
					obj.$router.push({path:'/home'});
				}else{
					obj.notify_jr(obj,'错误提示',res.message,'error');
				}
			})
			
		},
		forgetPsw(){
			this.notify_jr(this,'提示','忘记密码请联系管理员','warning');
		}
	}
}
</script>

<style>
#login{
	width: 100%;
	height: 100%;
	background-image:url(../../static/img/login/bg-d.png); 
	background-repeat:no-repeat; 
	background-size:100% 100%;
	-moz-background-size:100% 100%;
}
#login .login-foot{
	width: 100%;
	height: 110px;
	background: #fff;
	position: absolute;
	bottom: 0px;
	text-align: center;
}
#login .login-foot p{
	line-height: 110px;
	font-size: 24px;
	color: #3D3D3D;
	letter-spacing: 0;
}
#login .login-main{
	position: absolute;
	top: 27.7%;
	left:55.9%;
	width: 450px;
	height: 400px;
	background: #fff;
	border-radius: 3px;
}
#login .login-main-header{
	width: 374px;
	height: 43px;
	margin: auto;
	text-align: center;
	padding-top:40px;
	border-bottom: 1px solid #44A9FF;
}
#login .login-main-header p{
	font-size: 24px;
	color: #818181;
	letter-spacing: 0;
}
#login .login-main-body{
	width: 374px;
	height: 43px;
	margin: auto;
	margin-top:40px;
}
#login .el-button{
	padding: 15px 171px;
}
#login .el-input__inner{
	height: 50px;
}
#login .el-form-item{
	margin-bottom: 30px;
}
#login .login-main-foot .el-form-item__content{
	line-height: 0;
}
#login .login-main-body i{
	width: 20px;
	margin-left:10px;
}
</style>