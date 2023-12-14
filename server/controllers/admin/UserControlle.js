const UserService = require("../../services/admin/UserService");
const JWT = require("../../util/JWT");
require("../../util/JWT");

const UserController = {
  // 登录接口
  login: async (req, res) => {
    // console.log(req.body);
    var result = await UserService.login(req.body);
    if (result.length === 0) {
      res.send({
        code: "-1",
        error: "用户名或密码不匹配",
      });
    } else {
      // 生成token
      const token = JWT.generate(
        {
          _id: result[0]._id,
          username: result[0].username,
        },
        "1d"
      );
      res.header("Authorization", token);
      res.setHeader("Access-Control-Expose-Headers", "Authorization");
      res.send({
        ActionType: "OK",
        data: {
          _id: result[0]._id,
          username: result[0].username,
          gender: result[0].gender ? result[0].gender : 0, //性别 0,1
          introduction: result[0].introduction, //简介
          avatar: result[0].avatar, //头像
          role: result[0].role, //管理员1编辑者2
        },
      });
    }
  },
  // 注册接口
  toRegister: async (req, res) => {
    await UserService.toRegister(req.body);
    res.send({
      ActionType: "OK",
    });
  },
  // 修改个人信息接口
  upload: async (req, res) => {
    console.log(req.file);
    const { username, introduction, gender } = req.body;
    const token = req.headers["authorization"].split(" ")[1];
    const avatar = req.file
      ? `http://localhost:3000/avataruploads/${req.file.filename}`
      : null;
    // console.log(token);
    var payload = JWT.verify(token);

    const result = await UserService.upload({
      _id: payload._id,
      username,
      introduction,
      gender: Number(gender),
      avatar,
    });
    res.send({
      ActionType: "OK",
      data: {
        // _id: payload._id,
        username,
        introduction,
        gender: Number(gender),
        avatar,
      },
    });
  },
  //web修改个人信息接口
  webUpload: async (req, res) => {
    // console.log(req.body);
    const { username, introduction, gender, _id, password } = req.body;
    const avatar = req.file
      ? `http://localhost:3000/avataruploads/${req.file.filename}`
      : null;
    // console.log(token);
    // console.log(payload);
    const result = await UserService.webUpload({
      _id,
      username,
      introduction,
      gender: Number(gender),
      avatar,
    });
    res.send({
      ActionType: "OK",
      data: {
        // _id: payload._id,
        username,
        password,
        introduction,
        gender: Number(gender),
        avatar,
        password,
      },
    });
  },
  // 添加用户接口
  add: async (req, res) => {
    console.log(req.file);
    const { username, introduction, gender, role, password } = req.body;
    const avatar = req.file
      ? `http://localhost:3000/avataruploads/${req.file.filename}`
      : "";

    await UserService.add({
      username,
      introduction,
      gender: Number(gender),
      avatar,
      password,
      role: Number(role),
    });

    res.send({
      ActionType: "OK",
    });
  },
  // 获取用户列表
  userList: async (req, res) => {
    const result = await UserService.userList();
    const newResult = result.filter(
      (item) => item.role === 1 || item.role === 2
    );
    res.send({
      ActionType: "OK",
      data: newResult,
    });
  },
  // 删除用户
  delUserList: async (req, res) => {
    // console.log(req.params.id);
    const result = await UserService.delUserList({ _id: req.params.id });
    res.send({
      ActionType: "OK",
    });
  },
  // 获取用户信息
  getUserInfo: async (req, res) => {
    const result = await UserService.getUserInfo(req.params.id);
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  upUserInfo: async (req, res) => {
    console.log(req.body);
    const result = await UserService.upUserInfo(req.body);
    res.send({
      ActionType: "OK",
      data: 111111111111,
    });
  },
};

module.exports = UserController;
