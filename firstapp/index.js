 
const express =  require("express")
 const app = express()
 const path = require("path")
//allows resources in this path to be directly accesible
app.use(express.static(path.join(__dirname, "public/scripts")))
app.use(express.static(path.join(__dirname, "public/styles")))

app.get("/main",function(request,response){
    response.sendFile(path.join(__dirname, "public/pages/home.html"))
})
app.get("/",function(request,response){
    response.send("NODE WEB APP IS RUNNING")
})

 app.listen("9000",function(){
    console.log("Server is started @ 9000 port")
 })