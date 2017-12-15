<template>
  <section class="page-demo" id="pageDemo">
    <div class="page-tabbar">  
    <div class="page-wrap"> 
      <mt-tab-container class="page-tabbar-container" v-model="selected">  
        <mt-tab-container-item id="首页">  
           <div class="indexImg">
             <div class="mainImg">
               <mt-search cancel-text='' placeholder="搜索"></mt-search>
                <div class="swiper-container" id="swiperTest">
                  <div class="swiper-wrapper">
                      <div class="swiper-slide" v-for="item in testList" :key="item.id">{{item.name}}</div>
                  </div>
                  <!-- 如果需要导航按钮 -->
                  <div class="swiper-button-prev"></div>
                  <div class="swiper-button-next"></div>
              </div>
              <div class="showGread">
                   <p v-for="item in personalData"><span>{{item.name}} :</span> <span>{{item.gread}}</span></p>
               </div>
              <div class="mbtn">
                查看详细报告
              </div>
             </div>
           </div>
           <div class="l silderBox"><hr class="silider"><span class="l">金阳测评</span><hr class="silider"></div>
           <div class="gotoBox">
             <div class="gotoBoxs">
                  <img src="../static/img/APPImg/bg@2x.png" />
                  <p>查看报告</p>
             </div>
           </div>
           <div class="gotoBox">
             <div class="gotoBoxs">
                  <img src="../static/img/APPImg/zs@2x.png" />
                  <p>知识点</p>
             </div>
           </div>
           <p class="bottomWord">提升教学质量从这里开始</p>
        </mt-tab-container-item>  
        <mt-tab-container-item id="成绩">  
           <mt-header title="成绩报告">
           </mt-header>
            
        </mt-tab-container-item>  
        <mt-tab-container-item id="资源">  
          <mt-cell v-for="n in 7" :title="'发现 ' + n" />  
        </mt-tab-container-item>  
        <mt-tab-container-item id="我的">  
          <div class="page-part">  
           <!-- cell -->  
            <mt-cell v-for="n in 12" :title="'我的 ' + n" />  
          </div>  
          <router-link to="/">  
           <mt-button type="danger" size="large">退出</mt-button>  
          </router-link>  
        </mt-tab-container-item>  
      </mt-tab-container>  
    </div>  
  
    <mt-tabbar v-model="selected" fixed>  
      <mt-tab-item id="首页">  
        <img slot="icon" :src="selected=='首页'? '../static/img/APPImg/sy@1x.png':'../static/img/APPImg/sy-o@1x.png'">  
        首页  
      </mt-tab-item>  
      <mt-tab-item id="成绩">  
        <img slot="icon" :src="selected=='成绩'? '../static/img/APPImg/cj@1x.png':'../static/img/APPImg/cj-o@1x.png'">  
        成绩  
      </mt-tab-item>  
      <mt-tab-item id="资源">  
        <img slot="icon" :src="selected=='资源'? '../static/img/APPImg/zy@1x.png':'../static/img/APPImg/zy-o@1x.png'">  
        资源  
      </mt-tab-item>  
      <mt-tab-item id="我的">  
        <img slot="icon" :src="selected=='我的'? '../static/img/APPImg/my@1x.png':'../static/img/APPImg/my-o@1x.png'">  
        我的  
      </mt-tab-item>  
    </mt-tabbar>  
    </div>  

    <!-- <div v-for="group in navs">
      <div class="page-title" v-text="group.title"></div>
      <mt-cell
        v-for="item in group.list"
        :to="item.path"
        is-link>
        <div slot="title">
          <i :class="['indexicon', 'icon-' + item.icon]"></i>
          <span>{{ item.name }}</span>
        </div>
      </mt-cell>
    </div> -->
  </section>
</template>
<style type="text/css">
  #topNav {
  width: 100%;
  overflow: hidden;
  font: 16px/32px hiragino sans gb, microsoft yahei, simsun;
  border-bottom:1px solid #f8f8f8;
}
#topNav .swiper-slide {
  padding: 0 5px;
  letter-spacing:2px;
  width:3rem;
  text-align:center;
}
#topNav .swiper-slide span{

  transition:all .3s ease;
  display:block;
}
#topNav .active span{
  transform:scale(1.1);
  color:#FF2D2D;
}
</style>
<script type="text/babel">
  import { navs } from './router/index';

  export default {
    data() {
      return {
        navs: [],
        selected: '首页',
        selected1:'1',
        personalData:[{
          name:'总成绩',
          gread:'584'   
        },{
          name:'语文',
          gread:'94'   
        },{
          name:'数学',
          gread:'129'   
        },{
          name:'理综合',
          gread:'256'   
        }],
        testList:[{
          id:'1',
          name:'2017年金阳高中期末考试'
        },{
          id:'2',
          name:"2016年金阳高中期末考试"
        },{
          id:'3',
          name:"2015年金阳高中期末考试"
        },{
          id:'4',
          name:"2014年金阳高中期末考试"
        },{
          id:'5',
          name:"2013年金阳高中期末考试"
        }]
      };
    },

    created() {
      this.navs = navs;
    },
    mounted(){
      this.lunbo();this.lubo1();
    },
    methods:{
      lunbo(){
        new Swiper('#swiperTest', {
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 10,
          grabCursor: true,
          initialSlide: 1,
          autoplayDisableOnInteraction: false
        })
      }
    }
  };
