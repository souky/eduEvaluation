<template>
	<div id="classLevel">
		<ul id="navInside" v-show="displayAll.studentGradeDistribution">
			<li v-for="item in liList" :class="activeList == item.id? 'active': ''" :key="item.id" @click="testtest(item.id)">{{item.name}}</li>
		</ul>
		<ul id="navInside1" v-show="displayAll.gradeDistribution">
			<li v-for="item in liList1" :class="activeList1 == item.id? 'active': ''" :key="item.id" @click="testtest1(item.id)">{{item.name}}</li>
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
		<div id="rainbow" class="header-banner">
			<el-carousel height="100px" indicator-position="none" arrow="always" :autoplay="false">
				<el-carousel-item v-for="item in subjects" :key="item.id">
					<div class="header-banner-bit hand" v-for="(child,index) in item.childs">
						<div class="header-banner-click" ref="fristBit" :style="'background:'+child.subjectColor" @click="rainbow(index,child.id,child.subjectName)">
							<p>{{child.subjectName}}</p>
						</div>
					</div>
				</el-carousel-item>
			</el-carousel>
		</div>
		<div class="achievementSelectBox">
			<el-select v-model="changeSchool" class="myselect" @change="changeClassName" :placeholder="schoolList[0].classroomName">
				<el-option v-for="item in schoolList" :key="item.id" :label="item.classroomName" :value="item.id"></el-option>
			</el-select>
		</div>
		<div id="classTotalScore" class="louceng louceng1" v-show="displayAll.classTotalScore">
			<div class="header">
				<p>班级总成绩</p>
				<div class="header-title-foot"></div>
			</div>
			<div class="body pt20">
				<el-table class="borders" :data="schoolSelectBoxData" stripe style="width: 100%" header-row-class-name="table-header">
					<el-table-column align="center" prop="name" label=""></el-table-column>
					<el-table-column align="center" prop="class" label="班级"></el-table-column>
					<el-table-column align="center" prop="school" label="学校"></el-table-column>
					<el-table-column align="center" prop="area" label="地区"></el-table-column>
				</el-table>
				<div class="body-foot">
					<p>在本次考试中，本班级总分平均分高于校级平均分，高于区级平均分，表明本班级学生的整体水平要高于学校平均水平，高于区级水平，请继续保持。
					本班级分化程度高于校级分化程度，高于区级分化程度，表明本班级的分化水平高于校级水平，高于区级水平，需要特别注意</p>
					<div class="body-foot-button">
						<el-button @click="contrastTest =true">考试对比</el-button>
					</div>
				</div>
			</div>
		</div>
		<el-dialog title="成绩对比" :visible.sync="contrastTest" width="900px" @open='classLastScoreshow()' center>
			<center v-show="diaLoading" style="margin-top:20%;"><i class="el-icon-loading"></i></center>
			<div id="classLastScore"></div>
		</el-dialog>
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
					<el-select v-model="changeSchool" class="myselectS" placeholder="请选择">
						<el-option
						v-for="item in schoolList"
						:key="item.id"
						:label="item.classroomName"
						:value="item.id">
					</el-option>
				</el-select>
				<el-button type="primary" @click="gradeDistributionshow()">班级对比</el-button>
			</div>
		</div>
	</div>
	<div id="ranking" v-show="displayAll.ranking" class="mt20 louceng1">
		<div class="header">
			<p>校前？名分布图</p>
			<div class="header-title-foot"></div>
			<div class="body-title mt20">
				<p>班级：共{{rankingListS.classStuNum}}人    全校：{{rankingListS.schoolStuNum}}人</p>
			</div>
		</div>
		<div class="body pt20">
			<div id="ranking1"></div>
			<div id="ranking2">
				<div class="ranking-header">
					<p>前{{basicData.topNum}}名学生名单</p>
				</div>
				<div class="ranking-body">
					<ul>
						<li class="cl" v-for="item in rankingList"><p class="ranking-bodyName">{{item.studentName}}</p><p class="ranking-bodyNum">第{{item.ranking}}名</p></li>
					</ul>
				</div>
				<div class="ranking-foot">
					<div class="ranking-footLeft" @click="rankingTopic($event)">
						<i class="el-icon-arrow-left"></i>
						<p>前50名</p>
					</div>
					<div class="ranking-footRight" @click="rankingTopic($event)">
						<i class="el-icon-arrow-right"></i>
						<p>前100名</p>
					</div>
				</div>
			</div>
			<div class="cl" id="ranking3">
				<el-table class="borders" :data="rankingData" stripe style="width: 100%" header-row-class-name="table-header">
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
	<div id="ClassdisciplinesLevel" v-show="displayAll.ClassdisciplinesLevel" class="mt20 louceng1">
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
					<el-table-column align="center" v-if="item.isImproved=='0'" :key="item.name" :label="item.name" :prop="item.dataIndex">
						<template scope="scope">
							<span v-if="scope.row.isImproved == 1"><i class="el-icon-arrow-up mr5"></i>{{ scope.row.isImproved}}</span>
							<span v-else><i class="el-icon-arrow-down mr5"></i>{{ scope.row.isImproved}}</span>
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
							<li class="cl" v-for="item in studentGradeDistributionList"><p class="ranking-bodyName">{{item.name}}</p><p class="ranking-bodyNum">第{{item.num}}名</p></li>
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
				<el-select v-model="changeSchool" class="myselectS" placeholder="请选择">
					<el-option
					v-for="item in schoolList"
					:key="item.id"
					:label="item.classroomName"
					:value="item.id">
				</el-option>
			</el-select>
			<el-button type="primary" @click="contrastTestStudents =true">班级对比</el-button>
		</div>
	</div>
