<template>
	<div id="schoolInfo" class="main_body">
		
		<div class="info_body">
			<el-form label-position="left" label-width="100px" :model="schoolInfo">
			  <el-form-item label="学校名称">
			    <el-input v-model="schoolInfo.schoolName"></el-input>
			  </el-form-item>
			  <el-form-item label="学校学段">
			    <el-checkbox-group v-model="schoolInfo.periodArray">
			      <el-checkbox label="小学" name="schoolPeriod"></el-checkbox>
			      <el-checkbox label="初中" name="schoolPeriod"></el-checkbox>
			      <el-checkbox label="高中" name="schoolPeriod"></el-checkbox>
			    </el-checkbox-group>
			  </el-form-item>
			  <el-form-item label="学校地址">
			    <el-input v-model="schoolInfo.schoolAddr"></el-input>
			  </el-form-item>
			  <el-form-item label="学校手机">
			    <el-input v-model="schoolInfo.schoolMobile"></el-input>
			  </el-form-item>
			  <el-form-item label="学校电话">
			    <el-input v-model="schoolInfo.schoolTel"></el-input>
			  </el-form-item>
			  <el-form-item label="学校唯一码">
			    <el-input v-model="schoolInfo.schoolOnlyCode" readonly></el-input>
			  </el-form-item>
			  <el-form-item label="学校联系人">
			    <el-input v-model="schoolInfo.schoolContact"></el-input>
			  </el-form-item>
			  <el-form-item label="联系人手机">
			    <el-input v-model="schoolInfo.schoolContactMobile"></el-input>
			  </el-form-item>
			  <el-form-item label="联系人电话">
			    <el-input v-model="schoolInfo.schoolContactTel"></el-input>
			  </el-form-item>
			  <el-form-item label="学校学科">
			    <el-checkbox-group v-model="schoolInfo.subjectArray">
			      <el-checkbox label="语文" name="subjectId"></el-checkbox>
			      <el-checkbox label="数学" name="subjectId"></el-checkbox>
			      <el-checkbox label="英语" name="subjectId"></el-checkbox>
			      <el-checkbox label="物理" name="subjectId"></el-checkbox>
			      <el-checkbox label="化学" name="subjectId"></el-checkbox>
			      <el-checkbox label="生物" name="subjectId"></el-checkbox>
			      <el-checkbox label="历史" name="subjectId"></el-checkbox>
			      <el-checkbox label="政治" name="subjectId"></el-checkbox>
			      <el-checkbox label="地理" name="subjectId"></el-checkbox>
			    </el-checkbox-group>
			  </el-form-item>
			</el-form>
			
			<div class="ok_btn" @click="updateSchool">
				确认修改
			</div>
		</div>
		
	</div>
	
</template>

<script>
import SchoolInfo from '../../assets/schoolManagerData/SchoolInfo'
export default {
  data () {

    return {
      msg: 'schoolInfo',
      schoolInfo:{},
    }
  },
  mounted:function(){
  	this.postHttp(this,{},"school/querySchools",function(obj,res){
  		obj.schoolInfo = res.result;
  	})
  },
  methods:{
	updateSchool(){
		delete this.schoolInfo["createDate"];
		delete this.schoolInfo["updateDate"];
		this.postHttp(this,this.schoolInfo,"school/updateSchool",function(obj,res){
	  		if(res.code = '10000'){
  				obj.notify_success();
  			}else{
  				obj.notify_jr(obj,'操作错误',res.message,'error');
  			}
	  	})
	}
  }
}
</script>

<style>
#schoolInfo{
	
}
#schoolInfo .info_body{
	width: 30%;
	margin:80px auto;
}
</style>