import { useState } from 'react';
import styles from './Switch.module.css'

function Switch(props){


    const [active,setActive] = useState(props.value);

function handleClick(a){
    setActive(a)
    props.onChange(a)
}


    return <div className={styles.cont}>

        <div className={styles.switch + " " + (active == true? styles.active : '')} onClick={()=>{active?  handleClick(false): handleClick(true)}}>

            <div className={styles.switch_button}></div>
        </div>
        <p className={styles.label}>{props.placeholder}</p>
    </div>
}

export default Switch;