import styles from './Indicator.module.css'

function Indicator(props){

    const d = props.data;
    const text = props.text;
    return <div className={styles.parentindi}>
       
<div className={styles.indicont}>
    
    <div className={styles.indistroke + " " +(text?.length > 0 && text?.length < d?.min ? styles.red : '') + " " + (text?.length > d?.min && text?.length <= d?.average ? styles.yellow: '') + " " + (text?.length > d?.average && text?.length <= d?.max ? styles.green: styles.red)} style={{width:`${100 * text?.length/d.max}%` }}></div>
</div>
<div className={styles.indicate}>
  <p>  Text Rating : <strong> {text?.length > 0 && text?.length < d?.min && "BAD"}
   {text?.length > d?.min && text?.length <= d?.average && "AVERAGE"}
    {text?.length > d?.average && text?.length <= d?.max && "GOOD"}
    {text?.length > d?.max && "BAD"}</strong></p>
    <div className={styles.spacex}></div>
    <p>Text Length :<strong>{text?.length}/{d?.max}</strong></p>
</div>
    </div>
}

export default Indicator;