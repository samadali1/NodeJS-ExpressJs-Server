const express = require('express')
const app = express();
const db = require('./config/db');


const port = process.env.PORT || 3002;
app.listen(port,function(){
    console.log("Server Started Succesfully!")

})
db.connection.once('open',()=>{
    console.log("Database Connected Successfully!")
}).on("error", error =>{
    console.log("Database Connection Failed!")
})

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Credentials','true');
    res.setHeader('Access-Control-Allow-Methods','GET,HEAD,OPTIONS,POST,PUT,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control','no-cache');
    next();
})

app.use('/',require('./routes/index.js'))
