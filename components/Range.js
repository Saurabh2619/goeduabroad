import { useEffect, useRef, useState } from 'react';
import styles from './Range.module.css';
import SwitchGroup from './SwitchGroup';

const Range = (props) => {

    const { min, max, value, suffix, onChange } = props;
   



const [punit,setPUnit] = useState();
const [current,setCurrent] = useState(0);
const [disabled,setDisabled] = useState(false)

useEffect(()=>{
if(punit != "auto"){
  props.onChange(Interpolate(min,max,current)[1])}
},[current])

function getInitValue(a){

  if(a == undefined){
    return min+suffix;
  }
  
  const given = parseInt(a);
  const r = given/(max-min)*100
  return Math.round(r).toFixed(0);
}

useEffect(()=>{
    setPUnit(units[getValueIndex(props.value)].value)
    setCurrent(getInitValue(props?.value))
    
},[])
useEffect(()=>{

  if(punit == "auto"){
setDisabled(true);
props.onChange("auto")
  }
  else{
    props.onChange(Interpolate(min,max,current)[1])
    setDisabled(false)
  }
},[punit])
    const units =[{
        title:'px',
        value:'px'
    },
    {
        title:'rem',
        value:'rem'
    },
    {
        title:'%',
        value:'%'
    },
    {
        title:'auto',
        value:'auto'
    }
]

function getValueIndex(value) {
  
  if(!value){
    return 0
  }
  if (Number.isInteger(value)) {
   return 0
  }
  const valueTypeIndex = units.findIndex(unit => value.includes(unit.value));
  return valueTypeIndex;
}
const sliderContainerRef = useRef(null);

const handleMouseDown = (event) => {
  // Prevent default behavior to avoid text selection while dragging
  event.preventDefault();

  // Add event listeners to track mouse movement
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
};
function Interpolate(min,max,current){
  const newVal = Math.round((current / 100) * (max - min) + min).toFixed(0);

  return [parseInt(newVal),newVal+punit];

}



const handleMouseMove = (event) => {
  // Calculate the new percentage value based on mouse position
  const containerWidth = sliderContainerRef.current.offsetWidth;
  const newPosition = event.pageX - sliderContainerRef.current.getBoundingClientRect().left;
  let newCurrent = (newPosition / containerWidth) * 100;

  // Ensure the value stays within the 0 to 100 range
  newCurrent = Math.min(Math.max(newCurrent, 0), 100);

  // Update the setCurrent state with the new value
  setCurrent(newCurrent);
};

const handleMouseUp = () => {
  // Remove event listeners when mouse is released
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
};
 

if(current != undefined){
    return (
      <div className={styles.slideout}>
<h3>{props.label}</h3>
        <div className={styles.sliderwrap}><p>{punit != "auto" ? min :"" }{punit != "auto" ? punit : 'auto'}</p>
        <div className={styles.sliderContainer} ref={sliderContainerRef}>
          <div className={styles.sliderThumb} onMouseDown={handleMouseDown} style={{left:`${current}%`}}>
            <div className={styles.pulse} style={{transform:`scale(${current/40})`}}></div>
            <div className={styles.currentValue}>{punit != "auto" ? Interpolate(min,max,current)[1]: 'auto'}</div>
          </div>
        </div>
        <p>{punit != "auto" ? <>{punit == "%" ? 100 : max}</>:'auto'} {punit != "auto" ? punit : ''}</p>
        </div>
       <SwitchGroup defaultValue={getValueIndex(props.value)} data={units} onChange={(e)=>{setPUnit(e)}}></SwitchGroup>
      
      </div>
    )}
  };
  
  export default Range;