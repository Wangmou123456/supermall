<template>
  <div>
    <NavBar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="center">
        <div
          class="center-item"
          v-for="(item, index) in titles"
          :key="index"
          :class="{ active: currentIndex === index }"
          @click="clickTitle(index)"
        >
          {{ item }}
        </div>
      </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    clickTitle(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.center {
  display: flex;
  flex-direction: row;
}
.center-item {
  flex: 1;
}
.active {
  color: var(--color-tint);
}
.back img {
  margin-top: 12px;
}
</style>
