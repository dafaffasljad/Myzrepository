const UserModel = require("../../models/UserModel");

const UserService = {
  getUserInfo: async (username) => {
    return UserModel.find({ username });
  },
};

module.exports = UserService;
