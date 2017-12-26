<template>
	<section class="page-demo" id="namePage">
	  <mt-field class="hasTop hasbottom" :placeholder="oldnickname" type="text" v-model="nickname">
	  	
	  </mt-field>
	  <div class="comformBtn hasTop">
	  	<mt-button type="primary" size="large" @click="comformfile">确认修改</mt-button>
	  </div>
	</section>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
	data(){
		return{
			nickname:'',
			oldnickname:'丫丫'
		}
	},
	created:function(){
		this.$store.commit('newTitle','修改昵称');
		this.$store.commit('newTab','6')
	},
	mounted:function(){

	},
	methods:{
		comformfile(){
			let instance = Toast('修改成功');
			setTimeout(() => {
				  instance.close();
				  this.$router.push({path:'/personal'})
				}, 2000);
			
		}
	}
}
</script>
<style>
#namePage{
	padding-top: 7vh
}
#namePage .mint-cell-wrapper{
    border-bottom: 1px solid #f5f5f5;font-size: 4vw
}
#namePage .hasTop{
	margin-top:2vh
}
#namePage .mint-cell-allow-right::after{
      top:inherit;width: 1.5vh;height: 1.5vh
    }
#namePage .comformBtn{
	width: 90vw;
	margin:2vh 5vw;
	
}
#namePage .comformBtn button{
	font-size: 4vw
}
</style>