import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// 创建Store 对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload) {
      state.cartList.push(payload);
    }
  }
});

// 3 挂载到vue实例上
export default store;
