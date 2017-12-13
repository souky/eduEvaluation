<template>
  <section class="page-demo">
    <div class="page-tabbar">  
    <div class="page-wrap"> 
  
    <!-- tabcontainer -->  
      <mt-tab-container class="page-tabbar-container" v-model="selected">  
        <mt-tab-container-item id="首页">  
           
           <div class="indexImg">
             <div class="mainImg">
               <mt-search cancel-text="取消" placeholder="搜索"></mt-search>
               <div class="showGread">
                   <p v-for="item in personalData"><span>{{item.name}} :</span> <span>{{item.gread}}</span></p>
               </div>
              <div class="mbtn">
                查看详细报告
              </div>
             </div>
           </div>
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
        <img slot="icon" src="">  
        首页  
      </mt-tab-item>  
      <mt-tab-item id="成绩">  
        <img slot="icon" src="">  
        成绩  
      </mt-tab-item>  
      <mt-tab-item id="资源">  
        <img slot="icon" src="">  
        资源  
      </mt-tab-item>  
      <mt-tab-item id="我的">  
        <img slot="icon" src="">  
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
  .mainImg{
      width: 100%;height: 0;padding-bottom: 82%;
      background-image: url(../static/img/APPImg/bg-s@1x.png);
      background-size: 100%
    }
  .mint-search{
      height: 40px;
    }
    .mint-searchbar{
      background-color: inherit;
    }
    .mint-searchbar-inner{
      height: 28px;
    }
    .mint-searchbar-cancel{
      color: white
    }
    .showGread{
      color: #553B08;
      font-size: 14px;
      text-align: center;
      margin-top: 29%
    }
    .mbtn{
      width: 35vw;
      height: 5vh;
      border: 1px solid #000;
      border-radius: 4px;
      background-color: #FF7070;
      color: white;
      font-size:14px;
      text-align: center;
      line-height: 5vh;
      
    }
</style>