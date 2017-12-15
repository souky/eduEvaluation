<template>
  <section class="page-demo">
    <div class="page-tabbar">  
    <div class="page-wrap"> 
      <mt-tab-container class="page-tabbar-container" v-model="selected">  
        <mt-tab-container-item id="首页">  
           <div class="indexImg">
             <div class="mainImg">
               <mt-search cancel-text='' placeholder="搜索"></mt-search>
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
          <mt-cell v-for="n in 5" :title="'订单 ' + n" />  
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

<script type="text/babel">
  import { navs } from './router/index';

  export default {
    data() {
      return {
        navs: [],
        selected: '首页',
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
        }]
      };
    },

    created() {
      this.navs = navs;
    }
  };
</script>
<style>
  .page-demo {
    padding-bottom: 50px;
    
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
  .indexImg{
    width: 100%;
    
  }
  .mint-tabbar{background-size: 100% 0;}
  .mint-tab-container-item{
    background-color: white;position: relative;
  }
  .mint-tab-item{color:#c5c5c5;}
  .mint-tab-item-label{
    font-size: 4vw;
  }
  .mainImg{
      width: 100%;height: 0;padding-bottom: 82%;
      background-image: url(../static/img/APPImg/bg-s@1x.png);
      background-size: 100%;
      position: relative;
    }
  .mint-search{
      height: 6vh;
    }
    .mint-searchbar{
      background-color: inherit;height: 100%
    }
    .mint-searchbar-inner{
      height: inherit;background-color: rgba(0,0,0,.4);
    }
    .mint-searchbar-cancel{
      color: white
    }
    .showGread{
      color: #553B08;
      text-align: center;
      margin-top: 29%
    }
    .mint-searchbar-core{
      background-color: rgba(0,0,0,0);
    }
    .mbtn{
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
    .silderBox{
      width: 94%;
      margin: 5% 3%;
      color: #19AFFF;
    }
    .silderBox span{
      width: 28.5%;
      text-align: center;
    }
    .silider{
      float: left;
      width: 35%;
      border-top:1px solid #19AFFF;
    }
    .gotoBox{
      width: 50%;
      float: left;
    }
    .gotoBoxs{
      width: 90%;height: 0;padding-bottom: 90%;
      margin:5% 2.5% 5% 5%;
      background-color: #FCFCFC;
      border-radius: 4px
    }
    .gotoBox:nth-child(even) .gotoBoxs{
        margin:5% 5% 5% 2.5%;
    }
    .gotoBoxs img{
      width: 50%;
      margin:10% 25%;
    }
    .gotoBoxs p{
      text-align: center;color: #666666
    }
    .bottomWord{
      text-align: center;
      color: #BCBCBC
    }
</style>