import { useEffect, useRef, useState } from 'react';
import styles from './YTVideo.module.css'
import YouTube from 'react-youtube';

function YTVideo(props){

    const [data,setData] = useState();

const[playing,setPlaying] = useState(false)
const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const player =useRef(null);;
 
  const [volume,setVolume] = useState(1);
    useEffect(()=>{

        setData(props.value)
       

    },[])

    useEffect(() => {
        // Create a script element to load the YouTube Iframe API
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
    
        // Add a listener to track when the script has been loaded
        script.onload = () => setIsScriptLoaded(true);
    
        // Append the script to the document body to load it
        document.body.appendChild(script);
    
        // Clean up the script when the component unmounts
        return () => {
          document.body.removeChild(script);
        };
      }, []);
      

      const onReady = (event) => {
        setIsPlayerReady(true);
        // Handle any setup tasks when the player is ready, if needed
      };

 function onYouTubeIframeAPIReady() {
   var player;
      
      player = new YT.Player('#iframe', {
        height: 'auto', // Set the height of the player
        width: '100%',  // Set the width of the player
        videoId: data.video, // Replace with the YouTube video ID you want to embed
        playerVars: {
          // Set player parameters (optional)
          autoplay: data?.autoplay ? 1 : 0,        // Auto-play the video (0 or 1)
          controls: data?.controls ? 1 : 0,        // Show video controls (0 or 1)
          modestbranding: data?.hideLogo ? 1 : 0,  // Hide YouTube logo (0 or 1)
          loop: data?.loop ? 1 : 0,            // Loop the video (0 or 1)
          fs: data?.showFullScreenButton ? 1 : 0,              // Show fullscreen button (0 or 1)
        },
        events: {
          // Define event handlers (optional)
          onReady: ()=>{},       // Called when the player is ready
          onStateChange: ()=>{}, // Called when the player state changes
        },
      });
    }


    useEffect(() => {
        // Set up the player options
        const playerOptions = {
          height: 'auto',
          width: '100%',
          videoId: data?.video,
          playerVars: {
            autoplay: 1,
            controls: 0,
          },
          events: {
            onReady: ()=>{},
          },
        };
    
        if(player != undefined){
        player.current = new window.YT.Player('player', playerOptions);}
    
        // Clean up the player instance when the component unmounts
        return () => {
          player?.current?.destroy();
        };
      }, [data?.video]);

    const handlePlayPause = () => {
        if (isPlayerReady) {
          if (playing) {
            player.current.pauseVideo();
          } else {
            player.current.playVideo();
          }
          setPlaying((prevIsPlaying) => !prevIsPlaying);
        }
      };
    
      const handleVolumeChange = (event) => {
        const newVolume = event.target.value;
        if (isPlayerReady) {
          player.current.setVolume(newVolume);
          setVolume(newVolume);
        }
      };
    return <>{isScriptLoaded ? <div className={styles.videowrap}>

<div className={styles.iframe} id='iframe'>
<YouTube
      videoId={data.video}
      opts={{
        height: '360',
        width: '640',
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          loop: 0,
          fs: 1,
        },
      }}
      onReady={onReady}
      onStateChange={(event) => {
        // Handle player state changes here, if needed
      }}
    />
</div>

<div className={styles.buttons}>
<div className={styles.button} onClick={handlePlayPause}>{playing ? "PAUSE":"PLAY"}</div>
<div className={styles.button}>{playing ? "STOP":""}</div>
</div>
    </div> :''}</>
}

export default YTVideo;