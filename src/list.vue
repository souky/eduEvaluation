<template>
  <section class="page-demo">
    <div class="page-tabbar">  
    <div class="page-wrap">  
      <div class="page-title">Tabbar</div>  
      <div>  
        <mt-cell class="page-part" title="当前选中" :value="selected" />  
      </div>  
  
    <!-- tabcontainer -->  
      <mt-tab-container class="page-tabbar-container" v-model="selected">  
        <mt-tab-container-item id="外卖">  
          <mt-cell v-for="n in 10" :title="'餐厅 ' + n" />  
        </mt-tab-container-item>  
        <mt-tab-container-item id="订单">  
          <mt-cell v-for="n in 5" :title="'订单 ' + n" />  
        </mt-tab-container-item>  
        <mt-tab-container-item id="发现">  
          <mt-cell v-for="n in 7" :title="'发现 ' + n" />  
        </mt-tab-container-item>  
        <mt-tab-container-item id="我的">  
          <div class="page-part">  
           <!-- cell -->  
            <mt-cell v-for="n in 12" :title="'我的 ' + n" />  
          </div>  
          <router-link to="/">  
           <!-- button -->   
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
</style>

<script type="text/babel">
  import { navs } from './router/index';

  export default {
    data() {
      return {
        navs: [],
        selected: '外卖'
      };
    },

    created() {
      this.navs = navs;
    }
  };
</script>
