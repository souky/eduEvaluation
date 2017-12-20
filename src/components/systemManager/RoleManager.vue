<template>
	<div id="roleManager" class="main_body">
		<div class="role_info_search">
			
			<el-row id="queryForm" :model="queryInfos" :gutter="20">
			  <el-col class="queryItems" :span="6">
			  	<div class="l">名称</div>
			  	<div class="r">
			  		<el-input v-model="queryInfos.roleName" placeholder="名称"></el-input>
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
		
		<div class="role_info_table">
			<div class="tools fix">
				<div class="items_tools l" @click="addNew">
					<i class="el-icon-circle-plus-outline" >新增</i>
				</div>	
			</div>
			<el-table :data="tableData" style="width: 100%">
		      <el-table-column prop="roleName" align="center" label="名称"></el-table-column>
		      <el-table-column prop="remark" align="center"  label="备注"></el-table-column>
		      <el-table-column align="center" label="操作" width='300'>
		      	<template scope="scope">
		      		<el-button type="primary" icon="el-icon-menu" @click="authorizationInfo(scope.row.id)">授权</el-button>
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
		  	<el-form label-position="right" :rules="rules" ref="role" class="demo-ruleForm" label-width="80px" :model="role">
			  <el-form-item label="名称" prop="roleName">
			    <el-input v-model="role.roleName"></el-input>
			  </el-form-item>
			</el-form>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="colseDia">取 消</el-button>
		    <el-button type="primary" @click="saveEdit">确 定</el-button>
		  </span>
		</el-dialog>
		
		<el-dialog title="授权" :visible.sync="dialogVisibleAuth" width="50%" :before-close = 'authClose'>
			<el-tree id="textBookT" :data="authorization" ref="tree" :default-checked-keys="authKey"  node-key="id" :props="defaultProps" show-checkbox></el-tree>
		</el-dialog>
	</div>
	
</template>

<script>
import RoleManager from '../../assets/systemManagerData/RoleManager'
export default {
  data () {

    return {
      msg: 'userManager',
      tableData:[],
      queryInfos:{
	  	roleName:''
	  },
	  pageNum:1,
      pageSize:10,
      total:1,
      
      dialogVisible:false,
      diaTitle:'新增',
      
      authorization:[],
      dialogVisibleAuth:false,
      defaultProps: {
	        children: 'children',
	        label: 'permissionName',
	        id:'id'
	  },
	  authKey:[],
	  roleIdAuth:"",
      
      role:{},
      rules: {
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' }
          ],
      }
    }
  },
  mounted:function(){
  	this.queryInfo();
  	
  	this.postHttp(this,{},'getAllMenu',function(obj,res){
  		obj.authorization = res.result;
  	})
  },
  methods:{
	queryInfo(){
  		var datas = this.ajaxData();
	  	this.postHttp(this,datas,'role/queryRoles',function(obj,res){
	  		obj.pageNum = res.result.pageNum;
	  		obj.pageSize = res.result.pageSize;
	  		obj.total = res.result.total;
	  		obj.tableData = res.result.list;
	  	})
  	},
  	colseDia(){
  		this.dialogVisible = false;
  		this.role = {};
  	},
  	saveEdit(){
  		var id = this.role.id;
  		var address = 'role/saveRole';
  		if(id){
  			address = 'role/updateRole';
  		}
  		this.$refs['role'].validate((valid) => {
          if (valid) {
          	this.postHttp(this,this.role,address,function(obj,res){
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
  	},
  	addNew(){
  		this.dialogVisible = true;
  		this.role = {};
  		this.diaTitle = "新增";
  		this.$refs['role'].resetFields();
  	},
	editInfo(id){
		this.$refs['role'].resetFields();
		this.diaTitle = "编辑";
		this.postHttp(this,{id:id},'role/getRoleById',function(obj,res){
  			if(res.code == '10000'){
  				obj.role = res.result;
  				obj.dialogVisible = true;
  			}else{
  				obj.notify_jr(obj,'操作错误',res.message,'error');
  			}
  		})
	},
	deleteInfo(id){
		this.$confirm('此操作将删除该角色信息,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	this.postHttp(this,{id:id},'role/deleteRole',function(obj,res){
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
	authorizationInfo(id){
		this.dialogVisibleAuth = true;
		this.roleIdAuth = id;
		this.postHttp(this,{roleId:id},'permission/queryPermission',function(obj,res){
			var s = res.result
	  		obj.authorization = s;
	  		var arrays = new Array();
	  		for(var i = 0;i < s.length;i++){
	  			var o = s[i];
	  			if(o.isHasPermission == 1){
	  				arrays.push(o.id);
	  			}
	  			if(o.children != "" && o.children != undefined){
	  				var oo = o.children;
	  				for(var j = 0;j < oo.length;j++){
	  					if(oo[j].isHasPermission == 1){
			  				arrays.push(oo[j].id);
			  			}
	  				}
	  			}
	  		}
	  		obj.authKey = arrays;
		});
	},
	authClose(){
		var s = this.$refs.tree.getCheckedKeys();
		var id = this.roleIdAuth;
		var Objects = new Object();
		Objects['roleId'] = id;
		Objects['permissionIds'] = s;
		this.postHttp(this,Objects,'permission/grantPermissions',function(obj,res){
			if(res.code == "10000"){
				obj.dialogVisibleAuth = false;
				obj.notify_success();
			}else{
				obj.notify_jr(obj,'操作错误',res.message,'error');
			}
		})
		
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
	ajaxData(){
		var data = new Object();
		data["pageSize"] = this.pageSize;
		data["pageNum"] = this.pageNum;
		data["roleName"] = this.queryInfos.roleName;
		return data;
	}
  }
}
</script>

<style>
#roleManager .role_info_search{
	width: 90%;
	margin:20px auto;
}
#roleManager .role_info_table{
	width: 90%;
	margin:20px auto;
}
</style>