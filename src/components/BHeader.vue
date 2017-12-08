<template>
	<div id="header" class="fix">
		<div class="leftPart l fix">
			<div class="leftItems">
				<img src="../../static/img/header/logo.png" />
			</div>
		</div>
		<div class="rightPart r fix">
			<div class="userImg l">
				<img src="../../static/img/header/touxiang.png" />
			</div>
			<div class="exit_btn l" @click="logout">
				<img src="../../static/img/header/logout.png" style="width: 34px;"/>
			</div>
		</div>
		<div class="logoImg">
			金瑞阳测评系统
		</div>
	</div>
	
</template>

<script>
export default {
  data () {

    return {
      msg: '顶部导航栏',
    }
  },
  mounted:function(){
  	//判断cookie登陆信息初始化
  	
  },
  methods:{
	logout(){
		this.postHttp(this,{},'logout',function(obj,res){
			obj.$router.push({ path: '/login' });
		})
	}
  }
}
</script>

<style>
.inline__box{display: inline-block;}
.inline__box .rightItems img{vertical-align: middle;}
.inline__box .el-badge__content.is-fixed.is-dot{top:22px;right:8px;}
.inline__box .el-dropdown-menu__item.is-disabled{color: #272727;}
#header .rightPart .personRight {height:60px;text-align: center;cursor: pointer;font-size:16px;color:#666;margin-right: 30px;}
#header .rightPart .personRight span{font-size:14px;}
.menuStyle{text-decoration: none;color: #6ED56C;font-size: 16px;text-align: center;}
.el-dropdown-menu__item a{text-decoration: none}
.el-dropdown-menu--middles{width: 130px}
.el-dropdown-menu__item--divided{margin-top: 3px}
.el-dropdown-menu__item--divided:before{height:3px;}
</style>