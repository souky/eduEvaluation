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
				<div class="Gnav-moreConment-bit" v-for="item in subject">
					<p>{{item.name}}</p>
				</div>
				<div class="cl"></div>
			</div>
		</div>
		<div class="grade-body">
			<div class="totle">
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
			<div class="beyondRate">
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
			<div class="growth">
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
			<div class="Subjectsdiagnose">
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
					<div id="subjectsDiagnosis2"></div>
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
		}
	},
	created:function(){
		this.$store.commit('newTitle','成绩报告');
		for(var i=0;i<5;i++){
			this.subjectLsit.push(this.subject[i]);
		}
	},
	mounted:function(){
		this.$refs.fristBit[0].className+=" navOn";
		this.echarts.init(document.getElementById("beyondRate1")).setOption(this.optionBeyondRate);
		this.echarts.init(document.getElementById("growthTrend1")).setOption(this.optionGrowthTrend);
		this.echarts.init(document.getElementById("subjectsDiagnosis1")).setOption(this.optionSubjectsDiagnosis);
	},
	methods:{
		subjectButton:function(e){
			for(var i=0;i<e.currentTarget.parentNode.getElementsByClassName("grade-nav-bit").length;i++){
				e.currentTarget.parentNode.getElementsByClassName("grade-nav-bit")[i].className="grade-nav-bit";
			}
			e.currentTarget.className+=" navOn";
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
}
.Gnav-moreConment{
	width: 85%;
	margin: auto
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
.totle-conment{
	width: 92%;
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
#beyondRate1{
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
#subjectsDiagnosis1{
	width: 100%;
	height: 350px;
}
#subjectsDiagnosis2{

}
</style>