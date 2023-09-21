import { useEffect, useState } from 'react'
import styles from './InputField.module.css'


function InputField(props){

const [value,setValue] = useState(
    
);

useEffect(()=>{
    setValue(props.value || 'Default Text')
},[

])

    if(props.type == "text"){
    return <>
    {props.label  ?  <h2 className={styles.label}>{props.label}</h2>:''}
    <input className={styles.input} value={value} type='text' onChange={(e)=>{setValue(e.target.value),props.onChange(e.target.value)}} placeholder={props?.placeholder ? props.placeholder : ''}></input></>}
    else if(props.type == "textarea"){
        return <>{props.label  ?  <h2 className={styles.label}>{props.label}</h2>:''}<textarea className={styles.input + " " + styles.textarea} value={value} type="text" onChange={(e)=>{setValue(e.target.value),props.onChange(e.target.value)}} placeholder={props?.placeholder ? props.placeholder : ''}></textarea></>
    }
    else if(props.type == "colorpicker"){
        return <>{props.label  ?  <h2 className={styles.label}>{props.label}</h2>:''}
        
        <div className={styles.colorwrapper}><div className={styles.color} style={{backgroundColor:value}}></div><input className={styles.input} value={value} type="text" onChange={(e)=>{setValue(e.target.value),props.onChange(e.target.value)}} placeholder={props?.placeholder ? props.placeholder : ''}></input></div></>
    }
}

export default InputField;