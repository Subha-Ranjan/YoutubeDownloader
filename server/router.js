const express = require('express');
const router = express.Router();
const ytdl = require('ytdl-core');


router.post("/", (req,res)=>{
    console.log(req.body.mydata);
    const videoUrl = req.body.mydata; //received url from frontend
    
    // acquire info about the ToutubeVideo
    ytdl.getInfo(videoUrl)
    .then((info) => {
      console.log(info);//check videoInfo
      res.send(info);
    })
    .catch((err) => {
    console.error(err);
    res.status(404).send(err)
  });
    
})


module.exports = router