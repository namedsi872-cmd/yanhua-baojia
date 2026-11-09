var api = require("../../services/api.js");
var cart = require("../../services/cart.js");
var imgs = require("../../mock/images.js");

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
    searchIcon: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%3E%3Ccircle%20cx%3D%2211%22%20cy%3D%2211%22%20r%3D%227%22%20stroke%3D%22%23999%22%20stroke-width%3D%222%22/%3E%3Cpath%20d%3D%22M16.5%2016.5L21%2021%22%20stroke%3D%22%23999%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22/%3E%3C/svg%3E",
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
      var hotProducts = (cfg.hotProducts || []).map(function (p, idx) {
        var o = Object.assign({}, p, {
          priceText: cart.money(p.price),
          specLine: p.specLine || (p.defaultSpec && p.defaultSpec.name) || "",
        });
        if (idx === 0 && imgs.photos.featXingguang) {
          o.featImage = imgs.photos.featXingguang;
        }
        return o;
      });
      var hotCategories = (cfg.hotCategories || [])
        .filter(function (c) { return c.id !== "all"; })
        .map(function (c) {
          return Object.assign({}, c, {
            iconSrc: (imgs.icons && imgs.icons[c.icon]) || imgs.icons.other,
          });
        });
      that.setData({
        config: Object.assign({}, cfg, { hotProducts: hotProducts, hotCategories: hotCategories }),
      });
    });
  },
  onBannerError: function () { this.setData({ "config.bannerImage": "" }); },
  onKeyword: function (e) { this.setData({ keyword: e.detail.value || "" }); },
  onSearch: function () {
    var kw = (this.data.keyword || "").trim();
    if (!kw) return;
    wx.setStorageSync("yanhua_pending_keyword", kw);
    wx.switchTab({ url: "/pages/category/category" });
  },
  goCategory: function () { wx.switchTab({ url: "/pages/category/category" }); },
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
      productId: p.id, name: p.name, image: p.image || "", emoji: p.emoji || "🎆",
      specId: spec.id, specName: spec.pack ? spec.name + " · " + spec.pack : spec.name,
      price: spec.price, stock: spec.stock, minOrder: spec.minOrder || 1, qty: spec.minOrder || 1,
    });
    wx.showToast({ title: "已加入报价单", icon: "success" });
  },
});
