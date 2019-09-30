<template>
  <div id="app">
    <router-view/>
    <Spin fix v-if="globalLoading" class="spin">
        <Icon type="ios-loading" size=120 class="demo-spin-icon-load"></Icon>
        <p style="font-size:20px">Loading</p>
    </Spin>
  </div>
</template>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.spin{
  animation-duration: 500ms;
  z-index:99999 !important;
  background: transparent !important;
}

.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
</style>
<script>
import { mapState } from "vuex"
export default {
  name: "App",
  computed: {
    ...mapState("common",['globalLoading'])
  }
}
</script>
