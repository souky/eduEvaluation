<template>
	<div id="userManager" class="main_body">
		<div class="user_info_search">
			
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
			  		<el-input v-model="queryInfos.userName" placeholder="入学学年"></el-input>
			  	</div>
			  </el-col>
			  <el-col class="queryItems" :span="6">	
			  	<div class="l">角色</div>
			  	<div class="r">
			  		<el-select v-model="queryInfos.roleName" placeholder="请选择">
				    <el-option v-for="item in options" :key="item.id" :label="item.value" :value="item.id"></el-option>
				  </el-select>
			  	</div>
			  </el-col>
			  <el-col :span="6">
			  	<div class="btn_query r" @click="queryInfo">
			  		<i class="el-icon-search">查询</i>
			  	</div>
			  </el-col>
			</el-row>
			
		</div>
		
		<div class="user_info_table">
			<div class="tools fix">
				<div class="items_tools l">
					<i class="el-icon-circle-plus-outline">新增</i>
				</div>	
			</div>
			<el-table :data="tableData" style="width: 100%">
		      <el-table-column prop="name" align="center" label="姓名"></el-table-column>
		      <el-table-column prop="userName" align="center"  label="用户名"></el-table-column>
		      <el-table-column prop="roleName" align="center"  label="角色"></el-table-column>
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
import UserManager from '../../assets/systemManagerData/UserManager'
export default {
  data () {

    return {
      msg: 'userManager',
      tableData:UserManager.data,
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
#userManager .user_info_search{
	width: 90%;
	margin:20px auto;
}
#userManager .user_info_table{
	width: 90%;
	margin:20px auto;
}
</style>