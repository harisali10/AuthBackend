const mongoose = require('mongoose');
const registrationSchma = new mongoose.Schema({
    email: {type:String, required:true},
    password: {type:String, required:true},
    name: {type:String, required:true,text:true}

})
module.exports = mongoose.model('Registration',registrationSchma)