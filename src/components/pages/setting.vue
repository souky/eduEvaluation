<template>
	<section class="page-demo" id="settingPage">
	  <mt-cell title="手机号" class="hasTop"><span>13856542369</span>
	  </mt-cell>
	  <mt-cell title="修改密码" to="/fixpassWord" is-link>
	  </mt-cell>
	  <mt-cell title="退出登录" class="hasTop textCenter" to="/" is-link>
	  </mt-cell>
	</section>
</template>
<script>
export default {
	data(){
		return{
			popupVisible:false
		}
	},
	created:function(){
		this.$store.commit('newTitle','设置');
		this.$store.commit('newTab','4')
	},
	mounted:function(){

	},
	methods:{
		goOut(){
			this.$router.push({path:'/'})
		}
	}
}
</script>
<style>
#settingPage{
	padding-top: 7vh
}
#settingPage .mint-cell-wrapper{
    border-bottom: 1px solid #f5f5f5;font-size: 4vw
}
#settingPage .hasTop{
	margin-top:2vh
}
#settingPage .mint-cell-allow-right::after{
      top:inherit;width: 1.5vh;height: 1.5vh
}
#settingPage .comformBtn{
	width: 90vw;
	margin:2vh 5vw;
	
}
#settingPage .comformBtn button{
	font-size: 4vw
}
#settingPage .textCenter{
	text-align: center;
}
</style>