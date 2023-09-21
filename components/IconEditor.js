import { useEffect, useState } from 'react';
import styles from './IconEditor.module.css'
import Range from './Range';

function IconEditor(props){

const [data,setData] = useState();

useEffect(()=>{

    setData(props.value)
},[])
useEffect(()=>{
    props.onChange(data)
},[data])

const updateConfigKey = (key, newValue) => {
    setData(prevData => ({
      ...prevData,
      config: {
        ...prevData?.config,
        [key]: newValue,
      },
    }));
  };

  if(data){
    return <div className={styles.main}>
    
    <Range label={'Gap'} min={0} max={120} value={data.config.gap} onChange={(e)=>{updateConfigKey('gap',e)}}></Range>
    <Range label={'Size'} min={0} max={120} value={data.config.size} onChange={(e)=>{updateConfigKey('size',e)}}></Range>
    <Range label={'Border Radius'} min={0} max={200} value={data.config.borderRadius} onChange={(e)=>{updateConfigKey('borderRadius',e)}}></Range>
    <div className={styles.icons} style={{'--icon-gap':data?.config.gap}}>

{data && data.icons && data.icons.map((i,d)=>{
    return <a href={i.link} className={styles.icon} style={{'--icon-size':data.config.size,borderRadius:data.config.borderRadius}}><img src={i.icon}/></a>
})}

    </div></div>}
}

export default IconEditor;