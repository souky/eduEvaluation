<template>
	<div id="studentlevel">
		<div id="rainbow" class="header-banner">
			<el-carousel height="100px" indicator-position="none" arrow="always" :autoplay="false">
			    <el-carousel-item v-for="item in subjects" :key="item.id">
			     	<div class="header-banner-bit" v-for="(child,index) in item.childs">
			     		<div class="header-banner-click" :style="'background:'+child.color" @click="rainbow(index,child.id)">
			     			<p>{{child.name}}</p>
			     		</div>
			     	</div>
			    </el-carousel-item>
			</el-carousel>
		</div>
		<div id="personalAchievement">
			<div class="header">
				<p>个人成绩报告单</p>
				<div class="header-title-foot"></div>
			</div>
			<div class="body">
				<el-table :data="tableData" stripe style="width: 100%">
				    <el-table-column align="center" prop="subjects" label="科目"></el-table-column>
				    <el-table-column align="center" prop="score" label="分数"></el-table-column>
				    <el-table-column align="center" prop="grades" label="分数等级"></el-table-column>
				    <el-table-column align="center" prop="averageScore" label="平均分(校级)"></el-table-column>
				    <el-table-column align="center" prop="highestClass" label="最高分(班级)"></el-table-column>
				    <el-table-column align="center" prop="highestSchool" label="最高分(校级)"></el-table-column>
				    <el-table-column align="center" prop="highestArea" label="最高分(地区级)"></el-table-column>
				</el-table>
			</div>
		</div>
		<div id="beyondRate">
			<div class="header">
				<p>超越率</p>
				<div class="header-title-foot"></div>
			</div>
			<div class="body">
				<div class="body-icon">
					<div class="body-icon-bit">
						<div class="body-icon-color color-blue"></div>
						<p>地区</p>
					</div>
					<div class="body-icon-bit">
						<div class="body-icon-color color-green"></div>
						<p>校级</p>
					</div>
					<div class="body-icon-bit">
						<div class="body-icon-color color-red"></div>
						<p>班级</p>
					</div>
				</div>
				<div id="beyondRate1"></div>
			</div>
		</div>
		<div id="growthTrend">
			<div class="header">
				<p>成长趋势</p>
				<div class="header-title-foot"></div>
			</div>
			<div class="body">
				<div class="choose-area">
					<div class="choose-area-left" @click="chooseArea($event,'class')">
						<p>本班</p>
					</div>
					<div class="choose-area-midle" @click="chooseArea($event,'school')">
						<p>本校</p>
					</div>
					<div class="choose-area-right" @click="chooseArea($event,'area')">
						<p>本区县</p>
					</div>
				</div>
				<div id="growthTrend1" class="cl"></div>
			</div>
		</div>
		<div id="subjectsDiagnosis">
			<div class="header">
				<p>科目诊断</p>
				<div class="header-title-foot"></div>
			</div>
			<div class="body">
				<div class="choose-area">
					<div class="choose-area-left" @click="chooseSubject($event,'class')">
						<p>本班</p>
					</div>
					<div class="choose-area-midle" @click="chooseSubject($event,'school')">
						<p>本校</p>
					</div>
					<div class="choose-area-right" @click="chooseSubject($event,'area')">
						<p>本区县</p>
					</div>
				</div>
				<div id="subjectsDiagnosis1"></div>
				<div id="subjectsDiagnosis2"></div>
				<div class="cl"></div>
				<div class="subjectsDiagnosisText">
					<p>在本次考试中，本班范围内，语文的标准分较高，并且高于总分标准分，是你的优势科目，请继续保持；数学、英语和综合的标准分较低，并且低于总分标准分，是你的相对弱势科目，需要多关注。</p>
					<p>在本次考试中，本班范围内，你的语文、数学、英语、综合以及总分的得分率都高于平均得分率，请继续保持。</p>
				</div>
			</div>
		</div>
		<div id="myGoal">
			<div class="header">
				<p>我的目标：下次考试可以增加？分</p>
				<div class="header-title-foot"></div>
			</div>
			<div class="body">
				<div class="body-title-item">
					<div class="body-title-itemTitle">
						<p>简单题</p>
						<p>中等题</p>
						<p>难题</p>
					</div>
					<div class="cl"></div>
					<div class="body-title-itemTxt"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
   		data(){
			return{
				subjects:[],
				items:[{
					id:1,
					name:'总分',
					color:'#F37070',
				},{
					id:2,
					name:'语文',
					color:'#F3AF70',
				},{
					id:3,
					name:'数学',
					color:'#F3E370',
				},{
					id:4,
					name:'英语',
					color:'#B7EA81',
				},{
					id:5,
					name:'物理',
					color:'#9EE880',
				},{
					id:6,
					name:'化学',
					color:'#8EE9BB',
				},{
					id:7,
					name:'生物',
					color:'#70CDF3',
				},{
					id:8,
					name:'政治',
					color:'#7093F3',
				},{
					id:9,
					name:'地理',
					color:'#8570F3',
				},{
					id:10,
					name:'美术',
					color:'#A270F3',
				},{
					id:11,
					name:'音乐',
					color:'#D070F3',
				},{
					id:12,
					name:'测试12',
					color:'red',
				},{
					id:13,
					name:'测试13',
					color:'red',
				},{
					id:14,
					name:'测试14',
					color:'red',
				},{
					id:15,
					name:'测试15',
					color:'red',
				}],
				tableData:[{
					subjects:'语文',
					score:'100',
					grades:'良好',
					averageScore:'1231',
					highestClass:'21321',
					highestSchool:'1231',
					highestArea:'123213',
				},{
					subjects:'数学',
					score:'100',
					grades:'良好',
					averageScore:'1231',
					highestClass:'21321',
					highestSchool:'1231',
					highestArea:'123213',
				}],
				optionBeyondRate:{
				tooltip : {
			        trigger: 'axis'
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : ['地区超越率','校级超越率','班级超越率']
			        }
			    ],
			    yAxis : [
			        {
					    type: 'value', 
					    max:'100',
					    axisLabel: {  
					        show: true,  
					        interval: 'auto',  
					        formatter: '{value} %'  
					},
					       
					    splitLine: {lineStyle:{type:'dashed'}}
			            	
					}
			    ],
			   series : [
			        {
			        	barWidth: '30%',
			            type:'bar',
			            label:{normal:{show:true,position:'top'},},
			          data:[
			              {
			                value:82.26,
			                name:'地区超越率',
			                itemStyle:{
			                  normal:{color:'#11abff'},
			                  
			              }
			              }, 
			              {
			                value:83.40,
			                 name:'校级超越率',
			                itemStyle:{
			                  normal:{color:'#48cda6'},
			              }
			              },
			              {
			                value:92,
			                 name:'班级超越率',
			                itemStyle:{
			                  normal:{color:'#fd87ab'},
			              }
			              },
			            ]
			        }
			    ]
			  	},
			  	optionGrowthTrend:{
				    tooltip: {
				        trigger: 'axis'
				    },
				    legend: {
				        data:['本次考试']
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis: {
				        type: 'category',
				        data: ['2015-09-22','2015-10-22','2015-11-22','2016-01-22']
				    },
				    yAxis: {
				        type: 'value',
				        show: true,
				        name:'标准分'
				    },
				    series: [
				        {
				            name:'本次考试',
				            type:'line',
				            stack: '标准分',
				            itemStyle:{
							     normal:{color:'#46C4F8 '},
							 },
				            data:[34.9, 44.8, 40.84, 48.3]
				        },
				    ]
				},
				optionSubjectsDiagnosis:{
				    color: ['#70CDF3'],
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    legend: {
						data:['标准分']
					},
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'category',
				            data : ['总分', '语文', '数学', '英语', '综合'],
				            axisTick: {
				                alignWithLabel: true
				            }
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name:'标准分',
				            type:'bar',
				            barWidth: '40%',
				            data:[70, 75, 65, 67, 42],
				            markLine:{
				                 lineStyle: {
				                    normal: {
				                        type: 'solid'
				                    }
				                },
				                data : [
				                    { 
				                        yAxis: 70 ,
				                        itemStyle:{
							                  normal:{color:'#FFD244'},
							              }
				                    }
				                ]
				            
				            }
				        },
				    ]
				},
				optionSubjectsDiagnosisRight:{
				    tooltip: {
				        trigger: 'axis'
				    },
				    legend: {
				        x: 'center',
				        data:['个人','平均水平']
				    },
				    radar: [

				        {
				            indicator: [
				                {text: '总分', max: 100},
				                {text: '语文', max: 100},
				                {text: '数学', max: 100},
				                {text: '英语', max: 100},
				                {text: '综合', max: 100}
				            ],
				            radius: 200,
				            center: ['50%','55%'],
				        }
				    ],
				    series: [
				        {
				            type: 'radar',
				            data: [
				                {
				                    name: '个人',
				                    value: [23,43,54,65,23],
				                    itemStyle: {normal: {color: '#FFD244',areaStyle: {color: 'rgba(255,210,68,0.3)'}}},
				                },
				                {
				                    name:'平均水平',
				                    value:[34,54,56,76,87],
				                    itemStyle: {normal: {color: '#70CDF3',areaStyle: {color: 'rgba(112,205,243,0.3)'}}},
				                }
				            ]
				        }
				    ]
				},
		    }
		  },
		created:function(){
			var childNum=Math.ceil(this.items.length/11);
		    var childs=[];
		    for(var l=0;l<childNum;l++){
		      var id=l+1;
		      var e=11*(l+1);
		      var s=e-11;
		      childs[l] = []
		      childs[l]["childs"]=this.items.slice(s,e);
		      childs[l]["id"] = id;
		    }
		    this.subjects=childs;
		},
		mounted:function(){
		  	this.echarts.init(document.getElementById("beyondRate1")).setOption(this.optionBeyondRate);
		  	this.echarts.init(document.getElementById("growthTrend1")).setOption(this.optionGrowthTrend);
		  	this.echarts.init(document.getElementById("subjectsDiagnosis1")).setOption(this.optionSubjectsDiagnosis);
		  	this.echarts.init(document.getElementById("subjectsDiagnosis2")).setOption(this.optionSubjectsDiagnosisRight);
		 },
		methods:{
			rainbow:function(index,num){
				for(var i=0;i<document.getElementsByClassName("header-banner-click").length;i++){
					document.getElementById("rainbow").getElementsByClassName("header-banner-click")[i].className="header-banner-click";
				}
				document.getElementById("rainbow").getElementsByClassName("is-active")[0].getElementsByClassName("header-banner-click")[index].className+=" on";
			},
			chooseArea:function(e,num){
				document.getElementById("growthTrend").getElementsByClassName("choose-area-left")[0].style.background="#fff";
				document.getElementById("growthTrend").getElementsByClassName("choose-area-left")[0].style.color="#46C4F8";
				document.getElementById("growthTrend").getElementsByClassName("choose-area-midle")[0].style.background="#fff";
				document.getElementById("growthTrend").getElementsByClassName("choose-area-midle")[0].style.color="#46C4F8";
				document.getElementById("growthTrend").getElementsByClassName("choose-area-right")[0].style.background="#fff";
				document.getElementById("growthTrend").getElementsByClassName("choose-area-right")[0].style.color="#46C4F8";
				e.currentTarget.style.background="#46C4F8";
				e.currentTarget.style.color="#fff";
			},
			chooseSubject:function(e,num){
				alert(123)
				document.getElementById("subjectsDiagnosis").getElementsByClassName("choose-area-left")[0].style.background="#fff";
				document.getElementById("subjectsDiagnosis").getElementsByClassName("choose-area-left")[0].style.color="#46C4F8";
				document.getElementById("subjectsDiagnosis").getElementsByClassName("choose-area-midle")[0].style.background="#fff";
				document.getElementById("subjectsDiagnosis").getElementsByClassName("choose-area-midle")[0].style.color="#46C4F8";
				document.getElementById("subjectsDiagnosis").getElementsByClassName("choose-area-right")[0].style.background="#fff";
				document.getElementById("subjectsDiagnosis").getElementsByClassName("choose-area-right")[0].style.color="#46C4F8";
				e.currentTarget.style.background="#46C4F8";
				e.currentTarget.style.color="#fff";
				/*this.optionSubjectsDiagnosisRight.series={
				            type: 'radar',
				            data: [
				                {
				                    name: '个人',
				                    value: [77,43,54,65,23],
				                    itemStyle: {normal: {color: '#FFD244',areaStyle: {color: 'rgba(255,210,68,0.3)'}}},
				                },
				                {
				                    name:'平均水平',
				                    value:[65,54,56,76,87],
				                    itemStyle: {normal: {color: '#70CDF3',areaStyle: {color: 'rgba(112,205,243,0.3)'}}},
				                }
				            ]
				        }
				this.echarts.init(document.getElementById("subjectsDiagnosis2")).setOption(this.optionSubjectsDiagnosisRight);*/
			}
		}
	}
