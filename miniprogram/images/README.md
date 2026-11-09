# 图片资源

商品图、Banner、分类图标、Tab 图标均通过 `mock/images.js` 以 base64 / SVG data URI 嵌入（避免 Git 推送二进制限制，并保持主包可控）。

页面通过 `mock/*.js` → `services/api.js` 读取，`<image src="data:image/...">` 在微信小程序中可用。

如需换成真实 CDN 地址，只需改 `mock/images.js` 或后台返回的 `image` 字段。
