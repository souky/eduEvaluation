<template>
	<section class="page-demo" id="namePage">
	  <mt-cell title="手机号" class="hasTop"><span>13856542369</span>
	  </mt-cell>
	</section>
</template>

<script>
export default {
	data(){
		return{

		}
	},
	created:function(){
		this.$store.commit('newTitle','修改昵称');
		this.$store.commit('newTab','6')
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
</style>