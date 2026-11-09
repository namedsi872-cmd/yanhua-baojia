var api = require("../../services/api.js");
var cart = require("../../services/cart.js");

Page({
  data: { orders: [] },
  onShow: function () {
    var that = this;
    api.getOrders().then(function (list) {
      that.setData({
        orders: list.map(function (o) {
          return Object.assign({}, o, {
            totalPriceText: cart.money(o.totalPrice),
            createdAtText: (o.createdAt || "").replace("T", " ").slice(0, 19),
          });
        }),
      });
    });
  },
  onOpen: function (e) {
    wx.navigateTo({
      url: "/pages/order-detail/order-detail?id=" + e.currentTarget.dataset.id,
    });
  },
});
