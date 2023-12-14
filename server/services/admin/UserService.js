const UserModel = require("../../models/UserModel");

const UserService = {
  login: async ({ username, password }) => {
    return UserModel.find({ username, password });
  },
  toRegister: async ({ username, password, role }) => {
    return UserModel.create({
      username,
      password,
      role,
      gender: 0,
    });
  },
  upload: async ({ _id, username, introduction, gender, avatar }) => {
    if (avatar) {
      return UserModel.updateOne(
        {
          _id,
        },
        {
          username,
          introduction,
          gender,
          avatar,
        }
      );
    } else {
      return UserModel.updateOne(
        {
          _id,
        },
        {
          username,
          introduction,
          gender,
        }
      );
    }
  },
  webUpload: async ({ _id, username, introduction, gender, avatar }) => {
    if (avatar) {
      return UserModel.updateOne(
        {
          _id,
        },
        {
          username,
          introduction,
          gender,
          avatar,
        }
      );
    } else {
      return UserModel.updateOne(
        {
          _id,
        },
        {
          username,
          introduction,
          gender,
        }
      );
    }
  },
  add: async ({ username, introduction, gender, avatar, password, role }) => {
    return UserModel.create({
      username,
      introduction,
      gender,
      avatar,
      password,
      role,
    });
  },
  userList: async () => {
    return UserModel.find({}, [
      "username",
      "introduction",
      "gender",
      "avatar",
      "role",
    ]);
  },
  delUserList: async (_id) => {
    return UserModel.deleteOne({
      _id,
    });
  },
  getUserInfo: async (id) => {
    return UserModel.find({ _id: id });
  },
  upUserInfo: async (body) => {
    return UserModel.updateOne({ _id: body._id }, body);
  },
};

module.exports = UserService;
