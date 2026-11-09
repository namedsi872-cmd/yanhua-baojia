(function () {
  "use strict";

  var STORAGE_KEY = "yanhua_quote_v1";
  var state = {
    tab: "home",
    category: (CATEGORIES[0] && CATEGORIES[0].id) || "",
    keyword: "",
    quote: loadQuote(),
  };

  var els = {};

  function $(id) {
    return document.getElementById(id);
  }

  function loadQuote() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      var data = JSON.parse(raw);
      return data && typeof data === "object" ? data : {};
    } catch (e) {
      return {};
    }
  }

  function saveQuote() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.quote));
  }

  function money(n) {
    return Number(n || 0).toFixed(2);
  }

  function toast(msg) {
    var t = els.toast;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () {
      t.classList.remove("show");
    }, 1800);
  }

  function productById(id) {
    for (var i = 0; i < PRODUCTS.length; i++) {
      if (PRODUCTS[i].id === id) return PRODUCTS[i];
    }
    return null;
  }

  function quoteCount() {
    var n = 0;
    Object.keys(state.quote).forEach(function (id) {
      n += state.quote[id] || 0;
    });
    return n;
  }

  function quoteTotal() {
    var sum = 0;
    Object.keys(state.quote).forEach(function (id) {
      var p = productById(id);
      var qty = state.quote[id] || 0;
      if (p && qty > 0) sum += p.price * qty;
    });
    return sum;
  }

  function thumbHtml(p) {
    var badge = p.sample ? '<span class="sample-badge">示例</span>' : "";
    if (p.image) {
      return (
        '<div class="thumb">' +
        badge +
        '<img src="' +
        escapeAttr(p.image) +
        '" alt="' +
        escapeAttr(p.name) +
        '" onerror="this.style.display=\'none\';this.parentNode.querySelector(\'.emoji-ph\').style.display=\'block\'">' +
        '<span class="emoji-ph" style="display:none">' +
        (p.emoji || "🎆") +
        "</span></div>"
      );
    }
    return (
      '<div class="thumb">' +
      badge +
      '<span class="emoji-ph">' +
      (p.emoji || "🎆") +
      "</span></div>"
    );
  }

  function escapeAttr(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function renderHeader() {
    els.shopTitle.textContent = SHOP.name;
  }

  function renderSidebar() {
    var html = "";
    CATEGORIES.forEach(function (c) {
      var active = c.id === state.category ? " active" : "";
      html +=
        '<button type="button" class="cat-btn' +
        active +
        '" data-cat="' +
        escapeAttr(c.id) +
        '">' +
        escapeHtml(c.name) +
        "</button>";
    });
    els.sidebar.innerHTML = html;
  }

  function filteredProducts() {
    var kw = state.keyword.trim().toLowerCase();
    return PRODUCTS.filter(function (p) {
      if (kw) return p.name.toLowerCase().indexOf(kw) !== -1;
      return p.category === state.category;
    });
  }

  function renderProducts() {
    var list = filteredProducts();
    if (!list.length) {
      els.productList.innerHTML =
        '<div class="empty-tip">没有找到相关商品<br>换个关键词或分类试试</div>';
      return;
    }
    var html = "";
    list.forEach(function (p) {
      var old =
        p.originalPrice != null
          ? '<span class="price-old">¥' + money(p.originalPrice) + "</span>"
          : "";
      html +=
        '<article class="product-card">' +
        thumbHtml(p) +
        '<div class="pinfo">' +
        '<h3 class="pname">' +
        escapeHtml(p.name) +
        "</h3>" +
        '<div class="prices"><span class="price-now">' +
        money(p.price) +
        "</span>" +
        old +
        "</div>" +
        '<div class="meta">月售' +
        (p.sales != null ? p.sales : 0) +
        " | 库存" +
        (p.stock != null ? p.stock : "-") +
        "</div>" +
        '<div class="row-bottom">' +
        '<span class="shop-pill">' +
        escapeHtml(SHOP.name) +
        "</span>" +
        '<button type="button" class="add-btn" data-add="' +
        escapeAttr(p.id) +
        '" aria-label="加入报价单">＋</button>' +
        "</div></div></article>";
    });
    els.productList.innerHTML = html;
  }

  function renderQuote() {
    var ids = Object.keys(state.quote).filter(function (id) {
      return state.quote[id] > 0 && productById(id);
    });
    els.totalSum.textContent = "¥" + money(quoteTotal());
    els.totalCount.textContent = String(quoteCount());

    if (!ids.length) {
      els.quoteList.innerHTML =
        '<div class="empty-tip">报价单还是空的<br>去首页点「＋」添加商品吧</div>';
      return;
    }

    var html = "";
    ids.forEach(function (id) {
      var p = productById(id);
      var qty = state.quote[id];
      html +=
        '<div class="quote-item" data-qid="' +
        escapeAttr(id) +
        '">' +
        thumbHtml(p) +
        '<div class="pinfo">' +
        '<div class="quote-name">' +
        escapeHtml(p.name) +
        "</div>" +
        '<div class="quote-price">¥' +
        money(p.price) +
        "</div>" +
        '<div class="qty-ctrl">' +
        '<button type="button" data-dec="' +
        escapeAttr(id) +
        '">−</button>' +
        "<span>" +
        qty +
        "</span>" +
        '<button type="button" data-inc="' +
        escapeAttr(id) +
        '">＋</button>' +
        "</div></div></div>";
    });
    els.quoteList.innerHTML = html;
  }

  function renderContact() {
    els.contactName.textContent = SHOP.name;
    els.contactNotice.textContent = SHOP.notice || "";
    els.contactPhone.textContent = SHOP.phone;
    els.contactPhone.href = "tel:" + String(SHOP.phone).replace(/[^\d+]/g, "");
    els.contactWechat.textContent = SHOP.wechat;
    els.contactAddress.textContent = SHOP.address;
  }

  function renderBadge() {
    var n = quoteCount();
    if (n > 0) {
      els.badge.style.display = "block";
      els.badge.textContent = n > 99 ? "99+" : String(n);
    } else {
      els.badge.style.display = "none";
    }
  }

  function switchTab(tab) {
    state.tab = tab;
    ["home", "quote", "contact"].forEach(function (name) {
      $("view-" + name).classList.toggle("active", name === tab);
      document
        .querySelector('.tab-btn[data-tab="' + name + '"]')
        .classList.toggle("active", name === tab);
    });
    if (tab === "quote") renderQuote();
  }

  function addToQuote(id, delta) {
    var cur = state.quote[id] || 0;
    var next = cur + delta;
    if (next <= 0) {
      delete state.quote[id];
    } else {
      state.quote[id] = next;
    }
    saveQuote();
    renderBadge();
    if (state.tab === "quote") renderQuote();
  }

  function buildTextSummary() {
    var lines = [];
    lines.push("【" + SHOP.name + "】报价清单");
    lines.push("--------------------");
    var ids = Object.keys(state.quote).filter(function (id) {
      return state.quote[id] > 0 && productById(id);
    });
    if (!ids.length) {
      lines.push("（空）");
    } else {
      ids.forEach(function (id, i) {
        var p = productById(id);
        var qty = state.quote[id];
        var sub = p.price * qty;
        lines.push(
          i +
            1 +
            ". " +
            p.name +
            " × " +
            qty +
            "　¥" +
            money(p.price) +
            "　小计¥" +
            money(sub)
        );
      });
    }
    lines.push("--------------------");
    lines.push("合计：" + quoteCount() + " 件　¥" + money(quoteTotal()));
    lines.push("电话：" + SHOP.phone);
    lines.push("微信：" + SHOP.wechat);
    lines.push("地址：" + SHOP.address);
    lines.push("（请与店主确认库存后再下单）");
    return lines.join("\n");
  }

  function copySummary() {
    var text = buildTextSummary();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () {
          toast("已复制报价单，可粘贴到微信");
        },
        function () {
          fallbackCopy(text);
        }
      );
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      toast("已复制报价单，可粘贴到微信");
    } catch (e) {
      toast("复制失败，请手动长按选择");
      prompt("请手动复制以下内容：", text);
    }
    document.body.removeChild(ta);
  }

  function clearQuote() {
    if (!quoteCount()) {
      toast("报价单已经是空的");
      return;
    }
    if (!confirm("确定清空报价单吗？")) return;
    state.quote = {};
    saveQuote();
    renderBadge();
    renderQuote();
    toast("已清空");
  }

  function fillCapture() {
    var box = $("quote-capture");
    var ids = Object.keys(state.quote).filter(function (id) {
      return state.quote[id] > 0 && productById(id);
    });
    var lines = "";
    ids.forEach(function (id) {
      var p = productById(id);
      var qty = state.quote[id];
      lines +=
        '<div class="cap-line"><span>' +
        escapeHtml(p.name) +
        " × " +
        qty +
        '</span><span>¥' +
        money(p.price * qty) +
        "</span></div>";
    });
    if (!lines) {
      lines = '<div class="cap-line"><span>（空）</span><span></span></div>';
    }
    box.innerHTML =
      "<h3>" +
      escapeHtml(SHOP.name) +
      " · 报价单</h3>" +
      lines +
      '<div class="cap-total">合计 ¥' +
      money(quoteTotal()) +
      "</div>" +
      '<div class="cap-meta">电话：' +
      escapeHtml(SHOP.phone) +
      "<br>微信：" +
      escapeHtml(SHOP.wechat) +
      "<br>地址：" +
      escapeHtml(SHOP.address) +
      "</div>";
  }

  function saveAsImage() {
    if (!quoteCount()) {
      toast("请先添加商品再保存图片");
      return;
    }
    if (typeof html2canvas !== "function") {
      toast("图片库加载失败，请用「复制文字」");
      return;
    }
    fillCapture();
    var box = $("quote-capture");
    box.style.position = "fixed";
    box.style.left = "-9999px";
    box.style.top = "0";
    box.style.width = "360px";
    box.style.display = "block";

    html2canvas(box, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
    })
      .then(function (canvas) {
        box.style.display = "none";
        var dataUrl = canvas.toDataURL("image/png");
        // 尝试下载；微信内可能受限，同时打开预览
        var a = document.createElement("a");
        a.href = dataUrl;
        a.download = "报价单-" + SHOP.name + ".png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        var w = window.open("");
        if (w) {
          w.document.write(
            '<title>报价单图片</title><p style="text-align:center;font-family:sans-serif">长按图片保存后发给微信</p><img src="' +
              dataUrl +
              '" style="max-width:100%">'
          );
        } else {
          toast("已生成图片，若未下载请允许弹窗后重试");
        }
        toast("图片已生成，可长按保存");
      })
      .catch(function () {
        box.style.display = "none";
        toast("生成图片失败，请改用复制文字");
      });
  }

  function bindEvents() {
    els.search.addEventListener("input", function () {
      state.keyword = els.search.value || "";
      renderProducts();
    });

    els.sidebar.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-cat]");
      if (!btn) return;
      state.category = btn.getAttribute("data-cat");
      state.keyword = "";
      els.search.value = "";
      renderSidebar();
      renderProducts();
    });

    els.productList.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-add]");
      if (!btn) return;
      var id = btn.getAttribute("data-add");
      addToQuote(id, 1);
      toast("已加入报价单");
    });

    els.quoteList.addEventListener("click", function (e) {
      var inc = e.target.closest("[data-inc]");
      var dec = e.target.closest("[data-dec]");
      if (inc) addToQuote(inc.getAttribute("data-inc"), 1);
      if (dec) addToQuote(dec.getAttribute("data-dec"), -1);
    });

    document.querySelectorAll(".tab-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        switchTab(btn.getAttribute("data-tab"));
      });
    });

    $("btn-copy").addEventListener("click", copySummary);
    $("btn-image").addEventListener("click", saveAsImage);
    $("btn-clear").addEventListener("click", clearQuote);
  }

  function init() {
    els.shopTitle = $("shop-title-text");
    els.search = $("search-input");
    els.sidebar = $("sidebar");
    els.productList = $("product-list");
    els.quoteList = $("quote-list");
    els.totalSum = $("total-sum");
    els.totalCount = $("total-count");
    els.toast = $("toast");
    els.badge = $("quote-badge");
    els.contactName = $("contact-name");
    els.contactNotice = $("contact-notice");
    els.contactPhone = $("contact-phone");
    els.contactWechat = $("contact-wechat");
    els.contactAddress = $("contact-address");

    // 动态校正侧栏 sticky 顶距
    var header = document.querySelector(".header");
    if (header) {
      document.documentElement.style.setProperty(
        "--header-h",
        header.offsetHeight + "px"
      );
    }

    renderHeader();
    renderSidebar();
    renderProducts();
    renderContact();
    renderBadge();
    bindEvents();
    switchTab("home");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
