<template>
	<div id="teachLevel" class="mainbody">
		  <el-carousel id="testChange" :interval="5000" indicator-position="none" arrow="always" :autoplay="false">
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
			     		<div class="header-banner-click" :style="'background:'+child.color" @click="rainbow(index,child.id)">
			     			<p>{{child.name}}</p>
			     		</div>
			     	</div>
			    </el-carousel-item>
			</el-carousel>
		</div>

		  <div class="header">
			<p>科目报告单</p>
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
		    <p class="testTips"><el-button type="primary" @click="compareTest" plain>考试对比</el-button></p>
		  </div>
			<!-- 考试对比图 -->
			<el-dialog
			  title="考试对比图"
			  :visible.sync="dialogVisible"
			  :open="alertas">
			  
			  	<div id="compareTestChart"></div>
		  	  
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			  </span>
			</el-dialog>
			<!-- 考试对比图 -->
		  <div class="header">
			<p>学生等级分布图</p>
			<div class="header-title-foot"></div>
		  </div>
		  <div id="ranked">
		  		<div id="rankedchart"></div>
		  		<div class="schoolSelectBox">
					  <el-select v-model="changeSchool" class="myselect" placeholder="请选择">
					    <el-option
					      v-for="item in schoolList"
					      :key="item.id"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
					  </el-select>
					<el-button type="primary" @click="compareSchool" plain>学校对比</el-button>
		  		</div>
		  </div>
		   <div class="header">
			<p>各班级科目报告单</p>
			<div class="header-title-foot"></div>
		  </div>
		  <div id="reportClass">
		  		<el-table :data="tableData2" class="borders" style="width: 100%" header-cell-class-name="formatRow" :row-class-name="rowsClassName" >
		      <el-table-column width="50" prop="ranking" label="排名">
		      </el-table-column>
		      <el-table-column width="50" prop="class" label="班级">
		      </el-table-column>
		      <el-table-column prop="teachername" label="班主任">
		      </el-table-column>
		      <el-table-column prop="classPoint" label="平均分(班级)">
		      </el-table-column>
		      <el-table-column prop="schoolPoint" label="平均分(校级)">
		      </el-table-column>
		      <el-table-column prop="highest" label="最高分">
		      </el-table-column>
		      <el-table-column prop="lowest" label="最低分">
		      </el-table-column>
		      <el-table-column prop="standard" label="标准差">
		      </el-table-column>
		      <el-table-column prop="differentiation" label="分化程度(前三名提醒)">
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

		  <div class="header">
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
		  <div class="header">
			<p>试卷分析</p>
			<div class="header-title-foot"></div>
		  </div>
		  <div id="achievement">
		  	<p style="text-align:center;font-size:14px">本次试卷整体难度为：0.7，整体区分度为0.8</p>
			<p style="font-size:14px;margin-bottom:30px">注释：<br>
难度是指试题或者试卷的难易程度，用符号p表示。低难度p》0.7，中等难度07》p》0.4，高难度平《0.4，通常中等难度的试卷质量较高。
区分度是指题目区别被试水平能力的量度，用符号D表示。区分度的取值范围在-1.00到+1.00之间。D为正值，是积极区分；D为负值，是消级区分；D为0，无区分作用。通常D为正值，D值越大，区分效果越好。</p>
		  	<div id="achievementTable">
			  	<el-table :data="examination" style="width: 100%" class="borders" header-cell-class-name="formatRow" :row-class-name="rowsClassName">
    					<el-table-column  prop="no" label="题号">
    					</el-table-column>
    					<el-table-column prop="type" label="题型">
    					</el-table-column>
    					<el-table-column  prop="count" label="分值">
    					</el-table-column>
    					<el-table-column prop="average" label="平均分">
    					</el-table-column>
    					<el-table-column label="得分率">
      						<el-table-column prop="scoreSchool" label="校级"></el-table-column>
      						<el-table-column  prop="scoreArea" label="地区级"></el-table-column>
    					</el-table-column>
    					<el-table-column prop="fullMarks" label="满分人数"></el-table-column>
    					<el-table-column prop="wrongMarks" label="答错人数"></el-table-column>
    					<el-table-column prop="difficulty" label="难度"></el-table-column>
    					<el-table-column prop="discrimination" label="区分度"></el-table-column>
  					</el-table>
		  	</div>
		  	<div id="twoDimensionalAnalysis">
			<div class="header">
				<p>得分率 -- 难度二维分析</p>
				<div class="header-title-foot"></div>
			</div>
			<div class="body">
				<div class="body-icon">
					<div class="body-icon-bit">
						<div class="body-icon-color color-blue" @click="twoDimensionalAnalysisChoose('class')"></div>
						<p>班级</p>
					</div>
					<div class="body-icon-bit">
						<div class="body-icon-color color-lightGrey" @click="twoDimensionalAnalysisChoose('school')"></div>
						<p>校级</p>
					</div>
					<div class="body-icon-bit">
						<div class="body-icon-color color-darkGrey" @click="twoDimensionalAnalysisChoose('area')"></div>
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
		  </div>
	</div>	
