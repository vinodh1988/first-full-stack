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


route.get("/people/:sno",function(request,response){
  ops.getOne(request.params.sno,function(err,data){
    if(err){
        response.status(500).send("Server error")
    }
    else
        response.send(data[0]?data[0]:"No Record Found")
  })
})

route.put("/people",function(request,response){
    const {name,city}=request.body
    let sno=request.query.sno;
    ops.getOne(sno,function(err,data){
        if(err){
            response.status(500).send("Server error")
        }
        else
            {
                if(data[0]){
                    let tname=name?name:data[0].name
                    let tcity=city?city:data[0].city
                    ops.updateOne(sno,tname,tcity,function(err,data){
                        if(err)
                           response.status(500).send("Server error")
                        else
                           response.json({sno:sno,name:tname,city:tcity})
                    })
                }
                else
                  response.send("No Record Found and No Update")
            }
      })
})
module.exports=route;