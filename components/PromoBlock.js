import { useEffect, useState } from 'react'
import styles from './PromoBlock.module.css'

function PromoBlock(props){

    const [data,setData] = useState();

    useEffect(()=>{
        setData(props.value)
    },[props.value])

    return <>{data? <div className={styles.outer}>
<div className={styles.inner}  style={{background:data.bgcolor,minHeight:data.height}}>
<img src={data.image}/>
<div className={styles.gradmask} style={{'--gradcolor':data.bgcolor,'--gradcolor2':data.bgcolor+"33"}}></div>
<div className={styles.promocontent}>
  {data?.title ?   <h2>{data.title}</h2>:''}
  {data?.description ?<p>{data.description}</p>:''}
  {data?.link ? <a href={data.link}>{data.linktext}</a>:""}
</div>

</div>

    </div>:''}</>
}

export default PromoBlock;