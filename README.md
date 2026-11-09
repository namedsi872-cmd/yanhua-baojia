# 烟花小士多 · 报价网页

过年卖烟花用的**手机报价单网页**（不是微信小程序）。客人打开链接就能按分类看货、加进报价单、自动算总价，再复制文字或保存图片发到微信里给你确认。

适合：摊位扫码看价、微信群/朋友圈发链接、只报价不下单收款。

> 说明：烟花爆竹类目很难过微信小程序审核，所以做成静态网页，用 GitHub Pages 免费托管，微信里直接打开即可。

## 在线地址

启用 GitHub Pages 后访问：

**https://namedsi872-cmd.github.io/yanhua-baojia/**

（若打不开，请到仓库 Settings → Pages，Source 选 `Deploy from a branch`，Branch 选 `main` / `/ (root)`，保存后等 1～2 分钟。）

仓库地址：https://github.com/namedsi872-cmd/yanhua-baojia

## 功能

- 左侧分类 + 右侧商品卡片（价格、原价划线、库存）
- 顶部搜索商品名
- **报价单**：改数量、自动合计、刷新不丢（浏览器本地保存）
- 一键**复制文字**报价清单，粘贴到微信
- **保存为图片**（方便长按发给客户）
- **联系我们**：电话 / 微信 / 地址

## 怎么改商品、价格和图片

所有店铺信息和商品都在一个文件里：

```
products.js
```

用记事本或 VS Code / Cursor 打开即可。

### 1. 改店铺信息

找到文件开头的 `SHOP`：

```js
const SHOP = {
  name: "烟花小士多",
  phone: "138-0000-0000",
  wechat: "yanhua_demo",
  address: "示例地址：……",
  notice: "本页仅供报价参考……",
};
```

改成你哥的真实店名、电话、微信号、摊位地址。

### 2. 改 / 加商品

在 `PRODUCTS` 数组里增删对象，例如：

```js
{
  id: "p010",                 // 唯一编号，别重复
  name: "舞龙棒",
  category: "shouchi",        // 分类 id，见 CATEGORIES
  price: 13,                  // 现价
  originalPrice: 16,          // 原价（可不写）
  stock: 9999,
  sales: 0,
  emoji: "🎆",                // 没图时的占位
  image: "images/wulong.jpg", // 有真图就填相对路径
  // sample: true,            // 示例商品标记（正式货可删掉）
},
```

分类 id 对照：

| id | 名称 |
|---|---|
| shouchi | 手持喷花类 |
| tuzhu | 吐珠类 |
| huojian | 火箭类 |
| penhua | 喷花类 |
| wanju | 玩具类 |
| xuanzhuan | 旋转类 |
| feitian | 飞天类 |
| putong | 普通礼花类 |
| tuijian | 推荐类 |
| texiao | 特效礼花类 |

### 3. 换真实照片

1. 把图片放进仓库的 `images/` 文件夹（建议 jpg/png/webp，单张别太大，手机打开更快）
2. 在对应商品的 `image` 字段写上路径，例如 `"images/meigui.png"`
3. 提交并推送到 GitHub 后，刷新网页即可

没填 `image` 时会显示彩色底 + emoji，不影响报价。

## 本地预览

这是纯静态站，不需要安装依赖：

```bash
# 任意静态服务器均可，例如：
npx --yes serve .
# 或 Python
python3 -m http.server 8080
```

浏览器打开提示的地址，用手机模式查看效果最好。

## 文件说明

| 文件 | 作用 |
|---|---|
| `index.html` | 页面结构 |
| `style.css` | 喜庆红移动端样式 |
| `app.js` | 分类、搜索、报价单、复制/出图逻辑 |
| `products.js` | **店铺配置 + 商品数据（日常只改这个）** |
| `images/` | 商品照片目录（可空着，之后往里放） |
| `README.md` | 本说明 |

## 注意

- 本页只做报价展示，不包含在线支付。
- 请遵守当地烟花销售与燃放规定；示例商品仅供演示界面。
- 微信内打开若缓存旧版，可清缓存或换个浏览器再试。
