const express = require('express')
const app= express()
const linkRoute=require('./router')
//==========CORS==================
const cors = require("cors");
//==========Ytdl==================
const ytdl = require('ytdl-core');

app.use(express.json());//parse json data
app.use(cors());//use cross-origin-data(Resource)-sharing
app.use("/api", linkRoute)//routerlink


app.listen(8000,()=>{
  console.log("server running at 8000")
})