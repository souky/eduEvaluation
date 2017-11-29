<template>
	<div id="home">
		<div class="center_box">
			<div class="home_body">
				<img class="backgroundImg" src="../../static/img/header/bg-s.png" />
				<div class="personal">
					<img src="../../static/img/header/xiao.png">
					<div class="personalDetail">
						<p>姓名：{{name}}</p>
						<p>学籍号：{{code}}</p>
					</div>
				</div>
				<div id="average">
				</div>
			</div>
		</div>
		<div class="home_main_body">
			<el-row :gutter="20">
			  <el-col :span="8">
			  	<div class="gotoReport homeBox" @click="">
			  		<img src="../../static/img/header/cj.png" />
			  		<div class="bottomBtn">成绩报告</div>
			    </div>
			  </el-col>
			  <el-col :span="8">
			  	<div class="gotoResource homeBox" @click="">
			  		<img src="../../static/img/header/zy.png" />
			  		<div class="bottomBtn">资源中心</div>
			  	</div>
			  </el-col>
			  <el-col :span="8">
			  	<div class="gotoManagement homeBox" @click="">
			  		<img src="../../static/img/header/ks.png" />
			  		<div class="bottomBtn">考试管理</div>
			  	</div>
			  </el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
export default {
  data () {
	return {
      msg: '顶部导航栏',
      username:'用户13974289150',
      name:'王丫丫',
      code:'201706070003',
      option1:{
	  		color: ['#D5D5D5'],
	  		textStyle:{
	  			color:'#E8E8E8'
	  		},
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'       // 默认为直线，可选为：'line' | 'shadow'
		            
		        },
		        formatter:'{b}:\n{c}%'
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		        	type:'category',
		            data : ['高分率', '优秀率', '良好率', '合格率', '不及格率'],
		            axisTick: {
		                alignWithLabel: true
		            },
		            axisLine:{
		            	lineStyle:{color:'#E8E8E8'}
		            },
		            color:'red'
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
		            axisLine:{
		            	lineStyle:{color:'#E8E8E8'}
		            },
		            splitLine: {lineStyle:{type:'dashed'}}
            	
		        }
		    ],
		    series : [
		        {
		            name:'占比',
                    type:'bar',
		            barWidth: '60%',
		            data:[62,78,  
						   {value : 43,
						   	itemStyle:{normal:{color:"#FFD700"}}
						   },50, 31
					    ]
		        }
		    ]
	  	}
    }
  },
  mounted:function(){
  	//判断cookie登陆信息初始化
  	this.echarts.init(document.getElementById("average")).setOption(this.option1);
  },
  methods:{
  	
  }
}


</script>

<style>
#home {
	
}
#home #average{
	width: 350px;
	height: 200px;
	position: absolute;
	top: 150px;
	left: 70px
}
#home .center_box{
	padding-top: 60px;
	background-color: #44A9FF
}
#home .home_body{
	width: 1100px;
	margin: auto;
	position: relative;
}
#home .home_body .backgroundImg{
	width: 1100px;
}
#home .home_main_body{
	width: 1100px;
	margin: auto;
	margin-top: 20px
}
#home .personal{
	width: 500px;
	position: absolute;
	top: 70px;
	left: 80px
}
#home .personal img,#home .personal .personalDetail{
	display: block;
	float: left;
}
#home .personal .personalDetail{
	margin-left: 10px;
	margin-top: 10px
}
#home .personal .personalDetail p {
	margin-top: 6px;
	color: white
}
#home .homeBox{
	border-radius: 3px;
	cursor: pointer;
}
#home .homeBox:hover{box-shadow: 1px 1px 14px rgba(0,0,0,.15);}
#home .homeBox img{
	margin: 52px
}
#home .gotoReport{
	border: 1px solid #44A9FF;
}
#home .gotoReport .bottomBtn{
	width: 100%;
	height: 70px;
	border-radius: 0px 0px 3px 3px;
	background-color: #44A9FF;
	color: white;
	text-align: center;
	line-height: 70px;
}
#home .gotoResource{
	border: 1px solid #93C454;
}
#home .gotoResource .bottomBtn{
	width: 100%;
	height: 70px;
	border-radius: 0px 0px 3px 3px;
	background-color: #93C454;
	color: white;
	text-align: center;
	line-height: 70px;
}
#home .gotoManagement{
	border: 1px solid #F3DA53;
}
#home .gotoManagement .bottomBtn{
	width: 100%;
	height: 70px;
	border-radius: 0px 0px 3px 3px;
	background-color: #F3DA53;
	color: white;
	text-align: center;
	line-height: 70px;
}
</style>