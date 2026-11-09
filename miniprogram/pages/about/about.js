var api = require("../../services/api.js");
Page({
  data: { shop: {} },
  onLoad: function () {
    var that = this;
    api.getShop().then(function (shop) {
      that.setData({ shop: shop });
    });
  },
});
