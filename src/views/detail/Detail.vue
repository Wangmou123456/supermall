<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <Scroll ref="scroll" class="content" :probeType="3" @scroll="contentScroll">
      <DetailSwipper :top-images="topImages"></DetailSwipper>
      <DetailBaseInfo :goods="goods" />
      <DetailShopInfo :shop="shop" />
      <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad" />
      <DetailParamInfo ref="params" :param-info="paramInfo"></DetailParamInfo>
      <DetailCommentInfo ref="comment" :comment-info="commentInfo" />
      <GoodList ref="recommend" :goods="recommends" />
    </Scroll>

    <DetailBottomBar @addCart="addCart" />
    <BackTop @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwipper from "./childComps/DetailSwipper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import Scroll from "components/common/scroll/Scroll";
import GoodList from "components/content/goods/GoodsList.vue";
import BackTop from "components/content/backTop/BackTop";

import { debounce } from "common/utils";
import { itemListenerMixin } from "common/mixin";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import { mapActions } from "vuex";
export default {
  name: "detail",
  mixins: [itemListenerMixin],
  components: {
    DetailNavBar,
    DetailSwipper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodList,
    BackTop
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      isShowBackTop: false,
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: null
    };
  },
  created() {
    // 保存iid
    this.iid = this.$route.params.id;

    // 2 请求数据
    this.getDetail();

    // 3 请求推荐数据
    this.getRecommend();

    // 4 给getThemeTopY 赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    });
  },
  updated() {
    this.iid = this.$route.params.id;
  },
  mounted() {
    const func = debounce(this.$refs.scroll.refresh, 300);
    this.$bus.$on("itemDetailImageLoad", () => {
      func();
    });
  },
  destroyed() {
    this.$bus.$off("itemDetailImageLoad", () => {
      func();
    });
  },

  methods: {
    ...mapActions({
      Cart: "addCart"
    }),
    async getDetail() {
      const { result: res } = await getDetail(this.iid);
      // 1 轮播图播放数据
      this.topImages = res.itemInfo.topImages;

      // 2 获取商品信息
      this.goods = new Goods(res.itemInfo, res.columns, res.shopInfo.services);

      // 3 创建店铺信息的对象
      this.shop = new Shop(res.shopInfo);

      // 4 保存商品的详情数据
      this.detailInfo = res.detailInfo;

      // 5 获取参数信息
      this.paramInfo = new GoodsParam(res.itemParams.info, res.itemParams.rule);

      // 6 取出评论信息
      res.rate.cRate !== 0 && (this.commentInfo = res.rate.list[0]);

      // 7
      // this.$nextTick(() => {
      // 根据最新的数据 对应的 DOM 被渲染出来了
      // 但是图片还没有完全渲染出来
      // 一般情况下 offsetTop值不对 都是图片问题
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // });
    },

    async getRecommend() {
      const { data } = await getRecommend();
      this.recommends = data.list;
    },
    imageLoad() {
      this.$refs.scroll.refresh();
      // 图片加载完成
      this.getThemeTopY();
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000 ? true : false;
      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        // if (
        //   this.currentIndex !== i &&
        //   ((i < this.themeTopYs.length - 1 &&
        //     -position.y > this.themeTopYs[i] &&
        //     -position.y <= this.themeTopYs[i + 1]) ||
        //     (i === this.themeTopYs.length - 1 &&
        //       -position.y > this.themeTopYs[i]))
        // ) {
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // }

        if (
          this.currentIndex !== i &&
          -position.y > this.themeTopYs[i] &&
          -position.y < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300 * index);
    },
    addCart() {
      // 1 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2 将商品添加到购物车里面
      this.Cart(product).then(res => {
        this.$toast.show(res);
      });
      // this.$store.dispatch("addCart", product).then(res => {
      //   console.log(res);
      // });
      // 3 添加到购物车成功
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  height: 100vh;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
