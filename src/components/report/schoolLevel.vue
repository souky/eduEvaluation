<template>
	<div id="schoolLevel" class="mainbody">
		  <el-carousel :interval="5000" indicator-position="none" arrow="always" :autoplay="false">
		    <el-carousel-item v-for="item in schoolList" :key="item.id">
		      <p class="alltest" @click="selectShow">{{item.name}}</p>
			</el-carousel-item>
		  </el-carousel>
		  <el-collapse-transition>
			  <ul v-if='showselect' class="showselect">
			  	<li v-for="item in schoolList" :key="item.id" @click="changetest(item.id)">{{item.name}}</li>
			  </ul>
		  </el-collapse-transition>
		  <div class="header">
			<p>学校整体成绩报告单</p>
			<div class="header-title-foot"></div>
		  </div>
		  <div id="overallReport">
		    <el-table :data="tableData" style="width: 100%"  >
		      <el-table-column prop="subject"  label="学科">
		      </el-table-column>
		      <el-table-column prop="countPeople" label="统计人数">
		      </el-table-column>
		      <el-table-column prop="fullMark" label="满分">
		      </el-table-column>
		      <el-table-column prop="average" label="平均分(学校)">
		      </el-table-column>
		      <el-table-column prop="averages" label="平均分(地区)">
		      </el-table-column>
		      <el-table-column prop="deviation" label="离均差">
		      </el-table-column>
		      <el-table-column prop="ranking" label="排名 (地区)">
		      </el-table-column>
		      <el-table-column prop="highest" label="最高分">
		      </el-table-column>
		      <el-table-column prop="highRate" label="高分率(90%以上)">
		      </el-table-column>
		      <el-table-column prop="excellent" label="优秀率(80%-89%)">
		      </el-table-column>
		      <el-table-column prop="inCommission" label="良好率(70%-79%)">
		      </el-table-column>
		      <el-table-column prop="yield" label="合格率(60%-69%)">
		      </el-table-column>
		      <el-table-column prop="failure" label="不及格率(60%以下)">
		      </el-table-column>
		    </el-table>
		  </div>
	</div>	
</template>

<script>
import IndexData from '../../assets/data/schoolLevel.js'
export default {
	data(){
		return {
			autoplay:false,
			IndexData,
			schoolList:[{
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
			schoolTest:''
	    }
	},
    methods: {
    	selectShow:function(){
    		this.showselect = !this.showselect
    	},
    	changetest:function(e){
    		this.showselect = !this.showselect
    	},
    	rowsClassName:function({row, rowIndex}){
	        if (rowIndex === 1) {
	        	console.log(rowIndex);
	        }
	        return '';
      
    	}
    },
    mounted:function(){
    	this.tableData = this.IndexData.tableData;
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
.alltest{
	cursor: pointer;
}
.formatRow{
	padding: 0 10px;
	font-weight: normal;
	text-align: center;
	color: red
}
#schoolLevel .el-input__inner{
	border: 0px;
	text-align: center;
}
#schoolLevel .el-select .el-input .el-input__icon{
	color: white
}
#schoolLevel .el-carousel__arrow{
	background-color: white;
	color: #44A9FF
}
#schoolLevel .el-carousel__arrow:hover{
	background-color: white
}
#schoolLevel .showselect{
	list-style: none;position: absolute;margin: 0;padding:0;
	border: 1px solid #f2f2f2;
	left: 430px;

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
.header-title-foot{
	width: 100px;
    height: 2px;
    background: #44A9FF;
    margin: auto;
    margin-top: 5px;
    margin-bottom: 35px
}
</style>