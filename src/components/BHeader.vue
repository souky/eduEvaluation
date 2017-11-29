<template>
	<div v-if="isShow=='home'" id="header" class="fix box_s">
		<div class="logoImg">
			<img src="../../static/img/header/logo.png" />
			<span class="titleJRY">金阳测评</span>
			<div class="rightPart r">
				<div class="l">
					<span class="userName">{{username}}</span>  <span @click="loginOut">退出</span>
				</div>
			</div>
		</div>
	</div>
  <div v-else-if="isShow=='other'" id="header" class="fix box_s box_other">
    <div class="logoImg">
      <img src="../../static/img/header/logo.png" />
      <span class="titleJRY">金阳测评</span>
      <div class="leftPart l">
        <div class="l">
          <router-link to="/report">
            <div class="leftItems leftItemsActive l">成绩报告</div>
          </router-link>
          
          <router-link to="/resource">
            <div class="leftItems l">考试管理</div>
          </router-link>
          
          <router-link to="/management">
            <div class="leftItems l">资源中心</div>
          </router-link>
        </div>
      </div>
      <div class="rightPart r">
        <div class="l">
          <span class="userName">{{username}}</span>  <span @click="loginOut">退出</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else="isShow=='login'">
  </div>
</template>

<script>
export default {
  data () {
  return {
      isShow:'',
      msg: '顶部导航栏',
      username:'用户13974289150'
    }
  },
  mounted:function(){
  	//判断cookie登陆信息初始化
  	
  },
  methods:{
  	handleParentClick(e){
  		this.isShow=e;
  	},
  	//退出登陆操作
  	loginOut(){
  		//页面跳转
  		 this.$router.push({path:'/'});
  	}
  }
}
</script>

<style>
.titleJRY{
  font-size: 24px;
}
#header .leftItems{
    padding: 0 20px;
    color: white;
}
#header .leftItemsActive {
  background-color: rgba(0,0,0,.24);
}
</style>