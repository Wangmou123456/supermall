<template>
  <div class="cart">
    <!-- 导航 -->
    <NavBar class="cart-navbar">
      <div slot="center">购物车({{ length }})</div>
    </NavBar>

    <!-- 商品列表-->
    <CartList />
    <!-- 底部汇总 -->
    <CartBottomBar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";

import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  data() {
    return {};
  },
  computed: {
    // 两种写法
    // ...mapGetters(["cartLength"])
    ...mapGetters({
      length: "cartLength"
    })
  }
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.cart-navbar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
