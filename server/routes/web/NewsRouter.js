var express = require("express");
var NewsRouter = express.Router();
const NewsControlle = require("../../controllers/web/NewsControlle");
const multer = require("multer");
const upload = multer({ dest: "public/newsuploads/" });

// 获取新闻列表
NewsRouter.get("/webapi/news/getNewsList/", NewsControlle.getNewsList);

// 获取新闻详情
NewsRouter.get("/webapi/news/getNewsInfo/:id", NewsControlle.getNewsInfo);
// 获取最新新闻的前四条
NewsRouter.get("/webapi/news/getCardList", NewsControlle.getCardList);
// 点赞添加取消
NewsRouter.post("/webapi/news/addlike", NewsControlle.addlike);
// 获取点赞状态
NewsRouter.get("/webapi/news/getLike/:id", NewsControlle.getLike);
// 添加评论
NewsRouter.post("/webapi/news/addCommment", NewsControlle.addCommment);

module.exports = NewsRouter;
