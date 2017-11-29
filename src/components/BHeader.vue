<template>
	<div id="header" class="fix box_s">
		<div class="logoImg">
			<img src="../../static/img/header/logo.png" />
			<span>金阳测评</span>
			<div class="rightPart r">
				<div class="l">
					<span class="userName">{{username}}</span>  <span @click="loginOut">退出</span>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
export default {
  data () {

    return {
      msg: '顶部导航栏',
      username:'用户13974289150'
    }
  },
  mounted:function(){
  	//判断cookie登陆信息初始化
  	
  },
  methods:{
  	//退出登陆操作
  	loginOut(){
  		//页面跳转
  		 this.$router.push({path:'/'});
  	}
  }
}
</script>

<style>
</style>