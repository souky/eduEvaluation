<template>
	<div id="examList">
		<transition name="el-zoom-in-top">	
		<div v-if="showTable" class="main_body">
			<div class="exam_info_search">
				
				<el-row id="queryForm" :model="queryInfos" :gutter="20">
				  <el-col class="queryItems" :span="6">
				  	<div class="l">考试名称</div>
				  	<div class="r">
				  		<el-input v-model="queryInfos.examName" placeholder="考试名称"></el-input>
				  	</div>
				  </el-col>
				  <el-col class="queryItems" :span="6">
				  	<div class="l">班级</div>
				  	<div class="r">
				  		<el-input v-model="queryInfos.classroom" placeholder="班级"></el-input>
				  	</div>
				  </el-col>
				  <el-col class="queryItems" :span="6">	
				  	<div class="l">科目</div>
				  	<div class="r">
				  		<el-input v-model="queryInfos.subject" placeholder="科目"></el-input>
				  	</div>
				  </el-col>
				  <el-col :span="6">
				  	<div class="btn_query r" @click="queryInfo">
				  		<i class="el-icon-search">查询</i>
				  	</div>
				  </el-col>
				</el-row>
				
			</div>
			
			<div class="exam_info_table">
				<div class="tools fix">
					<div class="items_tools l" @click="show_add">
						<i class="el-icon-circle-plus-outline">新增</i>
					</div>	
				</div>
				<el-table :data="tableData" style="width: 100%">
			      <el-table-column prop="examName" align="center" label="考试名称"></el-table-column>
			      <el-table-column prop="examStartDate" :formatter="timeFormatter" align="center" label="开始时间"></el-table-column>
			      <el-table-column prop="examEndDate" :formatter="timeFormatter" align="center"  label="结束时间"></el-table-column>
			      <el-table-column prop="classroom" align="center"  label="班级"></el-table-column>
			      <el-table-column prop="subject" align="center"  label="科目"></el-table-column>
			      <el-table-column prop="examStatus" :formatter="statusFormatter" align="center"  label="考试状态"></el-table-column>
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
		</transition>
		
		<transition name="el-zoom-in-bottom">
		<div v-show="showAdd" class=" main_body ">
			<div class="show_add">
				<div class="tools fix">
					<div class="items_tools r" @click="backList">
						<i class="el-icon-back">返回列表</i>
					</div>
				</div>
				<div>
					<el-tabs tab-position="top" v-model="activeName" @tab-click="handleClick">
				    <el-tab-pane label="添加考试计划" name="first">
				    	
				    </el-tab-pane>
				    <el-tab-pane label="选择考试学生" name="second">
				    	
				    </el-tab-pane>
				    <el-tab-pane label="匹配双向细目表" name="third">
				    	
				    </el-tab-pane>
				  </el-tabs>
				</div>
			</div>
		</div>
		</transition>
	
	</div>
	
</template>

<script>
import ExamList from '../../assets/examManager/ExamList'
export default {
  data () {

    return {
	  msg: 'examList',
	  tableData:ExamList.data,
	  queryInfos:{
	  	examName:'',
	  	classroom:'',
	  	subject:''
	  },
	  
	  pageNum:1,
      pageSize:10,
      total:1,
      
      showTable:true,
      showAdd:false,
      
      activeName:'first',
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
	},
	statusFormatter(row, column, cellValue){
		var status = row[column.property];  
	  	if (status == undefined || status == '') {  
	     return "";  
	  	}
	  	switch(status){
	  		case '0':
	  		return '未开始';
	  		case '1':
	  		return '正在进行';
	  		case '2':
	  		return '已结束';
	  	}
	},
	show_add(){
		this.showTable = false;
		this.showAdd = true;
	},
	backList(){
		this.showTable = true;
		this.showAdd = false;
	},
	handleClick(tab, event){
		
	}
  }
}
</script>

<style>
#examList .exam_info_search{
	width: 90%;
	margin:20px auto;
}
#examList .exam_info_table{
	width: 90%;
	margin:20px auto;
}
#examList .show_add{
	width: 90%;
	margin:20px auto;
}
.el-tabs__item:hover{color:#FFD100;}
</style>