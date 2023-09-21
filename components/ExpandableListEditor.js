import styles from './ExpandableListEditor.module.css'
import {useEffect, useState} from 'react'
import HTML_Render from './HTML_Render'
import InputField from './InputField';

import dynamic from 'next/dynamic';
const CustomEditor = dynamic(() => import('./CustomEditor'), {
    ssr: false,
  });
function ExpandableListEditor(props){

const [data,setData] = useState()
const [editMode,setMode] = useState(1);
useEffect(()=>{
    setData(props.value)
},[])
const updateValueAtIndex = (index, key, newValue) => {
    setData(prevData => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], [key]: newValue };
      return newData;
    });
  };const deleteItemAtIndex = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };
useEffect(()=>{

    props.onChange(data)
},[data])

    return <div className={styles.listwrap}>
{data && data.map((i,d)=>{
    return <div className={styles.item + " " + (editMode == d ? styles.activeMode : '')}>
      {editMode ==d ? '' :<><div className={styles.editbutton}>Edit</div><svg onClick={()=>{deleteItemAtIndex(d)}} className={styles.delete} width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 5a.75.75 0 0 0-.743.648l-.007.102v3.5h-3.5a.75.75 0 0 0-.102 1.493l.102.007h3.5v3.5a.75.75 0 0 0 1.493.102l.007-.102v-3.5h3.5a.75.75 0 0 0 .102-1.493l-.102-.007h-3.5v-3.5A.75.75 0 0 0 12 7Z" fill="#212121"/></svg></>}

    {editMode == d ? <InputField type="text" label={"Question"} value={i.question} onChange={(e)=>{updateValueAtIndex(d,"question",e)}}/>:<div onClick={()=>{setMode(d)}} className={styles.list + " " + styles.head}>{i.question}</div>}
  {editMode == d  ?  <CustomEditor data={i.answer} onChange={(e)=>{updateValueAtIndex(d,"answer",e)}}></CustomEditor>: <div className={styles.list} onClick={()=>{setMode(d)}}><HTML_Render data={i.answer}></HTML_Render></div>}
    </div>

}
)

}
<div className={styles.item} onClick={()=>{setData(res=>([...res,{question:'Demo Heading',answer:'<p>Edit Content</p>'}]))}}>
  <div className={styles.list + " " + styles.add}><svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.883 3.007 12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007Z" fill="#212121"/></svg> ADD NEW ITEM</div>
</div>
    </div>
}

export default ExpandableListEditor;