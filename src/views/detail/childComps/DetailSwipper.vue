<template>
  <Swiper class="detail-swiper">
    <SwiperItem
      class="swiper-item"
      v-for="(item, index) in topImages"
      :key="index"
    >
      <img :src="item" alt="" />
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  destroyed() {
    console.log("12");
  },
  activated() {
    console.log("1");
  }
};
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
