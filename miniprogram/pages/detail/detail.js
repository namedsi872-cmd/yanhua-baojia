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
    specLine: "",
  },
  onLoad: function (q) {
    var that = this;
    api.getProduct(q.id).then(function (p) {
      if (!p) {
        wx.showToast({ title: "商品不存在", icon: "none" });
        return;
      }
      var spec = p.defaultSpec || (p.specs && p.specs[0]) || {};
      that.applySpec(p, spec);
    });
  },
  applySpec: function (product, spec) {
    var compare = "";
    if (spec.originalPrice && spec.originalPrice > spec.price) {
      compare = cart.money(spec.originalPrice);
    }
    var line = spec.pack ? spec.name + " · " + spec.pack : spec.name;
    this.setData({
      product: product,
      specId: spec.id,
      spec: spec,
      qty: spec.minOrder || 1,
      priceText: cart.money(spec.price),
      comparePrice: compare,
      specLine: line,
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
  onBack: function () {
    wx.navigateBack({ fail: function () { wx.switchTab({ url: "/pages/home/home" }); } });
  },
  onAdd: function () {
    var p = this.data.product;
    var s = this.data.spec;
    var specName = s.pack ? s.name + " · " + s.pack : s.name;
    cart.add({
      productId: p.id,
      name: p.name,
      image: p.image || "",
      emoji: p.emoji || "🎆",
      specId: s.id,
      specName: specName,
      price: s.price,
      stock: s.stock,
      minOrder: s.minOrder || 1,
      qty: this.data.qty,
    });
    wx.showToast({ title: "已加入报价单", icon: "success" });
  },
});
