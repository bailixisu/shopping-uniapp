
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import {$http} from "@escook/request-miniprogram"

Vue.config.productionTip = false

App.mpType = 'app'

//把http挂载到uni上
uni.$http=$http



//拦截器进行加载的提示
$http.beforeRequest = function(options){
	uni.showLoading({
		title:'数据加载中...'
	})
}

$http.afterRequest = function(options){
	uni.hideLoading()
}



const app = new Vue({
    ...App,
})
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import store from "@/store/store.js"
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store);
  console.log(store,'app');
  return {
    app
  }
}
// #endif