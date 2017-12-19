<template>
	<div id="schoolLevel" class="mainbody">
		<ul id="navInside" >
			<li v-for="item in liList" :class="activeList == item.id? 'active': ''" :key="item.id" @click="testtest(item.id)">{{item.name}}</li>
		</ul>
		  <el-carousel :interval="5000" indicator-position="none" ref="carousel" @change="testChange($event)" arrow="always" :autoplay="false">
		    <el-carousel-item v-for="item in testList" :key="item.id" :name=item.examName>
		      <p class="alltest" @click="selectShow">{{item.examName}}</p>
			</el-carousel-item>
		  </el-carousel>
		  <el-collapse-transition>
			  <ul v-if='showselect' class="showselect">
			  	<li v-for="item in testList" :key="item.id" @click="changetest(item.id,item.examName)">{{item.examName}}</li>
			  </ul>
		  </el-collapse-transition>
		 <div class="header louceng">
			<p>学校整体成绩报告单</p>
			<div class="header-title-foot"></div>
		  </div>
		  <div id="overallReport">
		    <el-table :data="tableData1" class="borders" style="width: 100%" header-cell-class-name="formatRow" :row-class-name="rowsClassName" >
		      <el-table-column width="50" prop="subject" label="学科">
		      </el-table-column>
		      <el-table-column width="80" :formatter="setMan" label="统计人数">
		      </el-table-column>
		      <el-table-column width="50" prop="fullMarks" label="满分">
		      </el-table-column>
		      <el-table-column prop="schoolAvgScore" :formatter='setParse' label="平均分 (学校)">
		      </el-table-column>
		      <el-table-column :formatter="setRow" label="平均分 (地区)">
		      </el-table-column>
		      <el-table-column width="80" :formatter="setRow" label="离均差">
		      </el-table-column>
		      <el-table-column :formatter="setRow" label=" 排名 (地区)">
		      </el-table-column>
		      <el-table-column width="80" prop="schoolTopScore" :formatter='setParse' label="最高分">
		      </el-table-column>
		      <el-table-column prop="highRate" :formatter='setParse' label=" 高分率 (90%以上)">
		      </el-table-column>
		      <el-table-column prop="excellentRate" :formatter='setParse' label=" 优秀率 (80%-89%)">
		      </el-table-column>
		      <el-table-column prop="commissionRate" :formatter='setParse' label=" 良好率 (70%-79%)">
		      </el-table-column>
		      <el-table-column prop="passRate" :formatter='setParse' label=" 合格率 (60%-69%)">
		      </el-table-column>
		      <el-table-column prop="failureRate" :formatter='setParse' label=" 不及格率 (60%以下)">
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
		  		<!-- 产品版暂时不要<div class="schoolSelectBox">
					  <el-select v-model="changeSchool" class="myselect" placeholder="请选择">
					    <el-option
					      v-for="item in schoolList"
					      :key="item.id"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
					  </el-select>
					<el-button type="primary" @click="compareSchool" plain>学校对比</el-button>
		  		</div> -->
		  </div>
		   <div class="header louceng" >
			<p>各班成绩报告单</p>
			<div class="header-title-foot"></div>
		  </div>
		  <div id="reportClass">
		  		<el-table :data="tableData2" class="borders" style="width: 100%" header-cell-class-name="formatRow" :row-class-name="rowsClassName" >
		      <el-table-column width="50" prop="ranking" label="排名">
		      </el-table-column>
		      <el-table-column  prop="classroomName" label="班级">
		      </el-table-column>
		      <el-table-column prop="classTeacherName" label="班主任">
		      </el-table-column>
		      <el-table-column prop="totalPoint" label="总分平均分">
		      </el-table-column>
		      <el-table-column width="60" prop="highest" label="最高分">
		      </el-table-column>
		      <el-table-column width="60" prop="lowest" label="最低分">
		      </el-table-column>
		      <el-table-column prop="standard" label="标准差">
		      </el-table-column>
		      <el-table-column prop="differentiation" label="分化程度">
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
		  </div>

		  <div class="header">
			<p>各班平均分对比</p>
			<div class="header-title-foot"></div>
		  </div>
		  <div id="averageCompare">
		  		<div id="averageChart"></div>
		  		<p class="testTips">本次考试中，有{{classNumble}}个班级超过本校平均分，分别为{{classS}}班。其中{{classH}}班的平均分最高，与地区排名第一的班级还有{{missdistance}}分差距。{{classL}}班的平均分低于学校平均水平，其中{{classLs}}班的平均分最低，需要特别注意。</p>
		  </div>

		  <div class="header louceng">
			<p>各班级等级分布对比</p>
			<div class="header-title-foot"></div>
		  </div>
		  <div id="contrastive">
		  	<div id="contrastiveChart">
		  	
		  	</div>
		  	<p class="testTips">我校及格率较高的前三名为{{classS}}。其中{{classH}}班的及格率达到{{classH}}%。与区县第一名的班级持平。与地区排名第一的班级持平。{{classH}}班的优秀率为{{classH}}%，其他班级优秀率为零。{{classL}}班的不及格率较高。</p>
		  </div>

		  <div class="header">
			<p>各班前？名对比图</p>
			<div class="header-title-foot"></div>
		  </div>
		  <div id="topCompared">
		  		<div id="topComparedChart">
		  		
		  		</div>
		  		<p class="testTips">我校及格率较高的前三名为{{classS}}。其中{{classH}}班的及格率达到{{classH}}%。与区县第一名的班级持平。与地区排名第一的班级持平。{{classH}}班的优秀率为{{classH}}%，其他班级优秀率为零。{{classL}}班的不及格率较高。</p>
		  </div>
		  <div class="header louceng">
			<p>科目成绩报告单</p>
			<div class="header-title-foot"></div>
		  </div>
		  <div id="achievement">
		  	<div class="achievementSelectBox">
					<el-select v-model="changeSchool" class="myselect" placeholder="请选择">
					    <el-option
					      v-for="item in classList"
					      :key="item"
					      :label="item"
					      :value="item">
					    </el-option>
					</el-select>
		  	</div>
		  	<div id="achievementTable">
			  	<el-table :data="tableData3" class="borders" style="width: 100%" header-cell-class-name="formatRow" :row-class-name="rowsClassName" >
			      <el-table-column width="50" prop="rank" label="排名">
			      </el-table-column>
			      <el-table-column width="50" prop="class" label="班级">
			      </el-table-column>
			      <el-table-column width="100" prop="teacher" label="教师">
			      </el-table-column>
			      <el-table-column prop="subjectAerage" label="班级科目平均分">
			      </el-table-column>
			      <el-table-column prop="countAerage" label="班级总分平均分">
			      </el-table-column>
			      <el-table-column prop="subjectStandard" label="班级科目标准分">
			      </el-table-column>
			      <el-table-column prop="countStandard" label="班级总分标准分">
			      </el-table-column>
			      <el-table-column prop="contribution" label="科目贡献率(班级课目标准分/班级总分标准分*100)">
			      </el-table-column>
			    </el-table>
		  	</div>
		  	<div class="header">
				<p>贡献率折线图</p>
				<div class="header-title-foot"></div>
		  	</div>
		  	<div id="achievementChart"></div>
		  </div>
	</div>	
