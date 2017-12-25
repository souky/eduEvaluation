<template>
	<div id="subjectInfo" class="main_body">
		<!--<div class="subject_info_search">
			<el-row id="queryForm" :model="queryInfos" :gutter="20">
			  <el-col class="queryItems" :span="6">
			  	<div class="l">科目编码</div>
			  	<div class="r">
			  		<el-input v-model="queryInfos.subjectCode" placeholder="科目编码"></el-input>
			  	</div>
			  </el-col>
			  <el-col class="queryItems" :span="6">
			  	<div class="l">科目名称</div>
			  	<div class="r">
			  		<el-input v-model="queryInfos.subjectName" placeholder="科目名称"></el-input>
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
		</div>-->
		
		<div class="subject_info_table">
			<el-table :data="tableData" style="width: 100%">
		      <el-table-column prop="subjectCode" align="center" label="科目编码"></el-table-column>
		      <el-table-column prop="subjectName" align="center" label="科目名称"></el-table-column>
		      <el-table-column  align="center" label="背景颜色">
		      	<template slot-scope="scope">
		      		<div class="colrs" :style="{background:scope.row.subjectColor}">{{scope.row.subjectColor}}</div>
		      	</template>
		      </el-table-column>
		      <!--<el-table-column align="center" label="操作">
		      	<template slot-scope="scope">
		      		<el-button type="primary" icon="el-icon-edit" @click="editInfo(scope.row.id)">编辑</el-button>
		      		<el-button type="primary" icon="el-icon-delete" @click="deleteInfo(scope.row.id)">删除</el-button>
		      	</template>
		      </el-table-column>-->
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
import SubjectInfo from '../../assets/schoolManagerData/SubjectInfo'
export default {
  data () {

    return {
      msg: 'subjectInfo',
      tableData:SubjectInfo.data,
	  queryInfos:{
	  	subjectCode:'',
	  	subjectName:''
	  },
	  pageNum:1,
      pageSize:10,
      total:1,
    }
  },
  mounted:function(){
  	var list = document.getElementsByClassName("colrs");
//	for(var e = 0;e < list.length;e++){
//		var gbk = list[e].getAttribute("data-bgk");
//		console.log(list[e]);
//		list[e].style.backgroundColor = ''+gbk;
//	}
  },
  methods:{
	queryInfo(){
  		
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
#subjectInfo .subject_info_search{
	width: 90%;
	margin:20px auto;
}
#subjectInfo .subject_info_table{
	width: 90%;
	margin:20px auto;
}
#subjectInfo .colrs{
	width:100px;
	height:30px;
	line-height: 30px;
	color:#fff;
	margin:auto;
	border-radius: 10px;
}
</style>