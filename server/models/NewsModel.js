const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsType = {
  title: String,
  content: String,
  category: Number, //类别 1,2,3
  cover: String, //封面
  isPublish: Number, //发布状态
  editTime: Date, //管理员1编辑者2
  LikeNum: Number,
  UserIDList: Array,
  CommentList: Array,
};

const newsModel = mongoose.model("news", new Schema(NewsType));
module.exports = newsModel;
