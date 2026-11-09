var cart = require("../../services/cart.js");
var api = require("../../services/api.js");

Page({
  data: { items: [], totalCount: 0, totalPrice: "0.00" },
  onShow: function () {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 });
    }
    this.refresh();
  },
  refresh: function () {
    var items = cart.load().map(function (it) {
      return Object.assign({}, it, {
        key: cart.lineKey(it.productId, it.specId),
        priceText: cart.money(it.price),
      });
    });
    this.setData({
      items: items,
      totalCount: cart.count(items),
      totalPrice: cart.money(cart.total(items)),
    });
  },
  onQty: function (e) {
    cart.setQty(e.detail.productId, e.detail.specId, e.detail.qty);
    this.refresh();
  },
  onRemove: function (e) {
    cart.remove(e.currentTarget.dataset.pid, e.currentTarget.dataset.sid);
    this.refresh();
  },
  onSubmit: function () {
    var that = this;
    var items = cart.load();
    if (!items.length) return;
    wx.showModal({
      title: "提交报价单",
      content: "确认提交？提交后可在「我的订单」查看。",
      success: function (res) {
        if (!res.confirm) return;
        api
          .submitQuote({
            items: items,
            totalCount: cart.count(items),
            totalPrice: cart.total(items),
          })
          .then(function (order) {
            cart.clear();
            that.refresh();
            wx.showToast({ title: "已提交", icon: "success" });
            setTimeout(function () {
              wx.navigateTo({
                url: "/pages/order-detail/order-detail?id=" + order.id,
              });
            }, 500);
          });
      },
    });
  },
});
