<template>
<div id="resources">
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
		this.$store.commit('newTab','3');
		this.$store.commit('newTitle','资源');
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
    }
    }
  };
</script>
<style>
#resources{
	width: 100%;
  background-color: white;
	padding-top: 8vh;
}
</style>