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
				  		<el-select v-model="queryInfos.gradeCode" placeholder="年级">
					      <el-option v-for="e in gradeOption" :label="e" :value="e"></el-option>
					    </el-select>
				  	</div>
				  </el-col>
				  <el-col class="queryItems" :span="6">	
				  	<div class="l">科目</div>
				  	<div class="r">
				  		<el-select v-model="queryInfos.subjectCode" placeholder="请选择科目">
						    <el-option v-for="e in subjectArray" :key="e" :label="e" :value="e">
						    </el-option>
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
			
			<div class="twoWay_info_table">
				<div class="tools fix">
					<div class="items_tools l" @click="add_two_way">
						<i class="el-icon-circle-plus-outline">新增</i>
					</div>	
				</div>
				<el-table :data="tableData" style="width: 100%">
			      <el-table-column prop="specificationName" align="center" label="双向细目表名称"></el-table-column>
			      <el-table-column prop="gradeCode"  align="center" label="年级"></el-table-column>
			      <el-table-column prop="subjectCode" align="center"  label="科目"></el-table-column>
			      <el-table-column prop="createDate" align="center" :formatter="timeFormatter"  label="创建时间"></el-table-column>
			      <el-table-column align="center" label="操作" width='250'>
			      	<template scope="scope">
			      		<el-button type="primary" icon="el-icon-search" @click="showInfo(scope.row)">查看</el-button>
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
					<div class="items_tools l" @click="addDetials">
						<i class="el-icon-circle-plus-outline">新增</i>
					</div>
					<div class="items_tools r" @click="backList">
						<i class="el-icon-back" >返回列表</i>
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
			      <el-table-column prop="knowledgeName" align="center" width='250' show-overflow-tooltip label="知识点"></el-table-column>
			      <el-table-column align="center" label="操作" width='250'>
			      	<template scope="scope">
			      		<el-button type="primary" icon="el-icon-delete" @click="deleteInfoDetail(scope.row.id)">删除</el-button>
			      	</template>
			      </el-table-column>
			    </el-table>
			</div>
		</div>
		</transition>
		
		<el-dialog title="添加双向细目表" :visible.sync="dialogVisible" width="70%">
		  	<el-row id="queryForm" :model="TwoWaySpecification" :gutter="20">
			  <el-col class="queryItems" :span="6" >
			  	<div class="l">名称</div>
			  	<div class="r">
			  		<el-input v-model="TwoWaySpecification.specificationName" placeholder="名称"></el-input>
			  	</div>
			  </el-col>
			   <el-col class="queryItems" :span="6">
			  	<div class="l">年级</div>
			  	<div class="r">
			  		<el-select v-model="TwoWaySpecification.gradeCode" placeholder="年级">
				      <el-option v-for="e in gradeOption" :label="e" :value="e"></el-option>
				    </el-select>
			  	</div>
			  </el-col>
			  <el-col class="queryItems" :span="6">
			  	<div class="l">科目</div>
			  	<div class="r">
			  		<el-select @change="subjectChange" v-model="TwoWaySpecification.subjectCode" placeholder="请选择科目">
					    <el-option v-for="e in subjectArray" :key="e" :label="e" :value="e">
					    </el-option>
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
				<el-col :span="1">题号</el-col>
				<el-col :span="2">题型</el-col>
				<el-col :span="1">满分</el-col>
				<el-col :span="2">答案</el-col>
				<el-col :span="12">能力值</el-col>
				<el-col :span="4">知识点</el-col>
				<el-col :span="2">操作</el-col>
			</el-row>
			
			<el-row v-model="two_way_D" :gutter="10">
				<div v-for="e in two_way_D">
					<el-col :span="1">
						<el-input v-model="e.itemNo" ></el-input>
					</el-col>
					<el-col :span="2">
						<el-select v-model="e.itemType" >
					      <el-option label="主观题" value="0"></el-option>
					      <el-option label="客观题" value="1"></el-option>
					    </el-select>
					</el-col>
					<el-col :span="1">
						<el-input v-model="e.itemScore" ></el-input>
					</el-col>
					<el-col :span="2">
						<el-input v-model="e.itemAnswer" ></el-input>
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
					<el-col :span="4">
					    <el-cascader v-model="e.knowledgeId" :options="knowOption" :props="defaultProps" :show-all-levels="false"></el-cascader>
					</el-col>
					<el-col :span="2">
						 <el-button type="danger" size="small" round @click.prevent="removeDomain(e)">删除</el-button>
					</el-col>
				</div>
				
			</el-row>
		  	
		  	<span slot="footer" class="dialog-footer">
			  <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
			  <el-button type="primary" @click="saveEdit">确 定</el-button>
			</span>
		</el-dialog>
		
		<el-dialog title="编辑双向细目表" :visible.sync="dialogEdit" width="70%">
			<el-row :gutter="10">
				<el-col :span="1">题号</el-col>
				<el-col :span="2">题型</el-col>
				<el-col :span="1">满分</el-col>
				<el-col :span="2">答案</el-col>
				<el-col :span="12">能力值</el-col>
				<el-col :span="6">知识点</el-col>
			</el-row>
			
			<el-row v-model="two_way_D_single" :gutter="10">
				<el-col :span="1">
					<el-input v-model="two_way_D_single.itemNo" ></el-input>
				</el-col>
				<el-col :span="2">
					<el-select v-model="two_way_D_single.itemType" >
				      <el-option label="主观题" value="0"></el-option>
				      <el-option label="客观题" value="1"></el-option>
				    </el-select>
				</el-col>
				<el-col :span="1">
					<el-input v-model="two_way_D_single.itemScore" ></el-input>
				</el-col>
				<el-col :span="2">
					<el-input v-model="two_way_D_single.itemAnswer" ></el-input>
				</el-col>
				<el-col :span="12">
					<el-row :gutter="10">
						<el-checkbox-group v-model="two_way_D_single.itemAbility">
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
				<el-col :span="6">
				    <el-cascader v-model="two_way_D_single.knowledgeId" :options="knowOption" :props="defaultProps" :show-all-levels="false"></el-cascader>
				</el-col>
				
			</el-row>
			
			<span slot="footer" class="dialog-footer">
			  <el-button type="primary" @click="dialogEdit = false">取 消</el-button>
			  <el-button type="primary" @click="saveDetials">确 定</el-button>
			</span>
		</el-dialog>
		
	</div>
