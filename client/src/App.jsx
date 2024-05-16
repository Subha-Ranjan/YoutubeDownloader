import { useState } from "react";
const videoId = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ';
import axios from "axios";
import "./App.css";
import logo from "./images/YouSaveTubeLogo.png";

function App() {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [myArray, setMyArray] = useState(null);
  const [downloadLink, setDownloadLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);


const update=(res)=>{
  setVideoInfo(res.data);
  setMyArray([...res.data.formats]);
  setIsLoading(false);
}

 function getInfo(){
  setIsLoading(true);
  axios.post("https://youtube-downloader-gray.vercel.app/api",{mydata: url}).then(update);
  console.log("GetInfo:\n",videoInfo);

}

  return (
    <div className="App">
    
     <div className="conatainer">
      <div className="image-wrapper">
        <img src={logo} alt="YouSaveTube_Logo" height="400rem" className="image"/>
      </div>
      <label>
        Enter YouTube Video URL:
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{'padding':'10px', 'width':'calc((100% / 4) * 3 - 100px)','height':'1.3rem','margin':'1rem'}}
          placeholder="eg. https://www.youtube.com/watch?v=tYIkfkGJxTE"
        />
      </label>
      <button onClick={()=>getInfo()}>Get Video Info</button>
      {isLoading&&<h3>Loading...</h3>}
      {videoInfo && (
        <div style={{ 'margen-left':'25%'}}>
          <h2>SubhaRanjan found out your the video</h2>
          {/* <iframe src={videoInfo.videoDetails.embed.iframeUrl} ></iframe> */}
          <iframe src={videoInfo.videoDetails.embed.iframeUrl} frameBorder="0" border="0" cellSpacing="0"
        style={{"border-style": "1px solid #646cff",'width':'calc((100% / 4) * 3 - 100px)', "aspectRatio":"9/6"}}></iframe>
          <p>Title: {videoInfo.videoDetails.title}</p>
          <p>Author: {videoInfo.videoDetails.author.name}</p>
          <p>Duration: {videoInfo.videoDetails.lengthSeconds} seconds</p>
        </div>
      )}
      {/* {videoInfo&&<ul>
        {videoInfo?.formats.map(vid=>
          <li key={vid.id}>{vid?.quality}{"-"}{vid.qualityLabel} {"-----"}{vid.mimeType.split('video/')}{"-----"}{vid.projectionType} </li>
          )}</ul>} */}

        {myArray && <> <label><b>Choose your preferred download format:</b></label>{" "}<select onChange={(e)=>setDownloadLink(e.target.value)} defaultValue="select perefered format">
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
            </select>
            &nbsp;
            </>
            }
            {downloadLink&&<button ><a href={downloadLink} style={{'text-decoration':'none'}}>Download</a></button>}

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