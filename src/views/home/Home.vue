<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">购物街</div>
    </NavBar>
    <tab-control
      ref="tabControl1"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      class="tab-control"
      v-show="isTabFixed"
    />
    <Scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <HomeSwipper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <Recommend :recommends="recommends" />
      <FeatureView />
      <tab-control
        ref="tabControl2"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
      <GoodsList :goods="showGoods" />
    </Scroll>

    <BackTop @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwipper from "./childComps/HomeSwipper.vue";
import Recommend from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";

import { debounce } from "common/utils";

export default {
  name: "Home",
  components: {
    HomeSwipper,
    Recommend,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  destroyed() {
    console.log("destroyed");
  },
  activated() {
    this.$refs.scroll.scrollTo(0, -this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
  created() {
    // 1 请求多个数据
    this.getHomeMultidata();

    // 2 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 1 监听item图片加载完成
    const func = debounce(this.$refs.scroll.refresh, 300);
    this.$bus.$on("itemImageLoad", () => {
      func();
    });

    // 2 获取tabControl的offsetTop
    // 所有的组件都有一个属性 $el
  },
  methods: {
    /**
     * 网络请求
     */
    async getHomeMultidata() {
      const { data: res } = await getHomeMultidata();
      this.banners = res.banner.list;
      this.recommends = res.recommend.list;
    },
    async getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      const { data: res } = await getHomeGoods(type, page);
      this.goods[type].list.push(...res.list);
      this.goods[type].page += 1;

      this.$refs.scroll.finishPullUp();
    },
    /**
     * 事件监听
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs["scroll"].scrollTo(0, 0, 1000);
    },
    contentScroll(position) {
      // 判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000 ? true : false;
      // 判断tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // 下拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);

      // 完成下拉加载更多
      this.$refs.scroll.refresh();
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: aqua;

  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}

.tab-control {
  position: relative;
  z-index: 9;
}
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 47px;
} */
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>
