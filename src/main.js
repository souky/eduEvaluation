import Vue from 'vue'
import App from './App'
import routes from './router/index'

import VueRouter from 'vue-router'
import ElementUI from 'mint-ui'
import ElementUIS from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'mint-ui/lib/style.css'
import 'swiper/dist/css/swiper.min.css'
import 'swiper/dist/js/swiper.min.js'
import '../static/css/main.css'
import '../static/css/apps.css'
import axios from 'axios'
import Vuex from 'vuex'
import store from './vuex/store'


/* vue配置 */
Vue.config.debug = process.env.NODE_ENV !== 'production'
Vue.config.productionTip = false

/* 附加插件 */
Vue.use(ElementUIS)
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(Vuex)

document.addEventListener('DOMContentLoaded', function() {
  if (window.FastClick) window.FastClick.attach(document.body);
}, false);
/* axios配置 */
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$axios = axios

/* 时间转化 */
Vue.prototype.timeF = require('moment');
Vue.prototype.echarts = require('echarts');

var querystring = require('querystring');

var baseUrl = "http://192.168.1.233:8080/edu-system/"
/* 
 * 封装ajax
 * obj : 全局this
 * data : ajax传入后台data数据
 * address : ajax接口地址
 * fn : 成功返回方法  带参数  obj,data  obj : this data : response
 * */
Vue.prototype.postHttp = function(obj,data,address,fn){
	obj.$axios.post(baseUrl+address,querystring.stringify(data),{withCredentials : true}).then(response => {
  		if(response.data.code == "60000" || response.data.code == "50000"){
  			obj.dialogFormVisible = true;
  		}else{
  			fn(obj,response.data);
  		}
    },response => {
    	obj.loading = false;
		obj.$notify({
	      title: '网络错误',
	      message: '网络错误',
	      offset: 100,
	      duration:1500,
	      type:'error'
	    });
	})
}

/* 
 * 封装提示
 * obj : 全局this
 * title : 标题
 * message : 提示内容
 * type : 提示类型  success warning error
 * */
Vue.prototype.notify_jr = function(obj,title,message,type){
	obj.$notify({
      title: title,
      message: message,
      offset: 100,
      duration:1500,
      type:type
    });
}

/* 
 * 封装未登录提示
 * */
Vue.prototype.notify_login = function(){
	this.$notify({
      title: '提示',
      message:'请先登录',
      offset: 100,
      duration:1500,
      type:'warning'
    });
}

Vue.prototype.getBaseUrl = function(){
	return baseUrl;
}


/* 
 * 视频时间转化 毫秒转为时分
 * msec : 毫秒值
 * */
Vue.prototype.formatMsec = function(msec){
	var regNum = /^[0-9]*$/;
	var s = '';
	if(msec && regNum.test(msec)){
		var second = parseInt(parseFloat(msec) / 1000);
		var minute = Math.ceil(second / 60);
		if(minute > 60){
			var hours = Math.floor(minute / 60);
			var minute_s = minute % 60;
			s = hours + '小时' + minute_s + '分钟'
		}else{
			s = minute + '分钟';
		}
	}
	return s;
}
const router = new VueRouter({
  base: __dirname,
  routes
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
let indexScrollTop = 0;
router.beforeEach((route, redirect, next) => {
  if (route.path !== '/') {
    indexScrollTop = document.body.scrollTop;
  }
  document.title = route.meta.title || document.title;
  next();
});

router.afterEach(route => {
  if (route.path !== '/') {
    document.body.scrollTop = 0;
  } else {
    Vue.nextTick(() => {
      document.body.scrollTop = indexScrollTop;
    });
  }
});
