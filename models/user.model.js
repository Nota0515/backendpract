const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        require: true,
        lowercase: true,
        minlength:[3,"Must be atleast 4character long"]
    },

    email:{
        type: String,
        unique: true,
        require: true,
        lowercase: true,
        minlength:[10,"Must be atleast 10character long"]
    },

    password:{
        type: String,
        unique: true,
        require: true,
        lowercase: true,
        minlength:[7,"Must be atleast 4character long"]
    }
})

const user = mongoose.model('user' , userSchema);

module.exports = user ;