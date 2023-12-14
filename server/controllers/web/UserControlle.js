const UserService = require("../../services/web/UserService");

const UserControlle = {
  getUserInfo: async (req, res) => {
    const result = await UserService.getUserInfo(req.params.username);
    console.log(result);
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
};

module.exports = UserControlle;
