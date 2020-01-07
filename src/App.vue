<template>
  <div id="app">
    <v-header></v-header>
    <dialog-chat v-if="showFlag"></dialog-chat>
    <div class="m-container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFlag: true
    }
  },
  created() {
  },
  mounted () {
    this.routerChange()
  },
  methods: {
    routerChange () {
      let route = this.$route.path
      if (route === '/home' || route === '/aiExploration' || route === '/robotManagement' || route === '/register' || route === '/login' || route === '/getBackPwd' || route === '/aiChat') {
        this.showFlag = true
      } else {
        this.showFlag = false
      }
    }
  },
  watch: {
    '$route': 'routerChange'
  },
  components: {
    vHeader: resolve => require(['@/components/header.vue'], resolve),
    dialogChat: resolve => require(['@/components/dialogChat.vue'], resolve)
  }
}
</script>

<style lang="stylus">
  @import 'assets/css/reset.css';
  @import 'assets/css/base.styl';
  @import 'assets/font/font-awesome.min.css';
  @import './assets/css/dialog.styl';
  @import 'assets/css/robot.styl';
  .m-container
    padding-top: 80px
    width: 100%
    min-height 100vh
    // background: url("./assets/img/common/bg.png") no-repeat center / cover
</style>
