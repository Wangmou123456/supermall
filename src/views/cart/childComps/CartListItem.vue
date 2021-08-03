<template>
  <div class="shop-item ">
    <div class="item-selector">
      <CheckButton
        :isChecked="product.checked"
        @click.native="checkClick"
      ></CheckButton>
    </div>
    <div class="item-img"><img :src="product.image" alt="商品图片" /></div>
    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">{{ product.desc }}</div>
      <div class="item-bottom">
        <div class="item-price left">￥{{ product.price }}</div>
        <div class="item-count right">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  components: {
    CheckButton
  },
  props: {
    product: {
      type: Object,
      default() {
        return [];
      }
    }
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked;
    }
  }
};
</script>

<style lang="less" scoped="scoped">
.shop-item {
  width: 100%;
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 5px;
  .item-selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-img {
    padding: 5px;
    img {
      width: 80px;
      height: 100px;
      display: block;
      border-radius: 5px;
    }
  }
  .item-info {
    font-size: 17px;
    color: #333;
    position: relative;
    overflow: hidden;
    padding: 5px 10px;
    margin-top: 15px;
    color: #666;
    font-size: 14px;
    .item-title,
    .item-desc {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .item-desc {
      margin-top: 15px;
      color: #666;
      font-size: 14px;
    }
    .item-bottom {
      margin-top: 10px;
      position: absolute;
      bottom: 10px;
      left: 10px;
      right: 10px;
      color: orangered;
      .item-price {
        color: orangered;
      }
      .item-count {
        color: gray;
      }
    }
  }
}
</style>
