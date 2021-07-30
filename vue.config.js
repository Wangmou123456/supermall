module.exports = {
  configureWebpack: {
    resolve: {
      // 默认配置过了 添加文件名后缀
      extends: [],
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views",
      },
    },
  },
};
