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
			  		<el-input v-model="queryInfos.userName" placeholder="用户名"></el-input>
			  	</div>
			  </el-col>
			  <el-col class="queryItems" :span="6">	
			  	<div class="l">角色</div>
			  	<div class="r">
			  		<el-select v-model="queryInfos.roleId" placeholder="请选择">
				    <el-option v-for="item in roleOptions" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
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
				<div class="items_tools l" @click="addNew">
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
		
		<el-dialog title="新增" :visible.sync="dialogVisible" width="30%">
		  <div class="dialog_body">
		  	<el-form label-position="right" label-width="80px" :model="user">
			  <el-form-item label="名称">
			    <el-input v-model="user.name"></el-input>
			  </el-form-item>
			  <el-form-item label="用户名">
			    <el-input v-model="user.userName"></el-input>
			  </el-form-item>
			  <el-form-item label="密码" v-show="showPsw">
			    <el-input type="password" v-model="user.userPsw"></el-input>
			  </el-form-item>
			  <el-form-item label="重复密码" v-show="showPsw">
			    <el-input type="password" v-model="user.userPswS"></el-input>
			  </el-form-item>
			  <el-form-item label="用户类型">
			  	<el-select v-model="user.userType" placeholder="请选择">
				    <el-option v-for="item in userTypeO" :key="item.id" :label="item.value" :value="item.id"></el-option>
				</el-select>
			  </el-form-item>
			  <el-form-item label="用户角色">
			    <el-select v-model="user.roleId" name="selectRoleName" placeholder="请选择">
				    <el-option  v-for="item in roleOptions" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
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
export default {
  data () {

    return {
      msg: 'userManager',
      tableData:[],
      queryInfos:{
	  	name:'',
	  	userName:'',
	  	roleId:''
	  },
	  pageNum:1,
      pageSize:10,
      total:1,
      roleOptions:[],
      
      dialogVisible:false,
      user:{},
      showPsw:true,
      userTypeO:[
      	{
      		id:1,
      		value:'管理员'
      	},
      	{
      		id:2,
      		value:'普通用户'
      	}
      ]
    }
  },
  mounted:function(){
  	this.queryInfo();
  	this.postHttp(this,{pageNum:1,pageSize:100},'role/queryRoles',function(obj,res){
  		obj.roleOptions = res.result.list;
  	})
  },
  methods:{
	queryInfo(){
  		var datas = this.ajaxData();
  		this.postHttp(this,datas,'user/queryUsers',function(obj,res){
	  		obj.pageNum = res.result.pageNum;
	  		obj.pageSize = res.result.pageSize;
	  		obj.total = res.result.total;
	  		obj.tableData = res.result.list;
	  	})
  	},
  	colseDia(){
  		this.dialogVisible = false;
  		this.user = {};
  	},
  	saveEdit(){
  		var id = this.user.id;
  		var address = 'user/saveUser';
  		if(id){
  			address = 'user/updateUser';
  			delete this.user.createDate;
  			delete this.user.updateDate;
  		}
  		this.user["roleName"] = document.getElementsByName("selectRoleName")[0].value;
  		this.user["phone"] = this.user.userName;
		this.postHttp(this,this.user,address,function(obj,res){
			if(res.code = '10000'){
				obj.dialogVisible = false;
				obj.notify_success();
				obj.queryInfo();
			}else{
				obj.notify_jr(obj,'操作错误',res.message,'error');
			}
		})
  	},
  	addNew(){
  		this.dialogVisible = true;
  		this.showPsw = true;
  		this.user = {};
  	},
	editInfo(id){
		this.postHttp(this,{id:id},'user/getUserById',function(obj,res){
  			if(res.code = '10000'){
  				obj.user = res.result;
  				obj.showPsw = false;
  				obj.dialogVisible = true;
  			}else{
  				obj.notify_jr(obj,'操作错误',res.message,'error');
  			}
  		})
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
	},
	ajaxData(){
		var data = new Object();
		data["pageSize"] = this.pageSize;
		data["pageNum"] = this.pageNum;
		data["name"] = this.queryInfos.name;
		data["userName"] = this.queryInfos.userName;
		data["roleId"] = this.queryInfos.roleId;
		return data;
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