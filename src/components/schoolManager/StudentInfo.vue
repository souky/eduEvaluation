<template>
	<div id="studentInfo" class="main_body">
		<div class="student_info_search">
			
			<el-row id="queryForm" :model="queryInfos" :gutter="20">
			  <el-col class="queryItems" :span="6">
			  	<div class="l">姓名</div>
			  	<div class="r">
			  		<el-input v-model="queryInfos.studentName" placeholder="姓名"></el-input>
			  	</div>
			  </el-col>
			  <el-col class="queryItems" :span="6">
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
		
		<div class="student_info_table">
			<div class="tools fix">
				<div class="items_tools l" @click="addNew">
					<i class="el-icon-circle-plus-outline">新增</i>
				</div>	
			</div>
			<el-table :data="tableData" style="width: 100%">
		      <el-table-column prop="studentName" align="center" label="姓名"></el-table-column>
		      <el-table-column prop="studentNo" align="center" label="学号"></el-table-column>
		      <el-table-column prop="studentSex" :formatter='sexFormatter' align="center" label="性别"></el-table-column>
		      <el-table-column prop="studentAge" align="center"  label="年龄"></el-table-column>
		      <el-table-column prop="studentContact" align="center"  label="联系人"></el-table-column>
		      <el-table-column prop="studentContactMobile" align="center"  label="联系方式"></el-table-column>
		      <el-table-column prop="classroomName" align="center"  label="班级"></el-table-column>
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
		
		<el-dialog :title="diaTitle" :visible.sync="dialogVisible" width="30%">
		  <div class="dialog_body">
		  	<el-form label-position="right" label-width="80px" :rules="rules" ref="student" class="demo-ruleForm"  :model="student">
		  	  <el-form-item label="姓名" prop="studentName" >
			  	<el-input v-model="student.studentName" placeholder="姓名"></el-input>
			  </el-form-item>
			  <el-form-item label="性别" prop="studentSex">
			    <el-select v-model="student.studentSex" placeholder="请选择">
				    <el-option v-for="item in sexOption" :key="item.id" :label="item.value" :value="item.id">
				    </el-option>
				</el-select>
			  </el-form-item>
			  <el-form-item label="年龄"  >
			  	<el-input v-model="student.studentAge" placeholder="年龄"></el-input>
			  </el-form-item>
			  <el-form-item label="联系人"  >
			  	<el-input v-model="student.studentContact" placeholder="联系人"></el-input>
			  </el-form-item>
			  <el-form-item label="联系方式"  >
			  	<el-input v-model="student.studentContactMobile" placeholder="联系方式"></el-input>
			  </el-form-item>
			  <el-form-item label="年级" v-show="showInfo">
			    <el-select v-model="grade" @change='changeGrade' placeholder="请选择">
				    <el-option v-for="item in gradeOption" :key="item" :label="item" :value="item">
				    </el-option>
				</el-select>
			  </el-form-item>
			  <el-form-item label="班级" prop="classroomId" v-show="showInfo">
			  	<el-select v-model="student.classroomId" placeholder="请选择">
			  		<el-option v-for="e in classOption" :label="e.classroomName" :key="e.id" :value="e.id" name="classId"></el-option>
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
import StudentInfo from '../../assets/schoolManagerData/StudentInfo'
export default {
  data () {

    return {
	  msg: 'studentInfo',
	  tableData:[],
	  queryInfos:{
	  	teacherName:'',
	  	teacherDuty:'',
	  	schoolName:''
	  },
	  
	  pageNum:1,
      pageSize:10,
      total:1,
      
      dialogVisible:false,
      diaTitle:'新增',
      gradeOption:[],
      student:{},
      sexOption:[
	  	{
	  		id:'1',
	  		value:'男'
	  	},
	  	{
	  		id:'0',
	  		value:'女'
	  	}
	  ],
	  classOption:[],
	  grade:'',
	  showInfo:true,
	  
	  rules: {
          studentName: [
            { required: true, message: '请输入学生名字', trigger: 'blur' }
          ],
          grade: [
            { required: true, message: '请选择年级', trigger: 'change' }
          ],
          studentSex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          classroomId: [
            { required: true, message: '请选择班级', trigger: 'change' }
          ],
      }
    }
  },
  mounted:function(){
  	this.queryInfo();
  	
  	this.postHttp(this,{},'getLoingGrade',function(obj,res){
  		obj.gradeOption = res.result;
  	});
  },
  methods:{
  	queryInfo(){
  		var datas = this.ajaxData();
	  	this.postHttp(this,datas,'student/queryStudents',function(obj,res){
	  		obj.pageNum = res.result.pageNum;
	  		obj.pageSize = res.result.pageSize;
	  		obj.total = res.result.total;
	  		obj.tableData = res.result.list;
	  	})
  	},
  	colseDia(){
  		this.dialogVisible = false;
  		this.student = {};
  	},
  	saveEdit(){
  		var id = this.student.id;
  		var address = 'student/saveStudent';
  		delete this.student["createDate"];
  		delete this.student["updateDate"];
  		var dataS = this.student;
  		if(id){
  			address = 'student/updateStudent';
  			this.student.grade = '1';
  			this.student.classroomId = '1';
  			
  			this.$refs['student'].validate((valid) => {
	          if (valid) {
	          	delete dataS['grade'];
	          	delete dataS['classroomId'];
	          	this.postHttp(this,dataS,address,function(obj,res){
		  			if(res.code == '10000'){
		  				obj.dialogVisible = false;
		  				obj.notify_success();
		  				obj.queryInfo();
		  				obj.student = {};
		  			}else{
		  				obj.notify_jr(obj,'操作错误',res.message,'error');
		  			}
		  		})
	          } else {
	            return false;
	          }
	        });
  		}else{
  			this.$refs['student'].validate((valid) => {
	          if (valid) {
	          	this.postHttp(this,dataS,address,function(obj,res){
		  			if(res.code == '10000'){
		  				obj.dialogVisible = false;
		  				obj.notify_success();
		  				obj.queryInfo();
		  				obj.student = {};
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
  		this.classroom = {};
  		this.diaTitle = "新增";
  		this.$refs['student'].resetFields();
  	},
	editInfo(id){
		this.$refs['student'].resetFields();
		this.showInfo = false;
		this.dialogVisible = true;
		this.diaTitle = "编辑";
		this.postHttp(this,{id:id},"student/getStudentById",function(obj,res){
  			if(res.code == '10000'){
  				obj.student = res.result;
  			}else{
  				obj.notify_jr(obj,'操作错误',res.message,'error');
  			}
  		})
	},
	deleteInfo(id){
		this.$confirm('此操作将删除该学生信息,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	this.postHttp(this,{id:id},'student/deleteStudent',function(obj,res){
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
	},
	ajaxData(){
		var data = new Object();
		data["pageSize"] = this.pageSize;
		data["pageNum"] = this.pageNum;
		data["studentName"] = this.queryInfos.studentName;
		return data;
	},
	changeGrade(val){
		this.postHttp(this,{grade:val},'classroom/queryClassroomsByGrade',function(obj,res){
	  		obj.classOption = res.result;
	  	});
	}
  }
}
</script>

<style>
#studentInfo .student_info_search{
	width: 90%;
	margin:20px auto;
}
#studentInfo .student_info_table{
	width: 90%;
	margin:20px auto;
}
</style>