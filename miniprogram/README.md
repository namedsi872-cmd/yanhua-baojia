# 烟花小士多 · 微信小程序

烟花零售/批发**报价**小程序：浏览商品、动态分类、规格改价、加入报价单、提交后在「我的订单」查看。不含收款/营销。

> 烟花类目审核风险高，本仓库仅供演示与自用报价。网页版仍在仓库根目录，互不影响。

## 用微信开发者工具打开（Windows）

1. 下载：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html  
2. 导入项目，目录选本仓库的 **`miniprogram`** 文件夹。  
3. 把 `project.config.json` 里的 `"appid": "touristappid"` 换成公众平台真实 AppID（开发管理 → 开发设置）；没有可先用测试号。  
4. 编译 / 预览 / 上传 / 提交审核。

## 配色

| 用途 | 色值 |
|---|---|
| 主背景 | `#F7F6F3` |
| 卡片 | `#FFFFFF` |
| 品牌炭黑 | `#202326` |
| 价格/主按钮 | `#E45D43` |
| 辅助文字 | `#888888` |

## 底部 Tab（4）

首页 · 分类 · 报价单 · 我的  

底部使用**自定义 tabBar**（`custom-tab-bar/`）绘制线性图标，选中色 `#E45D43`。`images/tab-*.png` 与 `images/banner.png` 可自行放入（Banner 已支持本地图；缺图时首页用深色占位）。

## Banner

`mock/home.js` 的 `bannerImage` 默认 `/images/banner.png`（本地抽象烟花图，**勿热链外网**）。可换成真实照片；若图片缺失，首页会自动用深色抽象占位。

## 数据层（可替换）

所有页面通过 `services/api.js` 取数，**禁止在页面写死分类名**。

```js
// services/api.js
USE_REMOTE = false  // 改为 true 并设置 REMOTE_BASE 即可走 wx.request
getCategories / getProducts / getProduct / getHomeConfig
getShop / submitQuote / getOrders / getOrder
```

本地 mock：

| 文件 | 含义 |
|---|---|
| `mock/categories.js` | 分类 |
| `mock/products.js` | 商品+规格+价格 |
| `mock/home.js` | 首页配置 |
| `mock/shop.js` | 店铺/关于 |
| `services/cart.js` | 报价单本地购物车 |

### 分类 Category

```js
{
  id: String,
  name: String,
  image: String,      // 可选分类图
  icon: String,       // 可选图标/emoji
  sort: Number,       // 越小越靠前
  enabled: Boolean,   // false 不展示
  parentId: String|null  // 子分类预留
}
```

### 商品 Product

```js
{
  id, name, categoryId, image, emoji, intro,
  sales, sort, hot, enabled,
  specs: [
    { id, name, price, stock, minOrder }
  ]
}
```

规格名与价格全动态（如 小号¥8 / 中号¥13 / 大号¥18 只是示例数据）。

### 首页配置 HomeConfig

```js
{
  brandName, bannerImage, searchPlaceholder,
  hotCategoryIds: [categoryId],
  hotProductIds: [productId]
}
```

### 报价单行 CartLine（`services/cart.js`）

`productId + specId` 唯一；字段含 name/specName/price/qty/stock/minOrder。

### 订单 Order（`submitQuote` 写入本地 `yanhua_orders_v1`）

```js
{
  id, createdAt, status: "submitted",
  items: [CartLine],
  totalCount, totalPrice, remark, contact
}
```

后台（本轮不做）可直接按上述结构做：分类拖拽排序、商品规格、库存、订单、首页配置。前端把 `USE_REMOTE=true` 即可对接。

## 页面

| 路径 | 说明 |
|---|---|
| `pages/home` | 品牌名、Banner、搜索、热门分类、热门商品、全部商品 |
| `pages/category` | 左分类导航 + 右单列商品卡（加入报价单），搜索/价格/销量排序 |
| `pages/detail` | 规格切换改价、数量、加入报价单 |
| `pages/quote` | 报价单、改数量、删除、提交 |
| `pages/mine` | 订单/地址/电话/微信/关于 |
| `pages/orders` `order-detail` | 已提交记录 |
| `pages/address` | `wx.chooseAddress` 或表单 |
| `pages/about` | 关于我们 |

组件：`components/product-card`、`components/qty-stepper`。

## 注意

- 无登录、无支付、无云函数、无 npm。  
- 请遵守当地烟花法规；示例商品仅演示。
