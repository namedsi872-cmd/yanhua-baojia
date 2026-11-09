/**
 * ========================================
 * 烟花报价单 - 配置与商品数据（改这里就行）
 * ========================================
 *
 * 怎么改：
 * 1. 店铺信息：改下面的 SHOP 对象
 * 2. 分类：改 CATEGORIES 数组（id 要和商品的 category 对应）
 * 3. 商品：在 PRODUCTS 里增删改
 *    - id: 唯一编号
 *    - name: 商品名
 *    - category: 所属分类 id
 *    - price: 现价（数字）
 *    - originalPrice: 原价（可选，不写就不显示划线价）
 *    - stock: 库存（可选）
 *    - sales: 月售（可选）
 *    - image: 图片路径（可选）。例如 "images/wulongbang.jpg"
 *      把照片放到 images/ 文件夹后，在这里填写相对路径即可
 *      不填则用彩色占位图 + emoji
 *    - emoji: 占位图用的 emoji（可选）
 *    - sample: true 表示示例商品，页面会标「示例」
 */

const SHOP = {
  name: "烟花小士多",
  phone: "138-0000-0000",
  wechat: "yanhua_demo",
  address: "示例地址：XX市XX区过年烟花摊位（请改成真实地址）",
  notice: "本页仅供报价参考，下单请联系店主确认库存与配送。",
};

/** 左侧分类（顺序即展示顺序） */
const CATEGORIES = [
  { id: "shouchi", name: "手持喷花类" },
  { id: "tuzhu", name: "吐珠类" },
  { id: "huojian", name: "火箭类" },
  { id: "penhua", name: "喷花类" },
  { id: "wanju", name: "玩具类" },
  { id: "xuanzhuan", name: "旋转类" },
  { id: "feitian", name: "飞天类" },
  { id: "putong", name: "普通礼花类" },
  { id: "tuijian", name: "推荐类" },
  { id: "texiao", name: "特效礼花类" },
];

/** 商品列表 */
const PRODUCTS = [
  // —— 手持喷花类（截图里的样例）——
  {
    id: "p001",
    name: "舞龙棒",
    category: "shouchi",
    price: 13,
    originalPrice: 16,
    stock: 9999,
    sales: 0,
    emoji: "🎆",
    image: "",
  },
  {
    id: "p002",
    name: "玫瑰喷花",
    category: "shouchi",
    price: 10,
    originalPrice: 15,
    stock: 9999,
    sales: 0,
    emoji: "🌹",
    image: "",
  },
  {
    id: "p003",
    name: "金银丝雨",
    category: "shouchi",
    price: 15,
    originalPrice: 20,
    stock: 9999,
    sales: 0,
    emoji: "✨",
    image: "",
  },
  {
    id: "p004",
    name: "手持风车",
    category: "shouchi",
    price: 45,
    originalPrice: 55,
    stock: 9999,
    sales: 0,
    emoji: "🌀",
    image: "",
  },

  // —— 其他分类示例（标 sample，方便你哥替换）——
  {
    id: "p101",
    name: "【示例】彩珠吐珠筒",
    category: "tuzhu",
    price: 28,
    originalPrice: 35,
    stock: 200,
    sales: 12,
    emoji: "💥",
    image: "",
    sample: true,
  },
  {
    id: "p102",
    name: "【示例】七彩吐珠",
    category: "tuzhu",
    price: 36,
    originalPrice: 45,
    stock: 150,
    sales: 8,
    emoji: "🌈",
    image: "",
    sample: true,
  },
  {
    id: "p201",
    name: "【示例】冲天火箭",
    category: "huojian",
    price: 18,
    originalPrice: 25,
    stock: 300,
    sales: 20,
    emoji: "🚀",
    image: "",
    sample: true,
  },
  {
    id: "p202",
    name: "【示例】双响火箭",
    category: "huojian",
    price: 32,
    originalPrice: 40,
    stock: 180,
    sales: 5,
    emoji: "🎇",
    image: "",
    sample: true,
  },
  {
    id: "p301",
    name: "【示例】地面喷花桶",
    category: "penhua",
    price: 68,
    originalPrice: 88,
    stock: 80,
    sales: 15,
    emoji: "🌋",
    image: "",
    sample: true,
  },
  {
    id: "p401",
    name: "【示例】儿童玩具烟花棒",
    category: "wanju",
    price: 8,
    originalPrice: 12,
    stock: 500,
    sales: 40,
    emoji: "🪄",
    image: "",
    sample: true,
  },
  {
    id: "p501",
    name: "【示例】旋转飞轮",
    category: "xuanzhuan",
    price: 22,
    originalPrice: 28,
    stock: 120,
    sales: 9,
    emoji: "🎡",
    image: "",
    sample: true,
  },
  {
    id: "p601",
    name: "【示例】飞碟烟花",
    category: "feitian",
    price: 25,
    originalPrice: 30,
    stock: 100,
    sales: 11,
    emoji: "🛸",
    image: "",
    sample: true,
  },
  {
    id: "p701",
    name: "【示例】8发普通礼花",
    category: "putong",
    price: 58,
    originalPrice: 75,
    stock: 60,
    sales: 18,
    emoji: "🧨",
    image: "",
    sample: true,
  },
  {
    id: "p801",
    name: "【示例】店长推荐组合包",
    category: "tuijian",
    price: 199,
    originalPrice: 268,
    stock: 40,
    sales: 30,
    emoji: "🎁",
    image: "",
    sample: true,
  },
  {
    id: "p901",
    name: "【示例】特效瀑布礼花",
    category: "texiao",
    price: 128,
    originalPrice: 168,
    stock: 35,
    sales: 7,
    emoji: "💫",
    image: "",
    sample: true,
  },
];
