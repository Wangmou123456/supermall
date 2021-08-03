import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";

export default {
  addCart({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      // payload 新添加的商品
      // 查找当前数组是否有该商品
      let product = state.cartList.find(item => {
        return item.iid === payload.iid;
      });
      if (product) {
        // 有则加一
        commit(ADD_COUNTER, product);
        resolve("商品数量加1");
      } else {
        payload.count = 1;
        commit(ADD_TO_CART, payload);
        resolve("添加新的商品");
      }
    });
  }
};
