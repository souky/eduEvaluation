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
          <div class="header-nav">
            <p>成绩报告</p>
          </div>
           <div id="grade">
           <div class="grade-nav">
              <div v-show="display.subject" ref="fristBit" v-for="item in subjectLsit" :data-id="item.id" class="grade-nav-bit" @click="subjectButton($event)">
                <p>{{item.name}}</p>
              </div>
              <div v-show="display.allSubject" class="grade-nav-bit1">
                <p>全部分类</p>
              </div>
              <div class="grade-navMore">
                <div class="grade-navMore-bit">
                  <span @click="allButton($event)"><img class="grade-navMore-bitImg" src="../static/img/APPImg/gfh@1x.png" alt=""></span>
                </div>
              </div>
            </div>
            <div v-show="display.allSubject" class="grade-nav-more">
              <div class="Gnav-moreConment">
                <div class="Gnav-moreConment-bit" v-for="item in subject">
                  <p>{{item.name}}</p>
                </div>
                <div class="cl"></div>
              </div>
            </div>
          </div>
            <mt-cell v-for="item in reportList" :key="item.id" :title="item.name">
              <mt-button class="viewReport" @click="gotoReport">查看报告</mt-button>
            </mt-cell>
        </mt-tab-container-item>  
        <mt-tab-container-item id="资源"> 
          <div class="header-nav">
            <p>知识点</p>
          </div> 
          <div id="knowPoint">
           <div class="point">
             <div class="points">
                  <img src="../static/img/APPImg/yw@1x.png" />
                  <p>语文</p>
             </div>
           </div>
           <div class="point">
             <div class="points">
                  <img src="../static/img/APPImg/sx@1x.png" />
                  <p>数学</p>
             </div>
           </div>
           <div class="point">
             <div class="points">
                  <img src="../static/img/APPImg/yy@1x.png" />
                  <p>英语</p>
             </div>
           </div>
           <div class="point">
             <div class="points">
                  <img src="../static/img/APPImg/wl@1x.png" />
                  <p>物理</p>
             </div>
           </div>
           <div class="point">
             <div class="points">
                  <img src="../static/img/APPImg/hy@1x.png" />
                  <p>化学</p>
             </div>
           </div>
           <div class="point">
             <div class="points">
                  <img src="../static/img/APPImg/sw@1x.png" />
                  <p>生物</p>
             </div>
           </div>
           <div class="point">
             <div class="points">
                  <img src="../static/img/APPImg/ls@1x.png" />
                  <p>历史</p>
             </div>
           </div>
           <router-link to="/">
           <div class="point">
             <div class="points">
                  <img src="../static/img/APPImg/dl@1x.png" />
                  <p>地理</p>
             </div>
           </div>
          </router-link>
           <div class="point">
             <div class="points">
                  <img src="../static/img/APPImg/zh@1x.png" />
                  <p>政治</p>
             </div>
           </div>
         </div>
        </mt-tab-container-item>  
        <mt-tab-container-item id="我的">
          <div class="myCenter">
            <div class="leftPart">
              <img src="../static/img/APPImg/tx@1x.png" />
              <p>
                <span class="name">王二吖</span><br>
                <span class="studentClass">高三一班</span><br>
                <span class="schoolClass">金阳一中</span>
              </p>
              <i class="mint-cell-allow-right" @click="teds()"></i>
            </div>
            <div class="rightPart">
              
            </div>
          </div>
          <mt-cell title="客服电话" class="nomargin">
            <a href="tel:400-820-8856" class="kfcall"><span>400-820-8856</span></a>
            <img slot="icon" src="../static/img/APPImg/kf@1x.png" width="24" height="24">
          </mt-cell>     
          <mt-cell title="帮助中心" to="/helping" is-link>
            <img slot="icon" src="../static/img/APPImg/bz@1x.png" width="24" height="24">
          </mt-cell>
           <mt-cell title="设置" to="/setting" is-link>
            <img slot="icon" src="../static/img/APPImg/sz@1x.png" width="24" height="24">
          </mt-cell>
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
<script type="text/babel">
  import { navs } from './router/index';

  export default {
    data() {
      return {
        display:{
          subject:true,
          allSubject:false,
        },
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
        }],
        reportList:[{
          id:'1',
          name:'金阳一中高三年级2017年期末考试'
        },{
          id:'2',
          name:'金阳一中高三年级2016年期末考试'
        },{
          id:'3',
          name:'金阳一中高三年级2015年期末考试'
        },{
          id:'4',
          name:'金阳一中高三年级2014年期末考试'
        }],
        subjectLsit:[],
      subject:[{
        id:1,
        name:'总分',
      },{
        id:2,
        name:'数学',
      },{
        id:3,
        name:'英语',
      },{
        id:4,
        name:'物理',
      },{
        id:5,
        name:'化学',
      },{
        id:6,
        name:'语文',
      },{
        id:7,
        name:'生物',
      },{
        id:8,
        name:'历史',
      },{
        id:9,
        name:'地理',
      },{
        id:10,
        name:'政治',
      }]
      };
    },

    created() {
      this.navs = navs;
      for(var i=0;i<5;i++){
        this.subjectLsit.push(this.subject[i]);
      }
    },
    computed:{
    },
    mounted(){
      if(this.$store.state.label=='4'){
        this.selected='我的'
      }
      if(this.$store.state.label=='3'){
        this.selected='资源'
      }
      if(this.$store.state.label=='2'){
        this.selected='成绩'
      }
      if(this.$store.state.label=='1'){
        this.selected='首页'
      }
      this.lunbo();this.$refs.fristBit[0].className+=" navOn";

    },
    methods:{
      subjectButton:function(e){
        for(var i=0;i<e.currentTarget.parentNode.getElementsByClassName("grade-nav-bit").length;i++){
          e.currentTarget.parentNode.getElementsByClassName("grade-nav-bit")[i].className="grade-nav-bit";
        }
        e.currentTarget.className+=" navOn";
      },
      allButton:function(e){
        if(e.currentTarget.childNodes[0].className=="grade-navMore-bitImg"){
          e.currentTarget.childNodes[0].className="grade-navMore-bitImg1"
        }else{
          e.currentTarget.childNodes[0].className="grade-navMore-bitImg"
        }
        this.display.subject=!this.display.subject;
        this.display.allSubject=!this.display.allSubject;
      },
      lunbo(){
        new Swiper('#swiperTest', {
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 10,
          grabCursor: true,
          initialSlide: 1,
          autoplayDisableOnInteraction: false
        });

      },
      teds(){
        this.$router.push({path:'/personal'})
      },
      gotoReport(){
        this.$router.push({path:'/grade'})
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
    #pageDemo .viewReport{
      font-size: 2vw;
      padding:1vw 3vw;
      background-color: white;
      border:1px solid #19AFFF;
      border-radius: 3vw;
      color: #19AFFF;
      height: inherit;
    }
    #pageDemo .mint-cell{
      background-color: #f5f5f5;
    }
    #pageDemo .mint-cell-wrapper{
      background-color: white;
      margin-bottom: 2vh;
      font-size: 4vw
    }
    #pageDemo .margintop .mint-cell-wrapper{
      margin-bottom: 0;
      margin-top: 2vh;
      border-bottom: 1px solid #f5f5f5
    }
    #pageDemo .nomargin .mint-cell-wrapper{
      margin-bottom: 0;
      margin-top: 2vh;
      border-bottom: 1px solid #f5f5f5
    }
    #pageDemo .point{
      width: 33.3%;
      float: left;
    }
  #pageDemo .points{
      width: 90%;height: 0;padding-bottom: 90%;
      margin:5% 2.5% 5% 5%;
      border-radius: 4px;
      text-align: center;
    }
    #pageDemo .points img{
      padding-top:5vw;
    }
    #pageDemo .mint-cell-allow-right::after{
      top:inherit;width: 1.5vh;height: 1.5vh
    }
    #pageDemo .myCenter .mint-cell-allow-right::after{
      top: 50%;
      border-color: white
    }
    #pageDemo .kfcall{
      color: #19AFFF;
      text-decoration:none;
    }
    #pageDemo .myCenter{
      padding:5vh 5vw;position: relative;
      background-color: #19AFFF;
    }
    #pageDemo .myCenter img{
      margin-right: 2vw
    }
    #pageDemo .myCenter p{
      display:inline-block;color:white;vertical-align: top;
    }
    #pageDemo .myCenter p span{
        display: inline-block;
        margin-bottom: 0.5vh;
    }
    #knowPoint{
      float: left;
      margin-top: 7vh;
    }
    #grade{
      overflow: hidden;
      margin-top: 7vh;border-bottom: 1px solid #f5f5f5;
    } 
    #grade .grade-nav{
      width: 100%;
      height: 48px;
    }
    .grade-nav-bit{
      width: 11%;
      height: 100%;
      margin-left: 5%;
      float: left;
    }
    .grade-nav-bit1{
      width: 70%;
      height: 100%;
      margin-left: 5%;
      float: left;
    }
    .grade-nav-bit p{
      text-align: center;
      line-height: 45px;
    }
    .grade-nav-bit1 p{
      line-height: 45px;
    }
    .grade-navMore{
      height: 100%;
      width: 15%;
      float: right;
    }
    .navOn{
      border-bottom: 2px solid #19AFFF;
    }
    .grade-navMore-bit{
      width: 100%;
      height: 80%;
      margin-top: 5px;
      border-left:1px solid #C4C4C4;
      text-align: center;
    }
    .grade-navMore-bit .grade-navMore-bitImg{
      margin-top:10px;
      transform:rotate(-90deg);
      -ms-transform:rotate(-90deg);   /* IE 9 */
      -moz-transform:rotate(-90deg);  /* Firefox */
      -webkit-transform:rotate(-90deg); /* Safari 和 Chrome */
      -o-transform:rotate(-90deg);  /* Opera */
    }
    .grade-navMore-bit .grade-navMore-bitImg1{
      margin-top:10px;
      transform:rotate(90deg);
      -ms-transform:rotate(90deg);  /* IE 9 */
      -moz-transform:rotate(90deg);   /* Firefox */
      -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
      -o-transform:rotate(90deg);   /* Opera */
    }
    .grade-nav-more{
      width: 100%;
      height: auto;
      position: fixed;
      z-index: 999;
      background-color: rgb(245, 245, 245);
    }
    .Gnav-moreConment{
      width: 85%;
      margin: auto
    }
    .Gnav-moreConment-bit{
      width: 20%;
      height: 40px;
      margin-right: 5%;
      margin-top: 10px;
      float: left;
    }
    .Gnav-moreConment-bit p{
      text-align: center;
      margin-top: 10px;
    }
</style>