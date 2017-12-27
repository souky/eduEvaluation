<template>
	<div id="ability">
		<div class="knowledge-bit" v-for="item in baseData">
			<div class="knowledge-title">
				<p class="knowledge-title-left">{{item.title}}</p>
				<p class="knowledge-title-right">{{item.sroce}}/{{item.total}}分</p>
			</div>
			<div class="knowledge-score">
				<div class="knowledge-score-conment">
					<div class="knowledge-score-bit">
						<p>我的得分率</p>
						<p class="scoreNumber">{{item.student}}%</p>
					</div>
					<div class="knowledge-score-bit">
						<p>班级得分率</p>
						<p class="scoreNumber">{{item.class}}%</p>
					</div>
					<div class="knowledge-score-bit">
						<p>校级得分率</p>
						<p class="scoreNumber">{{item.school}}%</p>
					</div>
					<div class="cl"></div>
				</div>
				<div class="knowledge-score-number">
					<div class="knowledge-score-number-title">
						<p>对应题目</p>
					</div>
					<div class="knowledge-score-number-conmnet">
						<p>{{item.titleQid}}</p>
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
			baseData:[{
				title:'能力点一',
				sroce:0,
				total:10,
				student:0,
				class:23,
				school:54,
				titleQid:'1,2,3,4,5'
			},{
				title:'能力点一',
				sroce:0,
				total:10,
				student:0,
				class:23,
				school:54,
				titleQid:'1,2,3,4,5'
			}]
		}
	},
	created:function(){
		this.$store.commit('newTab','9');
		this.$store.commit('newTitle','能力点诊断')
	}
}
</script>
<style>
#ability{
	width: 100%;
	margin-top: 45px;
}
#ability .knowledge-bit{
	background-color: #fff;
	width: 100%;
	margin-bottom: 10px;
}
#ability .knowledge-title{
	width: 100%;
	height: 55px;
	border-bottom: 1px solid #F5F5F5;
}
#ability .knowledge-title-left{
	line-height: 55px;
	float: left;
	font-size: 16px;
	color: #19AFFF;
	letter-spacing: 0.19px;
	margin-left: 30px;
	width: 200px;
}
#ability .knowledge-title-right{
	line-height: 55px;
	float: right;
	font-size: 16px;
	color: #FF7070;
	letter-spacing: 0.19px;
	margin-right: 30px;
}
#ability .knowledge-score{
	width: 100%;
	padding: 10px;
}
#ability .knowledge-score-title{
	margin-left: 20px;
}
#ability .knowledge-score-title p{
	font-size: 14px;
	color: #3E3E3E;
	letter-spacing: 0.17px;
}
#ability .knowledge-score-conment{
	padding: 10px 20px;
}
#ability .knowledge-score-bit{
	width: 33%;
	float: left;
	text-align: center;
	color: #3E3E3E;
}
#ability .knowledge-score-bit p{
	font-size: 14px;
	letter-spacing: 0.17px;
}
#ability .knowledge-score-bit .scoreNumber{
	margin-top: 5px;
	font-size: 18px;
	color: #FF7070;
	letter-spacing: 0.17px;
	line-height: 17px;
}
#ability .knowledge-score-number{
	width: 100%;
	margin-left:-10px;
}
#ability .knowledge-score-number-title{
	width: 100%;
	text-align: center;
}
#ability .knowledge-score-number-title p{
	font-size: 14px;
	color: #3E3E3E;
	letter-spacing: 0.17px;
}
#ability .knowledge-score-number-conmnet{
	width: 80%;
	padding: 20px;
	background-color: #19AFFF;
	border-radius: 3px;
	margin: auto;
	margin-top:10px;
}
#ability .knowledge-score-number-conmnet p{
	color: #fff;
	width: 100%;
	height: auto;
	word-wrap:break-word;  
    word-break:break-all;  
    overflow: hidden;
}
</style>