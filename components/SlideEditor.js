import { useEffect, useState } from 'react';
import styles from './SlideEditor.module.css'
import ImageUploader from './ImageUploader';
import Switch from './Switch';

function SlideEditor(props){

const [data,setData] = useState([]);
const [uploader,setUploader] = useState(false);
const [editSlide,setEditSlide] = useState();
const swiperProperties = [
    {
      key: "loop",
      default: false,
      type: "boolean",
      text: "Loop: Enables continuous looping of slides.",
    },
    {
        key: "centered",
        default: true,
        type: "boolean",
        text: "Center Slides: Enables continuous looping of slides.",
      },
    {
      key: "autoplay",
      default: false,
      type: "boolean",
      text: "Autoplay: Enables automatic slide play in a loop.",
    },
    {
      key: "parallax",
      default: true,
      type: "boolean",
      text: "Parallax",
    },
    {
      key: "freeMode",
      default: false,
      type: "boolean",
      text: "Free Mode: Enables free movement of slides without snapping.",
    },
   
    // Add more properties as needed
  ];
  
  


useEffect(()=>{

    if(props?.data){
        setData(props.data)
    }
    console.log(props)
},[])



const appendSlideWithImage = (imageUrl) => {
    const newSlide = { image: imageUrl /* other properties for the new slide */ };
    setData((prevData) => ({
      ...prevData,
      slides: [...prevData.slides, newSlide],
    }));
  };
  const editImageAtIndex = (index, newImageUrl) => {
    setData((prevState) => {
      const updatedSlides = [...prevState.slides];
      updatedSlides[index].image = newImageUrl;
      return { ...prevState, slides: updatedSlides };
    });
  };

useEffect(()=>{

props.onChange(data)

},[data])

    return <div className={styles.swiperditor}>

<h2 className={styles.heading}>Slides</h2>
<div className={styles.slides}>
{data?.slides?.map((i,d)=>{

    return <div className={styles.main}><img src={i.image}/> 
    {editSlide == undefined ? 
    <svg onClick={()=>{setEditSlide(d)}} width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.94 5 19 10.06 9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L13.938 5Zm7.09-2.03a3.578 3.578 0 0 1 0 5.06l-.97.97L15 3.94l.97-.97a3.578 3.578 0 0 1 5.06 0Z" fill="#222F3D"/></svg>:''}</div>
})}

<div className={styles.addSlide} onClick={()=>{setUploader(true)}}>Add Slide</div>
</div>

{uploader? 
<div>

    <ImageUploader onUploadComplete={(e)=>{appendSlideWithImage(e),setUploader(false)}}></ImageUploader>
</div>
:''}

{editSlide != undefined? 
<div>

    <ImageUploader data={{image:data.slides[editSlide].image}} onUploadComplete={(e)=>{editImageAtIndex(editSlide,e),setEditSlide()}}></ImageUploader>
</div>
:''}
<div className={styles.controls}>
{swiperProperties && swiperProperties.map((i,d)=>{
    
    if(i.type == "boolean"){
        return <div className={styles.control}>
        <p>{i.text.split(":")[0]}</p>
        <Switch value={data?.config ? data.config[i.key] : i.default } onChange={(e)=>{setData(res=>({...res,config:{...res.config,[i.key]:e}}))}}></Switch></div>
    }
    })}
</div>
    </div>
}

export default SlideEditor;