</div>
<el-dialog title="成绩对比" :visible.sync="contrastTestStudents" width="900px" @open='classLastStudentsshow()' center>
	<center v-show="diaStudentsLoading" style="margin-top:20%;"><i class="el-icon-loading"></i></center>
	<div id="classLastStudents"></div>
</el-dialog>
<div id="classTestAnalysis" v-show="displayAll.classTestAnalysis" class="mt20 louceng">
	<div class="header">
		<p>试题分析</p>
		<div class="header-title-foot"></div>
	</div>
	<div class="body pt20">
		<el-table class="borders" :data="testAnalysisTable" stripe style="width: 100%" header-row-class-name="table-header">
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
<div id="classOptionScoreQuestion" v-show="displayAll.classOptionScoreQuestion" class="mt20">
	<div class="header">
		<p>各小题得分率柱状图</p>
		<div class="header-title-foot"></div>
	</div>
	<div class="body pt20">
		<div id="classOptionScoreQuestion1"></div>
	</div>
</div>
<div id="classtwoDimensionalAnalysis" v-show="displayAll.classtwoDimensionalAnalysis" class="mt20">
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
<div id="classknowledge" v-show="displayAll.classknowledge" class="mt20 louceng">
	<div class="header">
		<p>知识点分析</p>
		<div class="header-title-foot"></div>
	</div>
	<div class="body pt20">
		<div id="classknowledge1"></div>
		<div id="classknowledge2">
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
	</div>
</div>
<div id="classabilityAnalyze" v-show="displayAll.classabilityAnalyze" class="mt20">
	<div class="header">
		<p>能力分析</p>
		<div class="header-title-foot"></div>
	</div>
	<div class="body pt20">
		<div id="classabilityAnalyze1"></div>
		<div id="classabilityAnalyze2">
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
	<div class="leftAnchorPoint">
		
	</div>
