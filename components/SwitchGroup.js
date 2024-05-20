import { useEffect, useState } from 'react';
import styles from './SwitchGroup.module.css'


function SwitchGroup(props){
    const [active,setActive] = useState(0);

    
    useEffect(()=>{
      
        setActive(props.defaultValue || 0)
        props.onChange(props?.data[0].value)   
    },[])
    
    function initValue(a,b){

        setActive(a)
        
        props.onChange(b)
    }
        return <div className={styles.cont}>
    
            <div className={styles.switch} style={{width:`${25 * props?.data?.length || 2}px`}} >
    
                <div style={{transform:`translateX(${(100*active - (active * (props?.data?.length )))}%)`}} className={styles.switch_button}></div>
                {props?.data && props?.data.map((i,d)=>{

                    return <span className={styles.unit} onClick={()=>initValue(d,i.value)}>{i.title}</span>
                })}
            </div>
            <p className={styles.label}>{props.placeholder}</p>
        </div>
}


export default SwitchGroup;