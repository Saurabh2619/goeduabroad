import { useEffect, useState } from 'react'
import styles from './PromoBlock.module.css'
import InputField from './InputField';
import ImageUploader from './ImageUploader';

function PromoBlockEditor(props){

    const [data,setData] = useState();

    useEffect(()=>{
        setData(props.value)
    },[])

    useEffect(()=>{

        props.onChange(data)
    },[data])

    return <>{data? <div className={styles.outer}>
<div className={styles.inner}  style={{background:data.bgcolor,minHeight:data.height}}>
<img src={data.image}/>
<div className={styles.gradmask} style={{'--gradcolor':data.bgcolor,'--gradcolor2':data.bgcolor+"33"}}></div>
<div className={styles.promocontent}>
  <InputField label={'Title'} value={data.title || ""} type="text" onChange={(e)=>{setData(res=>({...res,title:e}))}}/>
  <InputField label={'Description'} value={data.description || ""} type="textarea" onChange={(e)=>{setData(res=>({...res,description:e}))}}/>
  <InputField label={'Link Text'} value={data.linktext || ""} type="text" onChange={(e)=>{setData(res=>({...res,linktext:e}))}}/>
  <InputField label={'Link URL'} value={data.link || "#"} type="text" onChange={(e)=>{setData(res=>({...res,link:e}))}}/>
  <ImageUploader data={{image:data.image}} onUploadComplete={(e)=>{setData(res=>({...res,image:e}))}}></ImageUploader>
  <div><InputField label={'Background Color'} value={data.bgcolor || ""} type="text" onChange={(e)=>{setData(res=>({...res,bgcolor:e}))}}/></div>
</div>

</div>

    </div>:''}</>
}

export default PromoBlockEditor;