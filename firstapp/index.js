
const fs=require("fs")
const current=require('./second')

fs.readFile("package.json","utf-8",function(err,data){
    if(err) 
       console.log("file cannot be read")
    else
      console.log(data)
})

current.today()
console.log(current.things.fruits)
new current.Item(24,35).display()
current.execute()

console.log("Independent logic >>>>>>>>>>>>>>>>>")