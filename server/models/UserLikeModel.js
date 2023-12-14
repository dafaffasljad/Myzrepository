const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserLikeType = {
    NewsID: String,
    LikeNum:Number,
    UserIDList:Array,
    
}

const UserLikeModel = mongoose.model("userLike", new Schema(UserLikeType))
module.exports=UserLikeModel