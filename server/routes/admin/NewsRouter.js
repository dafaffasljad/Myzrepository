var express = require("express");
var NewsRouter = express.Router();
const NewsControlle = require("../../controllers/admin/NewsControlle");
const multer = require("multer");
const upload = multer({ dest: "public/newsuploads/" });

// 添加新闻
NewsRouter.post(
  "/adminapi/news/addNews",
  upload.single("file"),
  NewsControlle.addNews
);
// 获取新闻列表
NewsRouter.get("/adminapi/news/getNewsList", NewsControlle.getNewsList);
// 修改发布状态
NewsRouter.put("/adminapi/news/upNewsPublish", NewsControlle.upNewsPublish);
// 删除新闻
NewsRouter.delete("/adminapi/news/deNewsList/:id", NewsControlle.deNewsList);
// 获取新闻详情
NewsRouter.get("/adminapi/news/getNewsInfo/:id", NewsControlle.getNewsInfo);
// 修改信息详情
NewsRouter.post(
  "/adminapi/news/upNewsInfo",
  upload.single("file"),
  NewsControlle.upNewsInfo
);
// 获取新闻数量
NewsRouter.get("/adminapi/news/getNewsCount", NewsControlle.getNewsCount);
// 清空点赞量
NewsRouter.put("/adminapi/news/clearLike/:id", NewsControlle.clearLike);
// 删除评论
NewsRouter.post("/adminapi/news/deleteComment", NewsControlle.deleteComment);
module.exports = NewsRouter;
