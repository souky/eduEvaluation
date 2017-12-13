<template>
  <div>
    <span @click="header" v-if="visible">返回</span>
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

  a {
    color: inherit;
  }

  .page-back {
    display: inline-block;
    position: absolute 12px * * 10px;
    width: 40px;
    height: 40px;
    text-align: center;
    i {
      font-size: 24px;
      line-height: 40px;
    }
  }
</style>

<script type="text/babel">

  export default {
    computed: {
      visible() {
        return ['/', '/list'].indexOf(this.$route.path) < 0;
      }
    },
    methods:{
      demo:function(){
        this.$header.go(-1)
      }
    }
  };
</script>
