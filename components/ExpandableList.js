import { useEffect, useState } from 'react'
import styles from './ExpandableList.module.css'
import HTML_Render from './HTML_Render';


function List(props){


const [data,setData] = useState();
const [active,setActive] = useState();

useEffect(()=>{

    setData(props.value)
},[props])
    return <div className={styles.items}>
        {data && data.map((i,d)=>{

            return <div className={styles.itemwrap + " " +(active == d ? styles.active : '')} onClick={()=>{setActive(d)}}><div className={styles.item}>
                <div className={styles.badge}></div>
                <h2>{i.question}</h2>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414Z" fill="#212121"/></svg>
            </div>
            <div className={styles.content}>

<HTML_Render data={i.answer}></HTML_Render>
            </div></div>
        })}
    </div>
}

export default List;