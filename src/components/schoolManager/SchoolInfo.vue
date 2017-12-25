<template>
	<div id="schoolInfo" class="main_body">
		
		<div class="info_body">
			<el-form label-position="left" label-width="100px" :rules="rules" ref="schoolInfo" class="demo-ruleForm" :model="schoolInfo">
			  <el-form-item label="学校名称" prop="schoolName">
			    <el-input v-model="schoolInfo.schoolName"></el-input>
			  </el-form-item>
			  <el-form-item label="学校学段" prop="periodArray">
			    <el-checkbox-group v-model="schoolInfo.periodArray" >
			      <el-checkbox label="小学" name="periodArrays"></el-checkbox>
			      <el-checkbox label="初中" name="periodArrays"></el-checkbox>
			      <el-checkbox label="高中" name="periodArrays"></el-checkbox>
			    </el-checkbox-group>
			  </el-form-item>
			  <el-form-item label="学校地址">
			    <el-input v-model="schoolInfo.schoolAddr"></el-input>
			  </el-form-item>
			  <el-form-item label="学校手机">
			    <el-input v-model="schoolInfo.schoolMobile" :maxlength="maxLength"></el-input>
			  </el-form-item>
			  <el-form-item label="学校唯一码">
			    <el-input v-model="schoolInfo.schoolOnlyCode" readonly></el-input>
			  </el-form-item>
			  <el-form-item label="学校联系人">
			    <el-input v-model="schoolInfo.schoolContact"></el-input>
			  </el-form-item>
			  <el-form-item label="联系人手机">
			    <el-input v-model="schoolInfo.schoolContactMobile" :maxlength="maxLength"></el-input>
			  </el-form-item>
			  <el-form-item label="学校学科" prop="subjectArray">
			    <el-checkbox-group v-model="schoolInfo.subjectArray">
			      <el-checkbox label="语文" name="subjectArrays"></el-checkbox>
			      <el-checkbox label="数学" name="subjectArrays"></el-checkbox>
			      <el-checkbox label="英语" name="subjectArrays"></el-checkbox>
			      <el-checkbox label="物理" name="subjectArrays"></el-checkbox>
			      <el-checkbox label="化学" name="subjectArrays"></el-checkbox>
			      <el-checkbox label="生物" name="subjectArrays"></el-checkbox>
			      <el-checkbox label="历史" name="subjectArrays"></el-checkbox>
			      <el-checkbox label="政治" name="subjectArrays"></el-checkbox>
			      <el-checkbox label="地理" name="subjectArrays"></el-checkbox>
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
export default {
  data () {

    return {
      msg: 'schoolInfo',
      schoolInfo:{},
      maxLength:11,
      rules: {
          schoolName: [
            { required: true, message: '请输入考试名称', trigger: 'blur' }
          ],
          periodArray: [
            { type: 'array', required: true, message: '请至少选择一个学段', trigger: 'change' }
          ],
          subjectArray: [
            { type: 'array', required: true, message: '请至少选择一个学科', trigger: 'change' }
          ],
      }
    }
  },
  mounted:function(){
  	this.postHttp(this,{},"school/querySchools",function(obj,res){
  		if(res.result.periodArray == "" || res.result.periodArray == undefined){
  			res.result['periodArray'] = new Array();
  		}
  		if(res.result.subjectArray == "" || res.result.subjectArray == undefined){
  			res.result['subjectArray'] = new Array();
  		}
  		obj.schoolInfo = res.result;
  	})
  },
  methods:{
	updateSchool(){
		this.$refs['schoolInfo'].validate((valid) => {
          if (valid) {
          	delete this.schoolInfo["createDate"];
			delete this.schoolInfo["updateDate"];
			this.postHttp(this,this.schoolInfo,"school/updateSchool",function(obj,res){
		  		if(res.code == '10000'){
	  				obj.notify_success();
	  			}else{
	  				obj.notify_jr(obj,'操作错误',res.message,'error');
	  			}
		  	})
          } else {
            return false;
          }
        });
		
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