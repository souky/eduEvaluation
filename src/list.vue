<template>
  <section class="page-demo" id="pageDemo">
    <div class="page-tabbar" v-if="display.allInit">  
    <div class="page-wrap"> 
      <mt-tab-container class="page-tabbar-container" v-model="selected">  
        <mt-tab-container-item id="首页">  
           <div class="indexImg">
             <div class="mainImg">
              <div class="selceeds" @click="gotoselected()"></div>
               <mt-search cancel-text='' placeholder="搜索"></mt-search>
               <div class="tesrra">
                <el-carousel :interval="5000" indicator-position="none" arrow="always" :autoplay="false" @change="testChange($event)">
                  <el-carousel-item v-for="item in testList" :key="item.id" :name="item.examName"  >
                    <p class="alltest">{{item.examName}}</p>
                </el-carousel-item>
                </el-carousel>
                <div class="showGread">
                     <p v-for="item in personalData"><span>{{item.subject}} :</span> <span>{{item.score}}</span></p>
                 </div>
                </div>
                <div class="mbtn" @click="goKnowlegde(0)">
                  查看详细报告
                </div>
             </div>
           </div>
           <div class="l silderBox"><hr class="silider"><span class="l">金阳测评</span><hr class="silider"></div>
           <div class="gotoBox" @click="goKnowlegde(0)">
             <div class="gotoBoxs">
                  <img src="static/img/APPImg/bg@2x.png" />
                  <p>查看报告</p>
             </div>
           </div>
           <div class="gotoBox">
             <div class="gotoBoxs" @click="goKnowlegde(1)">
                  <img src="static/img/APPImg/zs@2x.png" />
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
            <mt-cell v-for="item in reportList" :key="item.id" :title="item.examName">
              <mt-button class="viewReport" @click="gotoReport(item.id)">查看报告</mt-button>
            </mt-cell>
          </div>
        </mt-tab-container-item>  
        <mt-tab-container-item id="资源"> 
          <div class="header-nav">
            <p>资源</p>
          </div> 
          <div id="knowPoint">
           <div class="point" v-for="item in subList" :key="item.id" @click="resources(item.subjectName)">
             <div class="points">
                  <img :src="item.imgName" />
                  <p>{{item.subjectName}}</p>
             </div>
           </div>
         </div>
        </mt-tab-container-item>  
        <mt-tab-container-item id="我的">
          <div class="myCenter">
            <div class="leftPart">
              <img src="static/img/APPImg/tx@2x.png" />
              <p>
                <span class="name">{{userName}}</span><br>
                <span class="studentClass">{{userClass}}</span><br>
                <span class="schoolClass">{{userSchool}}</span>
              </p>
              <i class="mint-cell-allow-right" @click="teds()"></i>
            </div>
            <div class="rightPart">
              
            </div>
          </div>
          <mt-cell title="客服电话" class="nomargin">
            <a href="tel:400-820-8856" class="kfcall"><span>400-820-8856</span></a>
            <img slot="icon" src="static/img/APPImg/kf@2x.png" width="24" height="24">
          </mt-cell>     
          <mt-cell title="帮助中心" to="/helping" is-link>
            <img slot="icon" src="static/img/APPImg/bz@2x.png" width="24" height="24">
          </mt-cell>
           <mt-cell title="设置" to="/setting" is-link>
            <img slot="icon" src="static/img/APPImg/sz@2x.png" width="24" height="24">
          </mt-cell>
        </mt-tab-container-item>  
      </mt-tab-container>  
    </div>  
    <mt-tabbar v-model="selected" fixed>  
      <mt-tab-item id="首页">  
        <img slot="icon" :src="selected=='首页'? 'static/img/APPImg/sy@2x.png':'static/img/APPImg/sy-o@2x.png'">  
        首页  
      </mt-tab-item>  
      <mt-tab-item id="成绩">  
        <img slot="icon" :src="selected=='成绩'? 'static/img/APPImg/cj@2x.png':'static/img/APPImg/cj-o@2x.png'">  
        成绩  
      </mt-tab-item>  
      <mt-tab-item id="资源">  
        <img slot="icon" :src="selected=='资源'? 'static/img/APPImg/zy@2x.png':'static/img/APPImg/zy-o@2x.png'">  
        资源  
      </mt-tab-item>  
      <mt-tab-item id="我的">  
        <img slot="icon" :src="selected=='我的'? 'static/img/APPImg/my@2x.png':'static/img/APPImg/my-o@2x.png'">  
        我的  
      </mt-tab-item>  
    </mt-tabbar>  
    </div>  
    <div class="page-select" v-if="!display.allInit">
      <div class="selectHead">
        <img src="/static/img/APPImg/rightfh@2x.png" @click="gotoselected()" />
        <input type="" name="" placeholder="科目" v-model="subselect" />
        <span @click="touchselect()">搜索</span>
      </div>
      <div class="selectBody">
        <div class="selectItem" @click="selectSub('语文')">语文</div>
        <div class="selectItem" @click="selectSub('数学')">数学</div>
        <div class="selectItem" @click="selectSub('英语')">英语</div>
        <div class="selectItem" @click="selectSub('物理')">物理</div>
        <div class="selectItem" @click="selectSub('化学')">化学</div>
        <div class="selectItem" @click="selectSub('生物')">生物</div>
      </div>
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
          allInit:true
        },
        loading:false,
        navs: [],
        examId:'',
        selected: '首页',
        selected1:'1',
        userName:'王二丫',
        userSchool:'金阳一中',
        userClass:'高三一班',
        personalData:[],
        subselect:'',
        testList:[{
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
      subList:[]
      };
    },

    created() {
      
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
      this.initAll()
    },
    methods:{
      teds(){
        this.$router.push({path:'/personal'})
      },
      gotoReport(e){
        this.$store.commit('newGread','1');
        this.$router.push({path:'/grade',query:{examId: e}})
      },
      resources(e){
        this.$router.push({path:'/resources',query:{examId:e}})
      },
      initAll(){
        this.postHttp(this,'',"exam/getExamListForTab",function(obj,data){
            obj.testList = [];obj.reportList=[];
             for(var value of data.result.exams){
                 obj.testList.push(value);
                 obj.reportList.push(value)
             }
             obj.examId = obj.testList[0].id;
             var needData = {tab:'STUDENT_REPORT',examId:data.result.exams[0].id,subject:'总分'};
             obj.postHttp(obj,needData,"score/geReportCards",function(objs,data){
              if(data.result =="该考试尚未制定双向细目表"||data.code=='20000'){

              }else{
                objs.personalData
                for(var i=0;i<data.result.scoreVOList.length;i++){
                    if(i<3)
                    objs.personalData.push(data.result.scoreVOList[i]);
                }
              }
              
              });
          });
        var pageSizes={pageNum:1,pageSize:0};
        this.postHttp(this,'',"subject/getSubjectByLogin",function(obj,data){
                for(var a of data.result){
                  a.imgName = "static/img/APPImg/"+a.subjectCode+".png"
                }
                obj.subList = data.result;
        });
        this.postHttp(this,'',"user/getLoginUser",function(obj,data){
              obj.userName = data.result.name;
              obj.userSchool = data.result.orgName;
        });
      },
      testChange(e){
        this.examId = this.testList[e].id;
        var needData = {tab:'STUDENT_REPORT',examId:this.testList[e].id,subject:'总分'};
        this.postHttp(this,needData,"score/geReportCards",function(objs,data){
              if(data.result =="该考试尚未制定双向细目表"||data.code=='20000'){

              }else{
                objs.personalData=[]
                for(var i=0;i<data.result.scoreVOList.length;i++){
                    if(i<3)
                    objs.personalData.push(data.result.scoreVOList[i]);
                }
              }
              
              });
        var pageSizes={pageNum:1,pageSize:0};
        this.postHttp(this,'',"subject/getSubjectByLogin",function(obj,data){
                for(var a of data.result){
                  a.imgName = "static/img/APPImg/"+a.subjectCode+".png"
                }
                obj.subList = data.result;
        });
      },
      goKnowlegde(e){
        if(e==0){
          var s = this.examId;
          this.$store.commit('newGread','2');
          this.$router.push({path:'/grade',query:{examId: s}});
        }
        if(e==1){
          
          this.$router.push({path:'/homeknowlegde'})
        }
      },
      gotoselected(){
        this.display.allInit=!this.display.allInit;
        this.subselect = ''
      },
      selectSub(e){
        this.display.allInit=true;
        this.$router.push({path:'/gread',query:{examsub: e}});
      },
      touchselect(){
        this.display.allInit=true;
        var s = this.subselect;
        this.$router.push({path:'/gread',query:{examsub: s}});
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
  #pageDemo .selceeds{
    height: 11vw;
    position: absolute;
    top: 5px;
    width: 100%;
    z-index: 999;
  }
  #pageDemo .page-wrap{
    padding-bottom: 20px
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
      background-image: url(static/img/APPImg/bg-s@2x.png);
      background-size: 100%;
      position: relative;
    }
    .tesrra{
        position: absolute;
        top: 12vw;
        width: 100%;
    }
  #pageDemo .mint-search{
      height: 11vw;position: absolute;top: 5px;width: 100%
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
      margin-top: 20%
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
      padding:8px 20px;
      border: 1px solid #000;
      border-radius: 8px;
      background-color: #FF7070;
      color: white;
      font-size: 3vw;
      text-align: center;
      position: absolute;
      bottom: 4vw;
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
      border:0;
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
    /*#pageDemo .swiper-button-prev{
      left: 5vw;
      background-image: url(../static/img/APPImg/left@1x.png);
      background-size: 100%;
    }
    #pageDemo .swiper-button-next{
      right: 5vw;
      background-image: url(../static/img/APPImg/right@1x.png);
      background-size: 100%;
    }*/
    #pageDemo .el-carousel__container{
      text-align: center;
      line-height: 10vw;
      height: 10vw
    }
    #pageDemo .el-carousel__arrow{
      width: 7vw;
      height: 7vw;
      font-size: 4vw
    }
    #pageDemo .viewReport{
      font-size: 3vw;
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
      font-size: 4vw;
      background-size: 120% 0px
    }
    #pageDemo .mint-cell:last-child{
       background-size: 100% 0px
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
      width: 100%
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
    .selectHead{
      height: 11vw;
      background-color: white;
      line-height: 11vw;
      padding-top: 5px
    }
    .selectHead img{
      height: 7vw;
      vertical-align: middle;
      padding:0 1vw;
    }
    .selectHead input{
      height: 8vw;
      border:1px solid #eee;
      border-radius: 8px;
      width: 72%;
      padding-left: 10px;
      outline: 0;
      font-size: 4vw
    }
    .selectHead span{
      display: inline-block;
      text-align: center;
      color:#19AFFF;
    }
    .selectItem{
      border:1px solid #19Afff;
      border-radius: 5px;
      padding: 5px 15px;
      display: inline-block;
      color: #19Afff;
      background-color: white;
      margin: 10px 10px 5px 10px
    }
    .selectBody{
      width: 100%;
      float: left;
      padding: 10px;
      background-color: white
    }
</style>