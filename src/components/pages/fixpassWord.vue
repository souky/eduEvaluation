<template>
	<section class="page-demo" id="passwordPage">
	  <mt-field class="hasTop" placeholder="输入原密码" :type="canSee1" v-model="usedpassword">
	  	<img src="/static/img/APPImg/kf@1x.png" height="20" width="20" @click="changeSee(1)" />
	  </mt-field>
	  <mt-field placeholder="输入新密码" type="password" :type="canSee2" v-model="newpassword">
	  	<img src="/static/img/APPImg/kf@1x.png" height="20" width="20" @click="changeSee(2)" />
	  </mt-field>
	  <mt-field class="hasbottom" placeholder="再次输入新密码" :type="canSee3" v-model="againpassword">
	  	<img src="/static/img/APPImg/kf@1x.png" height="20" width="20" @click="changeSee(3)" />
	  </mt-field>
	  <div class="comformBtn">
	  	<mt-button type="primary" size="large" @click="comformfile">确认修改</mt-button>
	  </div>
	  
	</section>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
	data(){
		return{
			canSee1:'password',
			canSee2:'password',
			canSee3:'password',
			usedpassword:'',
			newpassword:'',
			againpassword:''
		}
	},
	created:function(){
		this.$store.commit('newTitle','修改密码');
		this.$store.commit('newTab','5')
	},
	mounted(){

	},
	methods:{
		changeSee(e){
			if(e==1){
				if(this.canSee1=='password')
					this.canSee1='text'
				else
					this.canSee1='password'
			}
			if(e==2){
				if(this.canSee2=='password')
					this.canSee2='text'
				else
					this.canSee2='password'
			}
			if(e==3){
				if(this.canSee3=='password')
					this.canSee3='text'
				else
					this.canSee3='password'
			}
		},
		comformfile(){
			if(this.usedpassword==''){
				let instance = Toast('请输入原始密码');
				setTimeout(() => {
				  instance.close();
				}, 2000);
			}else if(this.usedpassword!='' && this.usedpassword!='123'){
				let instance = Toast('原始密码错误请重新输入');
				setTimeout(() => {
				  instance.close();
				}, 2000);
			}else if(this.newpassword==''){
				let instance = Toast('请输入新密码');
				setTimeout(() => {
				  instance.close();
				}, 2000);
			}else if(this.newpassword!='' && this.newpassword=='123'){
				let instance = Toast('新旧密码不能一致');
				setTimeout(() => {
				  instance.close();
				}, 2000);
			}else if(this.againpassword==''){
				let instance = Toast('请再次输入新密码');
				setTimeout(() => {
				  instance.close();
				}, 2000);
			}else if(this.againpassword!=''&& this.againpassword!=this.newpassword){
				let instance = Toast('两次输入的新密码不一致');
				setTimeout(() => {
				  instance.close();
				}, 2000);
			}else{
				let instance =Toast({message: '操作成功!'});
				setTimeout(() => {
				  instance.close();
				  this.$router.push({path:'/setting'})
				}, 2000);
			}
		}
	}
}
</script>
<style>
#passwordPage{
	padding-top: 7vh
}
#passwordPage .mint-cell-wrapper{
    border-bottom: 1px solid #f5f5f5;
    font-size: 4vw
}
#passwordPage .hasTop{
	margin-top:2vh;
	border-top: 1px solid #E7E7E7;
}
#passwordPage .hasbottom{
	margin-bottom:2vh;
	border-bottom: 1px solid #E7E7E7;
}
#passwordPage .comformBtn{
	width: 90vw;
	margin:0 5vw;
	
}
#passwordPage .comformBtn button{
	font-size: 4vw
}
#passwordPage .mint-cell-allow-right::after{
      top:inherit;width: 1.5vh;height: 1.5vh
    }
</style>