/**
 * 分类数据 — 对应后台分类管理
 * 字段：id, name, image, icon, sort, enabled, parentId(可选子分类)
 * 前端按 enabled 过滤、按 sort 升序渲染，禁止在页面写死分类名
 */
module.exports = [
  { id: "shouchi", name: "手持喷花类", image: "", icon: "🎆", sort: 10, enabled: true, parentId: null },
  { id: "tuzhu", name: "吐珠类", image: "", icon: "💥", sort: 20, enabled: true, parentId: null },
  { id: "huojian", name: "火箭类", image: "", icon: "🚀", sort: 30, enabled: true, parentId: null },
  { id: "penhua", name: "喷花类", image: "", icon: "🌋", sort: 40, enabled: true, parentId: null },
  { id: "wanju", name: "玩具类", image: "", icon: "🪄", sort: 50, enabled: true, parentId: null },
  { id: "xuanzhuan", name: "旋转类", image: "", icon: "🎡", sort: 60, enabled: true, parentId: null },
  { id: "feitian", name: "飞天类", image: "", icon: "🛸", sort: 70, enabled: true, parentId: null },
  { id: "putong", name: "普通礼花类", image: "", icon: "🧨", sort: 80, enabled: true, parentId: null },
  { id: "tuijian", name: "推荐类", image: "", icon: "🎁", sort: 5, enabled: true, parentId: null },
  { id: "texiao", name: "特效礼花类", image: "", icon: "💫", sort: 90, enabled: true, parentId: null },
  { id: "disabled_demo", name: "（已禁用示例）", image: "", icon: "", sort: 99, enabled: false, parentId: null },
];
