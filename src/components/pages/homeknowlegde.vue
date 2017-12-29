<template>
  <section class="page-demo" id="pageDemo">
<div id="knowPoint">
           <div class="point" >
             <div class="points">
                  <img src="static/img/APPImg/yw@1x.png" />
                  <p>语文</p>
             </div>
           </div>
           <div class="point">
             <div class="points">
                  <img src="static/img/APPImg/sx@1x.png" />
                  <p>数学</p>
             </div>
           </div>
           <div class="point">
             <div class="points">
                  <img src="static/img/APPImg/yy@1x.png" />
                  <p>英语</p>
             </div>
           </div>
           <div class="point">
             <div class="points">
                  <img src="static/img/APPImg/wl@1x.png" />
                  <p>物理</p>
             </div>
           </div>
           <div class="point">
             <div class="points">
                  <img src="static/img/APPImg/hy@1x.png" />
                  <p>化学</p>
             </div>
           </div>
           <div class="point">
             <div class="points">
                  <img src="static/img/APPImg/sw@1x.png" />
                  <p>生物</p>
             </div>
           </div>
           <div class="point">
             <div class="points">
                  <img src="static/img/APPImg/ls@1x.png" />
                  <p>历史</p>
             </div>
           </div>
           <div class="point" @click="resources('语文')">
             <div class="points">
                  <img src="static/img/APPImg/dl@1x.png" />
                  <p>地理</p>
             </div>
           </div>
           <div class="point">
             <div class="points">
                  <img src="static/img/APPImg/zh@1x.png" />
                  <p>政治</p>
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
        queryName:''
      };
    },
    created:function(){
		this.$store.commit('newTab','1');
		this.$store.commit('newTitle','知识点');
	},
    methods: {
      handleNodeClick(data) {
      },
      resources(e){
        this.$router.push({path:'/knowlegdeDetail',query:{examId:e}})
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