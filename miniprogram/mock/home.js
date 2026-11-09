/**
 * 首页配置 — 对应后台「首页配置」
 * bannerImage: 本地路径，勿热链外网；可换成真实烟花照片 /images/banner.png
 * hotCategoryIds / hotProductIds: 引用分类与商品 id
 */
module.exports = {
  brandName: "烟花小士多",
  bannerImage: "/images/banner.png" /* 可换真实照片；仓库已含抽象图 */,
  bannerTitle: "",
  searchPlaceholder: "搜索商品名称",
  hotCategoryIds: ["shouchi", "tuzhu", "huojian", "tuijian"],
  hotProductIds: ["p001", "p002", "p004", "p801"],
};