</template>

<script>
import IndexData from '../../assets/data/schoolLevel.js'
export default {
	data(){
		return {
			activeList:0,
			liList:[{
				name:'学校整体成绩报告单',
				id:0
			},{
				name:'各班成绩报告单',
				id:1
			},{
				name:'各班级等级分布对比',
				id:2
			},{
				name:'科目成绩报告单',
				id:3
			}],
			classList:[],
			setmans:0,
			autoplay:false,
			alse:'二中',
			IndexData,
			testList:[],
			showselect:false,
			schoolTest:'',
			changeSchool:'',
			schoolList:[{
				id:'001',
				name:'一中'
			},{
				id:'002',
				name:'二中'
			}],
			tableData1:[],
			countP:'',totalCount:'',hightCount:'',ranking:'',
			goodsuject:[],hightavarge:[],allNumber:[],lowSuject:[],lowavarge:[],
			allRanking:[],option1:{},tableData2:[],option2:{},option3:{},
			classNumble:'',classS:[],classH:'',missdistance:'',classL:[],classLs:'',
			tableData3:[],option4:{},option5:{}
		}
	},
    methods: {
    	initAll:function(){
    		//初始化考试列表
    		var needData = {tab:'SCHOOL_REPORT'};
	    	this.postHttp(this,'',"exam/queryExamsOnline",function(obj,data){
	           for(var value of data.result){
	           		obj.testList.push(value);
	           		obj.classList = [];
	           		obj.classList = value.subject.split(",");
	           }
	        });
	    	this.postHttp(this,'',"score/getEachClassTopScores",function(obj,data){
	    		var datax = []; var data10 = []; var data20 = [];
	    		var data50 = []; var data100 = []; var data200 = [];
	    		var data500 = []; var data1000 = [];
	    		for(var value of data.result){
	           		datax.push(value.classroomName);data10.push(value.classTopTenStuNum);
	           		data20.push(value.classTopTwentyStuNum);data50.push(value.classTopFiftyStuNum);
	           		data100.push(value.classTopOneHundredStuNum);
	           		data200.push(value.classTopTwoHundredStuNum);
	           		data500.push(value.classTopFiveHundredStuNum);
	           		data1000.push(value.classTopFortyStuNum);
	           }
			   obj.option3.xAxis[0].data = datax;
	           obj.option3.series[0].data = data10;obj.option3.series[1].data = data20;
	           obj.option3.series[2].data = data50;obj.option3.series[3].data = data100;
	           obj.option3.series[4].data = data200;obj.option3.series[5].data = data500;
	           obj.option3.series[6].data = data1000;
	           obj.echarts.init(document.getElementById("topComparedChart")).setOption(obj.option3);
	        });
    	},
    	//格式化
    	setRow(){
    		return '-'
    	}, 
    	//格式化统计人数
    	setMan(){
    		return this.setmans
    	},
    	setParse(row, column){
    		var e = row[column.property];
	        if(e<1){
	        	return e*100000/1000 + '%';
	        }else{
	        	return e;
	        }
	         
    	},
    	initPrate(e){
    		var f = parseFloat(e);    
	        if (isNaN(f)) {    
	            return false;    
	        }    
	        var f = Math.round(e*100)/100;    
	        var s = f.toString();    
	        var rs = s.indexOf('.');    
	        if (rs < 0) {    
	            rs = s.length;    
	            s += '.';    
	        }    
	        while (s.length <= rs + 2) {    
	            s += '0';    
	        }    
	        return s; 
    	},
    	testChange(e){
    		var needData = {tab:'SCHOOL_REPORT',examId:this.testList[e].id};
    		console.log(needData);
    		this.postHttp(this,needData,"score/getLevelDistribution",function(obj,data){
	    	   	if(data.result == undefined){
	    	   		var data1 = [0,0,0,0,0]
	    	   	}else{
					var data1 = [obj.initPrate(data.result.highRate)*100,
	    	   					obj.initPrate(data.result.excellentRate)*100,
	    	   					obj.initPrate(data.result.commissionRate)*100,
	    	   					obj.initPrate(data.result.passRate)*100,
	    	   					obj.initPrate(data.result.failureRate)*100];
	    	   	}
	    	   obj.option1.series[0].data = data1;
	           obj.echarts.init(document.getElementById("rankedchart")).setOption(obj.option1);
	        });
	    	this.postHttp(this,needData,"score/geReportCards",function(obj,data){
	           obj.tableData1 = data.result.scoreVOList;
	           obj.tableData2 = data.result.classProcessedScore;
	           obj.setmans = data.result.studentNum;
	        });
    	},    
    	selectShow:function(){
    		this.showselect = !this.showselect
    	},
    	changetest:function(e,ename){
    		this.showselect = !this.showselect;
    		this.$refs.carousel.setActiveItem(ename);
    	},
    	rowsClassName:function({row, rowIndex}){
	       if(rowIndex%2===1)
    			return 'tableBackground'
      		else 
      			return 'tableCenter'
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
    	},
    	compareSchool:function(){
    		if(this.changeSchool == ''){

    		}else{
    			this.option1.series = [
		            {
		                name:'班级',
		                type:'bar',
		                itemStyle:{
		                    normal:{
		                        color:'#70CDF3'
		                    }
		                },
		                label:{
		                    normal:{
		                        show:true,
		                        position:'top',
		                        color:'#70CDF3'
		                    }
		                },
		                barWidth : 60,
		                data:[97.8, 77.24, 87.1, 27.78, 37.6]
		            },
		            {
		                name:'全校',
		                type:'line',
		                itemStyle:{
		                    normal:{
		                        color:'#FFD244'
		                    }
		                },
		                label:{
		                    normal:{
		                        show:true,
		                        position:'top',
		                        color:'#FFD244'
		                    }
		                },
		                data:[97.8, 77.24, 87.1, 27.78, 37.6]
		            },
		            {
		                name:'对比学校',
		                type:'bar',
		                itemStyle:{
		                    normal:{
		                        color:'#FF8585'
		                    }
		                },
		                label:{
		                    normal:{
		                        show:true,
		                        position:'top',
		                        color:'#FF8585'
		                    }
		                },
		                barWidth : 60,
		                data:[97.8, 77.24, 87.1, 27.78, 37.6]
		            },
		            {
		                name:'全区县',
		                type:'line',
		                itemStyle:{
		                    normal:{
		                        color:'#919191'
		                    }
		                },
		                label:{
		                    normal:{
		                        show:true,
		                        position:'top',
		                        color:'#919191'
		                    }
		                },
		                data:[97.8, 77.24, 87.1, 27.78, 37.6]
		            }
		        ];
				this.echarts.init(document.getElementById("rankedchart")).setOption(this.option1);
    		}
    	},
    	testtest:function(e){
    		var olouceng = document.getElementsByClassName("louceng");
    		var oNav = document.getElementById("navInside").getElementsByTagName("li");
    		this.activeList = e;
			window.scrollTo(0 ,olouceng[e].offsetTop);
    	}
    },
    mounted:function(){
    	var olouceng = document.getElementsByClassName("louceng");
    	var oNav = document.getElementById("navInside").getElementsByTagName("li");
    	window.addEventListener('scroll',()=>{
    		var oheight = document.documentElement.clientHeight || document.body.clientHeight;
    		var otop = document.documentElement.scrollTop || document.body.scrollTop;
    		if(otop>=250){
    			for(var i=0;i<olouceng.length;i++){
    				if(oheight+otop-olouceng[i].offsetTop>oheight/1.1){
    					for(var j=0;j<oNav.length;j++){
							oNav[j].className = '';
						}
						oNav[i].className = 'active'
    				}

    			}
    		}else{
    		}
    	});
    	


    	//接js模拟数据
    	this.tableData1 = this.IndexData.tableData1;this.countP = this.IndexData.countP;
    	this.totalCount = this.IndexData.totalCount;this.hightCount = this.IndexData.hightCount;
    	this.ranking = this.IndexData.ranking;this.goodsuject = this.eachWork(this.IndexData.goodsuject,'、');
    	this.hightavarge = this.eachWork(this.IndexData.hightavarge,'分、');this.allNumber = this.eachWork(this.IndexData.allNumber,'、');
    	this.lowSuject = this.eachWork(this.IndexData.lowSuject,'、');this.lowavarge = this.eachWork(this.IndexData.lowavarge,'分、');
    	this.allRanking = this.eachWork(this.IndexData.allRanking,'、');
    	this.option1 = this.IndexData.option1;
    	this.option2 = this.IndexData.option2;
    	this.classNumble = this.IndexData.classNumble;
    	this.classS = this.eachWork(this.IndexData.classS,'班、');
    	this.classH = this.IndexData.classH;
    	this.missdistance = this.IndexData.missdistance;
    	this.classL = this.eachWork(this.IndexData.classL,'班、');
    	this.classLs = this.IndexData.classLs;
    	this.option3 = this.IndexData.option3;
    	this.tableData3 = this.IndexData.tableData3;
    	this.option4 = this.IndexData.option4;
    	this.option5 = this.IndexData.option5;
    	

		//等级分布图
    	
    	this.echarts.init(document.getElementById("averageChart")).setOption(this.option2);
    	this.echarts.init(document.getElementById("achievementChart")).setOption(this.option4);
    	this.echarts.init(document.getElementById("contrastiveChart")).setOption(this.option5);
    	this.initAll();
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
#schoolLevel .myselect{
	border:1px solid #44a9ff;
	width: 90px;
	border-radius: 4px;
}
#schoolLevel .testTips{
	color:#3d3d3d;
	font-size: 14px;
	margin-top: 25px
}
#schoolLevel .schoolSelectBox{
	width: 200px;
	margin: auto;
	margin-bottom: 35px;
}
#schoolLevel .achievementSelectBox{
	width: 90px;
	margin: auto;
	margin-bottom: 35px;
}
#schoolLevel .borders{
	box-shadow: 1px 1px 14px rgba(0,0,0,.15);
}
#schoolLevel .el-table .tableBackground{
	background-color: #f5fcff;text-align: center;
}
#schoolLevel .el-table .tableCenter{
	text-align: center;
}
#schoolLevel .alltest{
	cursor: pointer;
}
#schoolLevel .formatRow{
	font-weight: normal;
	text-align:center !important;
	color: white;
	background-color: #70CDF3
}
#schoolLevel .el-input__inner{
	border: 0px;
	text-align: center;
}
#schoolLevel .el-select .el-input .el-input__icon{
	color: #70CDF3
}
#schoolLevel .el-carousel__arrow{
	background-color: white;
	color: #70CDF3
}
#schoolLevel .el-carousel__arrow:hover{
	background-color: white
}
#schoolLevel .showselect{
	list-style: none;position: absolute;margin: 0;padding:0;
	border: 1px solid #f2f2f2;
	left: 400px;
	z-index: 999;
    background-color: white;
    width: 300px;
    text-align: center;
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
#schoolLevel .header-title-foot{
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
#averageChart{
	width: 100%;
	height: 530px
}
#contrastiveChart{
	width: 100%;
	height: 530px
}
#topComparedChart{
	width: 100%;
	height: 530px
}
#achievementChart{
	width: 100%;
	height: 530px
}
#schoolLevel .el-table .cell{
	padding:5px;
}

</style>