</script>
<style>
#studentlevel{
	overflow: hidden;
}
#studentlevel #personalAchievement{
	width: 1100px;
	margin: auto;
	margin-top:20px;
}	
#studentlevel .header{
	text-align: center;
}
#studentlevel .header p{
	font-size: 20px;
	color: #707070;
	letter-spacing: 0;
}
#studentlevel .header-title-foot{
	width: 100px;
	height: 2px;
	background: #44A9FF;
	margin: auto;
	margin-top:5px;
}
#studentlevel #personalAchievement .body{
	margin-top:20px;
}
#studentlevel .header-banner-bit{
	width: 89px;
	height: 73px;
	float: left;
	margin-top: 15px;
}
#studentlevel .header-banner .el-carousel__item{
	margin-left: 60px;
}
#studentlevel .header-banner-click{
	width: 100%;
	height: 100%;
	text-align: center;
}
#studentlevel .header-banner-click p{
	line-height: 73px;
}
#studentlevel .header-banner-bit .on{
	height: 105%;
}
#studentlevel #beyondRate{
	width: 1100px;
	margin: auto;
	margin-top:20px;
}
#studentlevel #beyondRate .body{
	margin-top:20px;
}
#studentlevel #beyondRate .body-icon{
	width: 235px;
	margin: auto;
}
#studentlevel #beyondRate .body-icon-color{
	width: 20px;
	height: 20px;
	float: left;
}
#studentlevel #beyondRate .body-icon-bit{
	margin-left:20px;
	float: left;
}
#studentlevel #beyondRate .body-icon-bit p{
	margin-left: 5px;
	float: left;
}
#studentlevel #beyondRate .color-blue{
	background: #70CDF3;
}
#studentlevel #beyondRate .color-green{
	background: #49E1BC;
}
#studentlevel #beyondRate .color-red{
	background: #FF8585;
}
#beyondRate1{
	width: 1080px;
	height: 460px;
	margin: auto;
}
#growthTrend{
	width: 1100px;
	margin: auto;
	margin-top:50px;
}
#growthTrend .body{
	padding-top:20px;
}
.choose-area{
	width: 350px;
	margin: auto;
}
.choose-area-left{
	width: 115px;
	height:50px;
	border:1px solid #46C4F8;
	text-align: center;
	float: left;
	border-radius: 100px 0 0 100px;
	color: #fff;
	background: #46C4F8;
}
.choose-area-left p{
	line-height:55px;
}
.choose-area-midle{
	width: 115px;
	height:50px;
	border-top:1px solid #46C4F8;
	border-bottom:1px solid #46C4F8;
	text-align: center;
	float: left;
	color: #46C4F8;
}
.choose-area-midle p{
	line-height: 55px;
}
.choose-area-right{
	width: 115px;
	height:50px;
	border:1px solid #46C4F8;
	text-align: center;
	float: left;
	border-radius: 0 100px 100px 0;
	color: #46C4F8;
}
.choose-area-right p{
	line-height: 55px;
}
#growthTrend #growthTrend1{
	width: 1080px;
	height: 460px;
	margin: auto;
	margin-top: 70px;
	margin-bottom: 20px;
}
#subjectsDiagnosis .body{
	padding-top: 20px;
}
#subjectsDiagnosis1{
	width: 600px;
	height: 500px;
	margin-top:70px;
	float: left;
}
#subjectsDiagnosis2{
	width: 470px;
	height: 500px;
	float: left;
	margin-top:70px;
	margin-left: 20px;
}
.subjectsDiagnosisText{
	margin-top:20px;
}
.subjectsDiagnosisText p{
	font-size: 14px;
	color: #3D3D3D;
	letter-spacing: 0;
	line-height: 24px;
}
#myGoal{
	margin-top:20px;
}
#myGoal .body{
	padding-top: 20px;
}
.body-title-item{
	width: 584px;
	height: 93px;
	margin: auto;
	border:1px solid #FF8585;
}
.body-title-itemTitle{
	width: 300px;
	margin:auto;
}
.body-title-itemTitle p{
	float: left;
	margin-left: 10px;
}
</style>