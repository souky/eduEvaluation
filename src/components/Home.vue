<template>
	<div id="home" class="main_body">
		<div id="sasd" style="width: 600px;height:400px;"></div>
		asdasd
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
  	//判断cookie登陆信息初始化
  	this.echarts.init(document.getElementById("sasd")).setOption({
		series: {
            type: 'pie',
            data: [
                {name: 'A', value: 1212},
                {name: 'B', value: 2323},
                {name: 'C', value: 1919}
            ]
        }
	});
  },
  methods:{

  }
}
</script>

<style>
</style>