</template>

<script>
import TwoWay from '../../assets/examManager/TwoWay'
export default {
  data () {

    return {
	  msg: 'twoWayTable',
	  tableData:[],
	  detailsData:[],
	  queryInfos:{
	  	specificationName:'',
	  	gradeCode:'',
	  	subjectCode:''
	  },
	  pageNum:1,
      pageSize:10,
      total:1,
      
      subjectArray:[],
      gradeOption:[],
      
      showTable:true,
      showDetails:false,
      parentId:'',
      dialogVisible:false,
      dialogSubject:'',
      
      dialogEdit:false,
      two_way_D_single:{
      	itemNo:'',
  		itemType:'0',
  		itemScore:'',
  		itemAnswer:'',
  		itemAbility:[]
      },
      
      TwoWaySpecification:{
	  },
	  two_way_D:[
	  	{
	  		itemNo:'',
	  		itemType:'0',
	  		itemScore:'',
	  		itemAnswer:'',
	  		itemAbility:[]
	  	},
	  ],
	  
	  rules: {
          specificationName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' }
          ],
     },
     
     knowOption:[],
     defaultProps: {
	      children: 'kpVOChildList',
	      label: 'knowledgeContent',
	      value:'id'
	 },
    }
  },
  mounted:function(){
  	this.queryInfo();
  	this.postHttp(this,{},"school/querySchools",function(obj,res){
  		obj.subjectArray = res.result.subjectArray;
  	});
  	
  	this.postHttp(this,{},'getLoingGrade',function(obj,res){
  		obj.gradeOption = res.result;
  	});
  },
  methods:{
  	queryInfo(){
  		var datas = this.ajaxData();
	  	this.postHttp(this,datas,'twowayspecification/queryTwoWaySpecifications',function(obj,res){
	  		obj.pageNum = res.result.pageNum;
	  		obj.pageSize = res.result.pageSize;
	  		obj.total = res.result.total;
	  		obj.tableData = res.result.list;
	  	})
  	},
  	saveEdit(){
  		var id = this.TwoWaySpecification.id;
  		var address = 'twowayspecification/saveTwoWaySpecification';
  		if(id){
  			address = 'twowayspecification/updateTwoWaySpecification';
  		}
  		var dataDetails = this.formatDate();
		this.TwoWaySpecification['twDetails'] = JSON.stringify(dataDetails);
  		if(!this.TwoWaySpecification.specificationName){
  			this.notify_jr(this,'操作错误','请输入细目表名称','warning');
  			return;
  		}
  		if(!this.TwoWaySpecification.gradeCode){
  			this.notify_jr(this,'操作错误','请选择年级','warning');
  			return;
  		}
  		if(!this.TwoWaySpecification.subjectCode){
  			this.notify_jr(this,'操作错误','请选择科目','warning');
  			return;
  		}
      	this.postHttp(this,this.TwoWaySpecification,address,function(obj,res){
			if(res.code == '10000'){
				obj.dialogVisible = false;
				obj.notify_success();
				obj.queryInfo();
			}else{
				obj.notify_jr(obj,'操作错误',res.message,'error');
			}
        });
  	},
	editInfo(id){
		
	},
	deleteInfo(id){
		this.$confirm('此操作将删除该双向细目表和已经关联的考试计划,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	this.postHttp(this,{id:id},'twowayspecification/deleteTwoWaySpecification',function(obj,res){
		  		if(res.code == "10000"){
		  			obj.notify_success();
					obj.queryInfo();
		  		}else{
		  			obj.notify_jr(obj,'操作错误',res.message,'error');
		  		}
		  	});
        }).catch(() => {
        	
        });
	},
	deleteInfoDetail(id){
		this.$confirm('此操作将删除该细则,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	this.postHttp(this,{id:id},'twowayspecificationdetail/deleteTwoWaySpecificationDetail',function(obj,res){
		  		if(res.code == "10000"){
		  			obj.notify_success();
					var row = {id:obj.parentId,subjectCode:obj.dialogSubject};
					obj.showInfo(row);
		  		}else{
		  			obj.notify_jr(obj,'操作错误',res.message,'error');
		  		}
		  	});
        }).catch(() => {
        	
        });
	},
	addDetials(){
		this.dialogEdit = true;
		this.postHttp(this,{subjectName:this.dialogSubject},'knowledgepoint/queryKnowledgePointsBySubjectName',function(obj,res){
	  		obj.knowOption = res.result;
	  	});
	},
	saveDetials(){
		this.two_way_D_single["parentId"] = this.parentId;
		var data = this.formatDateSingle();
		this.postHttp(this,data,"twowayspecificationdetail/saveTwoWaySpecificationDetail",function(obj,res){
			if(res.code == '10000'){
				obj.dialogEdit = false;
				obj.notify_success();
				var row = {id:obj.parentId,subjectCode:obj.dialogSubject};
				obj.showInfo(row);
			}else{
				obj.notify_jr(obj,'操作错误',res.message,'error');
			}
        });
	},
	showInfo(row){
		this.showTable = false;
		this.showDetails = true;
		this.parentId = row.id;
		this.dialogSubject = row.subjectCode;
		this.postHttp(this,{parentId:row.id},'twowayspecificationdetail/queryTwoWaySpecificationDetails',function(obj,res){
			var deDate = res.result;
			for(var i = 0;i < deDate.length; i++){
				var itemAbility = deDate[i].itemAbility;
				var arrays = new Array();
				for(var j = 0;j < itemAbility.length;j++){
					arrays.push(itemAbility[j]);
				}
				deDate[i].itemAbility = arrays;
			}
	  		obj.detailsData = deDate;
	  	})
	},
	backList(){
		this.showTable = true;
		this.showDetails = false;
	},
	add_two_way(){
		this.dialogVisible = true;
	},
	subjectChange(){
		var subjectName = this.TwoWaySpecification.subjectCode;
		this.postHttp(this,{subjectName:subjectName},'knowledgepoint/queryKnowledgePointsBySubjectName',function(obj,res){
	  		obj.knowOption = res.result;
	  	});
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
		data["gradeCode"] = this.queryInfos.gradeCode;
		data["subjectCode"] = this.queryInfos.subjectCode;
		return data;
	},
	formatDateSingle(){
		var data = JSON.parse(JSON.stringify(this.two_way_D_single));
		var itemAbility = data.itemAbility.toString();
		var itemAbilityString = "";
		if(itemAbility.indexOf('空间想象') >= 0){
			itemAbilityString +='1';
		}else{
			itemAbilityString +='0';
		}
		if(itemAbility.indexOf('抽象概括') >= 0){
			itemAbilityString +='1';
		}else{
			itemAbilityString +='0';
		}
		if(itemAbility.indexOf('推理论证') >= 0){
			itemAbilityString +='1';
		}else{
			itemAbilityString +='0';
		}
		if(itemAbility.indexOf('运算求解') >= 0){
			itemAbilityString +='1';
		}else{
			itemAbilityString +='0';
		}
		if(itemAbility.indexOf('数据处理') >= 0){
			itemAbilityString +='1';
		}else{
			itemAbilityString +='0';
		}
		if(itemAbility.indexOf('综合应用') >= 0){
			itemAbilityString +='1';
		}else{
			itemAbilityString +='0';
		}
		data.itemAbility = itemAbilityString;
		var knowledgeId = data.knowledgeId[(data.knowledgeId.length -1)];
		data.knowledgeId = knowledgeId;
		return data;
	},
	formatDate(){
		var data = JSON.parse(JSON.stringify(this.two_way_D));
		var dataArray = new Array();
		for(var i = 0;i < data.length;i++){
			var itemAbility = data[i].itemAbility.toString();
			var itemAbilityString = "";
			if(itemAbility.indexOf('空间想象') >= 0){
				itemAbilityString +='1';
			}else{
				itemAbilityString +='0';
			}
			if(itemAbility.indexOf('抽象概括') >= 0){
				itemAbilityString +='1';
			}else{
				itemAbilityString +='0';
			}
			if(itemAbility.indexOf('推理论证') >= 0){
				itemAbilityString +='1';
			}else{
				itemAbilityString +='0';
			}
			if(itemAbility.indexOf('运算求解') >= 0){
				itemAbilityString +='1';
			}else{
				itemAbilityString +='0';
			}
			if(itemAbility.indexOf('数据处理') >= 0){
				itemAbilityString +='1';
			}else{
				itemAbilityString +='0';
			}
			if(itemAbility.indexOf('综合应用') >= 0){
				itemAbilityString +='1';
			}else{
				itemAbilityString +='0';
			}
			data[i].itemAbility = itemAbilityString;
			var knowledgeId = data[i].knowledgeId[(data[i].knowledgeId.length -1)];
			data[i].knowledgeId = knowledgeId;
			dataArray[i] = data[i];
		}
		return dataArray;
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
#twoWayTable .two_way_subject{
    width: 600px;
    margin: 5px auto;
	height:50px;
	line-height: 50px;
	color:#666;
	border-bottom:1px #e2e2e2 solid;
}
#twoWayTable .el-collapse-item__header{padding-left:20px;}
#twoWayTable .el-checkbox-group{padding:0px 20px;}
#twoWayTable .el-checkbox.is-bordered.is-checked{border-color:#FFD100}
#twoWayTable .el-col{
	height: 40px;
    line-height: 40px;
    text-align: center;
    margin-bottom:2px;
}
</style>