</template>

<script>
import IndexData from '../../assets/data/teachingLevel.js'
export default {
	data(){
		return {
			autoplay:false,
			alse:'二中',
			IndexData,
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
			tableData3:[],option4:{},dialogVisible:false,option5:{},
			subjects:[],
			items:[{
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
				optionTwoDimensionalAnalysis:{},
				examination:[]
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
      			return 'tableCenter'
    	},
    	compareTest:function(){
			this.dialogVisible = true;
			this.echarts.init(document.getElementById("compareTestChart")).setOption(this.option5);
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
    	alertas:function(){
    		console.log(123);
    	},
    	rainbow:function(index,num){
    		console.log("123");
				for(var i=0;i<document.getElementsByClassName("header-banner-click").length;i++){
					document.getElementById("rainbow").getElementsByClassName("header-banner-click")[i].className="header-banner-click";
				}
				document.getElementById("rainbow").getElementsByClassName("is-active")[0].getElementsByClassName("header-banner-click")[index].className+=" on";
		},
    	compareSchool:function(){
    	},
    	twoDimensionalAnalysisChoose:function(obj){
				if(obj=='class'){
					this.optionTwoDimensionalAnalysis.series= [
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
				            data:[[0.2,30,"客观题",5,1,"-55.00%"],[0.5,30,"客观题",3,2,"-55.00%"],[0.7,30,"客观题",3,3,"-55.00%"]]
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
							data:[[0.2,-30,"客观题",5,4,"-55.00%"],[0.5,-30,"客观题",3,5,"-55.00%"],[0.7,-30,"客观题",3,6,"-55.00%"]]
				        }
				    ]
					
				}
				if(obj=='school'){
					this.optionTwoDimensionalAnalysis.series= [
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
				            data:[[0.2,40,"客观题",5,1,"-55.00%"],[0.5,40,"客观题",3,2,"-55.00%"],[0.7,40,"客观题",3,3,"-55.00%"]]
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
							data:[[0.2,-40,"客观题",5,4,"-55.00%"],[0.5,-40,"客观题",3,5,"-55.00%"],[0.7,-40,"客观题",3,6,"-55.00%"]]
				        }
				    ]
				}
				if(obj=='area'){
					this.optionTwoDimensionalAnalysis.series= [
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
				            data:[[0.2,60,"客观题",5,1,"-55.00%"],[0.5,60,"客观题",3,2,"-55.00%"],[0.7,60,"客观题",3,3,"-55.00%"]]
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
							data:[[0.2,-60,"客观题",5,4,"-55.00%"],[0.5,-60,"客观题",3,5,"-55.00%"],[0.7,-60,"客观题",3,6,"-55.00%"]]
				        }
				    ]
				}
				this.echarts.init(document.getElementById("twoDimensionalAnalysis1")).setOption(this.optionTwoDimensionalAnalysis);
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
    	this.option1 = this.IndexData.option1;
    	this.tableData2 = this.IndexData.tableData2;
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
    	this.optionTwoDimensionalAnalysis = this.IndexData.optionTwoDimensionalAnalysis;
    	 this.optionTwoDimensionalAnalysis.tooltip.formatter=function (obj) {
				            var value = obj.value;
				            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
				                + '</div>' + "题型" + '：' + value[2] + '<br>'
				                + "题号" + '：' + value[4] + '<br>'
				                + "满分值" + '：' + value[3] + '<br>'
				                + "得分率差距" + '：' + value[1]+"%" + '<br>'
				        };
    	this.examination = this.IndexData.examination;
    	//等级分布图
    	this.echarts.init(document.getElementById("rankedchart")).setOption(this.option1);
    	this.echarts.init(document.getElementById("averageChart")).setOption(this.option2);
    	this.echarts.init(document.getElementById("topComparedChart")).setOption(this.option3);
    	this.echarts.init(document.getElementById("twoDimensionalAnalysis1")).setOption(this.optionTwoDimensionalAnalysis);

    }
}
</script>
czxc
<style>
.mainbody{
	width: 1100px;
	margin: auto;
	position: relative;
	border-top: 1px solid #f2f2f2
}
#teachLevel .el-carousel  {
    overflow-x: hidden;
    position: relative;
    text-align: center;
    margin: auto;
    width: 400px;
    height: 50px;
    margin-top: 30px;
    line-height: 50px;
}
#teachLevel #rainbow .el-carousel{
    width: 1100px;
    height: 100px;
}
#teachLevel .el-carousel__container {
    position: relative;
    height: 50px;
    margin: auto;
}
#teachLevel .myselect{
	border:1px solid #44a9ff;
	width: 90px;
	border-radius: 4px;
}
#teachLevel .testTips{
	color:#3d3d3d;
	font-size: 14px;
	margin-top: 25px
}
#teachLevel .schoolSelectBox{
	width: 200px;
	margin: auto;
	margin-bottom: 35px;
}
#teachLevel .achievementSelectBox{
	width: 90px;
	margin: auto;
	margin-bottom: 35px;
}
#teachLevel .borders{
	box-shadow: 1px 1px 14px rgba(0,0,0,.15);
}
#teachLevel .el-table .tableBackground{
	background-color: #f5fcff;text-align: center;
}
#teachLevel .el-table .tableCenter{
	text-align: center;
}
#teachLevel .alltest{
	cursor: pointer;
}
#teachLevel .formatRow{
	font-weight: normal;
	text-align:center !important;
	color: white;
	border: 0px !important;
    background-color: #70CDF3 !important;
}
#achievementTable .el-table--border td{
	border:0px;
}
#teachLevel .el-input__inner{
	border: 0px;
	text-align: center;
}
#teachLevel .el-select .el-input .el-input__icon{
	color: #70CDF3
}
#teachLevel .el-carousel__arrow{
	background-color: white;
	color: #70CDF3
}
#teachLevel .el-carousel__arrow:hover{
	background-color: white
}
#teachLevel .showselect{
	list-style: none;position: absolute;margin: 0;padding:0;
	border: 1px solid #f2f2f2;
	left: 430px;
	z-index: 999;
    background-color: white;
}
#teachLevel .showselect li{
	margin: 0;padding:0;
	border-bottom: 1px solid #f2f2f2;
	padding:10px 20px;
	cursor: pointer;
}
#teachLevel .header p{
	font-size: 20px;
	color: #707070;
	text-align: center;
	letter-spacing: 0;
	margin-top: 35px
}
#teachLevel .header-title-foot{
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
#compareTestChart{
	width: 100%;
	height: 530px
}
#teachLevel .header-banner-bit{
	width: 89px;
	height: 73px;
	float: left;
	margin-top: 15px;
}
#teachLevel .table-header{
	background: #70CDF3;
	color: #fff;
}
#teachLevel .header-banner .el-carousel__item{
	margin-left: 60px;
}
#teachLevel .header-banner-click{
	width: 100%;
	height: 100%;
	text-align: center;
}
#teachLevel .header-banner-click p{
	line-height: 73px;
}
#teachLevel .header-banner-bit .on{
	height: 105%;
}

