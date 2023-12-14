const NewsService = require("../../services/admin/NewsService");

const NewsControlle = {
  // 添加新闻
  addNews: async (req, res) => {
    // console.log(req.body);
    // 图片
    const cover = req.file
      ? `http://localhost:3000/newsuploads/${req.file.filename}`
      : "";
    const { title, content, category, isPublish } = req.body;
    await NewsService.addNews({
      title,
      content,
      category: Number(category),
      isPublish: 0,
      cover,
      editTime: new Date(),
    });
    res.send({
      ActionType: "OK",
    });
  },
  // 获取新闻
  getNewsList: async (req, res) => {
    const { pageSize, pageNum } = req.query;
    const result = await NewsService.getNewsList();
    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const newResult = result.splice(startIndex, endIndex);
    res.send({
      ActionType: "OK",
      data: newResult,
    });
  },
  upNewsPublish: async (req, res) => {
    // console.log(req.body);
    await NewsService.upNewsPublish({
      _id: req.body._id,
      isPublish: req.body.isPublish,
    });
    res.send({
      ActionType: "OK",
    });
  },
  deNewsList: async (req, res) => {
    await NewsService.deNewsList({ _id: req.params.id });
    res.send({
      ActionType: "OK",
    });
  },
  getNewsInfo: async (req, res) => {
    // console.log(req.params);
    const result = await NewsService.getNewsInfo({ _id: req.params.id });
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  upNewsInfo: async (req, res) => {
    // console.log(req.file);
    const { _id, category, content, title } = req.body;
    const cover = req.file
      ? `http://localhost:3000/newsuploads/${req.file.filename}`
      : "";
    await NewsService.upNewsInfo({ _id, category, content, title, cover });
    res.send({
      ActionType: "OK",
    });
  },
  getNewsCount: async (req, res) => {
    const count = await NewsService.getNewsCount();
    res.send({
      ActionType: "OK",
      data: count,
    });
  },
  clearLike: async (req, res) => {
    await NewsService.clearLike(req.params.id);
    res.send({
      ActionType: "OK",
    });
  },
  deleteComment: async (req, res) => {
    await NewsService.deleteComment(req.body);
    res.send({
      ActionType: "OK",
    });
  },
};

module.exports = NewsControlle;
