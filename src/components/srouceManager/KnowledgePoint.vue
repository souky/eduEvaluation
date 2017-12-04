<template>
	<div id="knowledgePoint" class="main_body">
		<div class="knowledge_body">
			<div class="title">选择科目</div>
			<div class="select_subject fix">
				<div v-for="e in subjectArray" class="items l" @click="changeSubject($event)">
					{{e}}
				</div>
			</div>
			<div class="title">知识点</div>
			<div class="konwledge_detiles fix">
				<div class="detiles_left l">
					<el-tree :data="data" :props="defaultProps" accordion @node-click="handleNodeClick"></el-tree>
				</div>
				<div class="detiles_right r">
					
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
export default {
  data () {

    return {
      msg: 'knowledgePoint',
      subjectArray:['语文','数学','英语','物理','化学','历史','政治','地理'],
      defaultProps: {
	        children: 'children',
	        label: 'label'
	  },
	  data: [{
         label: '一级 1',
         children: [{
           label: '二级 1-1',
           children: [{
             label: '三级 1-1-1'
           }]
         }]
       }, {
         label: '一级 2',
         children: [{
           label: '二级 2-1',
           children: [{
             label: '三级 2-1-1'
           }]
         }, {
           label: '二级 2-2',
           children: [{
             label: '三级 2-2-1'
           }]
         }]
       }, {
         label: '一级 3',
         children: [{
           label: '二级 3-1',
           children: [{
             label: '三级 3-1-1'
           }]
         }, {
           label: '二级 3-2',
           children: [{
             label: '三级 3-2-1'
           }]
         }]
       }],
    }
  },
  mounted:function(){
  	document.getElementsByClassName("items")[0].click();
  },
  methods:{
	changeSubject(event){
		var list = document.getElementsByClassName("items");
		for(var i = 0;i < list.length;i++){
			list[i].className = 'items l';
		}
		event.currentTarget.className = 'items l active';
	},
	handleNodeClick(data){
		console.log(data)
	}
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
</style>