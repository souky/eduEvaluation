<template>
  <div class="main">
    <div class="header-nav" v-if="visible">
      <span @click="header"><img src="../static/img/header/fh@2x.png" width="20px" alt=""></span>
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
    padding-top: 2vh;
    padding-bottom: 2vh;
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
        if(this.$store.state.label=='5'){
          this.$router.push({path:'/setting'})
        }else if(this.$store.state.label=='6'){
          this.$router.push({path:'/personal'})
        }else if(this.$store.state.label=='9'){
          this.$router.push({path:'/grade'})
        }else if(this.$store.state.label=='7'){
          this.$router.push({path:'/homeknowlegde'})
        }else{
          this.$router.push({path:'/home'})
        }
      }
    }
  };
</script>
