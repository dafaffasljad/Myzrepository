const NewsService = require("../../services/web/NewsService");

const NewsControlle = {
  getNewsList: async (req, res) => {
    const result = await NewsService.getNewsList({ _id: req.params.id });
    // console.log(result);
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  getNewsInfo: async (req, res) => {
    // console.log(req.params.id);
    const result = await NewsService.getNewsInfo(req.params.id);
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  getCardList: async (req, res) => {
    const result = await NewsService.getCardList(req.query.limit);
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  addlike: async (req, res) => {
    // console.log(req.body);
    await NewsService.addlike(req.body);
  },
  getLike: async (req, res) => {
    const data = await NewsService.getLike(req.params.id);
    res.send({
      ActionType: "OK",
      data: data,
    });
  },
  addCommment: async (req, res) => {
    await NewsService.addCommment(req.body);
    res.send({
      ActionType: "OK",
    });
  },
};

module.exports = NewsControlle;
