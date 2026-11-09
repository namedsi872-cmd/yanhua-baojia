var imgs = require("../mock/images.js");

Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: "/pages/home/home",
        text: "首页",
        icon: imgs.tabs.tabHome,
        iconActive: imgs.tabs.tabHomeActive,
      },
      {
        pagePath: "/pages/category/category",
        text: "分类",
        icon: imgs.tabs.tabCategory,
        iconActive: imgs.tabs.tabCategoryActive,
      },
      {
        pagePath: "/pages/quote/quote",
        text: "报价单",
        icon: imgs.tabs.tabQuote,
        iconActive: imgs.tabs.tabQuoteActive,
      },
      {
        pagePath: "/pages/mine/mine",
        text: "我的",
        icon: imgs.tabs.tabMine,
        iconActive: imgs.tabs.tabMineActive,
      },
    ],
  },
  methods: {
    onSwitch: function (e) {
      var path = e.currentTarget.dataset.path;
      var index = e.currentTarget.dataset.index;
      wx.switchTab({ url: path });
      this.setData({ selected: index });
    },
  },
});
