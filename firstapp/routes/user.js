var express=require("express")
var route = express.Router();
var ops=require("../db/dbops")
var security=require('../security/security')

route.post("/signup",async (request,response)=>{
    
    const {username,password}=request.body
    const encrypted=await security.encrypt(password)
    ops.createUser(username,encrypted,function(err,data){
        if(err)
           response.status(500).send("Unable to create user",err)
        else
           response.status(200).send("user Created")
    })

})

module.exports=route;