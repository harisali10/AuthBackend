const Registration = require('./registration.model');
const CustomError = require('./customError.model');
//SIGN IN
exports.login= async(req,res)=>{

    let user=await Registration.findOne({email:req.body.email})
      if(!user){
        return    res.send({re:false}).status(400)
      }
      var hashPassword = passwordHash.verify(req.body.password,user.password)
      if(!hashPassword){
          return res.send({re:false}).status(400)
      }
      
      const token= await jwt.sign({_id:user._id},'jwtPrivateKey');
          
      //  /console.log(token)
      res.send({token:token}).status(200);
     
  }
  
//SIGN UP
exports.registration= async (req,res,next)=>{
    var hashedPassword = passwordHash.generate(req.body.password);
    const registration = new Registration({
        email : req.body.email,
        name:req.body.name,
        password : hashedPassword
    
    })
    
     await Registration.findOne({email:req.body.email},(err,existingUser)=>{
         if(err){

            
         }
        if(existingUser){
            
            return res.send(new CustomError("","")).status(400)
        }
    
    })
    
    registration.save()
    res.send(true).status(200);
    }

// GET USER NAME AFTER LOGIN
exports.getUserName=async(req,res)=>{
        var email;
        let user = await Registration.findOne({_id:req.body._id})
        if(!user){
            return   res.status(400).send('User not found');
          }
          name=user.name
          res.send({name}).status(200);
    
    }