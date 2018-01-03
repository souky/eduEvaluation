<template>
<div id="resourcesMy">
	<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
</div>
</template>
<script>
  export default {
    data() {
      return {
        data: [],
        defaultProps: {
          children: 'kpVOChildList',
          label: 'knowledgeContent',
          id:'id'
        },
        queryName:''
      };
    },
  created:function(){
		this.$store.commit('newTab','7');
		this.$store.commit('newTitle','知识点');
    this.loadKonwP();
	},
  mounted:function(){
  },
  methods: {
      handleNodeClick(data) {
      },
      loadKonwP(){
        this.queryName =this.$route.query.examId;
        this.postHttp(this,{subjectName:this.queryName},'knowledgepoint/queryKnowledgePointsBySubjectName',function(obj,res){
          obj.data = res.result;
        });
    },
    }
  };
</script>
<style>
#resourcesMy{
	width: 100%;
  background-color:white;
	margin-top: 50px;
}
#resourcesMy .el-tree-node__label{
  font-size: 4vw
}
</style>