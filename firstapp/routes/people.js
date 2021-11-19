var express=require("express")
var route = express.Router();
var ops=require("../db/dbops")

route.get("/people",function(request,response){
   ops.getPeople(function(err,data){
       if(err){
           response.status(500).send("Server issue")
       }
       else{
           response.json(data)
       }

   })
})

module.exports=route;