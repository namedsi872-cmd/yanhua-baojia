var api = require("../../services/api.js");

Page({
  data: { shop: {} },
  onShow: function () {
    var that = this;
    api.getShop().then(function (shop) {
      that.setData({ shop: shop });
    });
  },
  goQuote: function () {
    wx.switchTab({ url: "/pages/quote/quote" });
  },
  goOrders: function () {
    wx.navigateTo({ url: "/pages/orders/orders" });
  },
  goAddress: function () {
    wx.navigateTo({ url: "/pages/address/address" });
  },
  goAbout: function () {
    wx.navigateTo({ url: "/pages/about/about" });
  },
  onCall: function () {
    var phone = String(this.data.shop.phone || "").replace(/[^\d+]/g, "");
    if (!phone) return;
    wx.makePhoneCall({ phoneNumber: phone });
  },
  onCopyWechat: function () {
    var w = this.data.shop.wechat || "";
    if (!w) return;
    wx.setClipboardData({
      data: w,
      success: function () {
        wx.showToast({ title: "微信号已复制", icon: "success" });
      },
    });
  },
});
