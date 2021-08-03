import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const state = {
  cartList: []
};

// 创建Store 对象
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

// 3 挂载到vue实例上
export default store;
