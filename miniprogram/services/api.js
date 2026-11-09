/**
 * 统一数据层。当前读 mock；日后改为 wx.request / 云开发时只改本文件。
 * USE_REMOTE = false 时走本地 mock。
 */
var USE_REMOTE = false;
var REMOTE_BASE = ""; // 例如 https://api.example.com

var shop = require("../mock/shop.js");
var homeConfig = require("../mock/home.js");
var categoriesMock = require("../mock/categories.js");
var productsMock = require("../mock/products.js");

function remote(path, method, data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: REMOTE_BASE + path,
      method: method || "GET",
      data: data || {},
      success: function (res) {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(res.data);
        else reject(res);
      },
      fail: reject,
    });
  });
}

function clone(o) {
  return JSON.parse(JSON.stringify(o));
}

function enabledCategories() {
  return categoriesMock
    .filter(function (c) {
      return c.enabled !== false;
    })
    .sort(function (a, b) {
      return (a.sort || 0) - (b.sort || 0);
    })
    .map(clone);
}

function enabledProducts() {
  return productsMock.filter(function (p) {
    return p.enabled !== false;
  });
}

function withDefaultSpec(p) {
  var item = clone(p);
  var spec = (item.specs && item.specs[0]) || {
    id: "default",
    name: "标准",
    price: 0,
    stock: 0,
    minOrder: 1,
  };
  item.defaultSpec = spec;
  item.price = spec.price;
  item.stock = spec.stock;
  item.minOrder = spec.minOrder;
  item.specSummary = (item.specs || [])
    .map(function (s) {
      return s.name + "¥" + s.price;
    })
    .join(" / ");
  return item;
}

function getCategories() {
  if (USE_REMOTE) return remote("/categories");
  return Promise.resolve(enabledCategories());
}

function getCategoryById(id) {
  return getCategories().then(function (list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  });
}

function getProducts(query) {
  if (USE_REMOTE) return remote("/products", "GET", query || {});
  query = query || {};
  var list = enabledProducts().map(withDefaultSpec);
  if (query.categoryId) {
    list = list.filter(function (p) {
      return p.categoryId === query.categoryId;
    });
  }
  if (query.keyword) {
    var kw = String(query.keyword).trim().toLowerCase();
    list = list.filter(function (p) {
      return String(p.name).toLowerCase().indexOf(kw) !== -1;
    });
  }
  if (query.hot) {
    list = list.filter(function (p) {
      return !!p.hot;
    });
  }
  var sort = query.sort || "default";
  list.sort(function (a, b) {
    if (sort === "price_asc") return a.price - b.price;
    if (sort === "price_desc") return b.price - a.price;
    if (sort === "sales_desc") return (b.sales || 0) - (a.sales || 0);
    return (a.sort || 0) - (b.sort || 0);
  });
  return Promise.resolve(list);
}

function getProduct(id) {
  if (USE_REMOTE) return remote("/products/" + id);
  for (var i = 0; i < productsMock.length; i++) {
    if (productsMock[i].id === id && productsMock[i].enabled !== false) {
      return Promise.resolve(withDefaultSpec(productsMock[i]));
    }
  }
  return Promise.resolve(null);
}

function getHomeConfig() {
  if (USE_REMOTE) return remote("/home");
  var cfg = clone(homeConfig);
  return getCategories().then(function (cats) {
    var catMap = {};
    cats.forEach(function (c) {
      catMap[c.id] = c;
    });
    cfg.hotCategories = (cfg.hotCategoryIds || [])
      .map(function (id) {
        return catMap[id];
      })
      .filter(Boolean);
    return getProducts({}).then(function (products) {
      var pMap = {};
      products.forEach(function (p) {
        pMap[p.id] = p;
      });
      cfg.hotProducts = (cfg.hotProductIds || [])
        .map(function (id) {
          return pMap[id];
        })
        .filter(Boolean);
      cfg.allProducts = products;
      cfg.shop = clone(shop);
      return cfg;
    });
  });
}

function getShop() {
  if (USE_REMOTE) return remote("/shop");
  return Promise.resolve(clone(shop));
}

/** 提交报价单 → 生成订单记录（本地；可换接口） */
function submitQuote(payload) {
  if (USE_REMOTE) return remote("/quotes", "POST", payload);
  var orders = [];
  try {
    orders = wx.getStorageSync("yanhua_orders_v1") || [];
    if (!Array.isArray(orders)) orders = [];
  } catch (e) {
    orders = [];
  }
  var order = {
    id: "Q" + Date.now(),
    createdAt: new Date().toISOString(),
    status: "submitted",
    items: payload.items || [],
    totalCount: payload.totalCount || 0,
    totalPrice: payload.totalPrice || 0,
    remark: payload.remark || "",
    contact: payload.contact || null,
  };
  orders.unshift(order);
  wx.setStorageSync("yanhua_orders_v1", orders);
  return Promise.resolve(order);
}

function getOrders() {
  if (USE_REMOTE) return remote("/orders");
  try {
    var orders = wx.getStorageSync("yanhua_orders_v1") || [];
    return Promise.resolve(Array.isArray(orders) ? orders : []);
  } catch (e) {
    return Promise.resolve([]);
  }
}

function getOrder(id) {
  return getOrders().then(function (list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  });
}

module.exports = {
  USE_REMOTE: USE_REMOTE,
  getCategories: getCategories,
  getCategoryById: getCategoryById,
  getProducts: getProducts,
  getProduct: getProduct,
  getHomeConfig: getHomeConfig,
  getShop: getShop,
  submitQuote: submitQuote,
  getOrders: getOrders,
  getOrder: getOrder,
};
