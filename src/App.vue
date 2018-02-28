<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <router-view class="view"></router-view>
    <!--<firstcomponent></firstcomponent>-->
    <mt-tabbar v-model="selected" fixed>

      <mt-tab-item id="/">
        <img slot="icon" src="./assets/logo.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="/second">
        <img slot="icon" src="./assets/logo.png">
        排行
      </mt-tab-item>
      <mt-tab-item id="/first">
        <img slot="icon" src="./assets/logo.png">
        第一
      </mt-tab-item>
      <mt-tab-item id="/table">
        <img slot="icon" src="./assets/logo.png">
        表格
      </mt-tab-item>
      <mt-tab-item id="/edit">
        <img slot="icon" src="./assets/logo.png">
        富文本
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
    import firstcomponent from './component/firstcomponent.vue'
    export default {
        name: 'app',
        data () {
          return {
            msg: 'vue Demo',
              selected: '/'
          }
        },
        components: { firstcomponent },
        watch: {
            selected: function (val, oldVal) {
                // 这里就可以通过 val 的值变更来确定
//                console.log(val)
//                this.$router.push({path: '/order/page1',params:{ id:'1'}});
                this.$router.push({path: val});
            }
        }
    }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.page-tabbar {
  overflow: hidden;
  height: 100vh;
}

.page-wrap {
  overflow: auto;
  height: 100%;
  padding-bottom: 100px;
}
</style>
