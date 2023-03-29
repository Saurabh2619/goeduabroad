import { useState } from 'react';
import styles from './CustomSelect.module.css'


function CustomSelect(props){


    const [activeState,setActiveState] = useState({title: props.defaultText ?  props.defaultText:'No Default Value',value:''});
    const [isActive,setIsActive] = useState();

    return(
        <div className={styles.wrapper + " " + (props.full ? styles.full:'')} style={{zIndex:props.z}}>
<input aria-label={props.defaultText ?  props.defaultText:'No Default Value'} readOnly={true} value={activeState.title} className={styles.indicator} onClick={()=>{setIsActive(true)}} /><span className={isActive? styles.activeArrow : ''}><svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414Z" fill="#212121"/></svg></span>
<ul className={styles.list + " " + (isActive ? styles.activeList : '')} >
{props.objects ? props.objects.map((item,index)=>{

    return(<li className={styles.lister + " " + (activeState.ind == index ? styles.activeLister : '')} key={index} onClick={e=>{setActiveState({value : item.value , title : item.title , ind : index}),props.setSelect(props.out? index : item.value),setIsActive(false)}}>{!props.single ?<p>{item.value}</p>:''}<h2>{item.title}</h2></li>)
}):''}

</ul>


        </div>
    )
}

export default CustomSelect;