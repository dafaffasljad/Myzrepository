var express=require('express')
var UserRouter = express.Router()
const UserControlle=require('../../controllers/web/UserControlle')

UserRouter.get("/webapi/user/getUserInfo/:username", UserControlle.getUserInfo);

module.exports=UserRouter