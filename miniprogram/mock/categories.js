var imgs = require("./images.js");
module.exports = [
  { id: "all", name: "全部", image: "", icon: "all", sort: 0, enabled: true, parentId: null },
  { id: "shouchi", name: "手持喷花", image: imgs.photos.catShouchi, icon: "hand", sort: 10, enabled: true, parentId: null },
  { id: "penhua", name: "喷花类", image: imgs.photos.catPenhua, icon: "fountain", sort: 20, enabled: true, parentId: null },
  { id: "putong", name: "礼花弹", image: imgs.photos.catLihua, icon: "shell", sort: 30, enabled: true, parentId: null },
  { id: "wanju", name: "烟花棒", image: imgs.photos.catYanhuabang, icon: "sparkler", sort: 40, enabled: true, parentId: null },
  { id: "xuanzhuan", name: "旋转类", image: imgs.photos.catXuanzhuan, icon: "spin", sort: 50, enabled: true, parentId: null },
  { id: "tuijian", name: "组合烟花", image: imgs.photos.catQita, icon: "combo", sort: 60, enabled: true, parentId: null },
  { id: "texiao", name: "特效类", image: imgs.photos.catTexiao, icon: "fx", sort: 70, enabled: true, parentId: null },
  { id: "feitian", name: "其他", image: imgs.photos.catQita, icon: "other", sort: 80, enabled: true, parentId: null },
  { id: "tuzhu", name: "吐珠类", image: imgs.photos.catPenhua, icon: "bead", sort: 90, enabled: true, parentId: null },
  { id: "huojian", name: "火箭类", image: imgs.photos.catYanhuabang, icon: "rocket", sort: 100, enabled: true, parentId: null },
  { id: "disabled_demo", name: "（已禁用）", image: "", icon: "", sort: 999, enabled: false, parentId: null },
];
