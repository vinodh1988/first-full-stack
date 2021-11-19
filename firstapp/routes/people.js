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

route.post("/people",function(request,response){
   
   const {sno,name,city}=request.body
   ops.addPerson(sno,name,city,function(err,data){
       if(err){
           response.status(500).send("Unable to insert")
       }
       else{
            response.status(201).send(request.body)
       }
   })
})

module.exports=route;