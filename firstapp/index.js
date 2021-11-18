 const express =  require("express")
 const app = express()

app.get("/",function(request,response){
    response.send("NODE WEB APP IS RUNNING")
})

 app.listen("9000",function(){
    console.log("Server is started @ 9000 port")
 })