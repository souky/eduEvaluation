<template>
	<div id="classInfo" class="main_body">
		<div class="class_info_search">
			
			<el-row id="queryForm" :model="queryInfos" :gutter="20">
			  <el-col class="queryItems" :span="6">
			  	<div class="l">班级</div>
			  	<div class="r">
			  		<el-input v-model="queryInfos.classroomName" placeholder="班级"></el-input>
			  	</div>
			  </el-col>
			  <el-col class="queryItems" :span="6">
			  	<div class="l">班主任名称</div>
			  	<div class="r">
			  		<el-input v-model="queryInfos.classTeather" placeholder="班主任名称"></el-input>
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
		
		<div class="class_info_table">
			<div class="tools fix">
				<div class="items_tools l">
					<i class="el-icon-circle-plus-outline">新增</i>
				</div>	
			</div>
			<el-table :data="tableData" style="width: 100%">
		      <el-table-column prop="classroomName" align="center" label="班级"></el-table-column>
		      <el-table-column prop="gradeCode" align="center" label="年级"></el-table-column>
		      <el-table-column prop="classTeather" align="center" show-overflow-tooltip label="班主任"></el-table-column>
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
import ClassInfo from '../../assets/schoolManagerData/ClassInfo'
export default {
  data () {

    return {
	  msg: 'classInfo',
	  tableData:ClassInfo.data,
	  queryInfos:{
	  	classroomName:'',
	  	classTeather:''
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
  }
}
</script>

<style>
#classInfo .class_info_search{
	width: 90%;
	margin:20px auto;
}
#classInfo .class_info_table{
	width: 90%;
	margin:20px auto;
}
</style>