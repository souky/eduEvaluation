<template>
	<div id="knowledgePoint" class="main_body">
		<div class="knowledge_body">
			<div class="title">选择科目</div>
			<div class="select_subject fix">
				<div v-for="e in subjectArray" class="items l" @click="changeSubject($event)">{{e}}</div>
			</div>
			<div class="title">知识点</div>
			<div class="konwledge_detiles fix">
				<el-tree id="textBookT" :data="data" :render-content="renderContent" node-key="id" :props="defaultProps"  @node-click="handleNodeClick"></el-tree>
			</div>
		</div>
		
		<el-dialog title="新增" :visible.sync="dialogVisible" width="30%">
		  <div class="dialog_body">
		  	<el-form label-position="right" label-width="80px" :rules="rules" ref="konw" class="demo-ruleForm" :model="konw">
			  <el-form-item label="名称" prop="knowledgeContent">
			    <el-input v-model="konw.knowledgeContent"></el-input>
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
      msg: 'knowledgePoint',
      subjectArray:['语文','数学','英语','物理','化学','历史','政治','地理'],
      defaultProps: {
	        children: 'kpVOChildList',
	        label: 'knowledgeContent',
	        id:'id'
	  },
	  data: [],
	  
	  dialogVisible:false,
	  konw:{
	  	parentId:'',
	  	knowledgeContent:''
	  },
	  rules: {
          knowledgeContent: [
            { required: true, message: '请输入知识点名称', trigger: 'blur' }
          ],
     },
     queryName:'语文',
    }
  },
  mounted:function(){
  	document.getElementsByClassName("items")[0].click();
  	this.loadKonwP();
  },
  methods:{
	changeSubject(event){
		var list = document.getElementsByClassName("items");
		for(var i = 0;i < list.length;i++){
			list[i].className = 'items l';
		}
		event.currentTarget.className = 'items l active';
		this.queryName = event.currentTarget.innerHTML;
		this.loadKonwP();
	},
	loadKonwP(){
		this.postHttp(this,{subjectName:this.queryName},'knowledgepoint/queryKnowledgePointsBySubjectName',function(obj,res){
	  		obj.data = res.result;
	  	});
	},
	colseDia(){
  		this.dialogVisible = false;
  		this.konw = {};
  	},
  	saveEdit(){
  		var address = 'knowledgepoint/saveKnowledgePoint';
		this.$refs['konw'].validate((valid) => {
          if (valid) {
          	this.postHttp(this,this.konw,address,function(obj,res){
	  			if(res.code = '10000'){
	  				obj.dialogVisible = false;
	  				obj.notify_success();
	  				obj.loadKonwP();
	  			}else{
	  				obj.notify_jr(obj,'操作错误',res.message,'error');
	  			}
	  		})
          } else {
            return false;
          }
        });
  		
  	},
	handleNodeClick(data){
		console.log(data)
	},
	renderContent(createElement, { node, data, store }) {
	    var self = this;  
	    return createElement('div',{attrs:{  
	            style:"width:100%;"  
	        }}, [  
	        createElement('span', node.label),  
	        createElement('span', {attrs:{  
	            style:"float: right; margin-right: 20px",class:"tree_btn"  
	        }},[  
	            createElement('i',{attrs:{  
	                class:'el-icon-plus'
	            },on:{  
	                click:function() {  
	                	self.konw.parentId = data.id;
	                	self.konw.subjectId = self.queryName;
	                	self.dialogVisible = true;
	                	self.konw.knowledgeContent = "";
	                }  
	            }},""),  
	            createElement('i',{attrs:{  
	                 class:'el-icon-minus'  
	            },on:{  
	                click:function() {  
	                	//self.text_id = data.id;
	                	self.$confirm('此操作将删除该大纲下所有子项,是否继续?', '提示', {
							          confirmButtonText: '确定',
							          cancelButtonText: '取消',
							          type: 'warning'
							        }).then(() => {
							        	//self.delete_text_s();
							        }).catch(() => {
							        	
							        });
	                }  
	            }},""),  
	        ]),  
	    ]);  
	  },
  }
}
</script>

<style>
#knowledgePoint .knowledge_body{
	width: 90%;
	margin:20px auto;
}
#knowledgePoint .knowledge_body .select_subject{
	margin-bottom: 30px;
}
#knowledgePoint .knowledge_body  .title{
	width:20%;
	border-bottom:1px #a7a7a7 solid;
	height:40px;
	line-height: 40px;
}
#knowledgePoint .knowledge_body .select_subject .items{
	width:18%;
	height: 40px;
	line-height: 40px;
	color:#7b7b7b;
	border:1px solid #e4e4e4;
	border-radius: 3px;
	text-align: center;
	cursor: pointer;
	font-size:18px;
	margin-right:1%;
	margin-top:20px;
}
#knowledgePoint .knowledge_body .select_subject .items.active{
	border-color: #FFD100;
	background: #FFD100;
	color:#fff;
}
#knowledgePoint .konwledge_detiles{
	padding-top: 20px;
}
#knowledgePoint .konwledge_detiles .detiles_left{
	width: 400px;
}
#knowledgePoint .konwledge_detiles .detiles_right{
	width: calc(100% - 420);	
}

#knowledgePoint #textBookT{width:95%;}
#knowledgePoint #textBookT i{font-size:14px;padding:3px;margin-right:20px;border-radius:2px;}
#knowledgePoint .el-icon-plus{color:#EF5350;border:1px #EF5350 solid;}
#knowledgePoint .el-icon-minus{color:#FFCA28;border:1px #FFCA28 solid;}
#knowledgePoint .el-tree-node__expand-icon{border-left-color:#202a33;}
</style>