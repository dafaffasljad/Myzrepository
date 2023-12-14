const NewsModel = require("../../models/NewsModel");

const NewsService = {
  getNewsList: async ({ _id }) => {
    return _id
      ? NewsModel.find({ _id, isPublish: 1 })
      : NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 });
  },
  getNewsInfo: async (_id) => {
    // console.log(_id);
    return NewsModel.findOne({ _id, isPublish: 1 });
  },
  getCardList: async (limit) => {
    return NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 }).limit(limit);
  },
  addlike: async ({ NewsID, UserID, like }) => {
    // console.log(NewsID);
    const res = await NewsModel.find({ _id: NewsID });

    if (res) {
      if (like === false) {
        await NewsModel.updateOne(
          { _id: NewsID },
          { $push: { UserIDList: UserID }, $inc: { LikeNum: 1 } }
        );
      } else {
        await NewsModel.updateOne(
          { _id: NewsID },
          { $pull: { UserIDList: UserID }, $inc: { LikeNum: -1 } }
        );
      }
    }
  },
  getLike: async (_id) => {
    return NewsModel.find({ _id });
  },
  addCommment: async ({ username, id, comment, avatar }) => {
    // console.log(id);
    const res = await NewsModel.find({ _id: id });
    if (res) {
      await NewsModel.updateOne(
        { _id: id },
        {
          $push: {
            CommentList: { username, comment, comTime: new Date(), avatar },
          },
        }
      );
    }
  },
};

module.exports = NewsService;
