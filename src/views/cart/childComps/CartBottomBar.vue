<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton
        @click.native="checkClick"
        :is-checked="isSelectAll"
        class="check-button"
      />
      <span>全选</span>
    </div>

    <div class="price">合计: {{ totalPrice }}</div>

    <div class="calculate" @click="calcClick">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";
export default {
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((pre, item) => {
            return pre + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter(item => {
        return item.checked;
      }).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      return !this.cartList.find(item => !item.checked);
    }
  },
  methods: {
    checkClick() {
      // if (this.isSelectAll) {
      //   // 全部选中
      //   this.cartList.forEach(item => (item.checked = false));
      // } else {
      //   // 部分或全部不选中
      //   this.cartList.forEach(item => (item.checked = true));
      // }
      const flag = this.isSelectAll;
      this.cartList.forEach(item => (item.checked = !flag));
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择购买的商品", 2000);
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  bottom: 84px;
  height: 44px;
  line-height: 40px;
  background: rgb(240, 200, 200);
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  flex: 1;
  text-align: center;
}

.calculate {
  width: 90px;
  background-color: red;
}
</style>
