var KEY = "yanhua_address_v1";

Page({
  data: {
    address: null,
    form: { userName: "", telNumber: "", region: "", detailInfo: "" },
  },
  onShow: function () {
    try {
      var a = wx.getStorageSync(KEY);
      if (a) this.setData({ address: a });
    } catch (e) {}
  },
  onChoose: function () {
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        var addr = {
          userName: res.userName,
          telNumber: res.telNumber,
          provinceName: res.provinceName,
          cityName: res.cityName,
          countyName: res.countyName,
          detailInfo: res.detailInfo,
        };
        wx.setStorageSync(KEY, addr);
        that.setData({ address: addr });
        wx.showToast({ title: "已保存", icon: "success" });
      },
      fail: function () {
        wx.showToast({ title: "无法打开微信地址", icon: "none" });
      },
    });
  },
  onInput: function (e) {
    var key = e.currentTarget.dataset.key;
    var form = this.data.form;
    form[key] = e.detail.value;
    this.setData({ form: form });
  },
  onSave: function () {
    var f = this.data.form;
    if (!f.userName || !f.telNumber) {
      wx.showToast({ title: "请填写姓名和手机", icon: "none" });
      return;
    }
    var addr = {
      userName: f.userName,
      telNumber: f.telNumber,
      provinceName: "",
      cityName: "",
      countyName: f.region || "",
      detailInfo: f.detailInfo || "",
    };
    wx.setStorageSync(KEY, addr);
    this.setData({ address: addr });
    wx.showToast({ title: "已保存", icon: "success" });
  },
});
