<template>
	<section class="page-demo" id="helpingPage">
	  <img src="/static/img/APPImg/helping.png" style="width:100%">
	</section>
</template>
<script>
export default {
	data(){
		return{

		}
	},
	created:function(){
		this.$store.commit('newTitle','帮助中心');
		this.$store.commit('newTab','4')
	}
}
</script>
<style>
#helpingPage{
	padding-top: 42px
}
#helpingPage p{
   background-color: white;text-indent:2em;padding: 2vh
}
</style>