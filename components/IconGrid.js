import { useEffect, useState } from 'react';
import styles from './IconGrid.module.css'

function IconGrid(props){

const [data,setData] = useState();

useEffect(()=>{

    setData(props.value)
},[])

    return <div className={styles.icons} style={{'--icon-gap':data?.config.gap}}>

{data && data.icons && data.icons.map((i,d)=>{
    return <a href={i.link} className={styles.icon} style={{'--icon-size':data.config.size,borderRadius:data.config.borderRadius}}><img src={i.icon}/></a>
})}

    </div>
}

export default IconGrid;