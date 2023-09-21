import { useEffect, useState } from 'react';
import styles from './MultipleTags.module.css'

function MultipleTags(props){
const [keywords,setKeywords] = useState();


useEffect(()=>{
setKeywords(props?.value)

},[])

    return <div className={styles.keywords}>
        <div className={styles.wrapper}>
            {keywords && keywords.split(',').length > 1 && keywords.split(',').map((i,d)=>{
                
return <div className={styles.tag}>{i}</div>
            })}
        <input value={keywords || ""} placeholder={props.placeholder || ''} onChange={(e)=>{setKeywords(e.target.value),props.onChange(e.target.value)}}></input></div>
    </div>
}

export default MultipleTags;