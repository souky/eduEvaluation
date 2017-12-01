<template>
	<div id="roleManager" class="main_body">
		<div class="role_info_search">
			
			<el-row id="queryForm" :model="queryInfos" :gutter="20">
			  <el-col class="queryItems" :span="6">
			  	<div class="l">姓名</div>
			  	<div class="r">
			  		<el-input v-model="queryInfos.name" placeholder="姓名"></el-input>
			  	</div>
			  </el-col>
			  <el-col class="queryItems" :span="6">
			  	<div class="l">用户名</div>
			  	<div class="r">
			  		<el-input v-model="queryInfos.userName" placeholder="用户名"></el-input>
			  	</div>
			  </el-col>
			  <el-col class="queryItems" :span="6">	
			  </el-col>
			  <el-col :span="6">
			  	<div class="btn_query r" @click="queryInfo">
			  		<i class="el-icon-search">查询</i>
			  	</div>
			  </el-col>
			</el-row>
			
		</div>
		
		<div class="role_info_table">
			<div class="tools fix">
				<div class="items_tools l">
					<i class="el-icon-circle-plus-outline">新增</i>
				</div>	
			</div>
			<el-table :data="tableData" style="width: 100%">
		      <el-table-column prop="roleName" align="center" label="名称"></el-table-column>
		      <el-table-column prop="createDate" :formatter="timeFormatter" align="center"  label="创建时间"></el-table-column>
		      <el-table-column align="center" label="操作" width='200'>
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
import RoleManager from '../../assets/systemManagerData/RoleManager'
export default {
  data () {

    return {
      msg: 'userManager',
      tableData:RoleManager.data,
      queryInfos:{
	  	teacherName:'',
	  	teacherDuty:'',
	  	schoolName:''
	  },
	  pageNum:1,
      pageSize:10,
      total:1,
      options:[
      	{
      		id:'0',
      		value:'教师'
      	},
      	{
      		id:'1',
      		value:'学生'
      	},
      	{
      		id:'2',
      		value:'管理员'
      	}
      ]
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
	timeFormatter(row, column, cellValue){
		var date = row[column.property];  
	  	if (date == undefined || date == '') {  
	     return "";  
	  	}  
	  	return this.timeF(date).format("YYYY-MM-DD HH:mm:ss");  
	}
  }
}
</script>

<style>
#roleManager .role_info_search{
	width: 90%;
	margin:20px auto;
}
#roleManager .role_info_table{
	width: 90%;
	margin:20px auto;
}
</style>