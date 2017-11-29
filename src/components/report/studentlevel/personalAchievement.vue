<template>
	<div id="personalAchievement">
		<div class="header">
			<p>个人成绩报告单</p>
			<div class="header-title-foot"></div>
		</div>
		<div class="body">
			<el-table :data="tableData" stripe style="width: 100%">
			    <el-table-column prop="date" label="科目"></el-table-column>
			    <el-table-column prop="name" label="分数"></el-table-column>
			    <el-table-column prop="address" label="分数等级"></el-table-column>
			    <el-table-column prop="address" label="平均分"></el-table-column>
			    <el-table-column prop="address" label="分数等级"></el-table-column>
			    <el-table-column prop="address" label="分数等级"></el-table-column>
			    <el-table-column prop="address" label="分数等级"></el-table-column>
			    <el-table-column prop="address" label="分数等级"></el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		}
	}
</script>
<style>
#personalAchievement{
	width: 1100px;
	margin: auto;
	margin-top:20px;
	text-align: center;
}	
#personalAchievement .header p{
	font-size: 20px;
	color: #707070;
	letter-spacing: 0;
}
.header-title-foot{
	width: 100px;
	height: 2px;
	background: #44A9FF;
	margin: auto;
	margin-top:5px;
}
.body{
	margin-top:20px;
}
</style>