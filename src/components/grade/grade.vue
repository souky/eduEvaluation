<template>
	<div id="grade">
		<div class="grade-nav">
			<div v-show="display.subject" v-for="(item,index) in subjectLsit" v-if="index == 0" ref="fristBit"  :data-id="item.id" class="grade-nav-bit navOn" @click="subjectButton($event)">
				<p>{{item.name}}</p>
			</div>
			<div v-show="display.subject" v-for="(item,index) in subjectLsit" v-if="index != 0" ref="fristBit" :data-id="item.id" class="grade-nav-bit" @click="subjectButton($event)">
				<p>{{item.name}}</p>
			</div>
			
			<div v-show="display.allSubject" class="grade-nav-bit1">
				<p>全部分类</p>
			</div>
			<div class="grade-navMore">
				<div class="grade-navMore-bit">
					<span @click="allButton($event)"><img class="grade-navMore-bitImg" src="../../../static/img/APPImg/gfh@2x.png" width="20px" alt=""></span>
				</div>
			</div>
		</div>
		<div v-show="display.allSubject" class="grade-nav-more">
			<div class="Gnav-moreConment">
				<div class="Gnav-moreConment-bit" :data-id="item.id" @click="subjectButton1($event)" v-for="item in subject">
					<p>{{item.name}}</p>
				</div>
				<div class="cl"></div>
			</div>
			<div class="black-cell" ref="loginHight" @touchstart="colse($event)"></div>
		</div>
		<div class="grade-body">
			<div class="totle" v-show="display.totle">
				<div class="totle-img">
					<img src="../../../static/img/z1-1@2x.png" width="100%">
				</div>
				<div class="totle-conment">
					<div class="totle-conment-title">
						<p>{{titleName}}：{{allgradetitle}}分</p>
					</div>
					<div class="totle-conment-body">
						<table class="gridtable">
							<tr>
								<th></th>
								<th>班级</th>
								<th>校级</th>
								<th>地区级</th>
							</tr>
							<tr v-for="item in allgrade">
								<td>{{item.name}}</td>
								<td>{{item.class}}</td>
								<td>{{item.school}}</td>
								<td>{{item.area}}</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<div class="beyondRate" v-show="display.beyondRate">
				<div class="totle-img">
					<img src="../../../static/img/z2-1@2x.png" width="100%">
				</div>
				<div class="totle-conment">
					<div class="totle-conment-title">
						<p>超越率</p>
					</div>
					<div class="beyondRate-title">
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
						<div class="cl"></div>
						<div id="beyondRate1"></div>
					</div>
				</div>
			</div>
			<div class="growth" v-show="display.growth">
				<div class="totle-img">
					<img src="../../../static/img/z3-1@2x.png" width="100%">
				</div>
				<div class="totle-conment">
					<div class="totle-conment-title">
						<p>成长趋势</p>
					</div>
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
						<div class="cl"></div>
					</div>
					<div id="growthTrend1"></div>
				</div>
			</div>
			<div class="Subjectsdiagnose" v-show="display.Subjectsdiagnose">
				<div class="totle-img">
					<img src="../../../static/img/z4-1@2x.png" width="100%">
				</div>
				<div class="totle-conment">
					<div class="totle-conment-title">
						<p>科目诊断</p>
					</div>
					<div class="choose-area1">
						<div class="choose-area-left1" @click="chooseSubject1($event,'class')">
							<p>本班</p>
						</div>
						<div class="choose-area-midle1" @click="chooseSubject1($event,'school')">
							<p>本校</p>
						</div>
						<div class="choose-area-right1" @click="chooseSubject1($event,'area')">
							<p>本区县</p>
						</div>
						<div class="cl"></div>
					</div>
					<div id="subjectsDiagnosis1"></div>
					<div class="totle-conment-title">
						<p>个人与平均水平对比</p>
					</div>
					<div id="subjectsDiagnosis2"></div>
					<div class="Subjectsdiagnose-foot">
						<p>在本次考试中，语文的标准分较高，并且高于总分标准分，是本班级的优势科目，请继续保持；数学、英语和综合的标准分较低，并且低于总分标准分，是本班级的弱势科目，需要多关注。在本次考试中，本班级的语文、数学、英语、综合以及总分的得分率都高于学校平均得分率，请继续保持</p>
					</div>
				</div>
			</div>
			<div class="myGoal" v-show="display.myGoal">
				<div class="totle-img">
					<img src="../../../static/img/z5-1@2x.png" width="100%">
				</div>
				<div class="totle-conment">
					<div class="totle-conment-title">
						<p>我的目标：下次考试可以增加？分</p>
					</div>
					<div class="myGoaltitle">
						<div class="myGoaltitle-bit">
							<p>简单题得分</p>
							<p>{{classGold.easyNum}}</p>
						</div>
						<div class="myGoaltitle-bit">
							<p>中等题得分</p>
							<p>{{classGold.secondaryNum}}</p>
						</div>
						<div class="myGoaltitle-bit">
							<p>难题得分</p>
							<p>{{classGold.difficultNum}}</p>
						</div>
						<div class="cl"></div>
					</div>
					<div class="totle-conment-title">
						<p>各难度题目得分率对比图</p>
					</div>
					<div id="myGoal1"></div>
					<div class="Subjectsdiagnose-foot">
						<p>在本次考试中，你的简单题失分率最低，难题失分率最高。在下次考试中，简单题多加注意很容易就能加分，中等题再努力一下也能得分，难题需要多多练习。</p>
					</div>
				</div>
			</div>
			<div class="allItem" v-show="display.allItem">
				<div class="totle-img">
					<img src="../../../static/img/z6-1@2x.png" width="100%">
				</div>
				<div class="totle-conment">
					<div class="totle-conment-title">
						<p>各小题得分率</p>
					</div>
					<div class="choose-area1-other">
						<div class="choose-area-left1-other" @click="chooseSubject1Other($event,'class')">
							<p>对比班级</p>
						</div>
						<div class="choose-area-midle1-other" @click="chooseSubject1Other($event,'school')">
							<p>对比学校</p>
						</div>
						<div class="choose-area-right1-other" @click="chooseSubject1Other($event,'area')">
							<p>对比本区县</p>
						</div>
						<div class="cl"></div>
					</div>
					<div class="totle-conment-title">
						<p>各题目得分率对比图</p>
					</div>
					<div id="allItem1" style="width:100%"></div>
				</div>
			</div>
			<div class="twoAnalysis" v-show="display.twoAnalysis">
				<div class="totle-img">
					<img src="../../../static/img/z7-1@2x.png" width="100%">
				</div>
				<div class="totle-conment">
					<div class="totle-conment-title">
						<p>得分率-难度二维分析</p>
					</div>
					<div class="body-icon-other">
						<div class="body-icon-bit-other" @click="chooseTwoArea($event,'class')">
							<div class="body-icon-color-other color-blue-other"></div>
							<p>班级</p>
						</div>
						<div class="body-icon-bit-other" @click="chooseTwoArea($event,'school')">
							<div class="body-icon-color-other"></div>
							<p>校级</p>
						</div>
						<div class="body-icon-bit-other" @click="chooseTwoArea($event,'area')">
							<div class="body-icon-color-other"></div>
							<p>地区</p>
						</div>
					</div>
					<div class="cl"></div>
					<div id="twoAnalysis1"></div>
					<div class="difficultChoose">
						<div class="difficultChoose-bit difficultChoose-left" @click="choosetwoAnalysis($event,'easy')">
							<p>容易</p>
						</div>
						<div class="difficultChoose-bit difficultChoose-middle" @click="choosetwoAnalysis($event,'middle')">
							<p>中等</p>
						</div>
						<div class="difficultChoose-bit difficultChoose-right" @click="choosetwoAnalysis($event,'difficult')">
							<p>难</p>
						</div>
						<div class="cl"></div>
					</div>
					<div class="Subjectsdiagnose-foot mt10">
						<p>在本次考试中，得分率低于学校平均水平的题目分别是第4题、第8题、第12题、第16题和第20题，其中中等难度的题目为第4题和第12题，这些题目需要注意；其中简单难度的题目为第8题和第20题，需要特别注意。</p>
					</div>
				</div>
			</div>
			<div class="knowledgeAnalysis" v-show="display.knowledgeAnalysis">
				<div class="totle-img">
					<img src="../../../static/img/z8-1@2x.png" width="100%">
				</div>
				<div class="totle-conment">
					<div class="totle-conment-title">
						<p>知识点分析</p>
					</div>
					<div id="knowledgeAnalysis1"></div>
					<div class="knowledgeNutton" @click="knowledgeMore()">
						<p>知识点诊断</p>
					</div>
				</div>
			</div>
			<div class="abilityAnalyze" v-show="display.abilityAnalyze">
				<div class="totle-img">
					<img src="../../../static/img/z9-1@2x.png" width="100%">
				</div>
				<div class="totle-conment">
					<div class="totle-conment-title">
						<p>能力点分析</p>
					</div>
					<div id="abilityAnalyze1"></div>
					<div class="abilityNutton" @click="abilityMore()">
						<p>能力点诊断</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return{
			titleName:'总分',
			basicData:{
				subject:'总分',
				twoType:'class',
				twoType1:'easy',
				id:'',
			},
			display:{
				totle:true,
				beyondRate:true,
				growth:true,
				Subjectsdiagnose:true,
				myGoal:true,
				allItem:true,
				twoAnalysis:true,
				knowledgeAnalysis:true,
				abilityAnalyze:true,

				subject:true,
				allSubject:false,
			},
			allgradetitle:"",
			allgrade:[{
				name:"平均分",
				class:440,
				school:380,
				area:360,
			},{
				name:"最高分",
				class:560,
				school:610,
				area:650,
			},{
				name:"超越率",
				class:"92%",
				school:"83.4%",
				area:"82.26%",
			}],
			subjectLsit:[],
			subject:[{
				id:1,
				name:'总分',
			},{
				id:2,
				name:'数学',
			},{
				id:3,
				name:'英语',
			},{
				id:4,
				name:'物理',
			},{
				id:5,
				name:'化学',
			},{
				id:6,
				name:'语文',
			},{
				id:7,
				name:'生物',
			},{
				id:8,
				name:'历史',
			},{
				id:9,
				name:'地理',
			},{
				id:10,
				name:'政治',
			}],

			indicator:null,

			classGold:{
				easyNum:0,
				secondaryNum:0,
				difficultNum:0,
			},
			optionBeyondRate:{
				tooltip : {
					trigger: 'axis'
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top:'8%',
					containLabel: true
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
							normal:{color:'#F3BB4B'},
						}
					}, 
					{
						value:83.40,
						name:'校级超越率',
						itemStyle:{
							normal:{color:'#ACD46A'},
						}
					},
					{
						value:92,
						name:'班级超越率',
						itemStyle:{
							normal:{color:'#5CC8B3'},
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
					top:'10%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					data: ['09-22','10-22','11-22','01-22']
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
						normal:{color:'#7FDC7F'},
					},
					label:{normal:{show:true,position:'top'},},
					data:[34.9, 44.8, 40.84, 48.3]
				},
				]
			},
			optionSubjectsDiagnosis:{
				color: ['#53CDD6'],
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
				    	left: '8%',
				    	right: '11%',
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
				    series : [
				    {
				    	name:'标准分',
				    	type:'bar',
				    	barWidth: '40%',
				    	label:{normal:{show:true,position:'top'},},
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
				    				normal:{color:'#D06BE0'},
				    			}
				    		}
				    		]

				    	}
				    },
				    ]
				},
				optionSubjectsDiagnosisRight:{
					tooltip: {
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
						radius: 120,
						center: ['50%','55%'],
					}
					],
					series: [
					{
						type: 'radar',
						data: [
						{
							name: '个人',
							label:{normal:{show:true,position:'top'},},
							value: [23,43,54,65,23],
							itemStyle: {normal: {color: '#53CDD6 ',areaStyle: {color: 'rgba(83,205,214,0.3)'}}},
						},
						{
							name:'平均水平',
							label:{normal:{show:true,position:'top'},},
							value:[34,54,56,76,87],
							itemStyle: {normal: {color: '#D06BE0',areaStyle: {color: 'rgba(208,107,224,0.3)'}}},
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
				    		normal:{color:'#DCBF63'},
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
				    		normal:{color:'#6380DC'},
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
						data:['我的得分率','班级得分率']
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
						end: 40
					},
					{
						type: 'inside',
						start: 0,
						end: 100
					},
					],
					series: [
					{
						name:'我的得分率',
						type:'bar',
						label:{normal:{show:true,position:'top'},},
						itemStyle:{
							normal:{color:'#7FDC7F'},
						},
						data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 43.6, 56.2, 32.6, 20.0, 6.4, 3.3,2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6]
					},
					{
						name:'班级得分率',
						type:'line',
						label:{normal:{show:true,position:'top'},},
						itemStyle:{
							normal:{color:'#F2AD1B'},
						},
						data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 32.6, 56.2, 48.7, 18.8, 6.0, 2.3,2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6]
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
					},
					grid: {
						left: '0%',
						right: '10%',
						bottom: '3%',
						top:'3%',
						containLabel: true
					},
					xAxis : [
					{
						type : 'value',
						scale:true,
						min: 0.1,
						max: 0.4,
						interval: 0.1,
					}
					],
					yAxis : [
					{
						type : 'value',
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
								yAxis: '0',
								itemStyle:{
									normal:{color:'rgba(80,243,255,0.5)'},
								}
							}, {
								yAxis: '100',
							}]]
						},
						itemStyle:{
							normal:{color:'#FF8585'},
						},
						data:[[0.2,30,"客观题",5,1],[0.3,30,"客观题",3,2],[0.13,30,"客观题",3,3]]
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
								yAxis: '0',
								itemStyle:{
									normal:{color:'rgba(255,215,88,0.5)'},
								}
							}, {
								yAxis: '-100',
							}]]
						},
						itemStyle:{
							normal:{color:'#A079D9'},
						},
						data:[[0.2,-30,"客观题",5,4],[0.23,-30,"客观题",3,5],[0.18,-30,"客观题",3,6]]
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
						{text: '圆锥曲线与方程', max: 100},
						{text: '三角函数', max: 100},
						{text: '函数', max: 100},
						],
						radius: 80,
						center: ['50%','55%'],
					}
					],
					series: [
					{
						type: 'radar',
						data: [
						{
							name: '我的',
							value: [23,83,54,65,23],
							label:{normal:{show:true,position:'top'},},
							itemStyle: {normal: {color: '#DE20CE',areaStyle: {color: 'rgba(222,32,206,0.3)'}}},
						},
						{
							name: '班级',
							value: [23,43,54,65,23],
							label:{normal:{show:true,position:'top'},},
							itemStyle: {normal: {color: '#FFD244',areaStyle: {color: 'rgba(255,210,68,0.3)'}}},
						},
						{
							name:'全校',
							value:[34,54,56,76,87],
							label:{normal:{show:true,position:'top'},},
							itemStyle: {normal: {color: '#70CDF3',areaStyle: {color: 'rgba(112,205,243,0.3)'}}},
						},{
							name:'全区县',
							value:[34,34,56,76,87],
							label:{normal:{show:true,position:'top'},},
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
						radius: 80,
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
							label:{normal:{show:true,position:'top'},},
							itemStyle: {normal: {color: '#DE20CE',areaStyle: {color: 'rgba(255,60,98,0.3)'}}},
						},
						{
							name: '班级',
							value: [23,43,54,65,23,43,78],
							label:{normal:{show:true,position:'top'},},
							itemStyle: {normal: {color: '#FFD244',areaStyle: {color: 'rgba(83,205,214,0.3)'}}},
						},
						{
							name:'全校',
							value:[34,54,56,76,87,53,43],
							label:{normal:{show:true,position:'top'},},
							itemStyle: {normal: {color: '#70CDF3',areaStyle: {color: 'rgba(255,222,85,0.3)'}}},
						},{
							name:'全区县',
							value:[34,34,56,76,87,42,57],
							label:{normal:{show:true,position:'top'},},
							itemStyle: {normal: {color: '#70F390',areaStyle: {color: 'rgba(116,230,114,0.3)'}}},
						}
						]
					}
					]
				},
				items:[],
				falseList:[],
				oldfalseList:"",
			}
		},
		created:function(){
			this.indicator = this.$indicator;
			this.handleOpen();
			if(this.$store.state.ways=='2'){
				this.$store.commit('newTab','1');
				this.$store.commit('newTitle','成绩报告');
			}else if(this.$store.state.ways=='1'){
				this.$store.commit('newTab','2');
				this.$store.commit('newTitle','成绩报告');
			}
			this.optionTwoDimensionalAnalysis.tooltip.formatter=function (obj) {
				var value = obj.value;
				return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
				+ '</div>' + "题型" + '：' + value[2] + '<br>'
				+ "题号" + '：' + value[4] + '<br>'
				+ "满分值" + '：' + value[3] + '<br>'
				+ "得分率差距" + '：' + value[1]+"%" + '<br>'
			};
			if(window.location.hash.substring(7,8)=="?"){
				this.basicData.id=window.location.hash.substring(15);
				this.$store.commit('newBasisExmaid',this.basicData.id);
			}else{
				this.$router.push({path:'/grade',query:{examId: this.$store.state.basisExmaid}})
				this.basicData.id=window.location.hash.substring(15);
			}
			var name=this.basicData.id;
			var totle={createDate:1512647749000,createUser:"1",id:"0",isDelete:0,orgId:"",remark:"",schoolId:"",subjectCode:1,subjectColor:"#F37070",subjectName:"总分",updateDate:1513586055000};
			this.postHttp(this,{},'exam/getExamListForTab',function(obj,res){
				if(res.code == '10000'){
					obj.items=res.result[name].subject;
					obj.items.unshift(totle);
					obj.subject=[];
					for(var l=0;l<obj.items.length;l++){
						var arr={
							"id":parseInt(obj.items[l].id),
							"name":obj.items[l].subjectName,
						}
						obj.subject.push(arr)
					}
					// for(var q=3;q<9;q++){
					// 	var aqq={
					// 		"id":q,
					// 		"name":"测试"+q,
					// 	}
					// 	obj.subject.push(aqq)
					// }
					if(parseInt(obj.subject.length)<5){
						for(var i=0;i<parseInt(obj.subject.length);i++){
							obj.subjectLsit.push(obj.subject[i]);
						}
					}else{
						for(var i=0;i<5;i++){
							obj.subjectLsit.push(obj.subject[i]);
						}	
					}
				}else{
					obj.$toast({message:res.message, position: 'bottom',duration: 5000})
				}
			})
		},
		mounted:function(){
			let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			this.$refs.loginHight.style.height=h+"px";
			this.getSingleStuReport();
			this.getPercentageRank();
			this.getGrowthTrends();
			this.geReportCards();
			this.echarts.init(document.getElementById("myGoal1")).setOption(this.optionMyGoal);
			this.echarts.init(document.getElementById("allItem1")).setOption(this.optionScoreQuestion);
			this.echarts.init(document.getElementById("twoAnalysis1")).setOption(this.optionTwoDimensionalAnalysis);
			this.echarts.init(document.getElementById("knowledgeAnalysis1")).setOption(this.optionknowledge);
			this.echarts.init(document.getElementById("abilityAnalyze1")).setOption(this.optionabilityAnalyze);
			this.display.totle=true;
			this.display.beyondRate=true;
			this.display.growth=true;
			this.display.Subjectsdiagnose=true;
			this.display.myGoal=false;
			this.display.allItem=false;
			this.display.twoAnalysis=false;
			this.display.knowledgeAnalysis=false;
			this.display.abilityAnalyze=false;
		},
		methods:{
			demo:function(){
				var i=parseInt(this.falseList.length)
				var that=this;
				setTimeout(function(){
					console.log(that.falseList[i-1])
					that.$toast({message:that.falseList[i-1], position: 'bottom',duration: 5000})
				},i*5000)
			},
			handleOpen:function(){ 
				this.indicator.open('加载中...'); 
				var that=this;
				setTimeout(function(){
					that.handleClose();
					that.$toast({message:"网络错误", position: 'bottom',duration: 5000})
				},60000)

			},
			handleClose:function(){ 
				this.indicator.close();	
			},
			getSingleStuReport:function(){
				this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id},'score/getSingleStuReport',function(obj,res){
					obj.allgrade=[];
					obj.allgradetitle=res.result.stuSubjScore;
					for(var i=0;i<res.result.studentAppVOList.length;i++){
						if(res.result.studentAppVOList[i].label=="超越率"){
							var arr={
								"name":res.result.studentAppVOList[i].label,
								"class":res.result.studentAppVOList[i].classScore+"%",
								"school":res.result.studentAppVOList[i].schoolScore+"%",
								"area":res.result.studentAppVOList[i].regionScore+"%",
							}
						}else{
							var arr={
								"name":res.result.studentAppVOList[i].label,
								"class":res.result.studentAppVOList[i].classScore,
								"school":res.result.studentAppVOList[i].schoolScore,
								"area":res.result.studentAppVOList[i].regionScore,
							}
						}
						obj.allgrade.push(arr);
					}
				})
			},
			getPercentageRank:function(){
				this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id},'score/getPercentageRank',function(obj,res){
					if(res.code == '10000'){
						obj.optionBeyondRate.series[0].data[0].value=res.result.schoolPercentageRank;
						obj.optionBeyondRate.series[0].data[1].value=res.result.schoolPercentageRank;
						obj.optionBeyondRate.series[0].data[2].value=res.result.classPercentageRank;
						obj.echarts.init(document.getElementById("beyondRate1")).setOption(obj.optionBeyondRate);
					}else{
						obj.$toast({message:res.message, position: 'bottom',duration: 5000})
					}
				})
			},
			getGrowthTrends:function(){
				this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id,range:'CLASS'},'score/getGrowthTrends',function(obj,res){
					if(res.code == '10000'){
						obj.optionGrowthTrend.xAxis.data=[];
						var number=res.result.examDates.length;
						if(res.result.examDates.length>4){
							number=4
						}
						for(var i=0;i<number;i++){
							var date = new Date();  
							date.setTime(parseFloat(res.result.examDates[i]));  
							var y = date.getFullYear();      
							var m = date.getMonth() + 1;      
							m = m < 10 ? ('0' + m) : m;      
							var d = date.getDate();      
							d = d < 10 ? ('0' + d) : d;          
							var number1= m + '-' + d;   
							obj.optionGrowthTrend.xAxis.data.push(number1);
						}
						obj.optionGrowthTrend.series[0].data=[];
						obj.optionGrowthTrend.series[0].data=res.result.standardScores;
						obj.echarts.init(document.getElementById("growthTrend1")).setOption(obj.optionGrowthTrend);
					}else{
						obj.$toast({message:res.message, position: 'bottom',duration: 5000});
					}
				})
			},
			geReportCards:function(){
				this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id,tab:"STUDENT_REPORT",range:'CLASS'},'score/geReportCards',function(obj,res){
					if(res.code == '10000'){
						var type=(typeof res.result);
						if(type=="string"){
						}else{
							if(obj.basicData.subject=="总分"){
								obj.optionSubjectsDiagnosis.xAxis[0].data=[];
								obj.optionSubjectsDiagnosis.xAxis[0].data=res.result.subjectList;
								obj.optionSubjectsDiagnosis.series[0].data=[];
								obj.optionSubjectsDiagnosis.series[0].data=res.result.standardScoreList;
								obj.optionSubjectsDiagnosis.series[0].markLine.data[0].yAxis=res.result.standardScoreList[0];
								obj.optionSubjectsDiagnosisRight.series[0].data[0].value=[];
								obj.optionSubjectsDiagnosisRight.series[0].data[1].value=[];
								obj.optionSubjectsDiagnosisRight.series[0].data[0].value=res.result.stuScoreList;
								obj.optionSubjectsDiagnosisRight.series[0].data[1].value=res.result.classAvgScoreList;
								obj.optionSubjectsDiagnosisRight.radar[0].indicator=[];
								for(var i=0;i<res.result.subjectList.length;i++){
									var arr={
										"text":res.result.subjectList[i],
										"max":100,
									}
									obj.optionSubjectsDiagnosisRight.radar[0].indicator.push(arr);
								}
								obj.echarts.init(document.getElementById("subjectsDiagnosis1")).setOption(obj.optionSubjectsDiagnosis);
								obj.echarts.init(document.getElementById("subjectsDiagnosis2")).setOption(obj.optionSubjectsDiagnosisRight);
							}
						}
						obj.handleClose();
					}else{
						obj.$toast({message:res.message, position: 'bottom',duration: 5000});
					}
				})
			},
			knowAnalysis:function(){
				this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id},'/knowAnalysis',function(obj,res){
					if(res.code == '10000'){
						obj.truetableDatas=res.result;
						obj.optionknowledge.series[0].data[0].value=[];
						obj.optionknowledge.series[0].data[1].value=[];
						obj.optionknowledge.series[0].data[2].value=[];
						obj.optionknowledge.series[0].data[3].value=[];
						obj.optionknowledge.radar[0].indicator=[];
						if(res.result){
							if(res.result.length>=3){
								document.getElementById("knowledgeAnalysis1").style.display="block";
								for(var i=0;i<res.result.length;i++){
									var arr={
										"text":res.result[i].knowDetail[0].knowledgemodule,
										"max":100,
									}
									obj.optionknowledge.radar[0].indicator.push(arr);
									obj.optionknowledge.series[0].data[0].value.push(res.result[i].divideStudent);
									obj.optionknowledge.series[0].data[1].value.push(res.result[i].divideClass);
									obj.optionknowledge.series[0].data[2].value.push(res.result[i].divideSchool);
									obj.optionknowledge.series[0].data[3].value.push(res.result[i].divideAera);
								}
								obj.echarts.init(document.getElementById("knowledgeAnalysis1")).setOption(obj.optionknowledge);
							}else{
								document.getElementById("knowledgeAnalysis1").style.display="none";
							}
						}
					}else{
						document.getElementById("knowledgeAnalysis1").style.display="none";
							//obj.$toast({message:res.message, position: 'bottom',duration: 5000})
							//obj.falseList=res.message;
							obj.falseList.push(res.message)
							obj.demo()
						}
					})
			},
			ablityAnalysis:function(){
				this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id},'/ablityAnalysis',function(obj,res){
					if(res.code == '10000'){
						obj.scoreName=res.result;
						obj.optionabilityAnalyze.series[0].data[0].value=[];
						obj.optionabilityAnalyze.series[0].data[1].value=[];
						obj.optionabilityAnalyze.series[0].data[2].value=[];
						obj.optionabilityAnalyze.series[0].data[3].value=[];
						for(var i=0;i<res.result.length;i++){
							obj.optionabilityAnalyze.series[0].data[0].value.push(res.result[i].divideStudent)
							obj.optionabilityAnalyze.series[0].data[1].value.push(res.result[i].divideClass)
							obj.optionabilityAnalyze.series[0].data[2].value.push(res.result[i].divideSchool)
							obj.optionabilityAnalyze.series[0].data[3].value.push(res.result[i].divideAera)
						}
						obj.echarts.init(document.getElementById("abilityAnalyze1")).setOption(obj.optionabilityAnalyze);
						obj.handleClose();
					}else{
							//obj.$toast({message:res.message, position: 'bottom',duration: 5000})
							//obj.falseList=res.message;
							obj.falseList.push(res.message)
							obj.demo()
						}
					})
			},
			testAnalysis:function(){
				this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id},'/testAnalysis',function(obj,res){
					if(res.code == '10000'){
						obj.classGold=res.result.targetVO;
						obj.optionMyGoal.series[0].data=[];
						obj.optionMyGoal.series[1].data=[];
						obj.optionMyGoal.series[1].data.push(parseFloat(res.result.targetVO.divideEasy))
						obj.optionMyGoal.series[1].data.push(parseFloat(res.result.targetVO.divideSecondary))
						obj.optionMyGoal.series[1].data.push(parseFloat(res.result.targetVO.divideDifficult))
						var number1=parseInt((parseFloat(100)-parseFloat(res.result.targetVO.divideEasy))*100)
						var num1=parseFloat(number1)/100;
						var number2=parseInt((parseFloat(100)-parseFloat(res.result.targetVO.divideSecondary))*100)
						var num2=parseFloat(number2)/100;
						var number3=parseInt((parseFloat(100)-parseFloat(res.result.targetVO.divideDifficult))*100)
						var num3=parseFloat(number3)/100;
						obj.optionMyGoal.series[0].data.push(num1)
						obj.optionMyGoal.series[0].data.push(num2)
						obj.optionMyGoal.series[0].data.push(num3)


						obj.optionScoreQuestion.xAxis[0].data=[];
						obj.optionScoreQuestion.series[0].data=[];
						obj.optionScoreQuestion.series[1].data=[];
						obj.optionTwoDimensionalAnalysis.series[0].data=[];
						obj.optionTwoDimensionalAnalysis.series[1].data=[];
						for(var i=0;i<res.result.listVO.length;i++){
							obj.optionScoreQuestion.xAxis[0].data.push(res.result.listVO[i].qid);
							obj.optionScoreQuestion.series[0].data.push(parseFloat(res.result.listVO[i].divideStudent));
							obj.optionScoreQuestion.series[1].data.push(parseFloat(res.result.listVO[i].divideClass));
							if(parseFloat(res.result.listVO[i].divideStudentToClass)>=0){
								var list=[];
								list.push(res.result.listVO[i].difficulty);
								list.push(parseFloat(res.result.listVO[i].divideStudentToClass));
								list.push(res.result.listVO[i].topic);
								list.push(parseFloat(res.result.listVO[i].fractionalValue));
								list.push(parseFloat(res.result.listVO[i].qid));
								obj.optionTwoDimensionalAnalysis.series[0].data.push(list);
							}else{
								var list1=[];
								list1.push(res.result.listVO[i].difficulty);
								list1.push(parseFloat(res.result.listVO[i].divideStudentToClass));
								list1.push(res.result.listVO[i].topic);
								list1.push(parseFloat(res.result.listVO[i].fractionalValue));
								list1.push(parseFloat(res.result.listVO[i].qid));
								obj.optionTwoDimensionalAnalysis.series[1].data.push(list1);
							}
						}
						obj.echarts.init(document.getElementById("allItem1")).setOption(obj.optionScoreQuestion);
						obj.echarts.init(document.getElementById("twoAnalysis1")).setOption(obj.optionTwoDimensionalAnalysis);
						obj.echarts.init(document.getElementById("myGoal1")).setOption(obj.optionMyGoal);
					}else{
						obj.$toast({message:res.message, position: 'bottom',duration: 5000})
					}
				});
			},
			colse(e){
				document.getElementById("grade").getElementsByClassName("grade-navMore")[0].getElementsByClassName("grade-navMore-bitImg1")[0].className="grade-navMore-bitImg";
				this.display.subject=!this.display.subject;
				this.display.allSubject=!this.display.allSubject;
			},
			subjectButton:function(e){
				this.falseList=[];
				for(var i=0;i<e.currentTarget.parentNode.getElementsByClassName("grade-nav-bit").length;i++){
					e.currentTarget.parentNode.getElementsByClassName("grade-nav-bit")[i].className="grade-nav-bit";
				}
				e.currentTarget.className+=" navOn";
				if(e.currentTarget.getElementsByTagName("p")[0].innerHTML=="总分"){
					this.display.totle=true;
					this.display.beyondRate=true;
					this.display.growth=true;
					this.display.Subjectsdiagnose=true;
					this.display.myGoal=false;
					this.display.allItem=false;
					this.display.twoAnalysis=false;
					this.display.knowledgeAnalysis=false;
					this.display.abilityAnalyze=false;
					this.titleName="总分";
					this.basicData.subject=e.currentTarget.getElementsByTagName("p")[0].innerHTML;
					this.totleTrigger();
				}else{
					this.display.totle=true;
					this.display.beyondRate=true;
					this.display.growth=false;
					this.display.Subjectsdiagnose=false;
					this.display.myGoal=true;
					this.display.allItem=true;
					this.display.twoAnalysis=true;
					this.display.knowledgeAnalysis=true;
					this.display.abilityAnalyze=true;
					this.titleName="科目";
					this.basicData.subject=e.currentTarget.getElementsByTagName("p")[0].innerHTML;
					this.trigger();
				}
				this.handleOpen();
			},
			subjectButton1:function(e){
				this.falseList=[];
				var number=parseInt(e.currentTarget.getAttribute("data-id"));
				if(number==0){
					for(var l=0;l<this.$refs.fristBit.length;l++){
						this.$refs.fristBit[l].className="grade-nav-bit";
					}
					this.$refs.fristBit[0].className+=" navOn";
					this.titleName="总分";
					this.basicData.subject="总分";
					this.totleTrigger();
				}else{
					if(this.subject.length>=5){
						if(parseInt(e.currentTarget.parentNode.getElementsByClassName("Gnav-moreConment-bit").length)-number<4){
							this.subjectLsit=[];
							for(var i=0;i<4;i++){
								var num=parseInt(e.currentTarget.parentNode.getElementsByClassName("Gnav-moreConment-bit").length)-4;
								this.subjectLsit.push(this.subject[num+i])
							}
							var arr={
								id:1,
								name:'总分'
							}
							this.subjectLsit.unshift(arr);
							for(var l=0;l<this.$refs.fristBit.length;l++){
								this.$refs.fristBit[l].className="grade-nav-bit";
							}
							var totle=parseInt(e.currentTarget.parentNode.getElementsByClassName("Gnav-moreConment-bit").length)-number;
							this.$refs.fristBit[5-totle].className+=" navOn";
							console.log(this.$refs.fristBit[5-totle]);
							this.titleName="科目";
						}else{
							this.subjectLsit=[];
							for(var i=0;i<4;i++){
								var num=number;
								this.subjectLsit.push(this.subject[num+i])
							}
							var arr={
								id:1,
								name:'总分'
							}
							this.subjectLsit.unshift(arr);
							for(var l=0;l<this.$refs.fristBit.length;l++){
								this.$refs.fristBit[l].className="grade-nav-bit";
							}
							this.$refs.fristBit[1].className+=" navOn";
							this.titleName="科目";
						}
						this.basicData.subject=e.currentTarget.firstChild.innerHTML;
						this.trigger();
					}else{
						this.subjectLsit=[];
						for(var i=0;i<this.subject.length;i++){
							this.subjectLsit.push(this.subject[i])
						}
						for(var l=0;l<this.$refs.fristBit.length;l++){
							this.$refs.fristBit[l].className="grade-nav-bit";
						}
						var num=parseInt(e.currentTarget.getAttribute("data-id"));
						this.$refs.fristBit[num].className+=" navOn";
						this.titleName="科目";
					}
				}
				if(e.currentTarget.getElementsByTagName("p")[0].innerHTML=="总分"){
					this.display.totle=true;
					this.display.beyondRate=true;
					this.display.growth=true;
					this.display.Subjectsdiagnose=true;
					this.display.myGoal=false;
					this.display.allItem=false;
					this.display.twoAnalysis=false;
					this.display.knowledgeAnalysis=false;
					this.display.abilityAnalyze=false;
					this.titleName="总分";
					this.basicData.subject=e.currentTarget.getElementsByTagName("p")[0].innerHTML;
				}else{
					this.display.totle=true;
					this.display.beyondRate=true;
					this.display.growth=false;
					this.display.Subjectsdiagnose=false;
					this.display.myGoal=true;
					this.display.allItem=true;
					this.display.twoAnalysis=true;
					this.display.knowledgeAnalysis=true;
					this.display.abilityAnalyze=true;
					this.titleName="科目";
					this.basicData.subject=e.currentTarget.getElementsByTagName("p")[0].innerHTML;
				}
				this.colse();
				this.handleOpen();
			},
			totleTrigger:function(){
				this.getSingleStuReport();
				this.getPercentageRank();
				this.getGrowthTrends();
				this.geReportCards();
			},
			trigger:function(){
				this.getSingleStuReport();
				this.knowAnalysis();
				this.testAnalysis();
				this.ablityAnalysis();
			},
			allButton:function(e){
				if(e.currentTarget.childNodes[0].className=="grade-navMore-bitImg"){
					e.currentTarget.childNodes[0].className="grade-navMore-bitImg1"
				}else{
					e.currentTarget.childNodes[0].className="grade-navMore-bitImg"
				}
				this.display.subject=!this.display.subject;
				this.display.allSubject=!this.display.allSubject;
			},
			knowledgeMore:function(){
				this.$store.commit('newBasisSubject',this.basicData.subject);
				this.$store.commit('newBasisExmaid',this.basicData.id);
				this.$router.push({path:'/knowledges'});
			},
			abilityMore:function(){
				this.$store.commit('newBasisSubject',this.basicData.subject);
				this.$store.commit('newBasisExmaid',this.basicData.id);
				this.$router.push({path:'/ability'});
			},
			chooseSubject:function(e,num){
				document.getElementsByClassName("growth")[0].getElementsByClassName("choose-area-left")[0].style.background="#fff";
				document.getElementsByClassName("growth")[0].getElementsByClassName("choose-area-left")[0].style.color="#7FDC7F";
				document.getElementsByClassName("growth")[0].getElementsByClassName("choose-area-midle")[0].style.background="#fff";
				document.getElementsByClassName("growth")[0].getElementsByClassName("choose-area-midle")[0].style.color="#7FDC7F";
				document.getElementsByClassName("growth")[0].getElementsByClassName("choose-area-right")[0].style.background="#fff";
				document.getElementsByClassName("growth")[0].getElementsByClassName("choose-area-right")[0].style.color="#7FDC7F";
				e.currentTarget.style.background="#7FDC7F";
				e.currentTarget.style.color="#fff";
				if(num=="class"){
					this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id,range:'CLASS'},'score/getGrowthTrends',function(obj,res){
						if(res.code == '10000'){
							obj.optionGrowthTrend.xAxis.data=[];
							var number=res.result.examDates.length;
							if(res.result.examDates.length>4){
								number=4
							}
							for(var i=0;i<number;i++){
								var date = new Date();  
								date.setTime(parseFloat(res.result.examDates[i]));  
								var y = date.getFullYear();      
								var m = date.getMonth() + 1;      
								m = m < 10 ? ('0' + m) : m;      
								var d = date.getDate();      
								d = d < 10 ? ('0' + d) : d;          
								var number1= m + '-' + d;   
								obj.optionGrowthTrend.xAxis.data.push(number1);
							}
							obj.optionGrowthTrend.series[0].data=[];
							obj.optionGrowthTrend.series[0].data=res.result.standardScores;
							obj.echarts.init(document.getElementById("growthTrend1")).setOption(obj.optionGrowthTrend);
						}else{
							obj.$toast({message:res.message, position: 'bottom',duration: 5000})
						}
					})
				}
				if(num=="school"){
					this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id,range:'SCHOOL'},'score/getGrowthTrends',function(obj,res){
						if(res.code == '10000'){
							obj.optionGrowthTrend.xAxis.data=[];
							var number=res.result.examDates.length;
							if(res.result.examDates.length>4){
								number=4
							}
							for(var i=0;i<number;i++){
								var date = new Date();  
								date.setTime(parseFloat(res.result.examDates[i]));  
								var y = date.getFullYear();      
								var m = date.getMonth() + 1;      
								m = m < 10 ? ('0' + m) : m;      
								var d = date.getDate();      
								d = d < 10 ? ('0' + d) : d;          
								var number1= m + '-' + d;   
								obj.optionGrowthTrend.xAxis.data.push(number1);
							}
							obj.optionGrowthTrend.series[0].data=[];
							obj.optionGrowthTrend.series[0].data=res.result.standardScores;
							obj.echarts.init(document.getElementById("growthTrend1")).setOption(obj.optionGrowthTrend);
						}else{
							obj.$toast({message:res.message, position: 'bottom',duration: 5000})
						}
					})
				}
				if(num=="area"){
					this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id,range:'REGION'},'score/getGrowthTrends',function(obj,res){
						if(res.code == '10000'){
							obj.optionGrowthTrend.xAxis.data=[];
							var number=res.result.examDates.length;
							if(res.result.examDates.length>4){
								number=4
							}
							for(var i=0;i<number;i++){
								var date = new Date();  
								date.setTime(parseFloat(res.result.examDates[i]));  
								var y = date.getFullYear();      
								var m = date.getMonth() + 1;      
								m = m < 10 ? ('0' + m) : m;      
								var d = date.getDate();      
								d = d < 10 ? ('0' + d) : d;          
								var number1= m + '-' + d;   
								obj.optionGrowthTrend.xAxis.data.push(number1);
							}
							obj.optionGrowthTrend.series[0].data=[];
							obj.optionGrowthTrend.series[0].data=res.result.standardScores;
							obj.echarts.init(document.getElementById("growthTrend1")).setOption(obj.optionGrowthTrend);
						}else{
							obj.$toast({message:res.message, position: 'bottom',duration: 5000})
						}
					})
				}
			},
			chooseSubject1:function(e,num){
				document.getElementsByClassName("Subjectsdiagnose")[0].getElementsByClassName("choose-area-left1")[0].style.background="#fff";
				document.getElementsByClassName("Subjectsdiagnose")[0].getElementsByClassName("choose-area-left1")[0].style.color="#53CDD6";
				document.getElementsByClassName("Subjectsdiagnose")[0].getElementsByClassName("choose-area-midle1")[0].style.background="#fff";
				document.getElementsByClassName("Subjectsdiagnose")[0].getElementsByClassName("choose-area-midle1")[0].style.color="#53CDD6";
				document.getElementsByClassName("Subjectsdiagnose")[0].getElementsByClassName("choose-area-right1")[0].style.background="#fff";
				document.getElementsByClassName("Subjectsdiagnose")[0].getElementsByClassName("choose-area-right1")[0].style.color="#53CDD6";
				e.currentTarget.style.background="#53CDD6";
				e.currentTarget.style.color="#fff";
				if(num=="class"){
					this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id,tab:"STUDENT_REPORT",range:'CLASS'},'score/geReportCards',function(obj,res){
						if(res.code == '10000'){
							var type=(typeof res.result);
							if(type=="string"){
							}else{
								if(obj.basicData.subject=="总分"){
									obj.optionSubjectsDiagnosis.xAxis[0].data=[];
									obj.optionSubjectsDiagnosis.xAxis[0].data=res.result.subjectList;
									obj.optionSubjectsDiagnosis.series[0].data=[];
									obj.optionSubjectsDiagnosis.series[0].data=res.result.standardScoreList;
									obj.optionSubjectsDiagnosis.series[0].markLine.data[0].yAxis=res.result.standardScoreList[0];
									obj.optionSubjectsDiagnosisRight.series[0].data[0].value=[];
									obj.optionSubjectsDiagnosisRight.series[0].data[1].value=[];
									obj.optionSubjectsDiagnosisRight.series[0].data[0].value=res.result.stuScoreList;
									obj.optionSubjectsDiagnosisRight.series[0].data[1].value=res.result.classAvgScoreList;
									obj.optionSubjectsDiagnosisRight.radar[0].indicator=[];
									for(var i=0;i<res.result.subjectList.length;i++){
										var arr={
											"text":res.result.subjectList[i],
											"max":100,
										}
										obj.optionSubjectsDiagnosisRight.radar[0].indicator.push(arr);
									}
									obj.echarts.init(document.getElementById("subjectsDiagnosis1")).setOption(obj.optionSubjectsDiagnosis);
									obj.echarts.init(document.getElementById("subjectsDiagnosis2")).setOption(obj.optionSubjectsDiagnosisRight);
								}
							}
						}else{
							obj.$toast({message:res.message, position: 'bottom',duration: 5000})
						}
					})
				}
				if(num=="school"){
					this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id,tab:"STUDENT_REPORT",range:'SCHOOL'},'score/geReportCards',function(obj,res){
						if(res.code == '10000'){
							var type=(typeof res.result);
							if(type=="string"){
							}else{
								if(obj.basicData.subject=="总分"){
									obj.optionSubjectsDiagnosis.xAxis[0].data=[];
									obj.optionSubjectsDiagnosis.xAxis[0].data=res.result.subjectList;
									obj.optionSubjectsDiagnosis.series[0].data=[];
									obj.optionSubjectsDiagnosis.series[0].data=res.result.standardScoreList;
									obj.optionSubjectsDiagnosis.series[0].markLine.data[0].yAxis=res.result.standardScoreList[0];
									obj.optionSubjectsDiagnosisRight.series[0].data[0].value=[];
									obj.optionSubjectsDiagnosisRight.series[0].data[1].value=[];
									obj.optionSubjectsDiagnosisRight.series[0].data[0].value=res.result.stuScoreList;
									obj.optionSubjectsDiagnosisRight.series[0].data[1].value=res.result.classAvgScoreList;
									obj.optionSubjectsDiagnosisRight.radar[0].indicator=[];
									for(var i=0;i<res.result.subjectList.length;i++){
										var arr={
											"text":res.result.subjectList[i],
											"max":100,
										}
										obj.optionSubjectsDiagnosisRight.radar[0].indicator.push(arr);
									}
									obj.echarts.init(document.getElementById("subjectsDiagnosis1")).setOption(obj.optionSubjectsDiagnosis);
									obj.echarts.init(document.getElementById("subjectsDiagnosis2")).setOption(obj.optionSubjectsDiagnosisRight);
								}
							}
						}else{
							obj.$toast({message:res.message, position: 'bottom',duration: 5000})
						}
					})
				}
				if(num=="area"){
					this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id,tab:"STUDENT_REPORT",range:'REGION'},'score/geReportCards',function(obj,res){
						if(res.code == '10000'){
							var type=(typeof res.result);
							if(type=="string"){
							}else{
								if(obj.basicData.subject=="总分"){
									obj.optionSubjectsDiagnosis.xAxis[0].data=[];
									obj.optionSubjectsDiagnosis.xAxis[0].data=res.result.subjectList;
									obj.optionSubjectsDiagnosis.series[0].data=[];
									obj.optionSubjectsDiagnosis.series[0].data=res.result.standardScoreList;
									obj.optionSubjectsDiagnosis.series[0].markLine.data[0].yAxis=res.result.standardScoreList[0];
									obj.optionSubjectsDiagnosisRight.series[0].data[0].value=[];
									obj.optionSubjectsDiagnosisRight.series[0].data[1].value=[];
									obj.optionSubjectsDiagnosisRight.series[0].data[0].value=res.result.stuScoreList;
									obj.optionSubjectsDiagnosisRight.series[0].data[1].value=res.result.classAvgScoreList;
									obj.optionSubjectsDiagnosisRight.radar[0].indicator=[];
									for(var i=0;i<res.result.subjectList.length;i++){
										var arr={
											"text":res.result.subjectList[i],
											"max":100,
										}
										obj.optionSubjectsDiagnosisRight.radar[0].indicator.push(arr);
									}
									obj.echarts.init(document.getElementById("subjectsDiagnosis1")).setOption(obj.optionSubjectsDiagnosis);
									obj.echarts.init(document.getElementById("subjectsDiagnosis2")).setOption(obj.optionSubjectsDiagnosisRight);
								}
							}
						}else{
							obj.$toast({message:res.message, position: 'bottom',duration: 5000})
						}
					})
				}

			},
			chooseSubject1Other:function(e,num){
				document.getElementsByClassName("allItem")[0].getElementsByClassName("choose-area-left1-other")[0].style.background="#fff";
				document.getElementsByClassName("allItem")[0].getElementsByClassName("choose-area-left1-other")[0].style.color="#7FDC7F";
				document.getElementsByClassName("allItem")[0].getElementsByClassName("choose-area-midle1-other")[0].style.background="#fff";
				document.getElementsByClassName("allItem")[0].getElementsByClassName("choose-area-midle1-other")[0].style.color="#7FDC7F";
				document.getElementsByClassName("allItem")[0].getElementsByClassName("choose-area-right1-other")[0].style.background="#fff";
				document.getElementsByClassName("allItem")[0].getElementsByClassName("choose-area-right1-other")[0].style.color="#7FDC7F";
				e.currentTarget.style.background="#7FDC7F";
				e.currentTarget.style.color="#fff";
				if(num=="class"){
					this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id},'/testAnalysis',function(obj,res){
						if(res.code == '10000'){
							obj.optionScoreQuestion.xAxis[0].data=[];
							obj.optionScoreQuestion.series[0].data=[];
							obj.optionScoreQuestion.series[1].data=[];
							for(var i=0;i<res.result.listVO.length;i++){
								obj.optionScoreQuestion.xAxis[0].data.push(res.result.listVO[i].qid);
								obj.optionScoreQuestion.series[0].data.push(parseFloat(res.result.listVO[i].divideStudent));
								obj.optionScoreQuestion.series[1].data.push(parseFloat(res.result.listVO[i].divideClass));
							}
							obj.optionScoreQuestion.legend.data=['我的得分率','班级得分率'];
							obj.optionScoreQuestion.series[1].name="班级得分率";
							obj.echarts.init(document.getElementById("allItem1")).setOption(obj.optionScoreQuestion);
						}else{
							obj.$toast({message:res.message, position: 'bottom',duration: 5000})
						}
					});
				}
				if(num=="school"){
					this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id},'/testAnalysis',function(obj,res){
						if(res.code == '10000'){
							obj.optionScoreQuestion.xAxis[0].data=[];
							obj.optionScoreQuestion.series[0].data=[];
							obj.optionScoreQuestion.series[1].data=[];
							for(var i=0;i<res.result.listVO.length;i++){
								obj.optionScoreQuestion.xAxis[0].data.push(res.result.listVO[i].qid);
								obj.optionScoreQuestion.series[0].data.push(parseFloat(res.result.listVO[i].divideStudent));
								obj.optionScoreQuestion.series[1].data.push(parseFloat(res.result.listVO[i].divideSchool));
							}
							obj.optionScoreQuestion.legend.data=['我的得分率','校级得分率'];
							obj.optionScoreQuestion.series[1].name="校级得分率";
							obj.echarts.init(document.getElementById("allItem1")).setOption(obj.optionScoreQuestion);
						}else{
							obj.$toast({message:res.message, position: 'bottom',duration: 5000})
						}
					});
				}
				if(num=="area"){
					this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id},'/testAnalysis',function(obj,res){
						if(res.code == '10000'){
							obj.optionScoreQuestion.xAxis[0].data=[];
							obj.optionScoreQuestion.series[0].data=[];
							obj.optionScoreQuestion.series[1].data=[];
							for(var i=0;i<res.result.listVO.length;i++){
								obj.optionScoreQuestion.xAxis[0].data.push(res.result.listVO[i].qid);
								obj.optionScoreQuestion.series[0].data.push(parseFloat(res.result.listVO[i].divideStudent));
								obj.optionScoreQuestion.series[1].data.push(parseFloat(res.result.listVO[i].divideAera));
							}
							obj.optionScoreQuestion.legend.data=['我的得分率','地区级得分率'];
							obj.optionScoreQuestion.series[1].name="地区级得分率";
							obj.echarts.init(document.getElementById("allItem1")).setOption(obj.optionScoreQuestion);
						}else{
							obj.$toast({message:res.message, position: 'bottom',duration: 5000})
						}
					});
				}
			},
			chooseTwoArea:function(e,num){
				document.getElementsByClassName("twoAnalysis")[0].getElementsByClassName("body-icon-color-other")[0].className="body-icon-color-other";
				document.getElementsByClassName("twoAnalysis")[0].getElementsByClassName("body-icon-color-other")[1].className="body-icon-color-other";
				document.getElementsByClassName("twoAnalysis")[0].getElementsByClassName("body-icon-color-other")[2].className="body-icon-color-other";
				e.currentTarget.getElementsByClassName("body-icon-color-other")[0].className+=" color-blue-other";
				var number1=0;
				var number2=0;
				if(this.basicData.twoType1=="easy"){
					number1=0.1;
					number2=0.4;
				}
				if(this.basicData.twoType1=="middle"){
					number1=0.4;
					number2=0.7;
				}
				if(this.basicData.twoType1=="difficult"){
					number1=0.7;
					number2=1.0;
				}
				if(num=="class"){
					this.basicData.twoType="class";
					this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id},'/testAnalysis',function(obj,res){
						if(res.code == '10000'){
							obj.optionTwoDimensionalAnalysis.xAxis[0].min=number1;
							obj.optionTwoDimensionalAnalysis.xAxis[0].max=number2;
							obj.optionTwoDimensionalAnalysis.series[0].data=[];
							obj.optionTwoDimensionalAnalysis.series[1].data=[];
							for(var i=0;i<res.result.listVO.length;i++){
								if(res.result.listVO[i].difficulty>=number1 && res.result.listVO[i].difficulty<=number2){
									if(parseFloat(res.result.listVO[i].divideStudentToClass)>=0){
										var list=[];
										list.push(res.result.listVO[i].difficulty);
										list.push(parseFloat(res.result.listVO[i].divideStudentToClass));
										list.push(res.result.listVO[i].topic);
										list.push(parseFloat(res.result.listVO[i].fractionalValue));
										list.push(parseFloat(res.result.listVO[i].qid));
										obj.optionTwoDimensionalAnalysis.series[0].data.push(list);
									}else{
										var list1=[];
										list1.push(res.result.listVO[i].difficulty);
										list1.push(parseFloat(res.result.listVO[i].divideStudentToClass));
										list1.push(res.result.listVO[i].topic);
										list1.push(parseFloat(res.result.listVO[i].fractionalValue));
										list1.push(parseFloat(res.result.listVO[i].qid));
										obj.optionTwoDimensionalAnalysis.series[1].data.push(list1);
									}
								}
							}
							obj.echarts.init(document.getElementById("twoAnalysis1")).setOption(obj.optionTwoDimensionalAnalysis);
						}else{
							obj.$toast({message:res.message, position: 'bottom',duration: 5000})
						}
					});
				}
				if(num=="school"){
					this.basicData.twoType="school";
					this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id},'/testAnalysis',function(obj,res){
						if(res.code == '10000'){
							obj.optionTwoDimensionalAnalysis.xAxis[0].min=number1;
							obj.optionTwoDimensionalAnalysis.xAxis[0].max=number2;
							obj.optionTwoDimensionalAnalysis.series[0].data=[];
							obj.optionTwoDimensionalAnalysis.series[1].data=[];
							for(var i=0;i<res.result.listVO.length;i++){
								if(res.result.listVO[i].difficulty>=number1 && res.result.listVO[i].difficulty<=number2){
									if(parseFloat(res.result.listVO[i].divideStudentToSchool)>=0){
										var list=[];
										list.push(res.result.listVO[i].difficulty);
										list.push(parseFloat(res.result.listVO[i].divideStudentToSchool));
										list.push(res.result.listVO[i].topic);
										list.push(parseFloat(res.result.listVO[i].fractionalValue));
										list.push(parseFloat(res.result.listVO[i].qid));
										obj.optionTwoDimensionalAnalysis.series[0].data.push(list);
									}else{
										var list1=[];
										list1.push(res.result.listVO[i].difficulty);
										list1.push(parseFloat(res.result.listVO[i].divideStudentToSchool));
										list1.push(res.result.listVO[i].topic);
										list1.push(parseFloat(res.result.listVO[i].fractionalValue));
										list1.push(parseFloat(res.result.listVO[i].qid));
										obj.optionTwoDimensionalAnalysis.series[1].data.push(list1);
									}
								}
							}
							obj.echarts.init(document.getElementById("twoAnalysis1")).setOption(obj.optionTwoDimensionalAnalysis);
						}else{
							obj.$toast({message:res.message, position: 'bottom',duration: 5000})
						}
					});
				}
				if(num=="area"){
					this.basicData.twoType="area";
					this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id},'/testAnalysis',function(obj,res){
						if(res.code == '10000'){
							obj.optionTwoDimensionalAnalysis.xAxis[0].min=number1;
							obj.optionTwoDimensionalAnalysis.xAxis[0].max=number2;
							obj.optionTwoDimensionalAnalysis.series[0].data=[];
							obj.optionTwoDimensionalAnalysis.series[1].data=[];
							for(var i=0;i<res.result.listVO.length;i++){
								if(res.result.listVO[i].difficulty>=number1 && res.result.listVO[i].difficulty<=number2){
									if(parseFloat(res.result.listVO[i].divideStudentToArea)>=0){
										var list=[];
										list.push(res.result.listVO[i].difficulty);
										list.push(parseFloat(res.result.listVO[i].divideStudentToArea));
										list.push(res.result.listVO[i].topic);
										list.push(parseFloat(res.result.listVO[i].fractionalValue));
										list.push(parseFloat(res.result.listVO[i].qid));
										obj.optionTwoDimensionalAnalysis.series[0].data.push(list);
									}else{
										var list1=[];
										list1.push(res.result.listVO[i].difficulty);
										list1.push(parseFloat(res.result.listVO[i].divideStudentToArea));
										list1.push(res.result.listVO[i].topic);
										list1.push(parseFloat(res.result.listVO[i].fractionalValue));
										list1.push(parseFloat(res.result.listVO[i].qid));
										obj.optionTwoDimensionalAnalysis.series[1].data.push(list1);
									}
								}
							}
							obj.echarts.init(document.getElementById("twoAnalysis1")).setOption(obj.optionTwoDimensionalAnalysis);
						}else{
							obj.$toast({message:res.message, position: 'bottom',duration: 5000})
						}
					});
				}
					//this.echarts.init(document.getElementById("twoAnalysis1")).setOption(this.optionTwoDimensionalAnalysis);
				},
				choosetwoAnalysis:function(e,num){
					document.getElementsByClassName("twoAnalysis")[0].getElementsByClassName("difficultChoose-left")[0].style.background="#fff";
					document.getElementsByClassName("twoAnalysis")[0].getElementsByClassName("difficultChoose-left")[0].style.color="#53CDD6";
					document.getElementsByClassName("twoAnalysis")[0].getElementsByClassName("difficultChoose-middle")[0].style.background="#fff";
					document.getElementsByClassName("twoAnalysis")[0].getElementsByClassName("difficultChoose-middle")[0].style.color="#53CDD6";
					document.getElementsByClassName("twoAnalysis")[0].getElementsByClassName("difficultChoose-right")[0].style.background="#fff";
					document.getElementsByClassName("twoAnalysis")[0].getElementsByClassName("difficultChoose-right")[0].style.color="#53CDD6";
					e.currentTarget.style.background="#53CDD6";
					e.currentTarget.style.color="#fff";
					var number1=0;
					var number2=0;
					if(num=="easy"){
						this.basicData.twoType1="easy";
						number1=0.1;
						number2=0.4;
						//this.echarts.init(document.getElementById("twoAnalysis1")).setOption(this.optionTwoDimensionalAnalysis);
					}
					if(num=="middle"){
						this.basicData.twoType1="middle";
						number1=0.4;
						number2=0.7;
						//this.echarts.init(document.getElementById("twoAnalysis1")).setOption(this.optionTwoDimensionalAnalysis);
					}
					if(num=="difficult"){
						this.basicData.twoType1="difficult";
						number1=0.7;
						number2=1.0;
						//this.echarts.init(document.getElementById("twoAnalysis1")).setOption(this.optionTwoDimensionalAnalysis);
					}
					if(this.basicData.twoType=="class"){
						this.basicData.twoType="class";
						this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id},'/testAnalysis',function(obj,res){
							if(res.code == '10000'){
								obj.optionTwoDimensionalAnalysis.xAxis[0].min=number1;
								obj.optionTwoDimensionalAnalysis.xAxis[0].max=number2;
								obj.optionTwoDimensionalAnalysis.series[0].data=[];
								obj.optionTwoDimensionalAnalysis.series[1].data=[];
								for(var i=0;i<res.result.listVO.length;i++){
									if(res.result.listVO[i].difficulty>=number1 && res.result.listVO[i].difficulty<=number2){
										if(parseFloat(res.result.listVO[i].divideStudentToClass)>=0){
											var list=[];
											list.push(res.result.listVO[i].difficulty);
											list.push(parseFloat(res.result.listVO[i].divideStudentToClass));
											list.push(res.result.listVO[i].topic);
											list.push(parseFloat(res.result.listVO[i].fractionalValue));
											list.push(parseFloat(res.result.listVO[i].qid));
											obj.optionTwoDimensionalAnalysis.series[0].data.push(list);
										}else{
											var list1=[];
											list1.push(res.result.listVO[i].difficulty);
											list1.push(parseFloat(res.result.listVO[i].divideStudentToClass));
											list1.push(res.result.listVO[i].topic);
											list1.push(parseFloat(res.result.listVO[i].fractionalValue));
											list1.push(parseFloat(res.result.listVO[i].qid));
											obj.optionTwoDimensionalAnalysis.series[1].data.push(list1);
										}
									}
								}
								obj.echarts.init(document.getElementById("twoAnalysis1")).setOption(obj.optionTwoDimensionalAnalysis);
							}else{
								obj.$toast({message:res.message, position: 'bottom',duration: 5000})
							}
						});
					}
					if(this.basicData.twoType=="school"){
						this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id},'/testAnalysis',function(obj,res){
							if(res.code == '10000'){
								obj.optionTwoDimensionalAnalysis.xAxis[0].min=number1;
								obj.optionTwoDimensionalAnalysis.xAxis[0].max=number2;
								obj.optionTwoDimensionalAnalysis.series[0].data=[];
								obj.optionTwoDimensionalAnalysis.series[1].data=[];
								for(var i=0;i<res.result.listVO.length;i++){
									if(res.result.listVO[i].difficulty>=number1 && res.result.listVO[i].difficulty<=number2){
										if(parseFloat(res.result.listVO[i].divideStudentToSchool)>=0){
											var list=[];
											list.push(res.result.listVO[i].difficulty);
											list.push(parseFloat(res.result.listVO[i].divideStudentToSchool));
											list.push(res.result.listVO[i].topic);
											list.push(parseFloat(res.result.listVO[i].fractionalValue));
											list.push(parseFloat(res.result.listVO[i].qid));
											obj.optionTwoDimensionalAnalysis.series[0].data.push(list);
										}else{
											var list1=[];
											list1.push(res.result.listVO[i].difficulty);
											list1.push(parseFloat(res.result.listVO[i].divideStudentToSchool));
											list1.push(res.result.listVO[i].topic);
											list1.push(parseFloat(res.result.listVO[i].fractionalValue));
											list1.push(parseFloat(res.result.listVO[i].qid));
											obj.optionTwoDimensionalAnalysis.series[1].data.push(list1);
										}
									}
								}
								obj.echarts.init(document.getElementById("twoAnalysis1")).setOption(obj.optionTwoDimensionalAnalysis);
							}else{
								obj.$toast({message:res.message, position: 'bottom',duration: 5000})
							}
						});
					}
					if(this.basicData.twoType=="area"){
						this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id},'/testAnalysis',function(obj,res){
							if(res.code == '10000'){
								obj.optionTwoDimensionalAnalysis.xAxis[0].min=number1;
								obj.optionTwoDimensionalAnalysis.xAxis[0].max=number2;
								obj.optionTwoDimensionalAnalysis.series[0].data=[];
								obj.optionTwoDimensionalAnalysis.series[1].data=[];
								for(var i=0;i<res.result.listVO.length;i++){
									if(res.result.listVO[i].difficulty>=number1 && res.result.listVO[i].difficulty<=number2){
										if(parseFloat(res.result.listVO[i].divideStudentToArea)>=0){
											var list=[];
											list.push(res.result.listVO[i].difficulty);
											list.push(parseFloat(res.result.listVO[i].divideStudentToArea));
											list.push(res.result.listVO[i].topic);
											list.push(parseFloat(res.result.listVO[i].fractionalValue));
											list.push(parseFloat(res.result.listVO[i].qid));
											obj.optionTwoDimensionalAnalysis.series[0].data.push(list);
										}else{
											var list1=[];
											list1.push(res.result.listVO[i].difficulty);
											list1.push(parseFloat(res.result.listVO[i].divideStudentToArea));
											list1.push(res.result.listVO[i].topic);
											list1.push(parseFloat(res.result.listVO[i].fractionalValue));
											list1.push(parseFloat(res.result.listVO[i].qid));
											obj.optionTwoDimensionalAnalysis.series[1].data.push(list1);
										}
									}
								}
								obj.echarts.init(document.getElementById("twoAnalysis1")).setOption(obj.optionTwoDimensionalAnalysis);
							}else{
								obj.$toast({message:res.message, position: 'bottom',duration: 5000})
							}
						});
					}
				},
			}
		}
		</script>
		<style>
		#grade{
			overflow: hidden;
			margin-top: 45px
		}	
		#grade .grade-nav{
			width: 100%;
			height: 48px;
		}
		#grade .grade-nav-bit{
			width: 11%;
			height: 100%;
			margin-left: 5%;
			float: left;
		}
		#grade .grade-nav-bit1{
			width: 70%;
			height: 100%;
			margin-left: 5%;
			float: left;
		}
		#grade .grade-nav-bit p{
			text-align: center;
			line-height: 45px;
		}
		#grade .grade-nav-bit1 p{
			line-height: 45px;
		}
		#grade .grade-navMore{
			height: 100%;
			width: 15%;
			float: right;
		}
		#grade .navOn{
			border-bottom: 2px solid #19AFFF;
		}
		#grade .grade-navMore-bit{
			width: 100%;
			height: 80%;
			margin-top: 5px;
			border-left:1px solid #C4C4C4;
			text-align: center;
		}
		#grade .grade-navMore-bit .grade-navMore-bitImg{
			margin-top:10px;
			transform:rotate(-90deg);
			-ms-transform:rotate(-90deg); 	/* IE 9 */
			-moz-transform:rotate(-90deg); 	/* Firefox */
			-webkit-transform:rotate(-90deg); /* Safari 和 Chrome */
			-o-transform:rotate(-90deg); 	/* Opera */
		}
		#grade .grade-navMore-bit .grade-navMore-bitImg1{
			margin-top:10px;
			transform:rotate(90deg);
			-ms-transform:rotate(90deg); 	/* IE 9 */
			-moz-transform:rotate(90deg); 	/* Firefox */
			-webkit-transform:rotate(90deg); /* Safari 和 Chrome */
			-o-transform:rotate(90deg); 	/* Opera */
		}
		#grade .grade-nav-more{
			width: 100%;
			height: auto;
			position: fixed;
			background-color: rgb(245, 245, 245);
			z-index: 99;
		}
		#grade .Gnav-moreConment{
			width: 85%;
			margin: auto
		}
		#grade .black-cell{
			width: 100%;
			position: fixed;
			z-index: 98;
			background-color: rgba(0,0,0,0.4);
		}
		#grade .Gnav-moreConment-bit{
			width: 20%;
			height: 40px;
			margin-right: 5%;
			margin-top: 10px;
			float: left;
		}
		#grade .Gnav-moreConment-bit p{
			text-align: center;
			margin-top: 10px;
		}
		#grade .grade-body{
			width: 100%;
			margin-top: -58px;
		}
		#grade .grade-body .totle{
			width: 100%;
			background-color: #FFD600;
			overflow: hidden;
		}
		#grade .beyondRate{
			width: 100%;
			background-color: #F2BB4B;
			overflow: hidden;
		}
		#grade .growth{
			width: 100%;
			background-color: #7FDC7F;
			overflow: hidden;	
		}
		#grade .Subjectsdiagnose{
			width: 100%;
			background-color: #53CDD6;
			overflow: hidden;	
		}
		#grade .myGoal{
			width: 100%;
			background-color: #6380DD;
			overflow: hidden;	
		}
		#grade .allItem{
			width: 100%;
			background-color: #7FDC7F;
			overflow: hidden;	
		}
		#grade .twoAnalysis{
			width: 100%;
			background-color: #53CDD6;
			overflow: hidden;	
		}
		#grade .knowledgeAnalysis{
			width: 100%;
			background-color: #829AE9;
			overflow: hidden;
		}
		#grade .abilityAnalyze{
			width: 100%;
			background-color: #E98296;
			overflow: hidden;
		}
		#grade .totle-conment{
			width: 94%;
			margin: auto;
			margin-top: 90px;
			margin-bottom: 10px;
			background-color: #fff;
			border-radius: 3px;
			overflow: hidden;
		}
		#grade .totle-conment-title{
			text-align: center;
			margin-top: 10px;
			margin-bottom: 10px;
		}
		#grade .totle-conment-body{
			width: 90%;
			margin: auto;
		}
		#grade .totle-conment-bodyHeader{
			height: 30px;
			background-color: #FFD600;
		}
		#grade .totle-conment-body th{
			width: 25%;
		}
		#grade table.gridtable {
			font-family: verdana,arial,sans-serif;
			font-size:11px;
			color:#333333;
			border-collapse: collapse;
			width: 100%;
		}
		#grade table.gridtable th {
			padding: 8px 19px;
			background-color: #FFD600;
			font-size: 0.75rem;
			color: #3E3E3E;
		}
		#grade table.gridtable td {
			text-align: center;
			padding: 5px 0;
			border-top: 1px solid #FFD600;
		}
		#grade .totle-img{
			width: 100%;
			position: absolute;
			height: 90px;
			overflow: hidden;
		}
		#grade .beyondRate-title{
			text-align: center;
		}
		#grade .body-icon{
			width: 235px;
			margin: auto;
		}
		#grade .body-icon-color{
			width: 15px;
			height: 15px;
			margin-top: 3px;
			float: left;
		}
		#grade .body-icon-bit{
			margin-left:20px;
			float: left;
		}
		#grade .body-icon-bit p{
			margin-left: 5px;
			float: left;
		}
		#grade .color-blue{
			background: #F3BB4B;
		}
		#grade .color-green{
			background: #ACD46A;
		}
		#grade .color-red{
			background: #5CC8B3;
		}
		#grade .body-icon-other{
			width: 235px;
			margin: auto;
		}
		#grade .body-icon-color-other{
			width: 15px;
			height: 15px;
			margin-top: 3px;
			float: left;
			border: 1px solid #53CDD6;
		}
		#grade .body-icon-bit-other{
			margin-left:20px;
			float: left;
		}
		#grade .body-icon-bit-other p{
			margin-left: 5px;
			float: left;
		}
		#grade .color-blue-other{
			background: #53CDD6;
		}
		#grade .beyondRate #beyondRate1{
			width: 100%;
			height: 300px;
			margin: auto;
		}
		#grade .choose-area{
			width: 185px;
			margin: auto;
		}
		#grade .choose-area-left{
			width: 60px;
			height:30px;
			border:1px solid #7FDC7F;
			text-align: center;
			float: left;
			border-radius: 100px 0 0 100px;
			color: #fff;
			background: #7FDC7F;
		}
		#grade .choose-area-left p{
			line-height:30px;
			font-size: 0.75rem;
		}
		#grade .choose-area-midle{
			width: 60px;
			height:30px;
			border-top:1px solid #7FDC7F;
			border-bottom:1px solid #7FDC7F;
			text-align: center;
			float: left;
			color: #7FDC7F;
		}
		#grade .choose-area-midle p{
			line-height: 30px;
			font-size: 0.75rem;
		}
		#grade .choose-area-right{
			width: 60px;
			height:30px;
			border:1px solid #7FDC7F;
			text-align: center;
			float: left;
			border-radius: 0 100px 100px 0;
			color: #7FDC7F;
		}
		#grade .choose-area-right p{
			line-height: 30px;
			font-size: 0.75rem;
		}
		#grade #growthTrend1{
			width: 100%;
			height: 300px;
		}
		#grade .choose-area1{
			width: 185px;
			margin: auto;
		}
		#grade .choose-area-left1{
			width: 60px;
			height:30px;
			border:1px solid #53CDD6;
			text-align: center;
			float: left;
			border-radius: 100px 0 0 100px;
			color: #fff;
			background: #53CDD6;
		}
		#grade .choose-area-left1 p{
			line-height:30px;
			font-size: 0.75rem;
		}
		#grade .choose-area-midle1{
			width: 60px;
			height:30px;
			border-top:1px solid #53CDD6;
			border-bottom:1px solid #53CDD6;
			text-align: center;
			float: left;
			color: #53CDD6;
		}
		#grade .choose-area-midle1 p{
			line-height: 30px;
			font-size: 0.75rem;
		}
		#grade .choose-area-right1{
			width: 60px;
			height:30px;
			border:1px solid #53CDD6;
			text-align: center;
			float: left;
			border-radius: 0 100px 100px 0;
			color: #53CDD6;
		}
		#grade .choose-area-right1 p{
			line-height: 30px;
			font-size: 0.75rem;
		}
		#grade .choose-area1-other{
			width: 245px;
			margin: auto;
		}
		#grade .choose-area-left1-other{
			width: 80px;
			height:30px;
			border:1px solid #7FDC7F;
			text-align: center;
			float: left;
			border-radius: 100px 0 0 100px;
			color: #fff;
			background: #7FDC7F;
		}
		#grade .choose-area-left1-other p{
			line-height:30px;
			font-size: 0.75rem;
		}
		#grade .choose-area-midle1-other{
			width: 80px;
			height:30px;
			border-top:1px solid #7FDC7F;
			border-bottom:1px solid #7FDC7F;
			text-align: center;
			float: left;
			color: #7FDC7F;
		}
		#grade .choose-area-midle1-other p{
			line-height: 30px;
			font-size: 0.75rem;
		}
		#grade .choose-area-right1-other{
			width: 80px;
			height:30px;
			border:1px solid #7FDC7F;
			text-align: center;
			float: left;
			border-radius: 0 100px 100px 0;
			color: #7FDC7F;
		}
		#grade .choose-area-right1-other p{
			line-height: 30px;
			font-size: 0.75rem;
		}
		#grade #subjectsDiagnosis1{
			width: 100%;
			height: 350px;
		}
		#grade #subjectsDiagnosis2{
			width: 100%;
			height: 350px;
		}
		#grade .Subjectsdiagnose-foot{
			width: 90%;
			margin: auto;
		}
		#grade .Subjectsdiagnose-foot p{
			font-size: 0.75rem;
			color: #3D3D3D;
			letter-spacing: 0;
			line-height: 20px;
			text-align:justify;
		}
		#grade .myGoaltitle{
			width: 90%;
			height: 70px;
			margin: auto;
			border-radius: 3px;
			background-color: #6380DD;
			margin-bottom: 10px;
		}
		#grade .myGoaltitle-bit{
			width: 33%;
			height: 100%;
			float: left;
		}
		#grade .myGoaltitle-bit p{
			text-align: center;
			margin-top: 12px;
			font-size: 0.75rem;
			color: #FFFFFF;
		}
		#grade .myGoal #myGoal1{
			width: 100%;
			height: 300px;
			margin-bottom: 10px;
		}
		#grade .allItem #allItem1{
			width: 100%;
			height: 300px;
			margin-bottom: 10px;
		}
		#grade .twoAnalysis #twoAnalysis1{
			width: 100%;
			height: 300px;
			margin-bottom: 10px;
		}
		#grade .difficultChoose{
			width: 75%;
			margin: auto;
		}
		#grade .difficultChoose-bit{
			width: 32%;
			height: 30px;
			float: left;
		}
		#grade .difficultChoose-bit p{
			text-align: center;
			line-height: 30px;
			font-size: 0.75rem;
		}
		#grade .difficultChoose-left{
			border: 1px solid #53CDD6;
			background-color: #53CDD6;
			color: #fff;
		}
		#grade .difficultChoose-middle{
			border-top: 1px solid #53CDD6;
			border-bottom: 1px solid #53CDD6;
			color: #53CDD6;
		}
		#grade .difficultChoose-right{
			border: 1px solid #53CDD6;
			color: #53CDD6;	
		}
		#grade .mt10{
			margin-top: 10px;
		}
		#grade .knowledgeAnalysis #knowledgeAnalysis1{
			width: 100%;
			height: 280px;
			margin-bottom: 10px;
		}
		#grade .knowledgeNutton{
			width: 120px;
			height: 30px;
			margin: auto;
			background-color: #D06BE0;
			text-align: center;
			line-height: 30px;
			border-radius: 3px;
			margin-bottom: 20px;
		}
		#grade .knowledgeNutton p{
			font-size: 0.75rem;
			color: #FFFFFF;
		}
		#grade .abilityAnalyze #abilityAnalyze1{
			width: 100%;
			height: 280px;
			margin-bottom: 10px;
		}
		#grade .abilityNutton{
			width: 120px;
			height: 30px;
			margin: auto;
			background-color: #FF3C63;
			text-align: center;
			line-height: 30px;
			border-radius: 3px;
			margin-bottom: 20px;
		}
		#grade .abilityNutton p{
			font-size: 0.75rem;
			color: #FFFFFF;
		}
		</style>