var api = require("../../services/api.js");
var cart = require("../../services/cart.js");

Page({
  data: {
    config: {
      brandName: "",
      brandSubtitle: "",
      bannerImage: "",
      searchPlaceholder: "搜索烟花名称",
      hotCategories: [],
      hotProducts: [],
    },
    keyword: "",
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
      var hotProducts = (cfg.hotProducts || []).map(function (p) {
        return Object.assign({}, p, { priceText: cart.money(p.price) });
      });
      // filter out synthetic "all" from hot cats if present
      var hotCategories = (cfg.hotCategories || []).filter(function (c) {
        return c.id !== "all";
      });
      that.setData({
        config: Object.assign({}, cfg, { hotProducts: hotProducts, hotCategories: hotCategories }),
      });
    });
  },
  onBannerError: function () {
    this.setData({ "config.bannerImage": "" });
  },
  onKeyword: function (e) {
    this.setData({ keyword: e.detail.value || "" });
  },
  onSearch: function () {
    var kw = (this.data.keyword || "").trim();
    if (!kw) return;
    wx.setStorageSync("yanhua_pending_keyword", kw);
    wx.switchTab({ url: "/pages/category/category" });
  },
  goCategory: function () {
    wx.switchTab({ url: "/pages/category/category" });
  },
  onHotCat: function (e) {
    wx.setStorageSync("yanhua_pending_category", e.currentTarget.dataset.id);
    wx.switchTab({ url: "/pages/category/category" });
  },
  onOpenProduct: function (e) {
    wx.navigateTo({ url: "/pages/detail/detail?id=" + e.currentTarget.dataset.id });
  },
  onAdd: function (e) {
    var id = e.currentTarget.dataset.id;
    var list = this.data.config.hotProducts || [];
    var p = null;
    for (var i = 0; i < list.length; i++) if (list[i].id === id) p = list[i];
    if (!p) return;
    var spec = p.defaultSpec || (p.specs && p.specs[0]);
    if (!spec) return;
    cart.add({
      productId: p.id,
      name: p.name,
      image: p.image || "",
      emoji: p.emoji || "🎆",
      specId: spec.id,
      specName: spec.name,
      price: spec.price,
      stock: spec.stock,
      minOrder: spec.minOrder || 1,
      qty: spec.minOrder || 1,
    });
    wx.showToast({ title: "已加入报价单", icon: "success" });
  },
});
