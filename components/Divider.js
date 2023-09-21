import { useEffect } from 'react';
import styles from './Divider.module.css'

function Divider(props){

useEffect(()=>{
    console.log(props)
},[])

    return <div className={styles.divider} style={{height:props?.borderWidth || "2px" , margin : `${props.gap} 0px`}}> </div>
}

export default Divider;