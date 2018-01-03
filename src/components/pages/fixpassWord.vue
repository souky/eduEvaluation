<template>
	<section class="page-demo" id="passwordPage">
	  <mt-field class="hasTop" placeholder="输入原密码" :type="canSee1" v-model="usedpassword">
	  	<img :src="eyesclose1" height="20" width="20" @click="changeSee(1)" />
	  </mt-field>
	  <mt-field placeholder="输入新密码" type="password" :type="canSee2" v-model="newpassword">
	  	<img :src="eyesclose2" height="20" width="20" @click="changeSee(2)" />
	  </mt-field>
	  <mt-field class="hasbottom" placeholder="再次输入新密码" :type="canSee3" v-model="againpassword">
	  	<img :src="eyesclose3" height="20" width="20" @click="changeSee(3)" />
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
			againpassword:'',
			eyesclose1:'/static/img/APPImg/yj2@1x.png',
			eyesclose2:'/static/img/APPImg/yj2@1x.png',
			eyesclose3:'/static/img/APPImg/yj2@1x.png',
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
				if(this.canSee1=='password'){
					this.canSee1='text'
					this.eyesclose1 = '/static/img/APPImg/yj1@1x.png'
				}
				else{
					this.canSee1='password'
					this.eyesclose1 = '/static/img/APPImg/yj2@1x.png'
				}
			}
			if(e==2){
				if(this.canSee2=='password'){
					this.canSee2='text'
					this.eyesclose2 = '/static/img/APPImg/yj1@1x.png'
				}
				else{
					this.canSee2='password'
					this.eyesclose2 = '/static/img/APPImg/yj2@1x.png'
				}
			}
			if(e==3){
				if(this.canSee3=='password'){
					this.canSee3='text'
					this.eyesclose3 = '/static/img/APPImg/yj1@1x.png'
				}
				else{
					this.canSee3='password'
					this.eyesclose3 = '/static/img/APPImg/yj2@1x.png'
				}
			}
		},
		comformfile(){
			var needDatas = {psw:this.usedpassword,newPsw1:this.newpassword,newPsw2:this.againpassword};
			if(this.usedpassword==''){
				let instance = Toast('请输入原始密码');
				setTimeout(() => {
				  instance.close();
				}, 2000);
			}else if(this.newpassword==''){
				let instance = Toast('请输入新密码');
				setTimeout(() => {
				  instance.close();
				}, 2000);
			}else if(this.againpassword==''){
				let instance = Toast('请再次输入新密码');
				setTimeout(() => {
				  instance.close();
				}, 2000);
			}else if(this.newpassword!=this.againpassword){
				let instance = Toast('两次输入的密码不一致');
				setTimeout(() => {
				  instance.close();
				}, 2000);
			}else{
				this.postHttp(this,needDatas,'user/resetPsw',function(obj,res){
					if(res.code=='10000'){
						let instance =Toast({message: '修改成功'});
						setTimeout(() => {
							instance.close();
							obj.$router.push({path:'/setting'})
						}, 2000);
					}else{
						let instance =Toast({message: res.message});
						setTimeout(() => {
							instance.close();
						}, 2000);
					}
					
	        	});
				
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
    font-size: 4vw;
    background-size: 120% 0px
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