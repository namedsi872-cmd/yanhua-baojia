var cart = require("./services/cart.js");

App({
  onLaunch: function () {
    this.globalData.cartCount = cart.count();
  },
  globalData: {
    cartCount: 0,
  },
});
