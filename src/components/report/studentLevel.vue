<template>
	<div id="studentlevel">
		<ul id="navInside" v-show="displayAll.anotherpersonalAchievement">
			<li v-for="item in liList" :class="activeList == item.id? 'active': ''" :key="item.id" @click="testtest(item.id)">{{item.name}}</li>
		</ul>
		<ul id="navInside1" v-show="displayAll.personalAchievement">
			<li v-for="item in liList1" :class="activeList1 == item.id? 'active': ''" :key="item.id" @click="testtest1(item.id)">{{item.name}}</li>
		</ul>
		<el-carousel id="testChange" :interval="5000" indicator-position="none" @change="testChange($event)" arrow="always" :autoplay="false">
			<el-carousel-item v-for="item in testList" :key="item.id">
				<p class="alltest" @click="selectShow">{{item.name}}</p>
			</el-carousel-item>
		</el-carousel>
		<el-collapse-transition>
			<ul v-if='showselect' class="showselect">
				<li v-for="item in testList" :key="item.id" @click="changetest(item.id)">{{item.name}}</li>
			</ul>
		</el-collapse-transition>
		<div id="rainbow" class="header-banner">
			<el-carousel height="100px" indicator-position="none" arrow="always" :autoplay="false">
				<el-carousel-item v-for="item in subjects" :key="item.id">
					<div class="header-banner-bit" v-for="(child,index) in item.childs">
						<div class="header-banner-click" ref="fristBit" :style="'background:'+child.color" @click="rainbow(index,child.id)">
							<p>{{child.name}}</p>
						</div>
					</div>
				</el-carousel-item>
			</el-carousel>
		</div>
		<div id="personalAchievement" class="louceng1" v-show="displayAll.personalAchievement">
			<div class="header">
				<p>个人成绩报告单</p>
				<div class="header-title-foot"></div>
			</div>
			<div class="body">
				<el-table class="borders" :data="tableData" stripe style="width: 100%" header-row-class-name="table-header">
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
		<div id="anotherpersonalAchievement" class="louceng" v-show="displayAll.anotherpersonalAchievement">
			<div class="header">
				<p>个人成绩报告单</p>
				<div class="header-title-foot"></div>
			</div>
			<div class="body">
				<el-table class="borders" :data="anothertableData" stripe style="width: 100%" header-row-class-name="table-header">
					<el-table-column align="center" prop="rawScore" label="原始分数"></el-table-column>
					<el-table-column align="center" prop="score" label="平均分(校级)"></el-table-column>
					<el-table-column align="center" prop="highestClass" label="最高分(班级)"></el-table-column>
					<el-table-column align="center" prop="highestSchool" label="最高分(校级)"></el-table-column>
					<el-table-column align="center" prop="highestArea" label="最高分(地区级)"></el-table-column>
				</el-table>
			</div>
		</div>
		<div id="beyondRate" v-show="displayAll.beyondRate">
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
		<div id="growthTrend" class="louceng" v-show="displayAll.growthTrend">
			<div class="header ">
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
		<div id="subjectsDiagnosis" class="louceng1" v-show="displayAll.subjectsDiagnosis">
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
		<div id="myGoal" class="louceng1" v-show="displayAll.myGoal">
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
					<div class="body-title-itemTxt">
						<p>23</p>
						<p>16</p>
						<p>7</p>
					</div>
				</div>
				<div id="myGoal1"></div>
				<div class="subjectsDiagnosisText ml20 mb20">
					<p>在本次考试中，你的简单题失分率最低，难题失分率最高。</p>
					<p>在下次考试中，简单题多加注意很容易就能加分，中等题再努力一下也能得分，难题需要多多练习。</p>
				</div>
			</div>
		</div>
		<div id="testAnalysis" class="louceng" v-show="displayAll.testAnalysis">
			<div class="header">
				<p>试题分析</p>
				<div class="header-title-foot"></div>
			</div>
			<div class="body">
				<div class="body-Vtitle">
					<p>得分:</p>
					<p>96分</p>
					<p>满分:</p>
					<p>6题</p>
					<p>零分:</p>
					<p>4题</p>
					<p>非满分:</p>
					<p>10题</p>
				</div>
				<div class="cl"></div>
				<div class="testAnalysis-table">
					<el-table class="borders" :data="testAnalysisTable" stripe style="width: 100%" header-row-class-name="table-header">
						<el-table-column align="center" prop="qid" label="题号"></el-table-column>
						<el-table-column align="center" prop="topic" label="题型"></el-table-column>
						<el-table-column align="center" prop="fractionalValue" label="分值"></el-table-column>
						<el-table-column align="center" prop="score.value" label="得分">
							<template scope="scope">
								<span v-if="scope.row.score.value == 0" v-bind:class="{activeS: (scope.row.score.value == 0)}">{{ scope.row.score.value }}</span>
								<span v-else v-bind:class="{active: (scope.row.score.key == 1)}">{{ scope.row.score.value }}</span>
							</template>
						</el-table-column>
						<el-table-column align="center" prop="divideClass" label="班级均分"></el-table-column>
						<el-table-column align="center" prop="divideSchool" label="校级均分"></el-table-column>
						<el-table-column align="center" prop="divideAera" label="区县级均分"></el-table-column>
						<el-table-column align="center" prop="knowledge" label="考察知识点"></el-table-column>
						<el-table-column align="center" prop="studyAbility" label="考察能力"></el-table-column>
						<el-table-column align="center" prop="difficulty" label="难度"></el-table-column>
						<el-table-column align="center" prop="differentiation" label="区分度"></el-table-column>
					</el-table>
				</div>
			</div>
		</div>
		<div id="scoreQuestion" v-show="displayAll.optionScoreQuestion">
			<div class="header">
				<p>各小题得分率柱状图</p>
				<div class="header-title-foot"></div>
			</div>
			<div class="body">
				<div id="scoreQuestion1"></div>
			</div>
		</div>
		<div id="twoDimensionalAnalysis" v-show="displayAll.twoDimensionalAnalysis">
			<div class="header">
				<p>得分率 -- 难度二维分析</p>
				<div class="header-title-foot"></div>
			</div>
			<div class="body">
				<div class="body-icon">
					<div class="body-icon-bit">
						<div class="body-icon-color color-red" @click="twoDimensionalAnalysisChoose($event,'class')"></div>
						<p>班级</p>
					</div>
					<div class="body-icon-bit">
						<div class="body-icon-color color-push" @click="twoDimensionalAnalysisChoose($event,'school')"></div>
						<p>校级</p>
					</div>
					<div class="body-icon-bit">
						<div class="body-icon-color color-push" @click="twoDimensionalAnalysisChoose($event,'area')"></div>
						<p>全区县</p>
					</div>
				</div>
				<div id="twoDimensionalAnalysis1"></div>
				<div class="twoDimensionalAnalysis-foot">
					<div class="difficultyLevel easy">
						<p>容易</p>
					</div>
					<div class="difficultyLevel midde">
						<p>中等</p>
					</div>
					<div class="difficultyLevel difficult">
						<p>难</p>
					</div>
				</div>
				<div class="foot-word">
					<p>在本次考试中，得分率低于学校平均水平的题目分别是第4题、第8题、第12题、第16题和第20题，其中中等难度的题目为第4题和第12题，这些题目需要注意；其中简单难度的题目为第8题和第20题，需要特别注意。</p>
				</div>
			</div>
		</div>
		<div id="knowledge" class="louceng" v-show="displayAll.knowledge">
			<div class="header">
				<p>知识点分析</p>
				<div class="header-title-foot"></div>
			</div>
			<div class="body">
				<div id="knowledge1"></div>
				<div id="knowledge-table">
					<el-table id="knowledge-table-header" :data="falsetableData3" header-row-class-name="table-header" style="width: 100%">
						<el-table-column align="center" prop="date" label="知识点模块"></el-table-column>
						<el-table-column align="center" prop="date" label="知识点"></el-table-column>
						<el-table-column align="center" label="得分率%">
							<el-table-column align="center" prop="name" label="班级"></el-table-column>
							<el-table-column align="center" prop="name" label="校级"></el-table-column>
							<el-table-column align="center" prop="name" label="区级"></el-table-column>
							<el-table-column align="center" prop="name" label="差值(相对于校级)"></el-table-column>
						</el-table-column>
						<el-table-column align="center" prop="date" label="对应题目"></el-table-column>
					</el-table>
					<div v-for="truetableData3 in truetableDatas">
						<el-table class="knowledge-table-true" :span-method="objectSpanMethod" :data="truetableData3.truetableData3" style="width: 100%">
							<el-table-column align="center" prop="knowledgemodule" label="知识点模块"></el-table-column>
							<el-table-column align="center" prop="knowledge" label="知识点"></el-table-column>
							<el-table-column align="center" label="得分率%">
								<el-table-column align="center" prop="classscore" label="班级"></el-table-column>
								<el-table-column align="center" prop="schoolscore" label="校级"></el-table-column>
								<el-table-column align="center" prop="areascore" label="区级"></el-table-column>
								<el-table-column align="center" prop="difference" label="差值(相对于校级)"></el-table-column>
							</el-table-column>
							<el-table-column align="center" prop="topic" label="对应题目"></el-table-column>
						</el-table>
						<div class="knowledge-table-trueTotle">
							<div class="knowledge-table-trueTotleBit"><p>总分:{{truetableData3.totle}}分</p></div>
							<div class="knowledge-table-trueTotleBit"><p>得分:{{truetableData3.score}}分</p></div>
							<div class="knowledge-table-trueTotleBit"><p>得分率:{{truetableData3.class}}</p></div>
							<div class="knowledge-table-trueTotleBit"><p>得分率:{{truetableData3.school}}</p></div>
							<div class="knowledge-table-trueTotleBit"><p>得分率:{{truetableData3.area}}</p></div>
						</div>
					</div>
				</div>
				<div class="knowledge-foot">
					<p>在本次考试中，得分率低于学校平均水平的知识点分别是函数模块中的指数函数，对应的题目为第5题；三角函数中的任意角、弧度，对应的题目为第3题；三角函数中借助单位圆中的三角函数推导出诱导公式，对应题目为16题，需要特别注意</p>
				</div>
			</div>
		</div>
		<div id="abilityAnalyze" v-show="displayAll.abilityAnalyze">
			<div class="header">
				<p>能力分析</p>
				<div class="header-title-foot"></div>
			</div>
			<div class="body">
				<div id="abilityAnalyze1"></div>
				<div id="abilityAnalyze2">
					<el-table class="borders" :data="scoreName" style="width: 100%">
						<el-table-column align="center" prop="name" label="能力"></el-table-column>
						<el-table-column align="center" label="得分率">
							<el-table-column align="center" prop="scoreClass" label="班级"></el-table-column>
							<el-table-column align="center" prop="scoreSchool" label="全校"></el-table-column>
							<el-table-column align="center" prop="scoreArea" label="全区县"></el-table-column>
						</el-table-column>
						<el-table-column align="center" prop="topicList" label="对应题目"></el-table-column>
					</el-table>
				</div>
				<div class="abilityAnalyze-foot">
					<p>在本次考试中，得分率低于学校平均水平的能力点为空间想象能力，抽象概括能力、推理论证能力、运算求解能力和综合应用能力，需要特别注意。
					得分率高于学校平均水平的能力为数据处理能力，请继续保持。</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {

	data(){
		return{
			activeList:0,
			activeList1:0,
			liList:[{
				name:'个人成绩报告单',
				id:0
			},{
				name:'成长趋势',
				id:1
			},{
				name:'试题分析',
				id:2
			},{
				name:'知识点分析',
				id:3
			}],
			liList1:[{
				name:'个人成绩报告单',
				id:0
			},{
				name:'科目诊断',
				id:1
			},{
				name:'我的目标',
				id:2
			}],
			showselect:false,
			displayAll:{
				personalAchievement:true,
				beyondRate:true,
				growthTrend:true,
				subjectsDiagnosis:true,
				myGoal:true,
				anotherpersonalAchievement:false,
				testAnalysis:false,
				optionScoreQuestion:false,
				twoDimensionalAnalysis:false,
				knowledge:false,
				abilityAnalyze:false,
			},
			scoreName:[{
				name:"空间想象能力",
				scoreClass:45.3,
				scoreSchool:53.4,
				scoreArea:34243,
				topicList:"123、231、342",
			}],
			falsetableData3:[],
			truetableDatas:[{
				truetableData3:[{
					knowledgemodule:"三角函数",
					knowledge:"1231",
					classscore:"1231",
					schoolscore:"1231231",
					areascore:"342432",
					difference:"2342342",
					topic:"1",
					qwe:3,
				},{
					knowledgemodule:"三角函数",
					knowledge:"1231",
					classscore:"1231",
					schoolscore:"1231231",
					areascore:"342432",
					difference:"2342342",
					topic:"1",
					qwe:3,
				},{
					knowledgemodule:"三角函数",
					knowledge:"1231",
					classscore:"1231",
					schoolscore:"1231231",
					areascore:"342432",
					difference:"2342342",
					topic:"1",
					qwe:3,
				}],
				totle:30,
				score:18,
				class:45,
				school:45,
				area:34,
			},{
				truetableData3:[{
					knowledgemodule:"三角函数",
					knowledge:"1231",
					classscore:"1231",
					schoolscore:"1231231",
					areascore:"342432",
					difference:"2342342",
					topic:"1",
					qwe:3,
				},{
					knowledgemodule:"三角函数",
					knowledge:"1231",
					classscore:"1231",
					schoolscore:"1231231",
					areascore:"342432",
					difference:"2342342",
					topic:"1",
					qwe:3,
				},{
					knowledgemodule:"三角函数",
					knowledge:"1231",
					classscore:"1231",
					schoolscore:"1231231",
					areascore:"342432",
					difference:"2342342",
					topic:"1",
					qwe:3,
				}],
				totle:30,
				score:18,
				class:45,
				school:45,
				area:34,	
			}],
			testList:[{
				id:'001',
				name:'2017年金阳高中期末考试'
			},{
				id:'002',
				name:'2016年金阳高中期末考试'
			},{
				id:'003',
				name:'2015年金阳高中期末考试'
			}],
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
			anothertableData:[{
				rawScore:90,
				score:'23',
				highestClass:'21321',
				highestSchool:'1231',
				highestArea:'123213',
			},{
				rawScore:20,
				score:'23',
				highestClass:'21321',
				highestSchool:'1231',
				highestArea:'123213',
			}],
			testAnalysisTable:[{
				qid:1,
				topic:123,
				fractionalValue:12,
				score:{
					key:1,
					value:6
				},
				divideClass:343,
				divideSchool:45,
				divideAera:98,
				knowledge:78,
				studyAbility:90,
				difficulty:787,
				differentiation:0.9,
			},{
				qid:2,
				topic:123,
				fractionalValue:12,
				score:{
					key:0,
					value:0
				},
				divideClass:343,
				divideSchool:45,
				divideAera:98,
				knowledge:78,
				studyAbility:90,
				difficulty:787,
				differentiation:0.9,
			},{
				qid:2,
				topic:123,
				fractionalValue:12,
				score:{
					key:0,
					value:10
				},
				divideClass:343,
				divideSchool:45,
				divideAera:98,
				knowledge:78,
				studyAbility:90,
				difficulty:787,
				differentiation:0.9,
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
				optionMyGoal:{
					tooltip : {
						trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    legend: {
				    	data: ['得分率', '失分率']
				    },
				    grid: {
				    	left: '3%',
				    	right: '4%',
				    	bottom: '3%',
				    	containLabel: true
				    },
				    xAxis:  {
				    	type: 'category',
				    	data: ['简单题', '中等题','难题']
				    	
				    },
				    yAxis: {
				    	type: 'value',
				    	show: true,
				    	name:'百分比/%'
				    },
				    series: [
				    {
				    	barWidth: '30%',
				    	name: '失分率',
				    	type: 'bar',
				    	stack: '总量',
				    	label: {
				    		normal: {
				    			show: true,
				    		}
				    	},
				    	itemStyle:{
				    		normal:{color:'#FF8585 '},
				    	},
				    	data: [120, 132, 101]
				    },{
				    	barWidth: '30%',
				    	name: '得分率',
				    	type: 'bar',
				    	stack: '总量',
				    	label: {
				    		normal: {
				    			show: true,
				    		}
				    	},
				    	itemStyle:{
				    		normal:{color:'#46C4F8 '},
				    	},
				    	data: [320, 302, 301]
				    },
				    ]
				},
				optionScoreQuestion:{
					tooltip: {
						trigger: 'axis',
					},
					legend: {
						data:['个人','班级','全校','全区县']
					},
					xAxis: [
					{
						type: 'category',
						data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','20'],
						axisPointer: {
							type: 'shadow'
						}
					}
					],
					yAxis: [
					{
						type: 'value',
						show: true,
						min: 0,
						max: 100,
						interval: 20,
						name:'得分率/%',
					},
					],
					dataZoom: [
					{
						show: true,
						start: 0,
						end: 60
					},
					{
						type: 'inside',
						start: 0,
						end: 100
					},
					],
					series: [
					{
						name:'个人',
						type:'bar',
						label:{normal:{show:true,position:'top'},},
						itemStyle:{
							normal:{color:'#46C4F8'},
						},
						data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 43.6, 56.2, 32.6, 20.0, 6.4, 3.3,2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6]
					},
					{
						name:'班级',
						type:'line',
						label:{normal:{show:true,position:'top'},},
						itemStyle:{
							normal:{color:'#FFD244'},
						},
						data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 32.6, 56.2, 48.7, 18.8, 6.0, 2.3,2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6]
					},
					{
						name:'全校',
						type:'line',
						label:{normal:{show:true,position:'top'},},
						itemStyle:{
							normal:{color:'#919191'},
						},
						data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 32.6, 56.2, 48.7, 18.8, 6.0, 2.3,2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6]
					},
					{
						name:'全区县',
						type:'line',
						label:{normal:{show:true,position:'top'},},
						itemStyle:{
							normal:{color:'#919191'},
						},
						data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6]
					}
					]
				},
				optionTwoDimensionalAnalysis:{
					tooltip : {
						padding: 10,
						backgroundColor: '#222',
						borderColor: '#777',
						borderWidth: 1,
						formatter:"",
				        /*formatter: function (obj) {
				            var value = obj.value;
				            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
				                + '</div>' + "题型" + '：' + value[2] + '<br>'
				                + "题号" + '：' + value[4] + '<br>'
				                + "满分值" + '：' + value[3] + '<br>'
				                + "得分率差距" + '：' + value[5] + '<br>'
				            }*/
				        },
				        xAxis : [
				        {
				        	type : 'value',
				        	scale:true,
				        	min: 0.1,
				        	max: 1,
				        	interval: 0.1,
				        }
				        ],
				        yAxis : [
				        {
				        	type : 'value',
				        	name:'得分率差距',
				        	show: true,
				        	nameLocation:'middle',
				        	nameGap:50,
				        	min: -100,
				        	max: 100,
				        	interval: 20,
				        	axisLabel: {  
				        		show: true,  
				        		interval: 'auto',  
				        		formatter: '{value} %'  
				        	},
				        }
				        ],
				        series : [
				        {
				        	name:'sin',
				        	type:'scatter',
				        	symbolSize :[25,25],
				        	large: true,
				        	label:{normal:{show:true}},
				        	markArea: {
				        		silent: true,
				        		data: [[{
				        			xAxis: '0.1',
				        			yAxis: '0',
				        			itemStyle:{
				        				normal:{color:'rgba(112,205,243,0.5)'},
				        			}
				        		}, {
				        			xAxis: '0.4',
				        			yAxis: '100',
				        		}],[{
				        			xAxis: '0.4',
				        			yAxis: '0',
				        			itemStyle:{
				        				normal:{color:'rgba(145,218,249,0.5)'},
				        			}
				        		}, {
				        			xAxis: '0.7',
				        			yAxis: '100',
				        		}],[{
				        			xAxis: '0.7',
				        			yAxis: '0',
				        			itemStyle:{
				        				normal:{color:'rgba(187,230,248,0.5)'},
				        			}
				        		}, {
				        			xAxis: '1.0',
				        			yAxis: '100',
				        		}]]
				        	},
				        	itemStyle:{
				        		normal:{color:'#FF8585'},
				        	},
				        	data:[[0.2,30,"客观题",5,1],[0.5,30,"客观题",3,2],[0.7,30,"客观题",3,3]]
				        },
				        {
				        	name:'cos',
				        	type:'scatter',
				        	large: true,
				        	symbolSize :[25,25],
				        	label:{normal:{show:true}},
				        	markArea: {
				        		silent: true,
				        		data: [[{
				        			xAxis: '0.1',
				        			yAxis: '0',
				        			itemStyle:{
				        				normal:{color:'rgba(255,210,68,0.5)'},
				        			}
				        		}, {
				        			xAxis: '0.4',
				        			yAxis: '-100',
				        		}],[{
				        			xAxis: '0.4',
				        			yAxis: '0',
				        			itemStyle:{
				        				normal:{color:'rgba(255,226,133,0.5)'},
				        			}
				        		}, {
				        			xAxis: '0.7',
				        			yAxis: '-100',
				        		}],[{
				        			xAxis: '0.7',
				        			yAxis: '0',
				        			itemStyle:{
				        				normal:{color:'rgba(253,234,175,0.5)'},
				        			}
				        		}, {
				        			xAxis: '1.0',
				        			yAxis: '-100',
				        		}]]
				        	},
				        	itemStyle:{
				        		normal:{color:'#A079D9'},
				        	},
				        	data:[[0.2,-30,"客观题",5,4],[0.5,-30,"客观题",3,5],[0.7,-30,"客观题",3,6]]
				        }
				        ]
				    },
				    optionknowledge:{
				    	tooltip: {
				    		trigger: 'axis'
				    	},
				    	legend: {
				    		x: 'center',
				    		data:['我的','班级','全校','全区县']
				    	},
				    	radar: [
				    	{
				    		indicator: [
				    		{text: '函数', max: 100},
				    		{text: '三角函数', max: 100},
				    		{text: '圆锥曲线与方程', max: 100},
				    		],
				    		radius: 200,
				    		center: ['50%','65%'],
				    	}
				    	],
				    	series: [
				    	{
				    		type: 'radar',
				    		data: [
				    		{
				    			name: '我的',
				    			value: [23,83,54,65,23],
				    			itemStyle: {normal: {color: '#DE20CE',areaStyle: {color: 'rgba(222,32,206,0.3)'}}},
				    		},
				    		{
				    			name: '班级',
				    			value: [23,43,54,65,23],
				    			itemStyle: {normal: {color: '#FFD244',areaStyle: {color: 'rgba(255,210,68,0.3)'}}},
				    		},
				    		{
				    			name:'全校',
				    			value:[34,54,56,76,87],
				    			itemStyle: {normal: {color: '#70CDF3',areaStyle: {color: 'rgba(112,205,243,0.3)'}}},
				    		},{
				    			name:'全区县',
				    			value:[34,34,56,76,87],
				    			itemStyle: {normal: {color: '#70F390',areaStyle: {color: 'rgba(112,243,144,0.3)'}}},
				    		}
				    		]
				    	}
				    	]
				    },
				    optionabilityAnalyze:{
				    	tooltip: {
				    		trigger: 'axis'
				    	},
				    	legend: {
				    		x: 'center',
				    		data:['我的','班级','全校','全区县']
				    	},
				    	radar: [
				    	{
				    		indicator: [
				    		{text: '空间想象能力', max: 100},
				    		{text: '抽象概括能力', max: 100},
				    		{text: '推理论证能力', max: 100},
				    		{text: '运算求解能力', max: 100},
				    		{text: '数据处理能力', max: 100},
				    		{text: '综合应用能力', max: 100},
				    		],
				    		radius: 200,
				    		center: ['50%','52%'],
				    	}
				    	],
				    	series: [
				    	{
				    		type: 'radar',
				    		data: [
				    		{
				    			name: '我的',
				    			value: [23,83,54,65,23,45,65],
				    			itemStyle: {normal: {color: '#DE20CE',areaStyle: {color: 'rgba(222,32,206,0.3)'}}},
				    		},
				    		{
				    			name: '班级',
				    			value: [23,43,54,65,23,43,78],
				    			itemStyle: {normal: {color: '#FFD244',areaStyle: {color: 'rgba(255,210,68,0.3)'}}},
				    		},
				    		{
				    			name:'全校',
				    			value:[34,54,56,76,87,53,43],
				    			itemStyle: {normal: {color: '#70CDF3',areaStyle: {color: 'rgba(112,205,243,0.3)'}}},
				    		},{
				    			name:'全区县',
				    			value:[34,34,56,76,87,42,57],
				    			itemStyle: {normal: {color: '#70F390',areaStyle: {color: 'rgba(112,243,144,0.3)'}}},
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

				this.optionTwoDimensionalAnalysis.tooltip.formatter=function (obj) {
					var value = obj.value;
					return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
					+ '</div>' + "题型" + '：' + value[2] + '<br>'
					+ "题号" + '：' + value[4] + '<br>'
					+ "满分值" + '：' + value[3] + '<br>'
					+ "得分率差距" + '：' + value[1]+"%" + '<br>'
				};

			},
			mounted:function(){
				this.$refs.fristBit[0].className+=" on";
				this.echarts.init(document.getElementById("beyondRate1")).setOption(this.optionBeyondRate);
				this.echarts.init(document.getElementById("growthTrend1")).setOption(this.optionGrowthTrend);
				this.echarts.init(document.getElementById("subjectsDiagnosis1")).setOption(this.optionSubjectsDiagnosis);
				this.echarts.init(document.getElementById("subjectsDiagnosis2")).setOption(this.optionSubjectsDiagnosisRight);
				this.echarts.init(document.getElementById("myGoal1")).setOption(this.optionMyGoal);
				this.echarts.init(document.getElementById("scoreQuestion1")).setOption(this.optionScoreQuestion);
				this.echarts.init(document.getElementById("twoDimensionalAnalysis1")).setOption(this.optionTwoDimensionalAnalysis);
				this.echarts.init(document.getElementById("knowledge1")).setOption(this.optionknowledge);
				this.echarts.init(document.getElementById("abilityAnalyze1")).setOption(this.optionabilityAnalyze);
				var olouceng = document.getElementsByClassName("louceng");
				var oNav = document.getElementById("navInside").getElementsByTagName("li");
				var olouceng1 = document.getElementsByClassName("louceng1");
				var oNav1 = document.getElementById("navInside1").getElementsByTagName("li");
				window.addEventListener('scroll',()=>{
					var oheight = document.documentElement.clientHeight || document.body.clientHeight;
					var otop = document.documentElement.scrollTop || document.body.scrollTop;
					if(otop>=250){
						for(var i=0;i<olouceng.length;i++){
							if(oheight+otop-olouceng[i].offsetTop>oheight/1.5){
								for(var j=0;j<oNav.length;j++){
									oNav[j].className = '';
									
								}
								oNav[i].className = 'active';
							}

						}
						for(var i=0;i<olouceng1.length;i++){
							if(oheight+otop-olouceng1[i].offsetTop>oheight/1.5){
								for(var j=0;j<oNav1.length;j++){
									oNav1[j].className = '';
									
								}
								oNav1[i].className = 'active'
							}

						}
					}else{
					}
				});
			},
			methods:{
				changetest:function(e){
					this.showselect = !this.showselect
				},
				selectShow:function(){
					this.showselect = !this.showselect
				},
				testChange(e){
					console.log(e)
				},  
				testtest:function(e){
					var olouceng = document.getElementsByClassName("louceng");
					var oNav = document.getElementById("navInside").getElementsByTagName("li");
					this.activeList = e;
					window.scrollTo(0 ,olouceng[e].offsetTop-100);
				},
				testtest1:function(e){
					var olouceng = document.getElementsByClassName("louceng1");
					var oNav = document.getElementById("navInside1").getElementsByTagName("li");
					this.activeList1 = e;
					window.scrollTo(0 ,olouceng[e].offsetTop-100);
				},
				rainbow:function(index,num){
					for(var i=0;i<document.getElementsByClassName("header-banner-click").length;i++){
						document.getElementById("rainbow").getElementsByClassName("header-banner-click")[i].className="header-banner-click";
					}
					document.getElementById("rainbow").getElementsByClassName("is-active")[0].getElementsByClassName("header-banner-click")[index].className+=" on";
					if(num==1){
						var oNav = document.getElementById("navInside1").getElementsByTagName("li");
						for(var a = 0;a<oNav.length;a++){
							oNav[a].className = '';
						}
						oNav[0].className = 'active';
						this.displayAll.personalAchievement=true;
						this.displayAll.beyondRate=true;
						this.displayAll.growthTrend=true;
						this.displayAll.subjectsDiagnosis=true;
						this.displayAll.myGoal=true;
						this.displayAll.anotherpersonalAchievement=false;
						this.displayAll.testAnalysis=false;
						this.displayAll.optionScoreQuestion=false;
						this.displayAll.twoDimensionalAnalysis=false;
						this.displayAll.knowledge=false;
						this.displayAll.abilityAnalyze=false;
						this.activeList = 0;this.activeList1 = 0;
					}else{
						var oNav = document.getElementById("navInside").getElementsByTagName("li");
						for(var a = 0;a<oNav.length;a++){
							oNav[a].className = '';
						}
						oNav[0].className = 'active';
						this.displayAll.personalAchievement=false;
						this.displayAll.beyondRate=true;
						this.displayAll.growthTrend=true;
						this.displayAll.subjectsDiagnosis=false;
						this.displayAll.myGoal=false;
						this.displayAll.anotherpersonalAchievement=true;
						this.displayAll.testAnalysis=true;
						this.displayAll.optionScoreQuestion=true;
						this.displayAll.twoDimensionalAnalysis=true;
						this.displayAll.knowledge=true;
						this.displayAll.abilityAnalyze=true;
						this.activeList = 0;this.activeList1 = 0;
					}
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
					if(num=="class"){
						this.optionGrowthTrend.series[0].data=[34.9, 44.8, 40.84, 48.3];
					}
					if(num=="school"){
						this.optionGrowthTrend.series[0].data=[2.9, 7.8, 40.84, 48.3];
					}
					if(num=="area"){
						this.optionGrowthTrend.series[0].data=[34.9, 44.8, 48.84, 23.3]
					}
					this.echarts.init(document.getElementById("growthTrend1")).setOption(this.optionGrowthTrend);
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
					if(num=="class"){
						this.optionSubjectsDiagnosis.series[0].data=[70, 75, 65, 67, 42];
						this.optionSubjectsDiagnosisRight.series[0].data[0].value=[23,43,54,65,23];
						this.optionSubjectsDiagnosisRight.series[0].data[1].value=[34,54,56,76,87];
					}
					if(num=="school"){
						this.optionSubjectsDiagnosis.series[0].data=[40, 65, 65, 67, 42];
						this.optionSubjectsDiagnosisRight.series[0].data[0].value=[13,33,54,65,23];
						this.optionSubjectsDiagnosisRight.series[0].data[1].value=[34,54,66,66,87];
					}
					if(num=="area"){
						this.optionSubjectsDiagnosis.series[0].data=[60, 25, 65, 97, 42];
						this.optionSubjectsDiagnosisRight.series[0].data[0].value=[23,23,54,65,23];
						this.optionSubjectsDiagnosisRight.series[0].data[1].value=[34,64,56,66,87];
					}
					this.echarts.init(document.getElementById("subjectsDiagnosis1")).setOption(this.optionSubjectsDiagnosis);
					this.echarts.init(document.getElementById("subjectsDiagnosis2")).setOption(this.optionSubjectsDiagnosisRight);
				},
				twoDimensionalAnalysisChoose:function(e,obj){
					for(var i=0;i<e.currentTarget.parentNode.parentNode.getElementsByClassName("body-icon-bit").length;i++){
						e.currentTarget.parentNode.parentNode.getElementsByClassName("body-icon-bit")[i].getElementsByClassName("body-icon-color")[0].className="body-icon-color color-push";
					}
					if(obj=='class'){
						e.currentTarget.className="body-icon-color color-red";
						this.optionTwoDimensionalAnalysis.series[0].data=[[0.2,30,"客观题",5,1,"-55.00%"],[0.5,30,"客观题",3,2,"-55.00%"],[0.7,30,"客观题",3,3,"-55.00%"]];
						this.optionTwoDimensionalAnalysis.series[1].data=[[0.2,-30,"客观题",5,4,"-55.00%"],[0.5,-30,"客观题",3,5,"-55.00%"],[0.7,-30,"客观题",3,6,"-55.00%"]];
					}
					if(obj=='school'){
						e.currentTarget.className="body-icon-color color-green";
						this.optionTwoDimensionalAnalysis.series[0].data=[[0.2,40,"客观题",5,1,"-55.00%"],[0.5,40,"客观题",3,2,"-55.00%"],[0.7,40,"客观题",3,3,"-55.00%"]];
						this.optionTwoDimensionalAnalysis.series[1].data=[[0.2,-40,"客观题",5,4,"-55.00%"],[0.5,-40,"客观题",3,5,"-55.00%"],[0.7,-40,"客观题",3,6,"-55.00%"]];
						
					}
					if(obj=='area'){
						e.currentTarget.className="body-icon-color color-blue";
						this.optionTwoDimensionalAnalysis.series[0].data=[[0.2,60,"客观题",5,1,"-55.00%"],[0.5,60,"客观题",3,2,"-55.00%"],[0.7,60,"客观题",3,3,"-55.00%"]];
						this.optionTwoDimensionalAnalysis.series[1].data=[[0.2,-60,"客观题",5,4,"-55.00%"],[0.5,-60,"客观题",3,5,"-55.00%"],[0.7,-60,"客观题",3,6,"-55.00%"]];
					}
					this.echarts.init(document.getElementById("twoDimensionalAnalysis1")).setOption(this.optionTwoDimensionalAnalysis);
				},
				objectSpanMethod({ row, column, rowIndex, columnIndex }) {
					if (columnIndex === 0) {
						if (rowIndex === 0) {
							return {
								rowspan: row.qwe,
								colspan: 1
							};
						} else {
							return {
								rowspan: 0,
								colspan: 0
							};
						}
					}
				},
			}
		}
		</script>
		<style>
		#studentlevel{
			border-top: 1px solid #f2f2f2;
		}
		#studentlevel .borders{
			box-shadow: 1px 1px 14px rgba(0,0,0,.15);
		}
		#studentlevel #personalAchievement{
			width: 1100px;
			margin: auto;
			margin-top:20px;
		}	
		#studentlevel #anotherpersonalAchievement{
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
		#studentlevel #anotherpersonalAchievement .body{
			margin-top:20px;
		}
		#studentlevel .header-banner-bit{
			width: 89px;
			height: 73px;
			float: left;
			margin-top: 15px;
		}
		#studentlevel .table-header{
			background: #70CDF3;
			color: #fff;
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
		#studentlevel .choose-area{
			width: 350px;
			margin: auto;
		}
		#studentlevel .choose-area-left{
			width: 115px;
			height:50px;
			border:1px solid #46C4F8;
			text-align: center;
			float: left;
			border-radius: 100px 0 0 100px;
			color: #fff;
			background: #46C4F8;
		}
		#studentlevel .choose-area-left p{
			line-height:55px;
		}
		#studentlevel .choose-area-midle{
			width: 115px;
			height:50px;
			border-top:1px solid #46C4F8;
			border-bottom:1px solid #46C4F8;
			text-align: center;
			float: left;
			color: #46C4F8;
		}
		#studentlevel .choose-area-midle p{
			line-height: 55px;
		}
		#studentlevel .choose-area-right{
			width: 115px;
			height:50px;
			border:1px solid #46C4F8;
			text-align: center;
			float: left;
			border-radius: 0 100px 100px 0;
			color: #46C4F8;
		}
		#studentlevel .choose-area-right p{
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
		#studentlevel #subjectsDiagnosis2{
			width: 470px;
			height: 500px;
			float: left;
			margin-top:70px;
			margin-left: 20px;
		}
		#studentlevel .subjectsDiagnosisText{
			margin-top:20px;
		}
		#studentlevel .subjectsDiagnosisText p{
			font-size: 14px;
			color: #3D3D3D;
			letter-spacing: 0;
			line-height: 24px;
		}
		#studentlevel #myGoal{
			margin-top:20px;
		}
		#studentlevel #myGoal .body{
			padding-top: 20px;
		}
		#studentlevel .body-title-item{
			width: 584px;
			height: 93px;
			margin: auto;
			border:1px solid #FF8585;
		}
		#studentlevel .body-title-itemTitle{
			width: 250px;
			margin:auto;
			line-height: 60px;
		}
		#studentlevel .body-title-itemTitle p{
			float: left;
			margin-left: 30px;
		}
		#studentlevel .body-title-itemTxt{
			width: 280px;
			margin:auto;
			line-height: 20px;
		}
		#studentlevel .body-title-itemTxt p{
			float: left;
			margin-left: 60px;
			color: #FF8585;
		}
		#studentlevel #myGoal1{
			width: 1080px;
			height: 460px;
			margin: 30px;
		}
		#studentlevel #testAnalysis{
			margin-top:20px;
		}
		#studentlevel #testAnalysis .body{
			padding-top: 20px;
		}
		#studentlevel #testAnalysis .body-Vtitle{
			width: 345px;
			margin: auto;
		}
		#studentlevel #testAnalysis .body-Vtitle p{
			float: left;
			margin-left: 8px;
		}
		#studentlevel #testAnalysis .testAnalysis-table{
			margin-top:20px;
		}
		#studentlevel #testAnalysis .active{
			color: #52D871;
		}
		#studentlevel #testAnalysis .activeS{
			color: #FF8585;
		}
		#studentlevel #scoreQuestion{
			margin-top:20px;
		}
		#studentlevel #scoreQuestion .body{
			padding-top: 20px;
		}
		#studentlevel #scoreQuestion1{
			width: 1080px;
			height: 460px;
			margin: auto;
			margin-top: 20px;
			margin-bottom: 20px;
		}
		#studentlevel #twoDimensionalAnalysis{
			margin-top:20px;
		}
		#studentlevel #twoDimensionalAnalysis1{
			width: 1080px;
			height: 660px;
			margin: auto;
			margin-top: 20px;
			margin-bottom: 20px;
		}
		#studentlevel #twoDimensionalAnalysis .body{
			padding-top:20px;
		}
		#studentlevel #twoDimensionalAnalysis .body-icon{
			width: 255px;
			margin: auto;
		}
		#studentlevel #twoDimensionalAnalysis .body-icon-color{
			width: 20px;
			height: 20px;
			float: left;
		}
		#studentlevel #twoDimensionalAnalysis .body-icon-bit{
			margin-left:20px;
			float: left;
		}
		#studentlevel #twoDimensionalAnalysis .body-icon-bit p{
			margin-left: 5px;
			float: left;
		}
		#studentlevel #twoDimensionalAnalysis .color-blue{
			background: #70CDF3;
		}
		#studentlevel #twoDimensionalAnalysis .color-green{
			background: #49E1BC;
		}
		#studentlevel #twoDimensionalAnalysis .color-red{
			background: #FF8585;
		}
		#studentlevel #twoDimensionalAnalysis .color-push{
			background: #919191;
		}
		#studentlevel .twoDimensionalAnalysis-foot{
			width: 870px;
			height: 30px;
			margin: auto;
			margin-top: -45px;
		}
		#studentlevel .twoDimensionalAnalysis-foot .difficultyLevel{
			width: 33.33%;
			height: 100%;
			float:left;
			text-align: center;
			color: #fff;
		}
		#studentlevel .twoDimensionalAnalysis-foot .easy{
			background: #FF4444;
		}
		#studentlevel .twoDimensionalAnalysis-foot .midde{
			background: #FF8585;
		}
		#studentlevel .twoDimensionalAnalysis-foot .difficult{
			background: #FEB0B0;
		}
		#studentlevel .twoDimensionalAnalysis-foot .difficultyLevel p{
			line-height: 35px;
			font-size: 12px;
			letter-spacing: 0;
		}
		#studentlevel #twoDimensionalAnalysis .foot-word{
			width: 100%;
			margin-top:20px;
		}
		#studentlevel #twoDimensionalAnalysis .foot-word p{
			font-size: 14px;
			color: #3D3D3D;
			letter-spacing: 0;
			line-height: 24px;
		}
		#studentlevel #knowledge{
			margin-top:20px;
		}
		#studentlevel #knowledge .body{
			padding-top:20px;
		}
		#studentlevel #knowledge1{
			width: 1080px;
			height: 400px;
			margin: auto;
		}
		#studentlevel .knowledge-table{
			width: 1080px;
			margin: auto;
		}
		#studentlevel #knowledge-table .el-table thead.is-group th{
			background: #70CDF3;
			color: #fff;
		}
		#studentlevel #knowledge-table .el-table_1_column_26_column_30{
			border-right: 1px solid #e6ebf5 !important;
		}
		#studentlevel #knowledge-table-header .el-table__body-wrapper{
			display: none;
		}
		#studentlevel #knowledge-table .knowledge-table-true .el-table__header-wrapper{
			display: none;
		}
		#studentlevel .knowledge-table-trueTotle{
			width: 100%;
			height: 50px;
			background: #FF8585;	
		}
		#studentlevel .knowledge-table-trueTotle .knowledge-table-trueTotleBit{
			line-height: 50px;
			float: left;
			width: 160px;
			color: #fff;
			text-align: center;
		}
		#studentlevel .knowledge-foot{
			margin-top:20px;
		}
		#studentlevel .knowledge-foot p{
			font-size: 14px;
			color: #3D3D3D;
			letter-spacing: 0;
			line-height: 24px;
		}
		#studentlevel #abilityAnalyze{
			margin-top: 20px;
		}
		#studentlevel #abilityAnalyze1{
			width: 1080px;
			height: 520px;
			margin: auto;
			margin-top: 20px;
		}
		#studentlevel #abilityAnalyze2 .el-table--border td, .el-table--border th{
			border:0px !important;
		}
		#studentlevel #abilityAnalyze2 .el-table thead.is-group th{
			background: #70CDF3;
			color: #fff;
		}
		#studentlevel .abilityAnalyze-foot{
			margin-top: 20px;
		}
		#studentlevel .abilityAnalyze-foot p{
			font-size: 14px;
			color: #3D3D3D;
			letter-spacing: 0;
			line-height: 24px;
		}
		#studentlevel .el-select .el-input .el-input__icon{
			color: #44A9FF
		}
		#studentlevel .el-carousel__arrow{
			background-color: white;
			color: #44A9FF
		}
		#studentlevel .el-carousel__arrow:hover{
			background-color: white
		}
		#classLevel .el-select .el-input .el-input__icon{
			color: #70CDF3
		}
		#studentlevel .el-carousel  {
			overflow-x: hidden;
			position: relative;
			text-align: center;
			margin: auto;
			width: 400px;
			height: 50px;
			margin-top: 30px;
			line-height: 50px;
		}
		#studentlevel #rainbow .el-carousel{
			width: 1100px;
			height: 100px;
		}
		#studentlevel .el-carousel__container {
			position: relative;
			height: 50px;
			margin: auto;
		}
		#studentlevel .myselect{
			border:1px solid #44a9ff;
			width: 90px;
			border-radius: 4px;
		}
		#studentlevel .testTips{
			color:#3d3d3d;
			font-size: 14px;
			margin-top: 25px
		}
		#studentlevel .schoolSelectBox{
			width: 200px;
			margin: auto;
			margin-bottom: 35px;
		}
		#studentlevel .achievementSelectBox{
			width: 90px;
			margin: auto;
			margin-bottom: 35px;
		}
		#studentlevel .borders{
			box-shadow: 1px 1px 14px rgba(0,0,0,.15);
		}
		#studentlevel .el-table .tableBackground{
			background-color: #f5fcff;text-align: center;
		}
		#studentlevel .el-table .tableCenter{
			text-align: center;
		}
		#studentlevel .alltest{
			cursor: pointer;
		}
		#studentlevel .formatRow{
			font-weight: normal;
			text-align:center !important;
			color: white;
			border: 0px !important;
			background-color: #70CDF3 !important;
		}
		#achievementTable .el-table--border td{
			border:0px;
		}
		#studentlevel .el-input__inner{
			border: 0px;
			text-align: center;
		}
		#studentlevel .el-select .el-input .el-input__icon{
			color: #70CDF3
		}
		#studentlevel .el-carousel__arrow{
			background-color: white;
			color: #70CDF3
		}
		#studentlevel .el-carousel__arrow:hover{
			background-color: white
		}
		#studentlevel .showselect{
			list-style: none;position: absolute;margin: 0;padding:0;
			border: 1px solid #f2f2f2;
			left: 50%;
			z-index: 999;
			background-color: white;
			margin-left: -110px;
		}
		#studentlevel .showselect li{
			margin: 0;padding:0;
			border-bottom: 1px solid #f2f2f2;
			padding:10px 20px;
			cursor: pointer;
		}
		#studentlevel .alltest{
			cursor: pointer;
		}
		</style>