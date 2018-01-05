<template>
	<section class="page-demo" id="personPage">
	  <mt-cell title="头像" class="hasTop">
	  	<span><img src="static/img/APPImg/tx@2x.png" height="60" width="60" /></span>
	  </mt-cell>
	  <mt-cell title="用户名" ><span>{{username}}</span>
	  </mt-cell>
	  <!-- <mt-cell title="用户昵称" class="hasTop" to="/fixname" is-link>
	  	<span>{{nickname}}</span>
	  </mt-cell> -->
	  <mt-cell title="学校"><span>{{userSchool}}</span>
	  </mt-cell>
	  <mt-cell title="班级"><span>{{userClass}}</span>
	  </mt-cell>
	</section>
</template>
<script>
export default {
	data(){
		return{
			username:'丫丫',
			userSchool:'金阳一中',
			userClass:'高三一班',
			nickname:'丫丫'
		}
	},
	created:function(){
		this.$store.commit('newTitle','个人资料');
		this.$store.commit('newTab','4')
	},
    methods:{
		initAll(){
    		this.postHttp(this,'',"user/getLoginUser",function(obj,data){
              obj.username = data.result.name;
              obj.userSchool = data.result.orgName;
        	});
    	}
    },
    mounted(){
    	this.initAll()
    }
}
</script>
<style>
#personPage{
	padding-top: 7vh
}
#personPage .mint-cell-wrapper{
    border-bottom: 1px solid #f5f5f5;font-size: 4vw;
    background-size: 120% 0px
}
#personPage .mint-cell-wrapper img{
	padding:10px 0;
}
#personPage .hasTop{
	margin-top:2vh
}
#personPage .mint-cell-allow-right::after{
      top:inherit;width: 1.5vh;height: 1.5vh
    }
</style>