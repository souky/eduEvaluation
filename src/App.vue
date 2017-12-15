<template>
  <div class="main">
    <div class="header-nav" v-if="visible">
      <span @click="header"><img src="../static/img/header/fh@1x.png" alt=""></span>
      <p>{{$store.state.title}}</p>
    </div>
    <router-view></router-view>
  </div>
</template>

<style>
  @reset-global mobile;

  html, body {
    background-color: #fafafa;
    -webkit-overflow-scrolling: touch;
    user-select: none;
  }
  ul {list-style:none;margin:0px;}
  a {
    color: inherit;
  }
  .main{
    overflow: hidden;
  }
  .header-nav{
    width: 100%;
    background-color: #19AFFF;
    text-align: center;
    position: absolute;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .header-nav p{
    font-size: 1.125rem;
    color: #FFFFFF;
    letter-spacing: 0;
  }
  .header-nav span{
    position: absolute;
    left: 2%;
  }
</style>

<script type="text/babel">
  export default {
    computed: {
      visible() {
        return ['/','/home'].indexOf(this.$route.path) < 0;
      }
    },
    methods:{
      header:function(){
        this.$router.go(-1)
      }
    }
  };
</script>
