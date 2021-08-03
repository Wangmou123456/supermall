import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import fastclick from "fastclick";

import toast from "components/common/toast";
import VueLazyLoad from "vue-lazyload";

Vue.config.productionTip = false;
// 安装toast插件
Vue.use(toast);

// 解决移动端300ms延迟
fastclick.attach(document.body);

// 使用懒加载的插件
Vue.use(VueLazyLoad, {
  loading: require("assets/img/common/top.png")
});

// 事件总线对象
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
