var api = require("../../services/api.js");

Page({
  data: {
    config: {
      brandName: "",
      bannerImage: "/images/banner.png",
      searchPlaceholder: "搜索商品",
      hotCategories: [],
      hotProducts: [],
      allProducts: [],
    },
    keyword: "",
    filtered: [],
  },
  onShow: function () {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 });
    }
    this.load();
  },
  load: function () {
    var that = this;
    api.getHomeConfig().then(function (cfg) {
      that.setData({ config: cfg });
      that.applyFilter();
    });
  },
  applyFilter: function () {
    var kw = (this.data.keyword || "").trim().toLowerCase();
    var all = (this.data.config && this.data.config.allProducts) || [];
    var filtered = !kw
      ? all
      : all.filter(function (p) {
          return String(p.name).toLowerCase().indexOf(kw) !== -1;
        });
    this.setData({ filtered: filtered });
  },
  onKeyword: function (e) {
    this.setData({ keyword: e.detail.value || "" });
  },
  onSearch: function (e) {
    this.setData({ keyword: (e.detail.value || this.data.keyword || "") });
    this.applyFilter();
  },
  onBannerError: function () {
    this.setData({ 'config.bannerImage': '' });
  },
  onHotCat: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.setStorageSync("yanhua_pending_category", id);
    wx.switchTab({ url: "/pages/category/category" });
  },
});
