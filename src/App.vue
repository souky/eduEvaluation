<template>
  <div>
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
    background-color: #f5f5f5;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    user-select: none;
  }
  a {
    color: inherit;
  }
  .header-nav{
    width: 100%;
    background-color: red;
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
        this.$header.go(-1)
      }
    }
  };
</script>
