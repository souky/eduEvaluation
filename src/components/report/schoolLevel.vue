<template>
	<div id="schoolLevel" class="mainbody">
		  <el-carousel :interval="5000" indicator-position="none" arrow="always" :autoplay="false">
		    <el-carousel-item v-for="item in schoolList" :key="item.id">
		      <p class="alltest" @click="selectShow">{{item.name}}</p>
			</el-carousel-item>
		  </el-carousel>
		  <el-collapse-transition>
			  <ul v-if='showselect' class="showselect">
			  	<li v-for="item in schoolList" :key="item.id" @click="changetest(item.id)">{{item.name}}</li>
			  </ul>
		  </el-collapse-transition>
		  <div class="header">
			<p>学校整体成绩报告单</p>
			<div class="header-title-foot"></div>
		  </div>
		  <div id="overallReport">
		    <el-table :data="tableData1" class="borders" style="width: 100%" header-cell-class-name="formatRow" :row-class-name="rowsClassName" >
		      <el-table-column width="50" prop="subject" label="学科">
		      </el-table-column>
		      <el-table-column prop="countPeople" label="统计人数">
		      </el-table-column>
		      <el-table-column prop="fullMark" label="满分">
		      </el-table-column>
		      <el-table-column prop="average" label="平均分(学校)">
		      </el-table-column>
		      <el-table-column prop="averages" label="平均分 (地区)">
		      </el-table-column>
		      <el-table-column prop="deviation" label="离均差">
		      </el-table-column>
		      <el-table-column prop="ranking" label=" 排名 (地区)">
		      </el-table-column>
		      <el-table-column prop="highest" label="最高分">
		      </el-table-column>
		      <el-table-column prop="highRate" label=" 高分率 (90%以上)">
		      </el-table-column>
		      <el-table-column prop="excellent" label=" 优秀率 (80%-89%)">
		      </el-table-column>
		      <el-table-column prop="inCommission" label=" 良好率 (70%-79%)">
		      </el-table-column>
		      <el-table-column prop="yield" label=" 合格率 (60%-69%)">
		      </el-table-column>
		      <el-table-column prop="failure" label=" 不及格率 (60%以下)">
		      </el-table-column>
		    </el-table>
		    <p class="testTips">本次考试中，我校参与统计人数{{countP}}人，总分平均分{{totalCount}}分，高出全地区平均分{{hightCount}}分，地区排名第{{ranking}}。各学科中{{goodsuject}}平均分表现较好，高于地区平均分{{hightavarge}}分，列全区县第{{allNumber}}名；{{lowSuject}}科目表现较弱，低于地区平均分{{lowavarge}}分，位于全地区第{{allRanking}}名。</p>
		  </div>

		  <div class="header">
			<p>学生等级分布图</p>
			<div class="header-title-foot"></div>
		  </div>
		  <div id="ranked">
		  		<div id="rankedchart"></div>
		  </div>
	</div>	
</template>

<script>
import IndexData from '../../assets/data/schoolLevel.js'
export default {
	data(){
		return {
			autoplay:false,
			IndexData,
			schoolList:[{
				id:'001',
				name:'2017年金阳高中期末考试'
			},{
				id:'002',
				name:'2016年金阳高中期末考试'
			},{
				id:'003',
				name:'2015年金阳高中期末考试'
			}],
			showselect:false,
			schoolTest:''
		}
	},
    methods: {
    	selectShow:function(){
    		this.showselect = !this.showselect
    	},
    	changetest:function(e){
    		this.showselect = !this.showselect
    	},
    	rowsClassName:function({row, rowIndex}){
	       if(rowIndex%2===1)
    			return 'tableBackground'
      		else 
      			return ''
    	},

    	eachWork:function(e,a){
    		var eachWorks='';
    		if(e.length>0){
    		for(var i=0;i<e.length;i++){
    				if(i==e.length-1)
    					eachWorks +=e[i];
    				else
    					eachWorks +=e[i]+a;
    			}
    		}
    		return eachWorks;
    	}
    },
    mounted:function(){
    	//接js模拟数据
    	this.tableData1 = this.IndexData.tableData1;this.countP = this.IndexData.countP;
    	this.totalCount = this.IndexData.totalCount;this.hightCount = this.IndexData.hightCount;
    	this.ranking = this.IndexData.ranking;this.goodsuject = this.eachWork(this.IndexData.goodsuject,'、');
    	this.hightavarge = this.eachWork(this.IndexData.hightavarge,'分、');this.allNumber = this.eachWork(this.IndexData.allNumber,'、');
    	this.lowSuject = this.eachWork(this.IndexData.lowSuject,'、');this.lowavarge = this.eachWork(this.IndexData.lowavarge,'分、');
    	this.allRanking = this.eachWork(this.IndexData.allRanking,'、');
    	this.option1 = this.IndexData.option1
    	//等级分布图
    	this.echarts.init(document.getElementById("rankedchart")).setOption(this.option1);
    }
}
</script>

<style>
.mainbody{
	width: 1100px;
	margin: auto;
	position: relative;
	border-top: 1px solid #f2f2f2
}
#schoolLevel .el-carousel {
    overflow-x: hidden;
    position: relative;
    height: 50px;
    text-align: center;
    width: 400px;
    margin: auto;
    margin-top: 30px;
    line-height: 50px;
}
#schoolLevel .el-carousel__container {
    position: relative;
    height: 50px;
    margin: auto;
}
.testTips{
	color:#3d3d3d;
	font-size: 14px;
	margin-top: 25px
}
.borders{
	box-shadow: 1px 1px 14px rgba(0,0,0,.15);
}
.el-table .tableBackground{
	background-color: #f5fcff
}
.alltest{
	cursor: pointer;
}
.formatRow{
	padding: 0 10px;
	font-weight: normal;
	text-align: center;
	color: white;
	background-color: #44A9FF
}
#schoolLevel .el-input__inner{
	border: 0px;
	text-align: center;
}
#schoolLevel .el-select .el-input .el-input__icon{
	color: white
}
#schoolLevel .el-carousel__arrow{
	background-color: white;
	color: #44A9FF
}
#schoolLevel .el-carousel__arrow:hover{
	background-color: white
}
#schoolLevel .showselect{
	list-style: none;position: absolute;margin: 0;padding:0;
	border: 1px solid #f2f2f2;
	left: 430px;
	z-index: 999;
    background-color: white;
}
#schoolLevel .showselect li{
	margin: 0;padding:0;
	border-bottom: 1px solid #f2f2f2;
	padding:10px 20px;
	cursor: pointer;
}
#schoolLevel .header p{
	font-size: 20px;
	color: #707070;
	text-align: center;
	letter-spacing: 0;
	margin-top: 35px
}
.header-title-foot{
	width: 100px;
    height: 2px;
    background: #44A9FF;
    margin: auto;
    margin-top: 5px;
    margin-bottom: 35px
}
#rankedchart{
	width: 100%;
	height: 530px
}
</style>