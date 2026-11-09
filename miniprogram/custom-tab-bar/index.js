Component({
  data: {
    selected: 0,
    list: [
      { pagePath: "/pages/home/home", text: "首页", icon: "home" },
      { pagePath: "/pages/category/category", text: "分类", icon: "category" },
      { pagePath: "/pages/quote/quote", text: "报价单", icon: "quote" },
      { pagePath: "/pages/mine/mine", text: "我的", icon: "mine" },
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
