 
const express =  require("express")
const ops=require("./db/dbops")
 const app = express()
 const path = require("path")
 const people = require("./routes/people")
 const user = require("./routes/user")
 const passport=require("passport")
 
 
app.use(passport.initialize());




//allows resources in this path to be directly accesible
app.use(express.static(path.join(__dirname, "public/scripts")))
app.use(express.static(path.join(__dirname, "public/styles")))
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")))
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")))
app.use(express.static(path.join(__dirname, "node_modules/jquery/dist")))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/api",people)
app.use("/user",user)

app.set('views', path.join(__dirname, 'public/views'));//setting the path of template files
app.set('view engine', 'pug'); //configuring view Engine


app.get("/main",function(request,response){
    response.sendFile(path.join(__dirname, "public/pages/home.html"))
})
app.get("/",function(request,response){
    response.send("NODE WEB APP IS RUNNING")
})

app.get("/people-page",function(request,response){
    ops.getPeople(function(err,data){
        if(err){
            response.send("No DATA")
        }
        else
        {
            response.render("people",{people:data})
        }
    })
})
app.post("/store",function(request,response){
    let {sno,name,city}=request.body;

    ops.addPerson(sno,name,city,function(err,data){
        if(err)
           response.status(500).send("Not able to insert person");
        else
           response.sendFile(path.join(__dirname, "public/pages/home.html"));
    })
})

 app.listen("9000",function(){
    console.log("Server is started @ 9000 port")
 })