<template>
	<div id="twoWayTable">
		<transition name="el-zoom-in-top">
		<div v-show="showTable" class="main_body">
			<div class="twoWay_info_search">
				<el-row id="queryForm" :model="queryInfos" :gutter="20">
				  <el-col class="queryItems" :span="6">
				  	<div class="l">细目表名称</div>
				  	<div class="r">
				  		<el-input v-model="queryInfos.specificationName" placeholder="双向细目表名称"></el-input>
				  	</div>
				  </el-col>
				  <el-col class="queryItems" :span="6">
				  	<div class="l">年级</div>
				  	<div class="r">
				  		<el-input v-model="queryInfos.gradeName" placeholder="年级"></el-input>
				  	</div>
				  </el-col>
				  <el-col class="queryItems" :span="6">	
				  	<div class="l">科目</div>
				  	<div class="r">
				  		<el-input v-model="queryInfos.subjectName" placeholder="科目"></el-input>
				  	</div>
				  </el-col>
				  <el-col :span="6">
				  	<div class="btn_query r" @click="queryInfo">
				  		<i class="el-icon-search">查询</i>
				  	</div>
				  </el-col>
				</el-row>
			</div>
			
			<div class="twoWay_info_table">
				<div class="tools fix">
					<div class="items_tools l">
						<i class="el-icon-circle-plus-outline">新增</i>
					</div>	
				</div>
				<el-table :data="tableData" style="width: 100%">
			      <el-table-column prop="specificationName" align="center" label="双向细目表名称"></el-table-column>
			      <el-table-column prop="gradeName"  align="center" label="年级"></el-table-column>
			      <el-table-column prop="subjectName" align="center"  label="科目"></el-table-column>
			      <el-table-column prop="createDate" align="center" :formatter="timeFormatter"  label="创建时间"></el-table-column>
			      <el-table-column align="center" label="操作" width='250'>
			      	<template scope="scope">
			      		<el-button type="primary" icon="el-icon-search" @click="showInfo(scope.row.id)">查看</el-button>
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
		<div v-show="showDetails" class="twoWay_details main_body">
			<div class="twoWay_info_table">
				<div class="tools fix">
					<div class="items_tools l">
						<i class="el-icon-circle-plus-outline">新增</i>
					</div>
					<div class="items_tools r">
						<i class="el-icon-back" @click="backList">返回列表</i>
					</div>
				</div>
				<el-table :data="detailsData" style="width: 100%">
			      <el-table-column prop="itemNo" align="center" label="题号" width="50px"></el-table-column>
			      <el-table-column prop="itemType" :formatter="typeFormatter" align="center" label="题型"></el-table-column>
			      <el-table-column prop="itemScore" align="center"  label="满分" width="50px"></el-table-column>
			      <el-table-column prop="itemAnswer" align="center" label="答案" width="50px"></el-table-column>
			      <el-table-column align="center" label="能力值">
			      	<el-table-column prop="itemAbility[0]" class-name="checkIcon" width='100' :formatter="ablitFormatter" align="center" label="空间想象"></el-table-column>
			      	<el-table-column prop="itemAbility[1]" class-name="checkIcon" width='100' :formatter="ablitFormatter" align="center" label="抽象概括"></el-table-column>
			      	<el-table-column prop="itemAbility[2]" class-name="checkIcon" width='100' :formatter="ablitFormatter" align="center" label="推理论证"></el-table-column>
			      	<el-table-column prop="itemAbility[3]" class-name="checkIcon" width='100' :formatter="ablitFormatter" align="center" label="运算求解"></el-table-column>
			      	<el-table-column prop="itemAbility[4]" class-name="checkIcon" width='100' :formatter="ablitFormatter" align="center" label="数据处理"></el-table-column>
			      	<el-table-column prop="itemAbility[5]" class-name="checkIcon" width='100' :formatter="ablitFormatter" align="center" label="综合应用"></el-table-column>
			      </el-table-column>
			      <el-table-column prop="konwledgePoint" align="center" width='250' show-overflow-tooltip label="知识点"></el-table-column>
			      <el-table-column align="center" label="操作" width='250'>
			      	<template scope="scope">
			      		<el-button type="primary" icon="el-icon-edit" @click="editInfo(scope.row.id)">编辑</el-button>
			      		<el-button type="primary" icon="el-icon-delete" @click="deleteInfo(scope.row.id)">删除</el-button>
			      	</template>
			      </el-table-column>
			    </el-table>
			</div>
		</div>
		</transition>
	</div>
</template>

<script>
import TwoWay from '../../assets/examManager/TwoWay'
export default {
  data () {

    return {
	  msg: 'twoWayTable',
	  tableData:TwoWay.data,
	  detailsData:TwoWay.detailsData,
	  queryInfos:{
	  	specificationName:'',
	  	gradeName:'',
	  	subjectName:''
	  },
	  pageNum:1,
      pageSize:10,
      total:1,
      
      showTable:true,
      showDetails:false,
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
	showInfo(id){
		this.showTable = false;
		this.showDetails = true;
	},
	backList(){
		this.showTable = true;
		this.showDetails = false;
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
	typeFormatter(row, column, cellValue){
		var type = row[column.property];  
		if(type == '0'){
	  		return '主观题';
	  	}else{
	  		return '客观题';
	  	}
	  	if (type == undefined || type == '') {  
	     return "";  
	  	}
	},
	ablitFormatter(row, column, cellValue){
		var values = cellValue;
		if(values == '1'){
	  		return '√';
	  	}else{
	  		return '';
	  	}
	},
	ajaxData(){
		var data = new Object();
		data["pageSize"] = this.pageSize;
		data["pageNum"] = this.pageNum;
		data["specificationName"] = this.queryInfos.specificationName;
		data["gradeName"] = this.queryInfos.gradeName;
		data["subjectName"] = this.queryInfos.subjectName;
		return data;
	}
  }
}
</script>

<style>
#twoWayTable .twoWay_info_search{
	width: 90%;
	margin:20px auto;
}
#twoWayTable .twoWay_info_table{
	width: 90%;
	margin:20px auto;
}
#twoWayTable .el-table__row .checkIcon{
	font-size: 22px;
    color: #67C23A;
    font-weight: 800;
}
</style>