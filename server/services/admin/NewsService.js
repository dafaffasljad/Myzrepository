const NewsModel = require("../../models/NewsModel");

const NewsService = {
  addNews: async ({ title, content, category, isPublish, cover, editTime }) => {
    return NewsModel.create({
      title,
      content,
      category,
      cover,
      isPublish,
      editTime,
      LikeNum: 0,
    });
  },
  getNewsList: async () => {
    return NewsModel.find();
  },
  upNewsPublish: async ({ _id, isPublish }) => {
    return NewsModel.updateOne({ _id }, { isPublish, editTime: new Date() });
  },
  deNewsList: async (_id) => {
    return NewsModel.deleteOne({ _id });
  },
  getNewsInfo: async (_id) => {
    return NewsModel.findOne({ _id });
  },
  upNewsInfo: async ({ _id, category, content, title, cover }) => {
    if (cover) {
      return NewsModel.updateOne(
        { _id },
        { category, content, title, cover, editTime: new Date() }
      );
    } else {
      return NewsModel.updateOne(
        { _id },
        { category, content, title, editTime: new Date() }
      );
    }
  },
  getNewsCount: async () => {
    return NewsModel.find().count();
  },
  clearLike: async (_id) => {
    return NewsModel.updateOne({ _id }, { LikeNum: 0, UserIDList: [] });
  },
  deleteComment: async ({ id, username, comment }) => {
    return NewsModel.updateOne(
      { _id: id },
      { $pull: { CommentList: { username, comment } } }
    );
  },
};

module.exports = NewsService;
