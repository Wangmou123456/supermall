<template>
  <div class="cart-list">
    <Scroll class="content" ref="scroll">
      <CartListItem
        v-for="(item, index) in list"
        :key="index"
        :product="item"
      ></CartListItem>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem.vue";

import { mapGetters } from "vuex";
export default {
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters({
      list: "cartList"
    })
  },
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px);
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>
