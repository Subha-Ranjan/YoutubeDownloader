import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import logo from "./images/YouSaveTubeLogo.png";

function App() {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [myArray, setMyArray] = useState(null);
  const [downloadLink, setDownloadLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let [isValidUrl,setIsValidUrl]=useState(null);


  const messageRef = useRef();
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView(
        {
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        })
    }
  },
  [videoInfo])



const update=(res)=>{
  setVideoInfo(res.data);
  setMyArray([...res.data.formats]);
  setIsLoading(false);
}

 function getInfo(){
  if(url.trim()==""){
    setIsValidUrl("Empty URL");
    console.log(isValidUrl)
  }
  if(url.trim()!==""){
  setIsValidUrl(true);
  setIsLoading(true);
  axios.post("https://youtube-downloader-gray.vercel.app/api",{mydata: url}).then(update).catch((err)=>{setIsLoading(false);setIsValidUrl("Bad Request!!!")});
  }
  
}
console.log("URL",url)
  return (
    <div className="App">
    
     <div className="conatainer">
      <div className="image-wrapper">
        <img src={logo} alt="YouSaveTube_Logo" width="29%" height='auto' className="image"/>
      </div>

      <form onSubmit={(e)=>e.preventDefault(e)}>

      <label>
        Enter YouTube Video URL:
        <input
          type="text"
          value={url}
          onChange={(e)=>setUrl(e.target.value)}
          style={{'padding':'10px', 'minWidth':'calc((100% / 4) * 3 - 10%)','height':'1.3rem','margin':'1rem'}}
          placeholder="eg. https://www.youtube.com/watch?v=tYIkfkGJxTE"
          
        />
      </label>
      <button onClick={()=>getInfo()} type="submit">Get Video Info</button>

      </form>



      {<p style={{"color":"red"}}><b>{isValidUrl}</b></p>}
      {isLoading?<h3>Loading...</h3>:


      <div className="outputContainer" ref={messageRef}>
      {videoInfo && (
        <div style={{ 'margin':'auto'}} >
          <h2>SubhaRanjan found out your video</h2>
          <iframe src={videoInfo.videoDetails.embed.iframeUrl} frameBorder="0" border="0" cellSpacing="0"
        style={{"border-style": "1px solid #646cff",'width':'calc((80% / 4) * 3 - 100px)', "aspectRatio":"9/6"}}></iframe>
          <p>Title: {videoInfo.videoDetails.title}</p>
          <p>Author: {videoInfo.videoDetails.author.name}</p>
          <p>Duration: {videoInfo.videoDetails.lengthSeconds} seconds</p>
        </div>
      )}
     
      { myArray && 
        <> <label style={{ "color": "#646cff"}}><b>Choose your preferred download format:</b></label>{" "}
         <select onChange={(e)=>setDownloadLink(e.target.value)} style={{"margin":"2%"}}>
         <option value="" selected disabled hidden>Choose here</option>
          <optgroup label="Videos">
            {
              myArray.filter(a=>!a.mimeType.includes("audio")).map(format=>
                <option value={format.url}>{format.qualityLabel}{format.mimeType.includes("mp4")?'-mp4':'-webm '}{" "}{Number(format.contentLength/1048576).toFixed(2)+' MB'}</option>
                )
            }
            </optgroup>
            <optgroup label="Audios">
            {
              myArray.filter(a=>a.mimeType.includes("audio")).map(format=>
                <option value={format.url}>{format.qualityLabel}{format.audioBitrate+"kbps"}{" "}{Number(format.contentLength/1048576).toFixed(2)+' MB'}</option>
                )
            }
            </optgroup>
         </select>&nbsp;
        </>
      }
      {downloadLink&&<button ><a href={downloadLink} style={{'text-decoration':'none'}}>Download</a></button>}

    
      </div>
}
      
       </div>
    
   

    </div>)
}

export default App;
































// function downloadVideo(){
//   if (videoInfo) {
//     const videoStream = ytdl(url, { quality: 'highest' });
//     videoStream.pipe(res); // Replace "res" with the logic to handle the downloaded video (e.g., save to disk).
//   }
// }