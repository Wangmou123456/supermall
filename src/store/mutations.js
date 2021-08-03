import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";

export default {
  // mutations 唯一的为目的 修改state状态
  // mutations 中唯一的方法尽可能单一
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  }
};
