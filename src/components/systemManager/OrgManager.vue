<template>
	<div id="orgManager" class="main_body">
		<div class="org_body fix">
			<div class="left_part l">
				<div class="title">机构树</div>
				<el-tree :data="data" :props="defaultProps" accordion @node-click="handleNodeClick"></el-tree>
			</div>
			<div class="right_part r">
				<div class="title">机构详细</div>
			</div>
		</div>
	</div>
	
</template>

<script>
import OrgManager from '../../assets/systemManagerData/OrgManager'
export default {
  data () {

    return {
        msg: 'orgManager',
        data:OrgManager.data,
        defaultProps: {
	        children: 'children',
	        label: 'label'
	    }
    }
  },
  mounted:function(){
  },
  methods:{
	handleNodeClick(data){
		
	}
  }
}
</script>

<style>
#orgManager .org_body{
	width:90%;
	margin:20px auto;
}
#orgManager .left_part{
	width: 30%;
}
#orgManager .left_part .title{
	width: 100%;
	text-align: center;
	cursor: default;
}
#orgManager .right_part{
	width: 65%;
}
#orgManager .right_part .title{
	width: 100%;
	text-align: center;
	cursor: default;
}
</style>