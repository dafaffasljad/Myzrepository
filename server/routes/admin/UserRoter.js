var express = require("express");
const UserController = require("../../controllers/admin/UserControlle");
var UserRouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/avataruploads/" });

// 登录接口
UserRouter.post("/adminapi/user/login", UserController.login);
// 注册接口
UserRouter.post("/adminapi/user/toRegister",UserController.toRegister);
// 更新个人信息
UserRouter.post(
  "/adminapi/user/upload",
  upload.single("file"),
  UserController.upload
);
// web更新个人信息
UserRouter.post(
  "/adminapi/user/webUpload",
  upload.single("file"),
  UserController.webUpload
);
// 添加用户接口
UserRouter.post(
  "/adminapi/user/add",
  upload.single("file"),
  UserController.add
);
// 获取用户列表
UserRouter.get("/adminapi/user/userList", UserController.userList);
// 获取用户信息
UserRouter.get("/adminapi/user/getUserInfo/:id", UserController.getUserInfo);
// 修改用户信息
UserRouter.put("/adminapi/user/upUserInfo/:id", UserController.upUserInfo);
// 删除用户
UserRouter.delete("/adminapi/user/delUserList/:id", UserController.delUserList);

module.exports = UserRouter;
