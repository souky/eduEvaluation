<template>
	<div class="main_body">
		 <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
		  <el-menu-item index="/report/schoolLevel">校级报告</el-menu-item>
		  <el-menu-item index="/report/teachingLevel">教研报告</el-menu-item>
		  <el-menu-item index="/report/calssLevel">班级报告</el-menu-item>
		  <el-menu-item index="/report/studentLevel">学生报告</el-menu-item>
		</el-menu>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	data(){
		return {
	      activeIndex:'/report/schoolLevel'
	    }
	},
	created: function(){
		this.$emit('refreshbizlines','other');
	},
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>

<style>
.el-menu{
	display: table;
	margin: auto;
	margin-top: 33px;
	background-color: white
}
.el-menu--horizontal{
	border-bottom: 0px
}
.el-menu--horizontal .el-menu-item{
	background-color: white;
	border-bottom: 0px;
	padding: 0 25px;
    border-radius: 16px 16px 0 0;
}
.el-menu--horizontal>.el-menu-item.is-active{
	color: white;
    background-color: #44A9FF;
    border-radius: 16px 16px 0 0;
}
.el-menu--horizontal .el-menu-item:hover{
	background-color: white;

	border-bottom:0px;
}
.el-menu--horizontal .el-menu-item.is-active:hover{
	background-color: #44A9FF;
	border-bottom:0px;
}
</style>