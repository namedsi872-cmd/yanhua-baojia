var cart = require("../../services/cart.js");

Component({
  properties: {
    product: { type: Object, value: {} },
  },
  data: { priceText: "0.00" },
  observers: {
    product: function (p) {
      var price = (p && p.price) || 0;
      this.setData({ priceText: cart.money(price) });
    },
  },
  methods: {
    onOpen: function () {
      var id = this.data.product && this.data.product.id;
      if (!id) return;
      wx.navigateTo({ url: "/pages/detail/detail?id=" + id });
    },
    onAdd: function () {
      var p = this.data.product || {};
      var spec = p.defaultSpec || (p.specs && p.specs[0]);
      if (!spec) {
        wx.showToast({ title: "暂无规格", icon: "none" });
        return;
      }
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
      this.triggerEvent("added");
    },
  },
});
