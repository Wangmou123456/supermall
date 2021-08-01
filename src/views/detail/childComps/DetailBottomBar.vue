<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <div>
          <i class="icon shop"></i>
          <span class="text">店铺</span>
        </div>
      </div>
      <div>
        <div>
          <i class="icon select"></i>
          <span class="text">收藏</span>
        </div>
      </div>
    </div>

    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addToCart() {
      this.$emit("addCart");
    }
  }
};
</script>
<style lang="less" scoped>
.bottom-bar {
  display: flex;
  height: 58px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  text-align: center;
  .bar-item {
    display: flex;
    flex: 1;
    div {
      flex: 1;
    }
    img {
      width: 22px;
      height: 22px;
      margin: 4px 0;
      vertical-align: middle;
    }
  }
  .bar-left {
    .text {
      font-size: 13px;
    }
    .icon {
      display: block;
      width: 30px;
      height: 30px;
      margin: 10px auto 3px;
      background: url("~assets/img/detail/detail_bottom.png") 0 0/100px;
    }
    .service {
      background-position: -5px -60px;
    }
    .shop {
      background-position: -5px -105px;
    }
  }
  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 58px;
    .cart {
      background-color: #ffe817;
    }
    .buy {
      background-color: #f69;
    }
  }
}
</style>
