<template>
	<div class="main_body">
		<template>
		 <el-menu class="el-menu-demo" mode="horizontal" router>
		  <el-menu-item index="/report/schoolLevel">处理中心</el-menu-item>
		  <el-menu-item index="/report/teachingLevel">工作台</el-menu-item>
		</el-menu>
		</template>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	data(){
		return {
	      activeName:'first'
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
</style>