var api = require("../../services/api.js");
var cart = require("../../services/cart.js");

Page({
  data: { order: null },
  onLoad: function (q) {
    var that = this;
    api.getOrder(q.id).then(function (o) {
      if (!o) {
        wx.showToast({ title: "订单不存在", icon: "none" });
        return;
      }
      that.setData({
        order: Object.assign({}, o, {
          totalPriceText: cart.money(o.totalPrice),
          createdAtText: (o.createdAt || "").replace("T", " ").slice(0, 19),
          items: (o.items || []).map(function (it) {
            return Object.assign({}, it, {
              subtotalText: cart.money((it.price || 0) * (it.qty || 0)),
            });
          }),
        }),
      });
    });
  },
});