</div>
</div>
</template>
<script>
export default{
	data(){
		return{
			basicData:{
				subject:'',
				class:'',
				id:'',
				topNum:50,
			},
			activeList:0,
			activeList1:0,
			liList:[{
				name:'班级总成绩',
				id:0
			},{
				name:'试题分析',
				id:1
			},{
				name:'知识点分析',
				id:2
			}],
			liList1:[{
				name:'班级总成绩',
				id:0
			},{
				name:'校前 ？名分布图',
				id:1
			},{
				name:'班级学科均衡水平',
				id:2
			}],
			diaLoading:true,
			diaStudentsLoading:true,
			contrastTestStudents:false,
			contrastTest:false,
			showselect:false,
			testAnalysisTable:[],
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
				classReport:true,
				studentGradeDistribution:false,
				classTestAnalysis:false,
				classOptionScoreQuestion:false,
				classtwoDimensionalAnalysis:false,
				classknowledge:false,
				classabilityAnalyze:false,
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
			headerData:[{
				name : '名次',
				dataIndex:'subject1Score',
			},{
				name : '考号/学号',
				dataIndex:'studentNo',
			},{
				name : '姓名',
				dataIndex:'studentName',
			},{
				name : '总分',
				dataIndex:'totalScore',
			},{
				name : '名次(校级)',
				dataIndex:'ranking',
			},{
				name : '名次进退步(校级)',
				dataIndex:'changedRanking',
			}],
			testList:[],
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
			rankingList:[],
			rankingListS:{
				classStuNum:0,
				schoolStuNum:0,
			},
			studentGradeDistributionList:[{
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
				topic50:0,
				topic100:0,
				topic200:0,
				topic500:0,
				topic1000:0,
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
			    	name:'人数',
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
						name: '数据',
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
				optionclassknowledge:{
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						x: 'center',
						data:['班级','全校','全区县']
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
				optionclassabilityAnalyze:{
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						x: 'center',
						data:['班级','全校','全区县']
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
				optionclassLastScore:{
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data:['平均分']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						data: ['2017期末考试','2017期中考试','2016期末考试','2016期中考试','2015期末考试']
					},
					yAxis: {
						type: 'value'
					},
					series: [
					{
						name:'平均分',
						type:'line',
						label:{normal:{show:true,position:'top'},},
						itemStyle:{
							normal:{color:'#70CDF3'},
						},
						data:[120, 132, 101, 134, 90]
					}
					]
				},
				optionclassLastStudents:{
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						data:['高分(90%~100%)','优秀(85%~90%)','良好(75%~85%)','及格(60%~75%)','不及格(75%~85%)']
					},
					series: [
					{
						name:'数据',
						type:'pie',
						radius: [0, '60%'],
						label: {
							normal: {
								position: 'inner'
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data:[
						{value:335, name:'高分(90%~100%)',itemStyle:{normal:{color:'#F37070'}}},
						{value:310, name:'优秀(85%~90%)',itemStyle:{normal:{color:'#F3DA70'}}},
						{value:234, name:'良好(75%~85%)',itemStyle:{normal:{color:'#70CDF3'}}},
						{value:135, name:'及格(60%~75%)',itemStyle:{normal:{color:'#7092F3'}}},
						{value:1048, name:'不及格(75%~85%)',itemStyle:{normal:{color:'#70F3A9'}}},
						]
					},
					{
						name:'对比班级',
						type:'pie',
						radius: ['70%', '85%'],

						data:[
						{value:335,
							label: {
								normal: {
									formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}}  {per|{d}%}  ',
									backgroundColor: '#eee',
									borderColor: '#aaa',
									borderWidth: 1,
									borderRadius: 4,
									rich: {
										a: {
											color: '#999',
											lineHeight: 22,
											align: 'center'
										},
										hr: {
											borderColor: '#aaa',
											width: '100%',
											borderWidth: 0.5,
											height: 0
										},
										per: {
											color: '#eee',
											backgroundColor: '#334455',
											padding: [2, 4],
											borderRadius: 2
										}
									}
								}
							}, name:'高分(90%~100%)',itemStyle:{normal:{color:'#F37070'}}},
							{value:310, name:'优秀(85%~90%)',itemStyle:{normal:{color:'#F3DA70'}}},
							{value:234, name:'良好(75%~85%)',itemStyle:{normal:{color:'#70CDF3'}}},
							{value:135, name:'及格(60%~75%)',itemStyle:{normal:{color:'#7092F3'}}},
							{value:1048, name:'不及格(75%~85%)',itemStyle:{normal:{color:'#70F3A9'}}},
							]
						}
						]
					}
				}
			},
			created:function(){
				this.data();
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
				this.echarts.init(document.getElementById("gradeDistribution1")).setOption(this.optiongradeDistribution);
				this.echarts.init(document.getElementById("ranking1")).setOption(this.optionranking);
				this.echarts.init(document.getElementById("ClassdisciplinesLevel1")).setOption(this.optionClassdisciplinesLevel);
				this.echarts.init(document.getElementById("ClassdisciplinesLevel2")).setOption(this.optionClassdisciplinesLevelRight);
				this.echarts.init(document.getElementById("studentGradeDistribution1")).setOption(this.optionstudentGradeDistribution);
				this.echarts.init(document.getElementById("classOptionScoreQuestion1")).setOption(this.optionClassScoreQuestion);
				this.echarts.init(document.getElementById("classtwoDimensionalAnalysis1")).setOption(this.optionTwoDimensionalAnalysis);
				this.echarts.init(document.getElementById("classknowledge1")).setOption(this.optionclassknowledge);
				this.echarts.init(document.getElementById("classabilityAnalyze1")).setOption(this.optionclassabilityAnalyze);
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
								if(oNav[i]){
									oNav[i].className = 'active';
								}
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
				data:function(){
					this.postHttp(this,{},'exam/getExamListForTab',function(obj,res){
						obj.testList=res.result.exams;
					});
					// this.postHttp(this,{examId:'',tab:'CLASS_REPORT', subject:'总分'},'score/getLevelDistribution',function(obj,res){
					// 	var num=0;
					// 	for(var i=0;i<res.result.length;i++){
					// 		if(res.result[i].subject=="数学"){
					// 			num=i
					// 		}
					// 	};

					// });
				},
				testChange(e){
					var name=this.testList[e].id;
					this.basicData.id=name;
					var totle={createDate:1512647749000,createUser:"1",id:"0",isDelete:0,orgId:"",remark:"",schoolId:"",subjectCode:1,subjectColor:"#F37070",subjectName:"总分",updateDate:1513586055000};
					this.postHttp(this,{},'exam/getExamListForTab',function(obj,res){
						obj.testList=res.result.exams;
						obj.items=res.result[name].subject;
						obj.schoolList=res.result[name].classroom;
						obj.basicData.class=res.result[name].classroom[0].id;
						obj.items.unshift(totle);
						var childNum=Math.ceil(obj.items.length/11);
						var childs=[];
						for(var l=0;l<childNum;l++){
							var id=l+1;
							var e=11*(l+1);
							var s=e-11;
							childs[l] = []
							childs[l]["childs"]=obj.items.slice(s,e);
							childs[l]["id"] = id;
						}
						obj.subjects=childs;
						console.log(name)
						for(var q=5;q<parseInt(res.result[name].subject.length)+4;q++){
							var arr={
								"name":res.result[name].subject[q-4].subjectName,
								"dataIndex":"code"+res.result[name].subject[q-4].id,
							}
							obj.headerData.push(arr);
						}
						obj.getTopOrgScoresInClass();
						obj.getClassRankingReport();
					});
					
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
				changetest:function(e,ename){
					this.showselect = !this.showselect
					this.$refs.carousel.setActiveItem(ename);
				},
				selectShow:function(){
					this.showselect = !this.showselect
				},
				rainbow:function(index,num,name){
					for(var i=0;i<document.getElementsByClassName("header-banner-click").length;i++){
						document.getElementById("rainbow").getElementsByClassName("header-banner-click")[i].className="header-banner-click";
					}
					document.getElementById("rainbow").getElementsByClassName("is-active")[0].getElementsByClassName("header-banner-click")[index].className+=" on";
					if(num==0){
						var oNav = document.getElementById("navInside1").getElementsByTagName("li");
						for(var a = 0;a<oNav.length;a++){
							oNav[a].className = '';
						}
						oNav[0].className = 'active';
						this.displayAll.classTotalScore=true;
						this.displayAll.gradeDistribution=true;
						this.displayAll.ranking=true;
						this.displayAll.ClassdisciplinesLevel=true;
						this.displayAll.classReport=true;
						this.displayAll.studentGradeDistribution=false;
						this.displayAll.classTestAnalysis=false;
						this.displayAll.classOptionScoreQuestion=false;
						this.displayAll.classtwoDimensionalAnalysis=false;
						this.displayAll.classknowledge=false;
						this.displayAll.classabilityAnalyze=false;

						this.basicData.subject=name;
						this.getTopOrgScoresInClass();
						this.getClassRankingReport();
					}else{
						var oNav = document.getElementById("navInside").getElementsByTagName("li");
						for(var a = 0;a<oNav.length;a++){
							oNav[a].className = '';
						}
						oNav[0].className = 'active';
						this.displayAll.classTotalScore=true;
						this.displayAll.gradeDistribution=false;
						this.displayAll.ranking=false;
						this.displayAll.ClassdisciplinesLevel=false;
						this.displayAll.classReport=false;
						this.displayAll.studentGradeDistribution=true;
						this.displayAll.classTestAnalysis=true;
						this.displayAll.classOptionScoreQuestion=true;
						this.displayAll.classtwoDimensionalAnalysis=true;
						this.displayAll.classknowledge=true;
						this.displayAll.classabilityAnalyze=true;

						this.postHttp(this,{examId:'',tab:'CLASS_REPORT', subject:'总分'},'score/getLevelDistribution',function(obj,res){
						var number=0;
						for(var i=0;i<res.result.length;i++){
							if(res.result[i].subject==name){
								number=i
							}
						};
						obj.optionstudentGradeDistribution.series[0].data[0].value=res.result[number].highRate;
						obj.optionstudentGradeDistribution.series[0].data[1].value=res.result[number].excellentRate;
						obj.optionstudentGradeDistribution.series[0].data[2].value=res.result[number].commissionRate;
						obj.optionstudentGradeDistribution.series[0].data[3].value=res.result[number].passRate;
						obj.optionstudentGradeDistribution.series[0].data[4].value=res.result[number].failureRate;
						obj.echarts.init(document.getElementById("studentGradeDistribution1")).setOption(obj.optionstudentGradeDistribution);
					});
						
						this.basicData.subject=name;
						this.testAnalysis();
					}
				},
				changeClassName(value){
					if(this.basicData.subject=="总分"||this.basicData.subject==""){
						this.getTopOrgScoresInClass();
						this.getClassRankingReport();
					}else{
						this.basicData.class=value;
						this.testAnalysis();
					}
				},
				testAnalysis:function(){
					this.postHttp(this,{subject:this.basicData.subject,examId:this.basicData.id,classroomId:this.basicData.class},'/testAnalysis',function(obj,res){
							obj.testAnalysisTable=res.result;
							obj.optionClassScoreQuestion.xAxis[0].data=[];
							obj.optionClassScoreQuestion.series[0].data=[];
							obj.optionClassScoreQuestion.series[1].data=[];
							obj.optionClassScoreQuestion.series[2].data=[];
							for(var i=0;i<res.result.length;i++){
								obj.optionClassScoreQuestion.xAxis[0].data.push(res.result[i].qid);
								obj.optionClassScoreQuestion.series[0].data.push(parseInt(res.result[i].divideClass));
								obj.optionClassScoreQuestion.series[1].data.push(parseInt(res.result[i].divideSchool));
								obj.optionClassScoreQuestion.series[2].data.push(parseInt(res.result[i].divideAera));
							}
							obj.echarts.init(document.getElementById("classOptionScoreQuestion1")).setOption(obj.optionClassScoreQuestion);
						});
				},
				getTopOrgScoresInClass:function(){
					this.postHttp(this,{examId:this.basicData.id,classroomId:this.basicData.class,topNum:this.basicData.topNum},'score/getTopOrgScoresInClass',function(obj,res){
						if(res.result=="没有最近一次考试的相关数据"){
							obj.notify_jr(obj,'信息错误',res.result,'error');
						}else{
							obj.rankingList=res.result.resultScoreList;
							obj.rankingListS.classStuNum=res.result.classStuNum;
							obj.rankingListS.schoolStuNum=res.result.schoolStuNum;
							obj.rankingData[0].topic10=res.result.classTopScore.classTopTenStuNum;
							obj.rankingData[0].topic20=res.result.classTopScore.classTopTwentyStuNum;
							obj.rankingData[0].topic50=res.result.classTopScore.classTopFiftyStuNum;
							obj.rankingData[0].topic100=res.result.classTopScore.classTopOneHundredStuNum;
							obj.rankingData[0].topic200=res.result.classTopScore.classTopTwoHundredStuNum;
							obj.rankingData[0].topic500=res.result.classTopScore.classTopFiveHundredStuNum;
							obj.rankingData[0].topic1000=res.result.classTopScore.classTopOneThousandStuNum;
							obj.optionranking.series[0].data=[];
							obj.optionranking.series[0].data.push(res.result.classTopScore.classTopTenStuNum);
							obj.optionranking.series[0].data.push(res.result.classTopScore.classTopTwentyStuNum);
							obj.optionranking.series[0].data.push(res.result.classTopScore.classTopFiftyStuNum);
							obj.optionranking.series[0].data.push(res.result.classTopScore.classTopOneHundredStuNum);
							obj.optionranking.series[0].data.push(res.result.classTopScore.classTopTwoHundredStuNum);
							obj.optionranking.series[0].data.push(res.result.classTopScore.classTopFiveHundredStuNum);
							obj.optionranking.series[0].data.push(res.result.classTopScore.classTopOneThousandStuNum);
							obj.echarts.init(document.getElementById("ranking1")).setOption(obj.optionranking);
							}
						});
				},
				getClassRankingReport:function(){
					this.postHttp(this,{examId:this.basicData.id,classroomId:this.basicData.class},'score/getClassRankingReport',function(obj,res){
							for(var i=0;i<res.result.classScoreList.length;i++){
								res.result.classScoreList[i].subject1Score=i+1;
							}
							console.log(res.result.classScoreList)
							obj.tableData3=res.result.classScoreList;
						});
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
				},
				classLastScoreshow(){
					var selfs = this;
					if(this.diaLoading){
						setTimeout(function(){
							selfs.diaLoading = false;

							selfs.echarts.init(document.getElementById("classLastScore")).setOption(selfs.optionclassLastScore);
						},1000);
					}
				},
				gradeDistributionshow(){
					this.optiongradeDistribution={
						tooltip: {
							trigger: 'axis',
						},
						legend: {
							data:['班级','对比班级','全校','全区县']
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
							data:[3.0, 3.9, 5.0, 22.2, 21.6]
						},
						{
							name:'对比班级',
							type:'bar',
							barWidth: '30%',	
							label:{normal:{show:true,position:'top'},},
							itemStyle:{
								normal:{color:'#FF8585'},
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
					}
					this.echarts.init(document.getElementById("gradeDistribution1")).setOption(this.optiongradeDistribution);
				},
				classLastStudentsshow(){
					var selfs = this;
					if(this.diaStudentsLoading){
						setTimeout(function(){
							selfs.diaStudentsLoading = false;

							selfs.echarts.init(document.getElementById("classLastStudents")).setOption(selfs.optionclassLastStudents);
						},1000);
					}
				},
				rankingTopic(e){
					if(e.currentTarget.className=="ranking-footLeft"){
						this.basicData.topNum=50;
						this.getTopOrgScoresInClass();
					}else{
						this.basicData.topNum=100;
						this.getTopOrgScoresInClass();
					}
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
		#classLevel{
			border-top: 1px solid #f2f2f2;
		}
		#classLevel .borders{
			box-shadow: 1px 1px 14px rgba(0,0,0,.15);
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
			color: #44A9FF !important;
		}
		#classLevel .el-input__inner{
			border: 1px solid #44A9FF;
		}
		#classLevel  #gradeDistribution1{
			width: 1080px;
			height: 460px;
			margin: auto;
			margin-top: 20px;
		}
		#classLevel .classSelectBox{
			width: 200px;
			margin: auto;
			margin-bottom: 35px;
			margin-top: 10px;
		}
		#classLevel .header .body-title{
			position: absolute;
			left: 50%;
			margin-left: -100px;
		} 
		#classLevel .header .body-title p{
			font-size: 16px;
			color: #707070;
			letter-spacing: 0;
		} 
		#classLevel #ranking .body{
			overflow: hidden;
		}
		#classLevel #ranking1{
			width: 750px;
			height: 460px;
			float: left;
		}
		#classLevel #ranking2{
			width: 300px;
			height: 395px;
			float: left;
			margin-top: 55px;
		}
		#classLevel .ranking-header{
			width: 100%;
			height: 40px;
			background: #70CDF3;
			text-align: center;
			line-height: 40px;
			border-radius: 3px 3px 0 0;
		}
		#classLevel .ranking-header p{
			font-size: 16px;
			color: #FFFFFF;
			letter-spacing: 0;
		}
		#classLevel .ranking-body{
			width: 100%;
			height: 285px;
			border: 1px solid #E6EBF5;
			overflow: auto;
		}
		#classLevel .ranking-body p{
			font-size: 14px;
			color: #3D3D3D;
			letter-spacing: 0;
		}
		#classLevel .ranking-body ul{
			padding: 20px 80px;
		}
		#classLevel .ranking-foot{
			width: 100%;
			height: 40px;
			background: #70CDF3;
			line-height: 40px;
			border-radius:0 0 3px 3px;
		}
		#classLevel .ranking-footLeft{
			float: left;
			color: #fff;
			cursor:pointer;
		}
		#classLevel .ranking-footLeft i{
			line-height: 40px;
			float: left;
		}
		#classLevel .ranking-footLeft p{
			float: left;
		}
		#classLevel .ranking-footRight{
			float: right;	
			color: #fff;
			cursor:pointer;
		}
		#classLevel .ranking-footRight i{
			line-height: 40px;
			float: right;	
		}
		#classLevel .ranking-footRight p{
			float: right;	
		}
		#classLevel .ranking-bodyName{
			float: left;
		}
		#classLevel .ranking-bodyNum{
			float: right;
		}
		#classLevel #ClassdisciplinesLevel1{
			width: 600px;
			height: 500px;
			margin-top:20px;
			float: left;
		}
		#classLevel #ClassdisciplinesLevel2{
			width: 470px;
			height: 500px;
			float: left;
			margin-top:20px;
			margin-left: 20px;
		}
		#classLevel .subjectsDiagnosisText{
			margin-top:20px;
		}
		#classLevel .subjectsDiagnosisText p{
			font-size: 14px;
			color: #3D3D3D;
			letter-spacing: 0;
			line-height: 24px;
		}
		#classLevel .body-Vtitle{
			text-align: center;
		}
		#classLevel .body-Vtitle p{
			font-size: 16px;
			color: #707070;
			letter-spacing: 0;
			line-height: 26px;
		}
		#classLevel #studentGradeDistribution1{
			width: 700px;
			height: 460px;
		}
		#classLevel #studentGradeDistribution2{
			width: 305px;
			height: 460px;
		}
		#classLevel .studentGradeDistribution2-header{
			width: 100%;
			height: 49px;
			background: #70CDF3;
			border-radius: 3px 3px 0 0;
			text-align: center;
			padding-top: 5px;
		}
		#classLevel .studentGradeDistribution2-header p{
			font-size: 16px;
			color: #FFFFFF;
			letter-spacing: 0;
			line-height: 24px;
		}
		#classLevel .studentGradeDistribution2-body{
			width: 99%;
			height: 285px;
			border: 1px solid #E6EBF5;
		}
		#classLevel .el-button span{
			color: #fff;
		}
		#classLevel .studentGradeDistribution-ranking-body{
			width: 100%;
			height: 285px;
			border: 1px solid #E6EBF5;
			overflow: auto;
		}
		#classLevel .studentGradeDistribution-ranking-body p{
			font-size: 14px;
			color: #3D3D3D;
			letter-spacing: 0;
		}
		#classLevel .studentGradeDistribution-ranking-body ul{
			padding: 20px 80px;
		}
		#classLevel .classSelectBox .el-button{
			background: #fff;
		}
		#classLevel .classSelectBox .el-button span{
			color: #44A9FF !important;
		}
		#classLevel #classTestAnalysis .el-table--border td, .el-table--border th{
			border:0px !important;
		}
		#classLevel #classTestAnalysis .el-table thead.is-group th{
			background: #70CDF3;
			color: #fff;
		}
		#classLevel #classOptionScoreQuestion1{
			width: 1080px;
			height: 460px;
			margin: auto;
			margin-top: 20px;
			margin-bottom: 20px;
		}
		#classLevel #classtwoDimensionalAnalysis1{
			width: 1080px;
			height: 660px;
			margin: auto;
			margin-bottom: 20px;
		}
		#classLevel .twoDimensionalAnalysis-foot{
			width: 870px;
			height: 30px;
			margin: auto;
			margin-top: -45px;
		}
		#classLevel .twoDimensionalAnalysis-foot .difficultyLevel{
			width: 33.33%;
			height: 100%;
			float:left;
			text-align: center;
			color: #fff;
		}
		#classLevel .twoDimensionalAnalysis-foot .easy{
			background: #FF4444;
		}
		#classLevel .twoDimensionalAnalysis-foot .midde{
			background: #FF8585;
		}
		#classLevel .twoDimensionalAnalysis-foot .difficult{
			background: #FEB0B0;
		}
		#classLevel .twoDimensionalAnalysis-foot .difficultyLevel p{
			line-height: 35px;
			font-size: 12px;
			letter-spacing: 0;
		}
		#classLevel #classtwoDimensionalAnalysis .foot-word{
			width: 100%;
			margin-top:20px;
		}
		#classLevel #classtwoDimensionalAnalysis .foot-word p{
			font-size: 14px;
			color: #3D3D3D;
			letter-spacing: 0;
			line-height: 24px;
		}
		#classLevel #classknowledge1{
			width: 1080px;
			height: 400px;
			margin: auto;
		}
		#classLevel .el-select .el-input .el-input__icon{
			color: #44A9FF
		}
		#classLevel .el-carousel__arrow{
			background-color: white;
			color: #44A9FF
		}
		#classLevel .el-carousel__arrow:hover{
			background-color: white
		}
		#classLevel #classknowledge2 .el-table thead.is-group th{
			background: #70CDF3;
			color: #fff;
		}
		#classLevel #knowledge-table-header .el-table__body-wrapper{
			display: none;
		}
		#classLevel #classknowledge2 .knowledge-table-true .el-table__header-wrapper{
			display: none;
		}
		#classLevel .knowledge-table-trueTotle{
			width: 100%;
			height: 50px;
			background: #FF8585;	
		}
		#classLevel .knowledge-table-trueTotle .knowledge-table-trueTotleBit{
			line-height: 50px;
			float: left;
			width: 160px;
			color: #fff;
			text-align: center;
		}
		#classLevel .knowledge-foot{
			margin-top:20px;
		}
		#classLevel .knowledge-foot p{
			font-size: 14px;
			color: #3D3D3D;
			letter-spacing: 0;
			line-height: 24px;
		}
		#classLevel #classabilityAnalyze1{
			width: 1080px;
			height: 520px;
			margin: auto;
			margin-top: 20px;
		}
		#classLevel #classabilityAnalyze2 .el-table--border td, .el-table--border th{
			border:0px !important;
		}
		#classLevel #classabilityAnalyze2 .el-table thead.is-group th{
			background: #70CDF3;
			color: #fff;
		}
		#classLevel .abilityAnalyze-foot{
			margin-top: 20px;
		}
		#classLevel .abilityAnalyze-foot p{
			font-size: 14px;
			color: #3D3D3D;
			letter-spacing: 0;
			line-height: 24px;
		}
		#classLastScore{
			width: 800px;
			height: 500px;
		}
		#classLastStudents{
			width: 800px;
			height: 500px;	
		}
		#classLevel .el-select .el-input .el-input__icon{
			color: #70CDF3
		}
		#classLevel .el-carousel  {
			overflow-x: hidden;
			position: relative;
			text-align: center;
			margin: auto;
			width: 400px;
			height: 50px;
			margin-top: 30px;
			line-height: 50px;
		}
		#classLevel #rainbow .el-carousel{
			width: 1100px;
			height: 100px;
		}
		#classLevel .el-carousel__container {
			position: relative;
			height: 50px;
			margin: auto;
		}
		#classLevel .myselect{
			border:1px solid #44a9ff;
			width: 130px;
			border-radius: 4px;
		}
		#classLevel .myselectS{
			border:1px solid #44a9ff;
			width: 90px;
			border-radius: 4px;
		}
		#classLevel .testTips{
			color:#3d3d3d;
			font-size: 14px;
			margin-top: 25px
		}
		#classLevel .schoolSelectBox{
			width: 200px;
			margin: auto;
			margin-bottom: 35px;
		}
		#classLevel .achievementSelectBox{
			width: 90px;
			margin: auto;
			margin-bottom: 35px;
		}
		#classLevel .borders{
			box-shadow: 1px 1px 14px rgba(0,0,0,.15);
		}
		#classLevel .el-table .tableBackground{
			background-color: #f5fcff;text-align: center;
		}
		#classLevel .el-table .tableCenter{
			text-align: center;
		}
		#classLevel .alltest{
			cursor: pointer;
		}
		#classLevel .formatRow{
			font-weight: normal;
			text-align:center !important;
			color: white;
			border: 0px !important;
			background-color: #70CDF3 !important;
		}
		#achievementTable .el-table--border td{
			border:0px;
		}
		#classLevel .el-input__inner{
			border: 0px;
			text-align: center;
		}
		#classLevel .el-select .el-input .el-input__icon{
			color: #70CDF3
		}
		#classLevel .el-carousel__arrow{
			background-color: white;
			color: #70CDF3
		}
		#classLevel .el-carousel__arrow:hover{
			background-color: white
		}
		#classLevel .showselect{
			list-style: none;
			position: absolute;
			margin: 0;
			padding: 0;
			border: 1px solid #f2f2f2;
			left: 50%;
			margin-left: -150px;
			z-index: 999;
			background-color: white;
			width: 300px;
			text-align: center;
		}
		#classLevel .showselect li{
			margin: 0;padding:0;
			border-bottom: 1px solid #f2f2f2;
			padding:10px 20px;
			cursor: pointer;
		}
		#classLevel .alltest{
			cursor: pointer;
		}
		.leftAnchorPoint{
			width: 40px;
			height: 80px;
		}
		.hand{
			cursor:pointer;
		}
		</style>
