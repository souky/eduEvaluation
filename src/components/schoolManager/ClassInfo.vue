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
			  		<el-input v-model="queryInfos.teacherName" placeholder="班主任名称"></el-input>
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
				<div class="items_tools l" @click="addNew">
					<i class="el-icon-circle-plus-outline">新增</i>
				</div>	
			</div>
			<el-table :data="tableData" style="width: 100%">
		      <el-table-column prop="classroomName" align="center" label="班级"></el-table-column>
		      <el-table-column prop="teacherName" align="center" show-overflow-tooltip label="班主任"></el-table-column>
		      <el-table-column prop="studentCount" align="center" label="班级人数"></el-table-column>
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
		
		
		<el-dialog :title="diaTitle" :visible.sync="dialogVisible" width="30%">
		  <div class="dialog_body">
		  	<el-form label-position="right" :rules="rules" ref="classroom" class="demo-ruleForm" label-width="80px" :model="classroom">
			  <el-form-item label="年级" v-show="showInfo" prop="gradeCode">
			    <el-select v-model="classroom.gradeCode" placeholder="请选择">
				    <el-option v-for="item in gradeOption" :key="item" :label="item" :value="item">
				    </el-option>
				</el-select>
			  </el-form-item>
			  <el-form-item label="班级"  v-show="showInfo" prop="classroomName">
			  	<el-input v-model="classroom.classroomName" placeholder="班级"></el-input>
			  </el-form-item>
			  <el-form-item label="班主任">
			    <el-select v-model="classroom.classTeacherId" placeholder="请选择">
				    <el-option v-for="item in teacherOption" :key="item.id" :label="item.teacherName" :value="item.id">
				    </el-option>
				</el-select>
			  </el-form-item>
			</el-form>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="colseDia">取 消</el-button>
		    <el-button type="primary" @click="saveEdit">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
	
</template>

<script>
import ClassInfo from '../../assets/schoolManagerData/ClassInfo'
export default {
  data () {

    return {
	  msg: 'classInfo',
	  tableData:[],
	  queryInfos:{
	  	classroomName:'',
	  	teacherName:''
	  },
	  
	  pageNum:1,
      pageSize:10,
      total:1,
      
      dialogVisible:false,
      diaTitle:'新增',
      showInfo:true,
      classroom:{},
      gradeOption:[],
      teacherOption:[],
      
	   rules: {
	      gradeCode: [
	        { required: true, message: '请选择年级', trigger: 'change' }
	      ],
	      classroomName: [
	        { required: true, message: '请输入班级', trigger: 'blur'},
	      ],
      }
    }
  },
  mounted:function(){
  	this.postHttp(this,{},'getLoingGrade',function(obj,res){
  		obj.gradeOption = res.result;
  	});
  	
  	this.postHttp(this,{pageNum:1,pageSize:400},'teacher/queryTeachers',function(obj,res){
  		obj.teacherOption = res.result.list;
  	});
  	
  	this.queryInfo();
  },
  methods:{
  	queryInfo(){
  		var datas = this.ajaxData();
	  	this.postHttp(this,datas,'classroom/queryClassrooms',function(obj,res){
	  		obj.pageNum = res.result.pageNum;
	  		obj.pageSize = res.result.pageSize;
	  		obj.total = res.result.total;
	  		obj.tableData = res.result.list;
	  	})
  	},
  	colseDia(){
  		this.dialogVisible = false;
  		this.classroom = {};
  	},
  	saveEdit(){
  		
	  		var id = this.classroom.id;
	  		var address = 'classroom/saveClassroom';
	  		delete this.classroom["createDate"];
	  		delete this.classroom["updateDate"];
	  		var dataS = this.classroom;
	  		if(id){
	  			address = 'classroom/updateClassroom';
	  			this.postHttp(this,dataS,address,function(obj,res){
		  			if(res.code == '10000'){
		  				obj.dialogVisible = false;
		  				obj.notify_success();
		  				obj.queryInfo();
		  			}else{
		  				obj.notify_jr(obj,'操作错误',res.message,'error');
		  			}
		  		})
	  		}else{
	  			this.$refs['classroom'].validate((valid) => {
          			if (valid) {
			  			var classNo = this.classroom.classroomName;
				  		var grade = this.classroom.gradeCode;
				  		delete dataS["gradeCode"];
				  		dataS.classroomName = grade + "(" + classNo + ")班";
				  		
				  		this.postHttp(this,dataS,address,function(obj,res){
				  			if(res.code == '10000'){
				  				obj.dialogVisible = false;
				  				obj.notify_success();
				  				obj.queryInfo();
				  			}else{
				  				obj.notify_jr(obj,'操作错误',res.message,'error');
				  			}
				  		})
				  	} else {
			            return false;
			        }
				});
		  	}
	  	
          	
  		
  	},
  	addNew(){
  		this.dialogVisible = true;
  		this.showInfo = true;
  		this.diaTitle = "新增";
  		this.classroom = {};
  		this.$refs['classroom'].resetFields();
  	},
	editInfo(id){
		this.$refs['classroom'].resetFields();
		this.showInfo = false;
		this.dialogVisible = true;
		this.diaTitle = "编辑";
		this.postHttp(this,{id:id},"classroom/getClassroomById",function(obj,res){
  			if(res.code == '10000'){
  				obj.classroom = res.result;
  			}else{
  				obj.notify_jr(obj,'操作错误',res.message,'error');
  			}
  		})
	},
	deleteInfo(id){
		this.$confirm('此操作将删除该班级和班级下学生,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	this.postHttp(this,{id:id},'classroom/deleteClassroom',function(obj,res){
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
	handleSizeChange(val) {
	  	this.pageNum = 1;
		this.pageSzie = val;
		this.queryInfo();
	},
	handleCurrentChange(val) {
	  	this.pageNum = val;
		this.queryInfo();
	},
	ajaxData(){
		var data = new Object();
		data["pageSize"] = this.pageSize;
		data["pageNum"] = this.pageNum;
		data["classroomName"] = this.queryInfos.classroomName;
		data["classTeather"] = this.queryInfos.classTeather;
		return data;
	}
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