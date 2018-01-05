<template>
  <section class="page-demo" id="pageDemo">
    <div id="knowPoint">
          <div class="point" v-for="item in subList" :key="item.id" @click="resources(item.subjectName)">
             <div class="points">
                  <img :src="item.imgName" />
                  <p>{{item.subjectName}}</p>
             </div>
           </div> 
    </div>
  </section>
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
        queryName:'',
         subList:[]
      };
    },
    created:function(){
		this.$store.commit('newTab','1');
		this.$store.commit('newTitle','知识点');
	},
  mounted(){
    this.initall()
  },
    methods: {
      handleNodeClick(data) {
      },
      resources(e){
        this.$router.push({path:'/knowlegdeDetail',query:{examId:e}})
      },
      initall(){
        this.postHttp(this,'',"subject/getSubjectByLogin",function(obj,data){
                for(var a of data.result){
                  a.imgName = "static/img/APPImg/"+a.subjectCode+".png"
                }
                obj.subList = data.result;
        });
      }
    }
  };
</script>
<style>
#resources{
	width: 100%;
	margin-top: 50px;
}
#knowPoint{
  margin-top: 50px;
  background-color: white;
  float: left;
}
 #knowPoint .point{
      width: 33.3%;
      float: left;
    }
  #knowPoint .points{
      width: 90%;height: 0;padding-bottom: 90%;
      margin:5% 2.5% 5% 5%;
      border-radius: 4px;
      text-align: center;
    }
    #knowPoint .points img{
      padding-top:5vw;
    }
</style>