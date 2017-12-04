<template>
	<div id="classLevel">
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
		<div class="schoolSelectBox">
			<el-select v-model="changeSchool" class="myselect" placeholder="请选择">
				<el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id"></el-option>
			</el-select>
		</div>
		<div id="classTotalScore" v-show="displayAll.classTotalScore">
			<div class="header">
				<p>班级总成绩</p>
				<div class="header-title-foot"></div>
			</div>
			<div class="body pt20">
				<el-table :data="schoolSelectBoxData" stripe style="width: 100%" header-row-class-name="table-header">
					<el-table-column align="center" prop="name" label=""></el-table-column>
					<el-table-column align="center" prop="class" label="班级"></el-table-column>
					<el-table-column align="center" prop="school" label="学校"></el-table-column>
					<el-table-column align="center" prop="area" label="地区"></el-table-column>
				</el-table>
				<div class="body-foot">
					<p>在本次考试中，本班级总分平均分高于校级平均分，高于区级平均分，表明本班级学生的整体水平要高于学校平均水平，高于区级水平，请继续保持。
					本班级分化程度高于校级分化程度，高于区级分化程度，表明本班级的分化水平高于校级水平，高于区级水平，需要特别注意</p>
					<div class="body-foot-button">
						<el-button>考试对比</el-button>
					</div>
				</div>
			</div>
		</div>
	<div id="gradeDistribution" v-show="displayAll.gradeDistribution" class="mt20">
			<div class="header">
				<p>分数等级分布图</p>
				<div class="header-title-foot"></div>
			</div>
			<div class="body pt20">
				<div id="gradeDistribution1"></div>
				<div class="body-foot">
					<p>在本次考试中，本班级高分率、优秀率和良好率低于学校水平，合格率高于学校水平，请继续保持。本班不及格率高于学校水平，需要特别注意</p>
				</div>
				<div class="classSelectBox">
					<el-select v-model="changeSchool" class="myselect" placeholder="请选择">
						<el-option
						v-for="item in schoolList"
						:key="item.id"
						:label="item.name"
						:value="item.id">
						</el-option>
					</el-select>
					<el-button type="primary">班级对比</el-button>
				</div>
		</div>
	</div>
	<div id="ranking" v-show="displayAll.ranking" class="mt20">
		<div class="header">
			<p>分数等级分布图</p>
			<div class="header-title-foot"></div>
		</div>
		<div class="body pt20">
			<div id="ranking1"></div>
			<div id="ranking2">
				<div class="ranking-header">
					<p>前100名学生名单</p>
				</div>
				<div class="ranking-body">
					<ul>
						<li class="cl" v-for="item in rankingList"><p class="ranking-bodyName">{{item.name}}</p><p class="ranking-bodyNum">第{{item.num}}名</p></li>
					</ul>
				</div>
				<div class="ranking-foot">
					<div class="ranking-footLeft">
						<i class="el-icon-arrow-left"></i>
						<p>前50名</p>
					</div>
					<div class="ranking-footRight">
						<i class="el-icon-arrow-right"></i>
						<p>前100名</p>
					</div>
				</div>
			</div>
			<div class="cl" id="ranking3">
				<el-table :data="rankingData" stripe style="width: 100%" header-row-class-name="table-header">
					<el-table-column align="center" prop="topic10" label="前10名"></el-table-column>
					<el-table-column align="center" prop="topic20" label="前20名"></el-table-column>
					<el-table-column align="center" prop="topic50" label="前50名"></el-table-column>
					<el-table-column align="center" prop="topic100" label="前100名"></el-table-column>
					<el-table-column align="center" prop="topic200" label="前200名"></el-table-column>
					<el-table-column align="center" prop="topic500" label="前500名"></el-table-column>
					<el-table-column align="center" prop="topic1000" label="前1000名"></el-table-column>
				</el-table>
			</div>
		</div>
	</div>
	<div id="ClassdisciplinesLevel" v-show="displayAll.ClassdisciplinesLevel" class="mt20">
		<div class="header">
			<p>班级学科均衡水平</p>
			<div class="header-title-foot"></div>
		</div>
		<div class="body pt20">
			<div id="ClassdisciplinesLevel1"></div>
			<div id="ClassdisciplinesLevel2"></div>
			<div class="cl"></div>
			<div class="subjectsDiagnosisText">
				<p>在本次考试中，语文的标准分较高，并且高于总分标准分，是本班级的优势科目，请继续保持；数学、英语和综合的标准分较低，并且低于总分标准分，是本班级的弱势科目，需要多关注。在本次考试中，本班级的语文、数学、英语、综合以及总分的得分率都高于学校平均得分率，请继续保持</p>
			</div>
		</div>
	</div>
	<div id="classReport" v-show="displayAll.classReport" class="mt20 mb20">
		<div class="header">
			<p>班级成绩报告单</p>
			<div class="header-title-foot"></div>
		</div>
		<div class="body pt20">
			<el-table :data="tableData3" style="width: 100%" header-row-class-name="table-header">
		      <template v-for="item in headerData">
		      	<el-table-column align="center" v-if="item.key=='true'" :key="item.name" :label="item.name" :prop="item.dataIndex">
		      		<template scope="scope">
					    <span v-if="scope.row.score.key == 1"><i class="el-icon-arrow-up mr5"></i>{{ scope.row.score.value }}</span>
					    <span v-else><i class="el-icon-arrow-down mr5"></i>{{ scope.row.score.value }}</span>
					</template>
		      	</el-table-column>
		        <el-table-column align="center" v-else :key="item.name" :label="item.name" :prop="item.dataIndex"></el-table-column>
		      </template>
		    </el-table>
		</div>
	</div>
	<div id="studentGradeDistribution" v-show="displayAll.studentGradeDistribution" class="mt20">
		<div class="header">
			<p>学生等级分布图</p>
			<div class="header-title-foot"></div>
		</div>
		<div class="body pt20 mb10">
			<div class="body-Vtitle">
				<p>学生各等级人数分布图</p>
				<p>共37人，满分150分</p>
			</div>
			<div id="studentGradeDistribution1" class="l"></div>
			<div id="studentGradeDistribution2" class="r">
				<div class="studentGradeDistribution2-header">
					<p>{{studentGradeheader.name}}{{studentGradeheader.level}}学生名单3人</p>
					<p>分数区间(127.5~135分)</p>
				</div>
				<div class="studentGradeDistribution2-body">
					<div class="studentGradeDistribution-ranking-body">
						<ul>
							<li class="cl" v-for="item in rankingList"><p class="ranking-bodyName">{{item.name}}</p><p class="ranking-bodyNum">第{{item.num}}名</p></li>
						</ul>
					</div>
				</div>
				<div class="ranking-foot">
					<div class="ranking-footLeft" style="display:none" @click="gradeIntervalfun($event)">
						<i class="el-icon-arrow-left"></i>
						<el-button :data-key="gradeInterval[0].key" type="text">{{gradeInterval[0].name}}</el-button>
					</div>
					<div class="ranking-footRight" @click="gradeIntervalfun($event)">
						<i class="el-icon-arrow-right"></i>
						<el-button :data-key="gradeInterval[1].key" type="text">{{gradeInterval[1].name}}</el-button>
					</div>
				</div>
			</div>
			<div class="classSelectBox">
					<el-select v-model="changeSchool" class="myselect" placeholder="请选择">
						<el-option
						v-for="item in schoolList"
						:key="item.id"
						:label="item.name"
						:value="item.id">
						</el-option>
					</el-select>
					<el-button type="primary">班级对比</el-button>
				</div>
		</div>
	</div>
	<div id="classTestAnalysis" class="mt20">
		<div class="header">
			<p>试题分析</p>
			<div class="header-title-foot"></div>
		</div>
		<div class="body pt20">
			<el-table :data="testAnalysisTable" stripe style="width: 100%" header-row-class-name="table-header">
				<el-table-column align="center" prop="qid" label="题号"></el-table-column>
				<el-table-column align="center" prop="topic" label="题型"></el-table-column>
				<el-table-column align="center" prop="fractionalValue" label="分值"></el-table-column>
				<el-table-column align="center" prop="divide" label="平均分"></el-table-column>
				<el-table-column align="center" label="得分率">
					<el-table-column align="center" prop="divideClass" label="班级"></el-table-column>
					<el-table-column align="center" prop="divideSchool" label="校级"></el-table-column>
					<el-table-column align="center" prop="divideAera" label="区县级"></el-table-column>
				</el-table-column>
				<el-table-column align="center" prop="trueNum" label="满分人数"></el-table-column>
				<el-table-column align="center" prop="falseNum" label="答错人数"></el-table-column>
				<el-table-column align="center" prop="difficulty" label="难度"></el-table-column>
				<el-table-column align="center" prop="differentiation" label="区分度"></el-table-column>
			</el-table>
		</div>
	</div>
	<div id="classOptionScoreQuestion" class="mt20">
		<div class="header">
			<p>各小题得分率柱状图</p>
			<div class="header-title-foot"></div>
		</div>
		<div class="body pt20">
			<div id="classOptionScoreQuestion1"></div>
		</div>
	</div>
	<div id="classtwoDimensionalAnalysis" class="mt20">
		<div class="header">
			<p>得分率——难度二维分析</p>
			<div class="header-title-foot"></div>
		</div>
		<div class="body">
			<div id="classtwoDimensionalAnalysis1"></div>
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
</div>
</template>
<script>
export default{
	data(){
		return{
			testAnalysisTable:[{
				qid:1,
				topic:"客观题",
				fractionalValue:5,
				divide:3.11,
				divideClass:"62%",
				divideSchool:"43%",
				divideAera:"65%",
				trueNum:5,
				falseNum:43,
				difficulty:0.6,
				differentiation:0.7,
			}],
			studentGradeheader:{
				name:"高分",
				level:"(90%~100%)"
			},
			gradeInterval:[{
				key:1,
				name:"高分",
				level:"(90%~100%)"
			},{
				key:2,
				name:"优秀",
				level:"(85%~90%)"
			},{
				key:3,
				name:"良好",
				level:"(75%~85%)"
			},{
				key:4,
				name:"及格",
				level:"(60%~75%)"
			},{
				key:5,
				name:"不及格",
				level:"(0%~60%)"
			}],
			displayAll:{
				classTotalScore:true,
				gradeDistribution:true,
				ranking:true,
				ClassdisciplinesLevel:true,
				ClassdisciplinesLevel:true,
				classReport:true,
				studentGradeDistribution:true,
			},
			headerData:[{
                name : '名次',
                dataIndex:'place',
            },{
                name : '考号/学号',
                dataIndex:'studentId',
             },{
                name : '姓名',
                dataIndex:'name',
            },{
                name : '总分',
                dataIndex:'totalScore',
            },{
                name : '名次(校级)',
                dataIndex:'schoolPlace',
            },{
            	name : '名次进退步(校级)',
                dataIndex:'score',
                key:'true',
            },{
            	name : '语文',
                dataIndex:'Chinese',
            },{
            	name : '数学',
                dataIndex:'math',
            },{
            	name : '英语',
                dataIndex:'english',
            },{
            	name : '物理',
                dataIndex:'physics',
            },{
            	name : '化学',
                dataIndex:'chemistry',
            },{
            	name : '生物',
                dataIndex:'creature',
            },{
            	name : '理综合',
                dataIndex:'Richard',
            }],
            tableData3:[{
            	place:1,
            	studentId:123,
            	name:"张三",
            	totalScore:343,
            	schoolPlace:23,
            	score:{
            		key:1,
            		value:23,
            	},
            	Chinese:12,
            	math:23,
            	english:23,
            	physics:23,
            	chemistry:54,
            	creature:43,
            	Richard:54,
            },{
            	place:1,
            	studentId:123,
            	name:"张三",
            	totalScore:343,
            	schoolPlace:23,
            	score:{
            		key:0,
            		value:23,
            	},
            	Chinese:12,
            	math:23,
            	english:23,
            	physics:23,
            	chemistry:54,
            	creature:43,
            	Richard:54,
            }],
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
			changeSchool:'',
			schoolList:[{
				id:'001',
				name:'1班'
			},{
				id:'002',
				name:'2班'
			}],
			schoolSelectBoxData:[{
				name:"平均分",
				class:234,
				school:456,
				area:342,
			},{
				name:"最高分",
				class:234,
				school:456,
				area:342,
			},{
				name:"最低分",
				class:234,
				school:456,
				area:342,
			},{
				name:"分化程度",
				class:"16.32%",
				school:'32.34%',
				area:'98.23%',
			},{
				name:"排名",
				class:234,
				school:456,
				area:342,
			}],
			rankingList:[{
				name:"张三",
				num:1,
			},{
				name:"李四",
				num:2,
			},{
				name:"王五",
				num:3,
			},{
				name:"贾六",
				num:4,
			},{
				name:"魏七",
				num:5,
			},{
				name:"林八",
				num:6,
			},{
				name:"张三",
				num:1,
			},{
				name:"李四",
				num:2,
			},{
				name:"王五",
				num:3,
			},{
				name:"贾六",
				num:4,
			},{
				name:"魏七",
				num:5,
			},{
				name:"林八",
				num:6,
			},{
				name:"张三",
				num:1,
			},{
				name:"李四",
				num:2,
			},{
				name:"王五",
				num:3,
			},{
				name:"贾六",
				num:4,
			},{
				name:"魏七",
				num:5,
			},{
				name:"林八",
				num:6,
			}],
			rankingData:[{
				topic10:0,
				topic20:0,
				topic50:2,
				topic100:12,
				topic200:23,
				topic500:45,
				topic1000:67,
			}],
			classReportTable:[{

			}],
			optiongradeDistribution:{
				tooltip: {
					trigger: 'axis',
				},
				legend: {
					data:['班级','全校','全区县']
				},
				xAxis: [
				{
					type: 'category',
					data: ['高分率','优秀率','良好率','合格率','不及格率'],
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
				series: [
				{
					name:'班级',
					type:'bar',
					barWidth: '30%',	
					label:{normal:{show:true,position:'top'},},
					itemStyle:{
						normal:{color:'#46C4F8'},
					},
					data:[2.0, 4.9, 7.0, 23.2, 25.6]
				},
				{
					name:'全校',
					type:'line',
					label:{normal:{show:true,position:'top'},},
					itemStyle:{
						normal:{color:'#FFD244'},
					},
					data:[2.6, 5.9, 9.0, 26.4, 28.7]
				},
				{
					name:'全区县',
					type:'line',
					label:{normal:{show:true,position:'top'},},
					itemStyle:{
						normal:{color:'#919191'},
					},
					data:[2.0, 2.2, 3.3, 4.5, 6.3]
				}
				]
			},
			optionranking:{
				color: ['#70CDF3'],
				tooltip : {
					trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
			    xAxis : [
			    {
			    	type : 'category',
			    	data : ['前10名', '前20名', '前50名', '前100名', '前200名', '前500名', '前1000名'],
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
			    	name:'直接访问',
			    	type:'bar',
			    	barWidth: '60%',
			    	data:[0, 0, 0, 14, 57, 321, 445]
			    }
			    ]
			},
			optionClassdisciplinesLevel:{
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
				optionClassdisciplinesLevelRight:{
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
				optionstudentGradeDistribution:{
					tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        data: ['高分(90%~100%)','优秀(85%~90%)','良好(75%~85%)','及格(60%~75%)','不及格(0%~60%)']
				    },
				    series : [
				        {
				            name: '访问来源',
				            type: 'pie',
				            radius : '80%',
				            center: ['50%', '55%'],
				            data:[
				                {value:335, name:'高分(90%~100%)',itemStyle:{normal:{color:'#F37070'}}},
				                {value:310, name:'优秀(85%~90%)',itemStyle:{normal:{color:'#F3DA70'}}},
				                {value:234, name:'良好(75%~85%)',itemStyle:{normal:{color:'#70CDF3'}}},
				                {value:135, name:'及格(60%~75%)',itemStyle:{normal:{color:'#7092F3'}}},
				                {value:1548, name:'不及格(0%~60%)',itemStyle:{normal:{color:'#70F3A9'}}}
				            ],
				        }
				    ]
				},
				optionClassScoreQuestion:{
				    tooltip: {
				        trigger: 'axis',
				    },
				    legend: {
				        data:['班级','全校','全区县']
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
				            name:'班级',
				            type:'bar',
				            label:{normal:{show:true,position:'top'},},
				            itemStyle:{
								normal:{color:'#46C4F8'},
							},
				            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 43.6, 56.2, 32.6, 20.0, 6.4, 3.3,2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6]
				        },
				        {
				            name:'全校',
				            type:'line',
				            label:{normal:{show:true,position:'top'},},
				            itemStyle:{
								normal:{color:'#FFD244'},
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
			this.echarts.init(document.getElementById("gradeDistribution1")).setOption(this.optiongradeDistribution);
			this.echarts.init(document.getElementById("ranking1")).setOption(this.optionranking);
			this.echarts.init(document.getElementById("ClassdisciplinesLevel1")).setOption(this.optionClassdisciplinesLevel);
			this.echarts.init(document.getElementById("ClassdisciplinesLevel2")).setOption(this.optionClassdisciplinesLevelRight);
			this.echarts.init(document.getElementById("studentGradeDistribution1")).setOption(this.optionstudentGradeDistribution);
			this.echarts.init(document.getElementById("classOptionScoreQuestion1")).setOption(this.optionClassScoreQuestion);
			this.echarts.init(document.getElementById("classtwoDimensionalAnalysis1")).setOption(this.optionTwoDimensionalAnalysis);
		},
		methods:{
			rainbow:function(index,num){
				for(var i=0;i<document.getElementsByClassName("header-banner-click").length;i++){
					document.getElementById("rainbow").getElementsByClassName("header-banner-click")[i].className="header-banner-click";
				}
				document.getElementById("rainbow").getElementsByClassName("is-active")[0].getElementsByClassName("header-banner-click")[index].className+=" on";
			},
			gradeIntervalfun:function(e){
				var num=parseInt(e.currentTarget.getElementsByTagName("button")[0].getAttribute("data-key"));
				if(e.currentTarget.className=="ranking-footRight"){
					if(num==5){
						e.currentTarget.parentNode.getElementsByClassName("ranking-footLeft")[0].getElementsByTagName("button")[0].setAttribute("data-key",num-1);
						e.currentTarget.parentNode.getElementsByClassName("ranking-footLeft")[0].getElementsByTagName("button")[0].getElementsByTagName("span")[0].innerHTML=this.gradeInterval[num-2].name;
						e.currentTarget.parentNode.getElementsByClassName("ranking-footRight")[0].style.display="none";
						this.studentGradeheader.name=this.gradeInterval[num-1].name;
						this.studentGradeheader.level=this.gradeInterval[num-1].level;
					}else{
						e.currentTarget.parentNode.getElementsByClassName("ranking-footLeft")[0].style.display="block";
						e.currentTarget.parentNode.getElementsByClassName("ranking-footLeft")[0].getElementsByTagName("button")[0].setAttribute("data-key",num-1);
						e.currentTarget.parentNode.getElementsByClassName("ranking-footLeft")[0].getElementsByTagName("button")[0].getElementsByTagName("span")[0].innerHTML=this.gradeInterval[num-2].name;
						e.currentTarget.parentNode.getElementsByClassName("ranking-footRight")[0].getElementsByTagName("button")[0].setAttribute("data-key",num+1);
						e.currentTarget.parentNode.getElementsByClassName("ranking-footRight")[0].getElementsByTagName("button")[0].getElementsByTagName("span")[0].innerHTML=this.gradeInterval[num].name;
						this.studentGradeheader.name=this.gradeInterval[num-1].name;
						this.studentGradeheader.level=this.gradeInterval[num-1].level;
					}
				}else{
					if(num==1){
						e.currentTarget.parentNode.getElementsByClassName("ranking-footRight")[0].getElementsByTagName("button")[0].setAttribute("data-key",num+1);
						e.currentTarget.parentNode.getElementsByClassName("ranking-footRight")[0].getElementsByTagName("button")[0].getElementsByTagName("span")[0].innerHTML=this.gradeInterval[num].name;
						e.currentTarget.parentNode.getElementsByClassName("ranking-footLeft")[0].style.display="none";
						this.studentGradeheader.name=this.gradeInterval[num-1].name;
						this.studentGradeheader.level=this.gradeInterval[num-1].level;
					}else{
						e.currentTarget.parentNode.getElementsByClassName("ranking-footRight")[0].style.display="block";
						e.currentTarget.parentNode.getElementsByClassName("ranking-footLeft")[0].getElementsByTagName("button")[0].setAttribute("data-key",num-1);
						e.currentTarget.parentNode.getElementsByClassName("ranking-footLeft")[0].getElementsByTagName("button")[0].getElementsByTagName("span")[0].innerHTML=this.gradeInterval[num-2].name;
						e.currentTarget.parentNode.getElementsByClassName("ranking-footRight")[0].getElementsByTagName("button")[0].setAttribute("data-key",num+1);
						e.currentTarget.parentNode.getElementsByClassName("ranking-footRight")[0].getElementsByTagName("button")[0].getElementsByTagName("span")[0].innerHTML=this.gradeInterval[num].name;
						this.studentGradeheader.name=this.gradeInterval[num-1].name;
						this.studentGradeheader.level=this.gradeInterval[num-1].level;
					}
				}
			}
		}
	}
	</script>
	<style>
	#classLevel{
		overflow: hidden;
	}
	#classLevel .header{
		text-align: center;
	}
	#classLevel .header p{
		font-size: 20px;
		color: #707070;
		letter-spacing: 0;
	}
	#classLevel .header-title-foot{
		width: 100px;
		height: 2px;
		background: #44A9FF;
		margin: auto;
		margin-top:5px;
	}
	#classLevel .header-banner-bit{
		width: 89px;
		height: 73px;
		float: left;
		margin-top: 15px;
	}
	#classLevel .table-header{
		background: #70CDF3;
		color: #fff;
	}
	#classLevel .header-banner .el-carousel__item{
		margin-left: 60px;
	}
	#classLevel .header-banner-click{
		width: 100%;
		height: 100%;
		text-align: center;
	}
	#classLevel .header-banner-click p{
		line-height: 73px;
	}
	#classLevel .header-banner-bit .on{
		height: 105%;
	}
	#classLevel .schoolSelectBox{
		width: 90px;
		margin: auto;
		margin-bottom: 35px;
	}
	#classLevel .myselect{
		width: 90px;
		border-radius: 4px;
	}
	#classLevel .table-header{
		background: #70CDF3;
		color: #fff;
	}
	#classLevel .body-foot{
		margin-top:20px;
	}
	#classLevel .body-foot p{
		font-size: 14px;
		color: #3D3D3D;
		letter-spacing: 0;
		line-height: 24px;
	}
	#classLevel .body-foot-button{
		width: 100px;
		height: 40px;
		margin: auto;
		margin-top: 10px;
	}
	#classLevel .body-foot-button .el-button{
		border: 1px solid #44A9FF;
	}
	#classLevel .body-foot-button span{
		color: #44A9FF;
	}
	#classLevel .el-input__inner{
		border: 1px solid #44A9FF;
	}
	#gradeDistribution1{
		width: 1080px;
		height: 460px;
		margin: auto;
		margin-top: 20px;
	}
	.classSelectBox{
		width: 200px;
		margin: auto;
		margin-bottom: 35px;
		margin-top: 10px;
	}
	#ranking .body{
		overflow: hidden;
	}
	#ranking1{
		width: 750px;
		height: 460px;
		float: left;
	}
	#ranking2{
		width: 300px;
		height: 395px;
		float: left;
		margin-top: 55px;
	}
	.ranking-header{
		width: 100%;
		height: 40px;
		background: #70CDF3;
		text-align: center;
		line-height: 40px;
		border-radius: 3px 3px 0 0;
	}
	.ranking-header p{
		font-size: 16px;
		color: #FFFFFF;
		letter-spacing: 0;
	}
	.ranking-body{
		width: 100%;
		height: 285px;
		border: 1px solid #E6EBF5;
		overflow: auto;
	}
	.ranking-body p{
		font-size: 14px;
		color: #3D3D3D;
		letter-spacing: 0;
	}
	.ranking-body ul{
		padding: 20px 80px;
	}
	.ranking-foot{
		width: 100%;
		height: 40px;
		background: #70CDF3;
		line-height: 40px;
		border-radius:0 0 3px 3px;
	}
	.ranking-footLeft{
		float: left;
		color: #fff;
	}
	.ranking-footLeft i{
		line-height: 40px;
		float: left;
	}
	.ranking-footLeft p{
		float: left;
	}
	.ranking-footRight{
		float: right;	
		color: #fff;
	}
	.ranking-footRight i{
		line-height: 40px;
		float: right;	
	}
	.ranking-footRight p{
		float: right;	
	}
	.ranking-bodyName{
		float: left;
	}
	.ranking-bodyNum{
		float: right;
	}
	#ClassdisciplinesLevel1{
		width: 600px;
		height: 500px;
		margin-top:20px;
		float: left;
	}
	#ClassdisciplinesLevel2{
		width: 470px;
		height: 500px;
		float: left;
		margin-top:20px;
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
	.body-Vtitle{
		text-align: center;
	}
	.body-Vtitle p{
		font-size: 16px;
		color: #707070;
		letter-spacing: 0;
		line-height: 26px;
	}
	#studentGradeDistribution1{
		width: 700px;
		height: 460px;
	}
	#studentGradeDistribution2{
		width: 305px;
		height: 460px;
	}
	.studentGradeDistribution2-header{
		width: 100%;
		height: 49px;
		background: #70CDF3;
		border-radius: 3px 3px 0 0;
		text-align: center;
		padding-top: 5px;
	}
	.studentGradeDistribution2-header p{
		font-size: 16px;
		color: #FFFFFF;
		letter-spacing: 0;
		line-height: 24px;
	}
	.studentGradeDistribution2-body{
		width: 99%;
		height: 285px;
		border: 1px solid #E6EBF5;
	}
	.el-button span{
		color: #fff;
	}
	.studentGradeDistribution-ranking-body{
		width: 100%;
		height: 285px;
		border: 1px solid #E6EBF5;
		overflow: auto;
	}
	.studentGradeDistribution-ranking-body p{
		font-size: 14px;
		color: #3D3D3D;
		letter-spacing: 0;
	}
	.studentGradeDistribution-ranking-body ul{
		padding: 20px 80px;
	}
	.classSelectBox .el-button{
		background: #fff;
	}
	.classSelectBox .el-button span{
		color: #44A9FF;
	}
	#classTestAnalysis .el-table--border td, .el-table--border th{
	border:0px !important;
	}
	#classTestAnalysis .el-table thead.is-group th{
		background: #70CDF3;
	    color: #fff;
	}
	#classOptionScoreQuestion1{
		width: 1080px;
		height: 460px;
		margin: auto;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	#classtwoDimensionalAnalysis1{
		width: 1080px;
		height: 660px;
		margin: auto;
		margin-bottom: 20px;
	}
	.twoDimensionalAnalysis-foot{
		width: 870px;
	    height: 30px;
	    margin: auto;
	    margin-top: -45px;
	}
	.twoDimensionalAnalysis-foot .difficultyLevel{
		width: 33.33%;
		height: 100%;
		float:left;
		text-align: center;
		color: #fff;
	}
	.twoDimensionalAnalysis-foot .easy{
		background: #FF4444;
	}
	.twoDimensionalAnalysis-foot .midde{
		background: #FF8585;
	}
	.twoDimensionalAnalysis-foot .difficult{
		background: #FEB0B0;
	}
	.twoDimensionalAnalysis-foot .difficultyLevel p{
		line-height: 35px;
		font-size: 12px;
		letter-spacing: 0;
	}
	#classtwoDimensionalAnalysis .foot-word{
		width: 100%;
		margin-top:20px;
	}
	#classtwoDimensionalAnalysis .foot-word p{
		font-size: 14px;
		color: #3D3D3D;
		letter-spacing: 0;
		line-height: 24px;
	}
	</style>