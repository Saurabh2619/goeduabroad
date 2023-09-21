import { useEffect, useState } from 'react'
import styles from './TableofContents.module.css'

function TableofContents(props){

const [data,setData] = useState();

useEffect(()=>{

    setData(props?.value)
},[props.value])

    return <div className={styles.wrapper}>
        <div className={styles.badge}></div>
<h3 className={styles.heading}>TABLE OF CONTENTS</h3>
{data && data.map((i,d)=>{
    return <a href={i.link} className={styles.item}><strong>{d+1}</strong> : {i.title}</a>
})}
    </div>
}
export default TableofContents