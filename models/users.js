const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    email:{
        type:String
    },
    phone:{
       type:Number
    },
});
const User = mongoose.model('users', userSchema);
module.exports = User;