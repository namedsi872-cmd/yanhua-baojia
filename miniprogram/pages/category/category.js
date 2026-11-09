var api = require("../../services/api.js");

Page({
  data: {
    categories: [],
    categoryId: "",
    currentName: "",
    products: [],
    keyword: "",
    sort: "default",
  },
  onShow: function () {
    var pending = "";
    try {
      pending = wx.getStorageSync("yanhua_pending_category") || "";
      if (pending) wx.removeStorageSync("yanhua_pending_category");
    } catch (e) {}
    this.boot(pending);
  },
  boot: function (preferId) {
    var that = this;
    api.getCategories().then(function (cats) {
      return api.getProducts({}).then(function (all) {
        var counts = {};
        all.forEach(function (p) {
          counts[p.categoryId] = (counts[p.categoryId] || 0) + 1;
        });
        var categories = cats.map(function (c) {
          return Object.assign({}, c, { count: counts[c.id] || 0 });
        });
        var categoryId = preferId || that.data.categoryId;
        if (!categoryId || !categories.some(function (c) { return c.id === categoryId; })) {
          categoryId = categories[0] ? categories[0].id : "";
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
        categoryId: that.data.keyword ? "" : id,
        keyword: that.data.keyword,
        sort: that.data.sort,
      })
      .then(function (list) {
        // 有关键词时跨分类搜索；无关键词时已按分类过滤
        if (!that.data.keyword) {
          // already filtered
        }
        that.setData({ products: list, currentName: that.data.keyword ? "搜索结果" : name });
      });
  },
  onSelectCat: function (e) {
    this.setData({
      categoryId: e.currentTarget.dataset.id,
      keyword: "",
    });
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
