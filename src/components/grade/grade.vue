<template>
	<div id="grade">
		<div class="grade-nav">
			<div v-show="display.subject" ref="fristBit" v-for="item in subjectLsit" :data-id="item.id" class="grade-nav-bit" @click="subjectButton($event)">
				<p>{{item.name}}</p>
			</div>
			<div v-show="display.allSubject" class="grade-nav-bit1">
				<p>全部分类</p>
			</div>
			<div class="grade-navMore">
				<div class="grade-navMore-bit">
					<span @click="allButton($event)"><img class="grade-navMore-bitImg" src="../../../static/img/APPImg/gfh@1x.png" alt=""></span>
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
			<div class="black-cell" ref="loginHight" @touchend="colse($event)"></div>
		</div>
		<div class="grade-body">
			<div class="totle" v-show="display.totle">
				<div class="totle-img">
					<img src="../../../static/img/z1-1@1x.png">
				</div>
				<div class="totle-conment">
					<div class="totle-conment-title">
						<p>总分：550分</p>
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
								<td>平均分</td>
								<td>440</td>
								<td>380</td>
								<td>360</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<div class="beyondRate" v-show="display.beyondRate">
				<div class="totle-img">
					<img src="../../../static/img/z2-1@1x.png">
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
					<img src="../../../static/img/z3-1@1x.png">
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
					<img src="../../../static/img/z4-1@1x.png">
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
					<img src="../../../static/img/z5-1@1x.png">
				</div>
				<div class="totle-conment">
					<div class="totle-conment-title">
						<p>我的目标：下次考试可以增加？分</p>
					</div>
					<div class="myGoaltitle">
						<div class="myGoaltitle-bit">
							<p>简单题得分</p>
							<p>17</p>
						</div>
						<div class="myGoaltitle-bit">
							<p>中等题得分</p>
							<p>30</p>
						</div>
						<div class="myGoaltitle-bit">
							<p>难题得分</p>
							<p>4</p>
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
					<img src="../../../static/img/z6-1@1x.png">
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
					<img src="../../../static/img/z7-1@1x.png">
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
					<img src="../../../static/img/z8-1@1x.png">
				</div>
				<div class="totle-conment">
					<div class="totle-conment-title">
						<p>知识点分析</p>
					</div>
					<div id="knowledgeAnalysis1"></div>
					<div class="knowledgeNutton">
						<p>知识点诊断</p>
					</div>
				</div>
			</div>
			<div class="abilityAnalyze" v-show="display.abilityAnalyze">
				<div class="totle-img">
					<img src="../../../static/img/z9-1@1x.png">
				</div>
				<div class="totle-conment">
					<div class="totle-conment-title">
						<p>能力点分析</p>
					</div>
					<div id="abilityAnalyze1"></div>
					<div class="abilityNutton">
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
			optionBeyondRate:{
				tooltip : {
					trigger: 'axis'
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top:'3%',
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
				    	right: '8%',
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
							value: [23,43,54,65,23],
							itemStyle: {normal: {color: '#53CDD6 ',areaStyle: {color: 'rgba(83,205,214,0.3)'}}},
						},
						{
							name:'平均水平',
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
						data:['我的得分率','学校得分率']
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
						name:'学校得分率',
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
				        /*formatter: function (obj) {
				            var value = obj.value;
				            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
				                + '</div>' + "题型" + '：' + value[2] + '<br>'
				                + "题号" + '：' + value[4] + '<br>'
				                + "满分值" + '：' + value[3] + '<br>'
				                + "得分率差距" + '：' + value[5] + '<br>'
				            }*/
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
				    			itemStyle: {normal: {color: '#DE20CE',areaStyle: {color: 'rgba(255,60,98,0.3)'}}},
				    		},
				    		{
				    			name: '班级',
				    			value: [23,43,54,65,23,43,78],
				    			itemStyle: {normal: {color: '#FFD244',areaStyle: {color: 'rgba(83,205,214,0.3)'}}},
				    		},
				    		{
				    			name:'全校',
				    			value:[34,54,56,76,87,53,43],
				    			itemStyle: {normal: {color: '#70CDF3',areaStyle: {color: 'rgba(255,222,85,0.3)'}}},
				    		},{
				    			name:'全区县',
				    			value:[34,34,56,76,87,42,57],
				    			itemStyle: {normal: {color: '#70F390',areaStyle: {color: 'rgba(116,230,114,0.3)'}}},
				    		}
				    		]
				    	}
				    	]
				    },
				}
			},
			created:function(){
				this.$store.commit('newTitle','成绩报告');
				for(var i=0;i<5;i++){
					this.subjectLsit.push(this.subject[i]);
				}

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
				this.$refs.fristBit[0].className+=" navOn";
				let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				this.$refs.loginHight.style.height=h+"px";
				this.echarts.init(document.getElementById("beyondRate1")).setOption(this.optionBeyondRate);
				this.echarts.init(document.getElementById("growthTrend1")).setOption(this.optionGrowthTrend);
				this.echarts.init(document.getElementById("subjectsDiagnosis1")).setOption(this.optionSubjectsDiagnosis);
				this.echarts.init(document.getElementById("subjectsDiagnosis2")).setOption(this.optionSubjectsDiagnosisRight);
				this.echarts.init(document.getElementById("myGoal1")).setOption(this.optionMyGoal);
				this.echarts.init(document.getElementById("allItem1")).setOption(this.optionScoreQuestion);
				this.echarts.init(document.getElementById("twoAnalysis1")).setOption(this.optionTwoDimensionalAnalysis);
				this.echarts.init(document.getElementById("knowledgeAnalysis1")).setOption(this.optionknowledge);
				this.echarts.init(document.getElementById("abilityAnalyze1")).setOption(this.optionabilityAnalyze);
				this.display.totle=true;
				this.display.beyondRate=true;
				this.display.growth=true;
				this.display.Subjectsdiagnose=true;
				this.display.myGoal=true;
				this.display.allItem=false;
				this.display.twoAnalysis=false;
				this.display.knowledgeAnalysis=false;
				this.display.abilityAnalyze=false;
			},
			methods:{
				colse(e){
					document.getElementById("grade").getElementsByClassName("grade-navMore")[0].getElementsByClassName("grade-navMore-bitImg1")[0].className="grade-navMore-bitImg";
					this.display.subject=!this.display.subject;
					this.display.allSubject=!this.display.allSubject;
				},
				subjectButton:function(e){
					for(var i=0;i<e.currentTarget.parentNode.getElementsByClassName("grade-nav-bit").length;i++){
						e.currentTarget.parentNode.getElementsByClassName("grade-nav-bit")[i].className="grade-nav-bit";
					}
					e.currentTarget.className+=" navOn";
					console.log(document.getElementById("myGoal1").offsetWidth);
					if(e.currentTarget.getElementsByTagName("p")[0].innerHTML=="总分"){
						this.display.totle=true;
						this.display.beyondRate=true;
						this.display.growth=true;
						this.display.Subjectsdiagnose=true;
						this.display.myGoal=true;
						this.display.allItem=false;
						this.display.twoAnalysis=false;
						this.display.knowledgeAnalysis=false;
						this.display.abilityAnalyze=false;
					}else{
						this.display.totle=true;
						this.display.beyondRate=true;
						this.display.growth=false;
						this.display.Subjectsdiagnose=false;
						this.display.myGoal=false;
						this.display.allItem=true;
						this.display.twoAnalysis=true;
						this.display.knowledgeAnalysis=true;
						this.display.abilityAnalyze=true;
					}
				},
				subjectButton1:function(e){
					var number=parseInt(e.currentTarget.getAttribute("data-id"));
					if(number==1){
						for(var l=0;l<this.$refs.fristBit.length;l++){
							this.$refs.fristBit[l].className="grade-nav-bit";
						}
						this.$refs.fristBit[0].className+=" navOn";
					}else{
						if(parseInt(e.currentTarget.parentNode.getElementsByClassName("Gnav-moreConment-bit").length)-number<4){
							this.subjectLsit=[];
							for(var i=0;i<4;i++){
								var num=number-1;
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
						}else{
							this.subjectLsit=[];
							for(var i=0;i<4;i++){
								var num=number-1;
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
						}
					}
					this.colse();
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
				chooseSubject:function(e,num){
					document.getElementsByClassName("growth")[0].getElementsByClassName("choose-area-left")[0].style.background="#fff";
					document.getElementsByClassName("growth")[0].getElementsByClassName("choose-area-left")[0].style.color="#7FDC7F";
					document.getElementsByClassName("growth")[0].getElementsByClassName("choose-area-midle")[0].style.background="#fff";
					document.getElementsByClassName("growth")[0].getElementsByClassName("choose-area-midle")[0].style.color="#7FDC7F";
					document.getElementsByClassName("growth")[0].getElementsByClassName("choose-area-right")[0].style.background="#fff";
					document.getElementsByClassName("growth")[0].getElementsByClassName("choose-area-right")[0].style.color="#7FDC7F";
					e.currentTarget.style.background="#7FDC7F";
					e.currentTarget.style.color="#fff";

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
				},
				chooseTwoArea:function(e,num){
					document.getElementsByClassName("twoAnalysis")[0].getElementsByClassName("body-icon-color-other")[0].className="body-icon-color-other";
					document.getElementsByClassName("twoAnalysis")[0].getElementsByClassName("body-icon-color-other")[1].className="body-icon-color-other";
					document.getElementsByClassName("twoAnalysis")[0].getElementsByClassName("body-icon-color-other")[2].className="body-icon-color-other";
					e.currentTarget.getElementsByClassName("body-icon-color-other")[0].className+=" color-blue-other";
					if(num=="class"){
						this.optionTwoDimensionalAnalysis.series[0].data=[[0.2,30,"客观题",5,1],[0.3,30,"客观题",3,2],[0.13,30,"客观题",3,3]];
						this.optionTwoDimensionalAnalysis.series[1].data=[[0.2,-30,"客观题",5,4],[0.23,-30,"客观题",3,5],[0.18,-30,"客观题",3,6]];
					}
					if(num=="school"){
						this.optionTwoDimensionalAnalysis.series[0].data=[[0.2,20,"客观题",5,1],[0.3,10,"客观题",3,2],[0.13,50,"客观题",3,3]];
						this.optionTwoDimensionalAnalysis.series[1].data=[[0.2,-63,"客观题",5,4],[0.23,-34,"客观题",3,5],[0.18,-40,"客观题",3,6]];
					}
					if(num=="area"){
						this.optionTwoDimensionalAnalysis.series[0].data=[[0.2,30,"客观题",5,1],[0.3,34,"客观题",3,2],[0.13,75,"客观题",3,3]];
						this.optionTwoDimensionalAnalysis.series[1].data=[[0.2,-60,"客观题",5,4],[0.23,-80,"客观题",3,5],[0.18,-90,"客观题",3,6]];
					}
					this.echarts.init(document.getElementById("twoAnalysis1")).setOption(this.optionTwoDimensionalAnalysis);
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
					if(num=="easy"){
						this.optionTwoDimensionalAnalysis.xAxis[0].min=0.1;
						this.optionTwoDimensionalAnalysis.xAxis[0].max=0.4;
						this.optionTwoDimensionalAnalysis.series[0].data=[[0.2,30,"客观题",5,1],[0.3,30,"客观题",3,2],[0.13,30,"客观题",3,3]];
						this.optionTwoDimensionalAnalysis.series[1].data=[[0.2,-30,"客观题",5,4],[0.23,-30,"客观题",3,5],[0.18,-30,"客观题",3,6]];
					}
					if(num=="middle"){
						this.optionTwoDimensionalAnalysis.xAxis[0].min=0.4;
						this.optionTwoDimensionalAnalysis.xAxis[0].max=0.7;
						this.optionTwoDimensionalAnalysis.series[0].data=[[0.5,20,"客观题",5,1],[0.6,10,"客观题",3,2],[0.55,50,"客观题",3,3]];
						this.optionTwoDimensionalAnalysis.series[1].data=[[0.5,-63,"客观题",5,4],[0.45,-34,"客观题",3,5],[0.66,-40,"客观题",3,6]];
					}
					if(num=="difficult"){
						this.optionTwoDimensionalAnalysis.xAxis[0].min=0.7;
						this.optionTwoDimensionalAnalysis.xAxis[0].max=1.0;
						this.optionTwoDimensionalAnalysis.series[0].data=[[0.89,30,"客观题",5,1],[0.98,34,"客观题",3,2],[0.73,75,"客观题",3,3]];
						this.optionTwoDimensionalAnalysis.series[1].data=[[0.78,-60,"客观题",5,4],[0.83,-80,"客观题",3,5],[0.78,-90,"客观题",3,6]];
					}
					this.echarts.init(document.getElementById("twoAnalysis1")).setOption(this.optionTwoDimensionalAnalysis);
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
		.grade-nav-bit{
			width: 11%;
			height: 100%;
			margin-left: 5%;
			float: left;
		}
		.grade-nav-bit1{
			width: 70%;
			height: 100%;
			margin-left: 5%;
			float: left;
		}
		.grade-nav-bit p{
			text-align: center;
			line-height: 45px;
		}
		.grade-nav-bit1 p{
			line-height: 45px;
		}
		.grade-navMore{
			height: 100%;
			width: 15%;
			float: right;
		}
		.navOn{
			border-bottom: 2px solid #19AFFF;
		}
		.grade-navMore-bit{
			width: 100%;
			height: 80%;
			margin-top: 5px;
			border-left:1px solid #C4C4C4;
			text-align: center;
		}
		.grade-navMore-bit .grade-navMore-bitImg{
			margin-top:10px;
			transform:rotate(-90deg);
			-ms-transform:rotate(-90deg); 	/* IE 9 */
			-moz-transform:rotate(-90deg); 	/* Firefox */
			-webkit-transform:rotate(-90deg); /* Safari 和 Chrome */
			-o-transform:rotate(-90deg); 	/* Opera */
		}
		.grade-navMore-bit .grade-navMore-bitImg1{
			margin-top:10px;
			transform:rotate(90deg);
			-ms-transform:rotate(90deg); 	/* IE 9 */
			-moz-transform:rotate(90deg); 	/* Firefox */
			-webkit-transform:rotate(90deg); /* Safari 和 Chrome */
			-o-transform:rotate(90deg); 	/* Opera */
		}
		.grade-nav-more{
			width: 100%;
			height: auto;
			position: fixed;
			background-color: rgb(245, 245, 245);
			z-index: 99;
		}
		.Gnav-moreConment{
			width: 85%;
			margin: auto
		}
		.black-cell{
			width: 100%;
			position: fixed;
			z-index: 98;
			background-color: rgba(0,0,0,0.4);
		}
		.Gnav-moreConment-bit{
			width: 20%;
			height: 40px;
			margin-right: 5%;
			margin-top: 10px;
			float: left;
		}
		.Gnav-moreConment-bit p{
			text-align: center;
			margin-top: 10px;
		}
		.grade-body{
			width: 100%;
			margin-top: -58px;
		}
		.grade-body .totle{
			width: 100%;
			background-color: #FFD600;
			overflow: hidden;
		}
		.beyondRate{
			width: 100%;
			background-color: #F2BB4B;
			overflow: hidden;
		}
		.growth{
			width: 100%;
			background-color: #7FDC7F;
			overflow: hidden;	
		}
		.Subjectsdiagnose{
			width: 100%;
			background-color: #53CDD6;
			overflow: hidden;	
		}
		.myGoal{
			width: 100%;
			background-color: #6380DD;
			overflow: hidden;	
		}
		.allItem{
			width: 100%;
			background-color: #7FDC7F;
			overflow: hidden;	
		}
		.twoAnalysis{
			width: 100%;
			background-color: #53CDD6;
			overflow: hidden;	
		}
		.knowledgeAnalysis{
			width: 100%;
			background-color: #829AE9;
			overflow: hidden;
		}
		.abilityAnalyze{
			width: 100%;
			background-color: #E98296;
			overflow: hidden;
		}
		.totle-conment{
			width: 94%;
			margin: auto;
			margin-top: 90px;
			margin-bottom: 10px;
			background-color: #fff;
			border-radius: 3px;
			overflow-y: hidden;
		}
		.totle-conment-title{
			text-align: center;
			margin-top: 10px;
			margin-bottom: 10px;
		}
		.totle-conment-body{
			width: 90%;
			margin: auto;
		}
		.totle-conment-bodyHeader{
			height: 30px;
			background-color: #FFD600;
		}
		.totle-conment-body th{
			width: 25%;
		}
		table.gridtable {
			font-family: verdana,arial,sans-serif;
			font-size:11px;
			color:#333333;
			border-collapse: collapse;
			width: 100%;
		}
		table.gridtable th {
			padding: 8px 19px;
			background-color: #FFD600;
			font-size: 0.75rem;
			color: #3E3E3E;
		}
		table.gridtable td {
			text-align: center;
			padding: 5px 0;
			border-top: 1px solid #FFD600;
		}
		.totle-img{
			width: 100%;
			position: absolute;
			height: 90px;
			overflow: hidden;
		}
		.beyondRate-title{
			text-align: center;
		}
		.body-icon{
			width: 235px;
			margin: auto;
		}
		.body-icon-color{
			width: 15px;
			height: 15px;
			margin-top: 3px;
			float: left;
		}
		.body-icon-bit{
			margin-left:20px;
			float: left;
		}
		.body-icon-bit p{
			margin-left: 5px;
			float: left;
		}
		.color-blue{
			background: #F3BB4B;
		}
		.color-green{
			background: #ACD46A;
		}
		.color-red{
			background: #5CC8B3;
		}
		.body-icon-other{
			width: 235px;
			margin: auto;
		}
		.body-icon-color-other{
			width: 15px;
			height: 15px;
			margin-top: 3px;
			float: left;
			border: 1px solid #53CDD6;
		}
		.body-icon-bit-other{
			margin-left:20px;
			float: left;
		}
		.body-icon-bit-other p{
			margin-left: 5px;
			float: left;
		}
		.color-blue-other{
			background: #53CDD6;
		}
		.beyondRate #beyondRate1{
			width: 100%;
			height: 300px;
			margin: auto;
		}
		.choose-area{
			width: 185px;
			margin: auto;
		}
		.choose-area-left{
			width: 60px;
			height:30px;
			border:1px solid #7FDC7F;
			text-align: center;
			float: left;
			border-radius: 100px 0 0 100px;
			color: #fff;
			background: #7FDC7F;
		}
		.choose-area-left p{
			line-height:30px;
			font-size: 0.75rem;
		}
		.choose-area-midle{
			width: 60px;
			height:30px;
			border-top:1px solid #7FDC7F;
			border-bottom:1px solid #7FDC7F;
			text-align: center;
			float: left;
			color: #7FDC7F;
		}
		.choose-area-midle p{
			line-height: 30px;
			font-size: 0.75rem;
		}
		.choose-area-right{
			width: 60px;
			height:30px;
			border:1px solid #7FDC7F;
			text-align: center;
			float: left;
			border-radius: 0 100px 100px 0;
			color: #7FDC7F;
		}
		.choose-area-right p{
			line-height: 30px;
			font-size: 0.75rem;
		}
		#growthTrend1{
			width: 100%;
			height: 300px;
		}
		.choose-area1{
			width: 185px;
			margin: auto;
		}
		.choose-area-left1{
			width: 60px;
			height:30px;
			border:1px solid #53CDD6;
			text-align: center;
			float: left;
			border-radius: 100px 0 0 100px;
			color: #fff;
			background: #53CDD6;
		}
		.choose-area-left1 p{
			line-height:30px;
			font-size: 0.75rem;
		}
		.choose-area-midle1{
			width: 60px;
			height:30px;
			border-top:1px solid #53CDD6;
			border-bottom:1px solid #53CDD6;
			text-align: center;
			float: left;
			color: #53CDD6;
		}
		.choose-area-midle1 p{
			line-height: 30px;
			font-size: 0.75rem;
		}
		.choose-area-right1{
			width: 60px;
			height:30px;
			border:1px solid #53CDD6;
			text-align: center;
			float: left;
			border-radius: 0 100px 100px 0;
			color: #53CDD6;
		}
		.choose-area-right1 p{
			line-height: 30px;
			font-size: 0.75rem;
		}
		.choose-area1-other{
			width: 245px;
			margin: auto;
		}
		.choose-area-left1-other{
			width: 80px;
			height:30px;
			border:1px solid #7FDC7F;
			text-align: center;
			float: left;
			border-radius: 100px 0 0 100px;
			color: #fff;
			background: #7FDC7F;
		}
		.choose-area-left1-other p{
			line-height:30px;
			font-size: 0.75rem;
		}
		.choose-area-midle1-other{
			width: 80px;
			height:30px;
			border-top:1px solid #7FDC7F;
			border-bottom:1px solid #7FDC7F;
			text-align: center;
			float: left;
			color: #7FDC7F;
		}
		.choose-area-midle1-other p{
			line-height: 30px;
			font-size: 0.75rem;
		}
		.choose-area-right1-other{
			width: 80px;
			height:30px;
			border:1px solid #7FDC7F;
			text-align: center;
			float: left;
			border-radius: 0 100px 100px 0;
			color: #7FDC7F;
		}
		.choose-area-right1-other p{
			line-height: 30px;
			font-size: 0.75rem;
		}
		.subjectsDiagnosis #subjectsDiagnosis1{
			width: 100%;
			height: 350px;
		}
		.subjectsDiagnosis #subjectsDiagnosis2{
			width: 100%;
			height: 350px;
		}
		.Subjectsdiagnose-foot{
			width: 90%;
			margin: auto;
		}
		.Subjectsdiagnose-foot p{
			font-size: 0.75rem;
			color: #3D3D3D;
			letter-spacing: 0;
			line-height: 20px;
			text-align:justify;
		}
		.myGoaltitle{
			width: 90%;
			height: 70px;
			margin: auto;
			border-radius: 3px;
			background-color: #6380DD;
			margin-bottom: 10px;
		}
		.myGoaltitle-bit{
			width: 33%;
			height: 100%;
			float: left;
		}
		.myGoaltitle-bit p{
			text-align: center;
			margin-top: 12px;
			font-size: 0.75rem;
			color: #FFFFFF;
		}
		.myGoal #myGoal1{
			width: 100%;
			height: 300px;
			margin-bottom: 10px;
		}
		.allItem #allItem1{
			width: 100%;
			height: 300px;
			margin-bottom: 10px;
		}
		.twoAnalysis #twoAnalysis1{
			width: 100%;
			height: 300px;
			margin-bottom: 10px;
		}
		.difficultChoose{
			width: 75%;
			margin: auto;
		}
		.difficultChoose-bit{
			width: 32%;
			height: 30px;
			float: left;
		}
		.difficultChoose-bit p{
			text-align: center;
			line-height: 30px;
			font-size: 0.75rem;
		}
		.difficultChoose-left{
			border: 1px solid #53CDD6;
			background-color: #53CDD6;
			color: #fff;
		}
		.difficultChoose-middle{
			border-top: 1px solid #53CDD6;
			border-bottom: 1px solid #53CDD6;
			color: #53CDD6;
		}
		.difficultChoose-right{
			border: 1px solid #53CDD6;
			color: #53CDD6;	
		}
		.mt10{
			margin-top: 10px;
		}
		.knowledgeAnalysis #knowledgeAnalysis1{
			width: 100%;
			height: 280px;
			margin-bottom: 10px;
		}
		.knowledgeNutton{
			width: 120px;
			height: 30px;
			margin: auto;
			background-color: #D06BE0;
			text-align: center;
			line-height: 30px;
			border-radius: 3px;
			margin-bottom: 20px;
		}
		.knowledgeNutton p{
			font-size: 0.75rem;
			color: #FFFFFF;
		}
		.abilityAnalyze #abilityAnalyze1{
			width: 100%;
			height: 280px;
			margin-bottom: 10px;
		}
		.abilityNutton{
			width: 120px;
			height: 30px;
			margin: auto;
			background-color: #FF3C63;
			text-align: center;
			line-height: 30px;
			border-radius: 3px;
			margin-bottom: 20px;
		}
		.abilityNutton p{
			font-size: 0.75rem;
			color: #FFFFFF;
		}
		</style>