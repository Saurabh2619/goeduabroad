import styles from './RangeSlider.module.css'
import {useState} from 'react'
function RangeSlider(props){


const [activeCount, setActiveCount] = useState(0);    
    return(<div className={styles.slider_wrap}>
        

        <div className={styles.range}><div className={styles.slide} style={{width:activeCount*props.ranges.length*5 + "%"}}> </div>

        <div className={styles.thumb} style={{left:activeCount > 0 ? activeCount*props.ranges.length*5-1 + "%" : '9%'}}></div>

            {props.ranges && props.ranges.length> 1 ? props.ranges.map((i,d)=>{
return(<div onClick={()=>{setActiveCount(d),props.setData(i.title)}} className={styles.range_i + " " + (activeCount >= d? styles.active : '')}><p>{i.title}</p></div>)

            }):''}
           </div>
    </div>)
}

export default RangeSlider;