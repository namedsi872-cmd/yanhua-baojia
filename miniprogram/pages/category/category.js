var api = require("../../services/api.js");

Page({
  data: {
    categories: [],
    categoryId: "all",
    currentName: "全部",
    products: [],
    keyword: "",
    sort: "default",
  },
  onShow: function () {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 });
    }
    var pending = "";
    var kw = "";
    try {
      pending = wx.getStorageSync("yanhua_pending_category") || "";
      if (pending) wx.removeStorageSync("yanhua_pending_category");
      kw = wx.getStorageSync("yanhua_pending_keyword") || "";
      if (kw) wx.removeStorageSync("yanhua_pending_keyword");
    } catch (e) {}
    if (kw) this.setData({ keyword: kw });
    this.boot(pending);
  },
  boot: function (preferId) {
    var that = this;
    api.getCategories().then(function (cats) {
      return api.getProducts({}).then(function (all) {
        var categories = cats.slice();
        var categoryId = preferId || that.data.categoryId || "all";
        if (!categories.some(function (c) { return c.id === categoryId; })) {
          categoryId = categories[0] ? categories[0].id : "all";
        }
        that.setData({ categories: categories, categoryId: categoryId });
        that.refresh();
      });
    });
  },
  refresh: function () {
    var that = this;
    var id = this.data.categoryId;
    var name = "";
    this.data.categories.forEach(function (c) {
      if (c.id === id) name = c.name;
    });
    api
      .getProducts({
        categoryId: that.data.keyword ? "all" : id,
        keyword: that.data.keyword,
        sort: that.data.sort,
      })
      .then(function (list) {
        that.setData({
          products: list,
          currentName: that.data.keyword ? "搜索结果" : name || "全部",
        });
      });
  },
  onSelectCat: function (e) {
    this.setData({ categoryId: e.currentTarget.dataset.id, keyword: "" });
    this.refresh();
  },
  onKeyword: function (e) {
    this.setData({ keyword: e.detail.value || "" });
  },
  onSearch: function () {
    this.refresh();
  },
  onSort: function (e) {
    var sort = e.currentTarget.dataset.sort;
    if (sort === "price_asc" && this.data.sort === "price_asc") sort = "price_desc";
    this.setData({ sort: sort });
    this.refresh();
  },
});
