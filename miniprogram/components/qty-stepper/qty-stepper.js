Component({
  properties: {
    qty: { type: Number, value: 1 },
    min: { type: Number, value: 1 },
    max: { type: Number, value: 99999 },
    productId: { type: String, value: "" },
    specId: { type: String, value: "" },
  },
  methods: {
    onTap: function (e) {
      var delta = Number(e.currentTarget.dataset.delta) || 0;
      var next = this.data.qty + delta;
      if (next < this.data.min || next > this.data.max) return;
      this.triggerEvent("change", {
        qty: next,
        productId: this.data.productId,
        specId: this.data.specId,
      });
    },
  },
});
