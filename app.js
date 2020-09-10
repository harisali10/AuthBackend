const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const passwordHash = require('password-hash');
const app = express()
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const cors = require('cors');
// const dotenv=require('dotenv').config();
require('dotenv').config({path:'.env.example'});
const rawBodyBuffer = (req, res, buf, encoding) => {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
  };
app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.enableCors();


app.use(cors())

app.listen(process.env.PORT,()=>{
console.log(`App is listening ${process.env.PORT}`)
})
//Loading Env variables from .env file

mongoose.connect(process.env.MONGODB_URL);
mongoose.connection.on('error',(err)=>{
    console.log(err);
    console.log('%s MongoDB connection error');
        process.exit()
})








// app.post('/api/resetPassword',async(req,res)=>{
//     let user = await Registration.findOne({email:req.body.email});
//     if(!user){
//         res.send(false).status(404)
//     }
//     var resetPasswordToken; 
//     resetPasswordToken=crypto.randomBytes(20).toString('hex');
//     user.save()
//     .then(user=>{
//         let link = "http://"+req.headers.host + "/api/signIn" + resetPasswordToken;
//         const mailOptions ={
//             to: user.email,
//             from:process.env.FROM_EMAIL,
//             subject:"Password change Request",
//             text :`Hi ${user.email}\n
//             Please click on following link ${link}`
//         };
//         sgMail.send(mailOptions,(error,result)=>{
//             if(error){
//                 return res.status(500).json({message: error.message});
//             }
//             res.status(200).json({message:'A reset email has been sent'})
//         });
//     })
//     .catch(err=>res.status(500).json({message:err.message}));
// })
