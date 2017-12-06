<template>
	<div id="home" class="main_body">
		home
	</div>
	
</template>

<script>
export default {
  data () {

    return {
      msg: '顶部导航栏',
    }
  },
  mounted:function(){
  	this.postHttp(this,{},'school/querySchools',function(){
  		
  	})
  },
  methods:{

  }
}
</script>

<style>
</style>