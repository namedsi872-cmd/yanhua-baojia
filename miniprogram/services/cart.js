/**
 * 报价单（购物车）统一管理 — 本地持久化，key 可随接口替换
 * 行唯一键：productId + specId
 */
var STORAGE_KEY = "yanhua_cart_v1";

function load() {
  try {
    var raw = wx.getStorageSync(STORAGE_KEY);
    if (!raw) return [];
    return Array.isArray(raw) ? raw : [];
  } catch (e) {
    return [];
  }
}

function save(items) {
  wx.setStorageSync(STORAGE_KEY, items || []);
  try {
    getApp().globalData.cartCount = count(items);
  } catch (e) {}
}

function lineKey(productId, specId) {
  return productId + "::" + specId;
}

function count(items) {
  items = items || load();
  var n = 0;
  items.forEach(function (it) {
    n += it.qty || 0;
  });
  return n;
}

function total(items) {
  items = items || load();
  var s = 0;
  items.forEach(function (it) {
    s += (it.price || 0) * (it.qty || 0);
  });
  return s;
}

/**
 * 加入报价单
 * item: { productId, name, image, emoji, specId, specName, price, stock, minOrder, qty }
 */
function add(item) {
  var items = load();
  var key = lineKey(item.productId, item.specId);
  var found = null;
  for (var i = 0; i < items.length; i++) {
    if (lineKey(items[i].productId, items[i].specId) === key) {
      found = items[i];
      break;
    }
  }
  var qty = item.qty || item.minOrder || 1;
  if (found) {
    var next = found.qty + qty;
    if (item.stock != null) next = Math.min(next, item.stock);
    found.qty = next;
    found.price = item.price;
    found.stock = item.stock;
  } else {
    items.push({
      productId: item.productId,
      name: item.name,
      image: item.image || "",
      emoji: item.emoji || "🎆",
      specId: item.specId,
      specName: item.specName,
      price: item.price,
      stock: item.stock,
      minOrder: item.minOrder || 1,
      qty: qty,
    });
  }
  save(items);
  return items;
}

function setQty(productId, specId, qty) {
  var items = load();
  var key = lineKey(productId, specId);
  items = items
    .map(function (it) {
      if (lineKey(it.productId, it.specId) !== key) return it;
      var min = it.minOrder || 1;
      var max = it.stock != null ? it.stock : 99999;
      var q = Math.max(min, Math.min(max, qty));
      if (q <= 0) return null;
      it.qty = q;
      return it;
    })
    .filter(Boolean);
  save(items);
  return items;
}

function remove(productId, specId) {
  var key = lineKey(productId, specId);
  var items = load().filter(function (it) {
    return lineKey(it.productId, it.specId) !== key;
  });
  save(items);
  return items;
}

function clear() {
  save([]);
  return [];
}

function money(n) {
  return Number(n || 0).toFixed(2);
}

module.exports = {
  STORAGE_KEY: STORAGE_KEY,
  load: load,
  save: save,
  add: add,
  setQty: setQty,
  remove: remove,
  clear: clear,
  count: count,
  total: total,
  money: money,
  lineKey: lineKey,
};
