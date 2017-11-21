<template>
	<div id="header" class="fix box_s">
		<div class="leftPart l fix">
			
		</div>
		<div class="rightPart r">
			<div class="l search">
				<el-input placeholder="搜索内容" icon="search"></el-input>
			</div>
		</div>
		<div class="logoImg">
			<img src="../../static/img/header/logo.png" />
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