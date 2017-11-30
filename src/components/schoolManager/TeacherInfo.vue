<template>
	<div id="teacherInfo" class="main_body">
		<div class="teacher_info_search">
			
			<el-row id="queryForm" :model="queryInfos" :gutter="20">
			  <el-col class="queryItems" :span="6">
			  	<div class="l">姓名</div>
			  	<div class="r">
			  		<el-input v-model="queryInfos.teacherName" placeholder="姓名"></el-input>
			  	</div>
			  </el-col>
			  <el-col class="queryItems" :span="6">
			  	<div class="l">职责</div>
			  	<div class="r">
			  		<el-input v-model="queryInfos.teacherDuty" placeholder="职责"></el-input>
			  	</div>
			  </el-col>
			  <el-col class="queryItems" :span="6">
			  	<div class="l">学校</div>
			  	<div class="r">
			  		<el-input v-model="queryInfos.schoolName" placeholder="学校"></el-input>
			  	</div>
			  </el-col>
			  <el-col :span="6">
			  	<div class="btn_query r" @click="queryInfo">
			  		<i class="el-icon-search">查询</i>
			  	</div>
			  </el-col>
			</el-row>
			
		</div>
		
		<div class="teacher_info_table">
			<div class="tools fix">
				<div class="items_tools l">
					<i class="el-icon-circle-plus-outline">新增</i>
				</div>	
			</div>
			<el-table :data="tableData" style="width: 100%">
		      <el-table-column prop="teacherName" align="center" label="姓名"></el-table-column>
		      <el-table-column prop="teacherSex" :formatter='sexFormatter' align="center" label="性别"></el-table-column>
		      <el-table-column prop="teacherAge" align="center"  label="年龄"></el-table-column>
		      <el-table-column prop="teacherMobile" align="center"  label="电话"></el-table-column>
		      <el-table-column prop="teacherDuty" align="center"  label="职责"></el-table-column>
		      <el-table-column prop="teacherJobTitle" align="center"  label="职称"></el-table-column>
		      <el-table-column prop="schoolName" show-overflow-tooltip align="center"  label="学校"></el-table-column>
		      <el-table-column align="center" label="操作">
		      	<template scope="scope">
		      		<el-button type="primary" icon="el-icon-edit" @click="editInfo(scope.row.id)">编辑</el-button>
		      		<el-button type="primary" icon="el-icon-delete" @click="deleteInfo(scope.row.id)">删除</el-button>
		      	</template>
		      </el-table-column>
		    </el-table>
		    
		    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum"
		      :page-sizes="[10, 20, 50]"
		      :page-size="pageSize"
		      layout="sizes, prev, pager, next, jumper"
		      :total="total" class="tc mt20"
		      >
		    </el-pagination>
		</div>
	</div>
	
</template>

<script>
import TeacherInfo from '../../assets/schoolManagerData/TeacherInfo'
export default {
  data () {

    return {
	  msg: 'TeacherInfo',
	  tableData:TeacherInfo.data,
	  queryInfos:{
	  	teacherName:'',
	  	teacherDuty:'',
	  	schoolName:''
	  },
	  pageNum:1,
      pageSize:10,
      total:1,
    }
  },
  mounted:function(){
  },
  methods:{
  	queryInfo(){
  		
  	},
	editInfo(id){
		
	},
	deleteInfo(id){
		
	},
	handleSizeChange(val) {
	  	this.pageNum = 1;
		this.pageSzie = val;
		//ajax_data(this);
	},
	handleCurrentChange(val) {
	  	this.pageNum = val;
		//ajax_data(this);
	},
	sexFormatter(row, column, cellValue){
		var age = row[column.property];  
	  	if (age == undefined) {  
	     return "";
	  	}
	  	if(age == '1'){
	  		return '男';
	  	}else{
	  		return '女';
	  	}
	}
  }
}
</script>

<style>
#teacherInfo .teacher_info_search{
	width: 90%;
	margin:20px auto;
}
#teacherInfo .teacher_info_table{
	width: 90%;
	margin:20px auto;
}
</style>