var api = require("../../services/api.js");
var cart = require("../../services/cart.js");

Page({
  data: {
    product: null,
    specId: "",
    spec: {},
    qty: 1,
    priceText: "0.00",
    comparePrice: "",
  },
  onLoad: function (q) {
    var that = this;
    api.getProduct(q.id).then(function (p) {
      if (!p) {
        wx.showToast({ title: "商品不存在", icon: "none" });
        return;
      }
      var spec = (p.specs && p.specs[0]) || {};
      that.applySpec(p, spec);
    });
  },
  applySpec: function (product, spec) {
    var compare = "";
    if (product.specs && product.specs.length > 1) {
      var max = 0;
      product.specs.forEach(function (s) {
        if (s.price > max) max = s.price;
      });
      if (max > spec.price) compare = cart.money(max);
    }
    this.setData({
      product: product,
      specId: spec.id,
      spec: spec,
      qty: spec.minOrder || 1,
      priceText: cart.money(spec.price),
      comparePrice: compare,
    });
  },
  onSpec: function (e) {
    var id = e.currentTarget.dataset.id;
    var specs = this.data.product.specs || [];
    var spec = specs.filter(function (s) { return s.id === id; })[0];
    if (!spec) return;
    this.applySpec(this.data.product, spec);
  },
  onQty: function (e) {
    this.setData({ qty: e.detail.qty });
  },
  onAdd: function () {
    var p = this.data.product;
    var s = this.data.spec;
    cart.add({
      productId: p.id,
      name: p.name,
      image: p.image || "",
      emoji: p.emoji || "🎆",
      specId: s.id,
      specName: s.name,
      price: s.price,
      stock: s.stock,
      minOrder: s.minOrder || 1,
      qty: this.data.qty,
    });
    wx.showToast({ title: "已加入报价单", icon: "success" });
  },
});
