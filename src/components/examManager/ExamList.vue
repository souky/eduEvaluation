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
					<div class="items_tools l" @click="backList">
						<i class="el-icon-back">返回列表</i>
					</div>
					<div class="items_tools r">
						<i class="el-icon-check">保存</i>
					</div>
				</div>
				<div>
					<el-tabs tab-position="top" v-model="activeName" @tab-click="handleClick">
				    <el-tab-pane label="添加考试计划" name="first">
				    	<div class="add_exam_one">
				    		<el-form  :model="exam" label-width="100px">
							  <el-form-item label="考试名称">
							    <el-input v-model="exam.name"></el-input>
							  </el-form-item>
							  <el-form-item label="考试开始时间">
							  	 <el-date-picker v-model="exam.examStartDate" type="datetime" placeholder="考试开始时间"></el-date-picker>
							  </el-form-item>
							  <el-form-item label="考试结束时间">
							  	<el-date-picker v-model="exam.examEndDate" type="datetime" placeholder="考试结束时间"></el-date-picker>
							  </el-form-item>
							  <el-form-item label="年级">
							  	<el-select v-model="exam.grade" placeholder="请选择活动区域">
							      <el-option label="一年级" value="shanghai"></el-option>
							      <el-option label="二年级" value="beijing"></el-option>
							    </el-select>
							  </el-form-item>
							  <el-form-item label="学科">
							  	<el-select v-model="exam.subject" placeholder="请选择活动区域">
							      <el-option label="语文" value="shanghai"></el-option>
							      <el-option label="数学" value="beijing"></el-option>
							    </el-select>
							  </el-form-item>
							</el-form>
				    	</div>
				    </el-tab-pane>
				    <el-tab-pane label="选择考试学生" name="second">
				    	<div class="add_exam_two">
				    		<el-collapse accordion>
							  <el-collapse-item v-for="(e,index) in student" :title="e.label" :name="index">
							  	<!--<el-checkbox-group v-model='chiosedStu' size="mini">
								    <el-checkbox v-for="ee in e.children" checked :label="ee.name" :key="ee.id" border>{{ee.name}}</el-checkbox>
								</el-checkbox-group>-->
								<el-row>
									<el-col :span="5"></el-col>
									<el-col :span="1">序号</el-col>
								  	<el-col :span="1">
								  		全选
								  	</el-col>
								  	<el-col :span="3">姓名</el-col>
								  	<el-col :span="3">学号</el-col>
								  	<el-col :span="3">考号</el-col>
								  	<el-col :span="2">缺考</el-col>
								  	<el-col :span="6"></el-col>
								</el-row>
								<el-row v-for="(ee,indexs) in e.children">
									<el-col :span="5"></el-col>
									<el-col :span="1">{{indexs+1}}</el-col>
								  	<el-col :span="1">
								  		<el-checkbox checked> </el-checkbox>
								  	</el-col>
								  	<el-col :span="3">
								  		{{ee.name}}
								  	</el-col>
								  	<el-col :span="3">
								  		{{ee.stuNo}}
								  	</el-col>
								  	<el-col :span="3">
								  		<el-input v-model="ee.examNo" placeholder="考号"></el-input>
								  	</el-col>
								  	<el-col :span="2">
								  		<el-switch v-model="ee.status" active-color="#FFD100" inactive-color="#9e9e9e"></el-switch>
								  	</el-col>
								  	<el-col :span="6"></el-col>
								</el-row>
							  </el-collapse-item>
							</el-collapse>
				    	</div>
				    </el-tab-pane>
				    <el-tab-pane label="匹配双向细目表" name="third">
				    	<div class="add_exam_two">
				    		<!--<el-collapse  accordion>
							  <el-collapse-item v-for="(e,index) in subject" :title="e.label" :name="index">
							  	
							  </el-collapse-item>
							</el-collapse>-->
							
							<div class="two_way_subject fix" v-for="(e,index) in subject">
								<div class="title l">{{e.label}}</div>
								<div class="selete_item l">
									<el-select v-model="e.twoWayId" placeholder="选择细目表">
								      <el-option label="语文细目表" value="1"></el-option>
								      <el-option label="数学细目表" value="2"></el-option>
								    </el-select>
								</div>
								<div class="add_two_way l" @click="add_two_way">添加细目表</div>
							</div>
				    	</div>
				    </el-tab-pane>
				  </el-tabs>
				</div>
			</div>
		</div>
		</transition>
		
		<el-dialog title="添加双向细目表" :visible.sync="dialogVisible" width="70%">
		  	<el-row id="queryForm" :model="TwoWaySpecification" :gutter="20">
			  <el-col class="queryItems" :span="6">
			  	<div class="l">名称</div>
			  	<div class="r">
			  		<el-input v-model="TwoWaySpecification.specificationName" placeholder="名称"></el-input>
			  	</div>
			  </el-col>
			  <el-col class="queryItems" :span="6">
			  	<div class="l">科目</div>
			  	<div class="r">
			  		<el-input v-model="TwoWaySpecification.subjectCode" placeholder="科目" readOnly></el-input>
			  	</div>
			  </el-col>
			  <el-col class="queryItems" :span="6">
			  	<div class="l">年级</div>
			  	<div class="r">
			  		<el-select v-model="TwoWaySpecification.gradeCode" placeholder="年级">
				      <el-option label="一年级" value="1"></el-option>
				      <el-option label="二年级" value="2"></el-option>
				    </el-select>
			  	</div>
			  </el-col>
			  <el-col :span="6">
			  		<div class="btn_query r" @click="addDetile">
				  		<i class="el-icon-plus">添加详细</i>
				  	</div>
			  </el-col>
			</el-row>
			
			<el-row :gutter="10">
				<el-col :span="2">题号</el-col>
				<el-col :span="2">题型</el-col>
				<el-col :span="2">满分</el-col>
				<el-col :span="2">答案</el-col>
				<el-col :span="12">能力值</el-col>
				<el-col :span="3">操作</el-col>
			</el-row>
			
			<el-row v-model="two_way_D" :gutter="10">
				<div v-for="e in two_way_D">
					<el-col :span="2">
						<el-input v-model="e.itemNo" placeholder="题号" ></el-input>
					</el-col>
					<el-col :span="2">
						<el-select v-model="e.itemType" placeholder="题型">
					      <el-option label="主观题" value="0"></el-option>
					      <el-option label="客观题" value="1"></el-option>
					    </el-select>
					</el-col>
					<el-col :span="2">
						<el-input v-model="e.itemScore" placeholder="满分" ></el-input>
					</el-col>
					<el-col :span="2">
						<el-input v-model="e.itemAnswer" placeholder="答案" ></el-input>
					</el-col>
					<el-col :span="12">
						<el-row :gutter="10">
							<el-checkbox-group v-model="e.itemAbility">
								<el-col :span="4">
									<el-checkbox label="空间想象" ></el-checkbox>
								</el-col>
								<el-col :span="4">
									<el-checkbox label="抽象概括" ></el-checkbox>
								</el-col>
								<el-col :span="4">
									<el-checkbox label="推理论证" ></el-checkbox>
								</el-col>
								<el-col :span="4">
									<el-checkbox label="运算求解" ></el-checkbox>
								</el-col>
								<el-col :span="4">
									<el-checkbox label="数据处理" ></el-checkbox>
								</el-col>
								<el-col :span="4">
									<el-checkbox label="综合应用" ></el-checkbox>
								</el-col>
							</el-checkbox-group>
						</el-row>
					</el-col>
					<el-col :span="3">
						 <el-button type="danger" size="small" round @click.prevent="removeDomain(e)">删除</el-button>
					</el-col>
				</div>
				
			</el-row>
		  	
		  	<span slot="footer" class="dialog-footer">
			  <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
			  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		
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
      
      exam:{
		examName:'测试考试计划',
		examStartDate:'',
		examEndDate:'',
		grade:'一年级',
		subject:'语文',
		examStatus:'0',
		id:'wdawdawd123123'
	  },
	  
	  chiosedStu:[],
	  student:ExamList.student,
	  subject:ExamList.subject,
	  
	  dialogVisible:false,
	  TwoWaySpecification:{
	  	
	  },
	  two_way_D:[
	  	{
	  		itemNo:'',
	  		itemType:'0',
	  		itemScore:'',
	  		itemAnswer:'',
	  		itemAbility:['空间想象','运算求解']
	  	},
	  	
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
		this.queryInfo();
	},
	handleCurrentChange(val) {
	  	this.pageNum = val;
		this.queryInfo();
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
		
	},
	add_two_way(){
		this.dialogVisible = true;
	},
	addDetile(){
		this.two_way_D.push({
			itemNo:'',
	  		itemType:'0',
	  		itemScore:'',
	  		itemAnswer:'',
	  		itemAbility:[]
		});
	},
	removeDomain(item) {
	    var index = this.two_way_D.indexOf(item)
	    if (index !== -1) {
	      this.two_way_D.splice(index, 1)
	    }
	},
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
#examList .el-tabs__item:hover{color:#FFD100;}
#examList .add_exam_one{
	width:40%;
	margin:20px auto;
}
#examList .add_exam_two{
	width:100%;
	margin:20px auto;
}
#examList .el-collapse-item__header{padding-left:20px;}
#examList .el-checkbox-group{padding:0px 20px;}
#examList .el-checkbox.is-bordered.is-checked{border-color:#FFD100}
#examList .el-col{
	height: 40px;
    line-height: 40px;
    text-align: center;
    margin-bottom:2px;
}
#examList .el-checkbox:first-child{
	margin-right:0px
}

#examList .two_way_subject{
    width: 600px;
    margin: 5px auto;
	height:50px;
	line-height: 50px;
	color:#666;
	border-bottom:1px #e2e2e2 solid;
}
#examList .two_way_subject .title {
	width:100px;
	text-align: center;
}
#examList .two_way_subject .selete_item{
	width:300px;
}
#examList .two_way_subject .add_two_way{
	width:100px;
	height:40px;
	line-height: 40px;
	color:#fff;
	background:#FFD100;
	text-align: center;
	cursor: pointer;
	border-radius: 4px;
	margin-left: 50px;
	margin-top: 5px;
}
</style>