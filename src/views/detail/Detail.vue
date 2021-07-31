<template>
  <div id="detail">
    <DetailNavBar />
    <DetailSwipper :top-images="topImages"></DetailSwipper>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwipper from "./childComps/DetailSwipper.vue";

import { getDetail } from "network/detail";
export default {
  components: {
    DetailNavBar,
    DetailSwipper
  },
  data() {
    return {
      iid: null,
      topImages: []
    };
  },
  created() {
    // 保存iid
    this.iid = this.$route.params.id;

    // 2 请求数据
    this.getDetail();
  },
  update() {
    this.iid = this.$route.params.id;
  },

  methods: {
    async getDetail() {
      const res = await getDetail(this.iid);
      this.topImages = res.result.itemInfo.topImages;
    }
  }
};
</script>

<style scoped></style>
