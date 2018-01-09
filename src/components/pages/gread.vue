<template>
	<section class="page-demo" id="greadPage">
	  <mt-cell v-for="item in reportList" :key="item.id" :title="item.examName">
        <mt-button class="viewReport" @click="gotoReport(item.id)">查看报告</mt-button>
      </mt-cell>
      <div class="tips" v-if="tipsShow">暂无{{subs}}科目的考试</div>
	</section>
</template>
<script>
export default {
	data(){
		return{
			popupVisible:false,
			reportList:[],
			tipsShow:false,
			subs:''
		}
	},
	created:function(){
		this.$store.commit('newTitle','报告列表');
		this.$store.commit('newTab','1')
	},
	mounted:function(){
		this.inits()
	},
	methods:{
		inits(){
		this.subs = this.$route.query.examsub;
        this.reportList=[];
         this.postHttp(this,{subject:this.$route.query.examsub,pageNum:1,pageSize:0,examStatus:2},"exam/queryExams",function(obj,data){
             if(data.result){
             	if(data.result.list){
             		for(var value of data.result.list){
	                  obj.reportList.push(value)
	              	}
             	}else{
             		obj.tipsShow = true
             	}
               
             }
         });
      },
      gotoReport(e){
        this.$store.commit('newGread','2');
        this.$router.push({path:'/grade',query:{examId: e}})
      }
	}
}
</script>
<style>
#greadPage{
	padding-top: 7vh
}
#greadPage .mint-cell {
    background-color: #f5f5f5;
}
#greadPage .tips{
	text-align: center;
	padding: 20px
}
#greadPage .mint-cell-wrapper{
    background-color: white;
    margin-bottom: 2vh;
    font-size: 4vw;
    background-size: 120% 0px;

}
#greadPage .hasTop{
	margin-top:2vh
}
#greadPage .viewReport{
    font-size: 3vw;
    padding: 1vw 3vw;
    background-color: white;
    border: 1px solid #19AFFF;
    border-radius: 3vw;
    color: #19AFFF;
    height: inherit;
}
#greadPage .comformBtn{
	width: 90vw;
	margin:2vh 5vw;
	
}
#greadPage .comformBtn button{
	font-size: 4vw
}
#greadPage .textCenter .mint-cell-allow-right{
	display: none
}
#greadPage .textCenter{
	text-align: center;color:#19AFFF;
}
#greadPage .mint-cell:last-child{
	background-size:100% 0px !important;
}
</style>