</script>
<style>
  #pageDemo {
    padding-bottom: 10vh;
    .indexicon {
      font-size: 22px;
      color: #26a2ff;
      display: inline-block;
      width: 30px;
      vertical-align: middle;

      &.icon-swipe {
        font-size: 26px;
      }

      &.icon-checklist {
        font-size: 18px;
      }
    }
  }
  #pageDemo .indexImg{
    width: 100%;
    
  }
  #pageDemo .mint-tabbar{background-size: 100% 0;}
  #pageDemo .mint-tab-container-item{
    background-color: white;position: relative;
  }
  #pageDemo .mint-tab-item{color:#c5c5c5;}
  #pageDemo .mint-tab-item-label{
    font-size: 4vw;
  }
  #pageDemo .mainImg{
      width: 100%;height: 0;padding-bottom: 82%;
      background-image: url(../static/img/APPImg/bg-s@1x.png);
      background-size: 100%;
      position: relative;
    }
  #pageDemo .mint-search{
      height: 6vh;display: flex;
    }
  #pageDemo .mint-searchbar{
      background-color: inherit;height: 100%;width: 100%
    }
  #pageDemo .mint-searchbar-inner{
      height: inherit;background-color: rgba(0,0,0,.4);

    }
  #pageDemo .mint-searchbar-cancel{
      color: white
    }
  #pageDemo .showGread{
      color: #553B08;
      text-align: center;
      margin-top: 22%
    }
  #pageDemo .mint-searchbar-core{
      background-color: rgba(0,0,0,0);color: white;
      font-size: 4vw
    }
  #pageDemo.mint-searchbar-inner .mintui-search{
      font-size: 4vw
    }
  #pageDemo .mint-searchbar-cancel{
      display: none;
    }
  #pageDemo .mint-tabbar > .mint-tab-item.is-selected{
    color: #26a2ff 
  }
  #pageDemo .mbtn{
      width: 38vw;
      height: 4vh;
      border: 1px solid #000;
      border-radius: 8px;
      background-color: #FF7070;
      color: white;
      font-size: 3vw;
      text-align: center;
      line-height: 4vh;
      position: absolute;
      bottom: 2vh;
      right: 15vw
    }
  #pageDemo .silderBox{
      width: 94%;
      margin: 5% 3%;
      color: #19AFFF;
    }
  #pageDemo .silderBox span{
      width: 28.5%;
      text-align: center;
    }
  #pageDemo .silider{
      float: left;
      width: 35%;
      border-top:1px solid #19AFFF;
    }
  #pageDemo .gotoBox{
      width: 50%;
      float: left;
    }
  #pageDemo .gotoBoxs{
      width: 90%;height: 0;padding-bottom: 90%;
      margin:5% 2.5% 5% 5%;
      background-color: #FCFCFC;
      border-radius: 4px
    }
  #pageDemo .gotoBox:nth-child(even) .gotoBoxs{
        margin:5% 5% 5% 2.5%;
    }
  #pageDemo .gotoBoxs img{
      width: 50%;
      margin:10% 25%;
    }
  #pageDemo .gotoBoxs p{
      text-align: center;color: #666666
    }
  #pageDemo .bottomWord{
      text-align: center;
      color: #BCBCBC;
      width: 100%;
      float: left;
      padding-top: 10px;
      background-color: #f5f5f5;
    }
    #pageDemo .swiper-button-prev{
      left: 5vw;
      background-image: url(../static/img/APPImg/left@1x.png);
      background-size: 100%;
    }
    #pageDemo .swiper-button-next{
      right: 5vw;
      background-image: url(../static/img/APPImg/right@1x.png);
      background-size: 100%;
    }
    #pageDemo .swiper-container{
      text-align: center;
      line-height: 5vh
    }

</style>