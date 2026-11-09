var api = require("../../services/api.js");

Page({
  data: {
    shop: {},
    avatar: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2232%22%20r%3D%2232%22%20fill%3D%22%23d9d5d1%22/%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2224%22%20r%3D%2210%22%20fill%3D%22%23fff%22/%3E%3Cpath%20d%3D%22M12%2054c3-12%2012-18%2020-18s17%206%2020%2018%22%20fill%3D%22%23fff%22/%3E%3C/svg%3E",
    deco: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20200%20200%22%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%23E45D43%22%20stroke-width%3D%222%22%20opacity%3D%220.35%22%3E%3Ccircle%20cx%3D%22120%22%20cy%3D%2270%22%20r%3D%228%22/%3E%3Cpath%20d%3D%22M120%2040v-14M120%20114v14M90%2070h-14M164%2070h14M98%2048l-10-10M142%2092l10%2010M142%2048l10-10M98%2092l-10%2010%22/%3E%3Cpath%20d%3D%22M100%20100l-20%2040M140%20100l20%2040M110%20110l-8%2036M130%20110l8%2036%22%20stroke%3D%22%23ff9a7a%22%20opacity%3D%220.5%22/%3E%3C/g%3E%3Cg%20fill%3D%22%23E45D43%22%20opacity%3D%220.25%22%3E%3Ccircle%20cx%3D%2280%22%20cy%3D%2250%22%20r%3D%222%22/%3E%3Ccircle%20cx%3D%22160%22%20cy%3D%2290%22%20r%3D%222%22/%3E%3Ccircle%20cx%3D%22100%22%20cy%3D%22130%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/svg%3E",
    icons: {
      quote: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%3E%3Crect%20x%3D%225%22%20y%3D%223%22%20width%3D%2214%22%20height%3D%2218%22%20rx%3D%222%22%20stroke%3D%22%23202326%22%20stroke-width%3D%221.8%22/%3E%3Cpath%20d%3D%22M8%208h8M8%2012h8M8%2016h5%22%20stroke%3D%22%23202326%22%20stroke-width%3D%221.8%22%20stroke-linecap%3D%22round%22/%3E%3Cpath%20d%3D%22M15%2017.5l1.2%201.2%202.3-2.4%22%20stroke%3D%22%23202326%22%20stroke-width%3D%221.6%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E",
      orders: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%3E%3Crect%20x%3D%225%22%20y%3D%223%22%20width%3D%2214%22%20height%3D%2218%22%20rx%3D%222%22%20stroke%3D%22%23202326%22%20stroke-width%3D%221.8%22/%3E%3Cpath%20d%3D%22M8%208h8M8%2012h8M8%2016h5%22%20stroke%3D%22%23202326%22%20stroke-width%3D%221.8%22%20stroke-linecap%3D%22round%22/%3E%3C/svg%3E",
      address: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M12%2021s-6-5.2-6-10a6%206%200%201112%200c0%204.8-6%2010-6%2010z%22%20stroke%3D%22%23202326%22%20stroke-width%3D%221.8%22%20stroke-linejoin%3D%22round%22/%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2211%22%20r%3D%222.2%22%20stroke%3D%22%23202326%22%20stroke-width%3D%221.8%22/%3E%3C/svg%3E",
      service: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M4%2012a8%208%200%200116%200%22%20stroke%3D%22%23202326%22%20stroke-width%3D%221.8%22%20stroke-linecap%3D%22round%22/%3E%3Crect%20x%3D%223%22%20y%3D%2211%22%20width%3D%224%22%20height%3D%227%22%20rx%3D%222%22%20stroke%3D%22%23202326%22%20stroke-width%3D%221.8%22/%3E%3Crect%20x%3D%2217%22%20y%3D%2211%22%20width%3D%224%22%20height%3D%227%22%20rx%3D%222%22%20stroke%3D%22%23202326%22%20stroke-width%3D%221.8%22/%3E%3Cpath%20d%3D%22M17%2018v1a3%203%200%2001-3%203h-1%22%20stroke%3D%22%23202326%22%20stroke-width%3D%221.8%22%20stroke-linecap%3D%22round%22/%3E%3C/svg%3E",
      about: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%229%22%20stroke%3D%22%23202326%22%20stroke-width%3D%221.8%22/%3E%3Cpath%20d%3D%22M12%2010v7%22%20stroke%3D%22%23202326%22%20stroke-width%3D%221.8%22%20stroke-linecap%3D%22round%22/%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%227.2%22%20r%3D%221.1%22%20fill%3D%22%23202326%22/%3E%3C/svg%3E",
    },
  },
  onShow: function () {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 });
    }
    var that = this;
    api.getShop().then(function (shop) {
      that.setData({ shop: shop || {} });
    }).catch(function () {});
  },
  goQuote: function () { wx.switchTab({ url: "/pages/quote/quote" }); },
  goOrders: function () { wx.navigateTo({ url: "/pages/orders/orders" }); },
  goAddress: function () { wx.navigateTo({ url: "/pages/address/address" }); },
  goAbout: function () { wx.navigateTo({ url: "/pages/about/about" }); },
  onCall: function () {
    var phone = (this.data.shop && this.data.shop.phone) || "";
    if (phone) {
      wx.makePhoneCall({ phoneNumber: String(phone) });
    } else {
      wx.showToast({ title: "暂无客服电话", icon: "none" });
    }
  },
});
