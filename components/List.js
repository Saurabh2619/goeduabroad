import { useEffect, useState } from 'react'
import styles from './List.module.css'


function List(props){


const [data,setData] = useState();


useEffect(()=>{

    setData(props.value)
},[props])
    return <div className={styles.items}>
        {data && data.map((i,d)=>{

            return <div className={styles.item}>
                <div className={styles.badge}></div>
                <h2>{i.heading}</h2>
               {i?.description ?  <p>{i.description}</p>:''}
            </div>
        })}
    </div>
}

export default List;