/**
 * 分类数据 — 后台可改；前端按 enabled/sort 动态渲染
 */
module.exports = [
  { id: "all", name: "全部", image: "", icon: "all", sort: 0, enabled: true, parentId: null },
  { id: "shouchi", name: "手持喷花", image: "", icon: "hand", sort: 10, enabled: true, parentId: null },
  { id: "penhua", name: "喷花类", image: "", icon: "fountain", sort: 20, enabled: true, parentId: null },
  { id: "putong", name: "礼花弹", image: "", icon: "shell", sort: 30, enabled: true, parentId: null },
  { id: "wanju", name: "烟花棒", image: "", icon: "sparkler", sort: 40, enabled: true, parentId: null },
  { id: "xuanzhuan", name: "旋转类", image: "", icon: "spin", sort: 50, enabled: true, parentId: null },
  { id: "tuijian", name: "组合烟花", image: "", icon: "combo", sort: 60, enabled: true, parentId: null },
  { id: "texiao", name: "特效类", image: "", icon: "fx", sort: 70, enabled: true, parentId: null },
  { id: "feitian", name: "其他", image: "", icon: "other", sort: 80, enabled: true, parentId: null },
  { id: "tuzhu", name: "吐珠类", image: "", icon: "bead", sort: 90, enabled: true, parentId: null },
  { id: "huojian", name: "火箭类", image: "", icon: "rocket", sort: 100, enabled: true, parentId: null },
  { id: "disabled_demo", name: "（已禁用示例）", image: "", icon: "", sort: 999, enabled: false, parentId: null },
];