#twoDimensionalAnalysis{
	margin-top:20px;
}
#twoDimensionalAnalysis1{
	width: 1080px;
	height: 660px;
	margin: auto;
	margin-top: 20px;
	margin-bottom: 20px;
}
#twoDimensionalAnalysis .body{
	padding-top:20px;
}
#teachLevel #twoDimensionalAnalysis .body-icon{
	width: 255px;
	margin: auto;
}
#teachLevel #twoDimensionalAnalysis .body-icon-color{
	width: 20px;
	height: 20px;
	float: left;
}
#teachLevel #twoDimensionalAnalysis .body-icon-bit{
	margin-left:20px;
	float: left;
}
#teachLevel #twoDimensionalAnalysis .body-icon-bit p{
	margin-left: 5px;
	float: left;
}
#teachLevel #twoDimensionalAnalysis .color-blue{
	background: #70CDF3;
}
#teachLevel #twoDimensionalAnalysis .color-lightGrey{
	background: #919191;
}
#teachLevel #twoDimensionalAnalysis .color-darkGrey{
	background: #919191;
}
#teachLevel .twoDimensionalAnalysis-foot{
	width: 870px;
    height: 30px;
    margin: auto;
    margin-top: -45px;
}
#teachLevel .twoDimensionalAnalysis-foot .difficultyLevel{
	width: 33.33%;
	height: 100%;
	float:left;
	text-align: center;
	color: #fff;
}
#teachLevel .twoDimensionalAnalysis-foot .easy{
	background: #FF4444;
}
#teachLevel .twoDimensionalAnalysis-foot .midde{
	background: #FF8585;
}
#teachLevel .twoDimensionalAnalysis-foot .difficult{
	background: #FEB0B0;
}
#teachLevel .twoDimensionalAnalysis-foot .difficultyLevel p{
	line-height: 35px;
	font-size: 12px;
	letter-spacing: 0;
}
#teachLevel #twoDimensionalAnalysis .foot-word{
	width: 100%;
	margin-top:20px;
}
#teachLevel #twoDimensionalAnalysis .foot-word p{
	font-size: 14px;
	color: #3D3D3D;
	letter-spacing: 0;
	line-height: 24px;
}
</style>