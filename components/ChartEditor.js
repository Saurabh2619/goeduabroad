import { useEffect, useState } from 'react';
import styles from './ChartEditor.module.css'
import Range from './Range';
import InputField from './InputField';
import Button from './Button';
import CustomSelect from './CustomSelect';

function ChartEditor(props){


const [data,setData] = useState();
const [edit,setEdit] = useState();
const [enableAdder,setEnableAdder] = useState(false);
const [addData,setaddData] = useState();
useEffect(()=>{
    setData(props?.value)
},[])
const copyLastObjectAndAppend = () => {
    if (data.data.length > 0) {
      const lastObject = data.data[data.data.length - 1];
      setData((prevData) => ({
        ...prevData,
        data: [...prevData.data, { ...lastObject }],
      }));
    }
  };
  const appendToBarsAndAddKey = (newBar) => {
    const newBars = [...data.bars, newBar];
    const newData = {
      ...data,
      bars: newBars,
    };

    newData.data.forEach((item) => {
      item[newBar.key] = 0; // Adding new key to each object in the data array
    });

    setData(newData);
  };
  const removeObjectAtIndex = (indexToRemove) => {
    if (indexToRemove >= 0 && indexToRemove < data.data.length) {
      const newData = {
        ...data,
        data: data.data.filter((_, index) => index !== indexToRemove),
      };
      setData(newData);
    }
  };


  const removeFromBarsAndRemoveKey = (indexToRemove) => {
    const barToRemove = data.bars[indexToRemove];

    const newBars = data.bars.filter((_, index) => index !== indexToRemove);
    const newData = {
      ...data,
      bars: newBars,
    };

    newData.data.forEach((item) => {
      if (item.hasOwnProperty(barToRemove.key)) {
        delete item[barToRemove.key]; // Removing the key from each object in the data array
      }
    });

    setData(newData);
  };
  const handleContentChange = (index, keyToUpdate, newValue) => {
    if (index >= 0 && index < data.data.length) {
        const newData = { ...data };
        newData.data[index][keyToUpdate] = newValue;
        setData(newData);
      }
  };
useEffect(()=>{
props.onChange(data)
},[data])

const options = [
    {
        title:'Area Chart',
        value:'area',

    },
    {
        title:'Bar Chart',
        value:'bar',
        
    }
]
    return <>
    {data != undefined ?
    <div className={styles.data}>
        <h2 className={styles.heading}>Select Chart</h2>
        <CustomSelect noPadding z={99} defaultText="Select Chart Type" defaultIndex={options.findIndex((item) => item.value === data.type)} value={data?.type} setSelect={(e)=>{setData(res=>({...res,type:e}))}} objects={
            options
        }></CustomSelect>
        <h2 className={styles.heading}>Chart Settings</h2>
        <Range label={'Chart Height'} value={data.height} min={0} max={500} onChange={(e)=>{setData(res=>({...res,height:e}))}}></Range>
        <div className={styles.values}>

        <div className={styles.row}>
            <div className={styles.scell + " " + styles.deleter}></div>
            {data?.data && data.data.map((i,d)=>{

                return <div contentEditable={edit == d ? true : false} onClick={()=>{setEdit(d)}} className={styles.scell + " " + styles.deleter}  suppressContentEditableWarning
                onBlur={(event) => handleContentChange(d,'name', event.target.textContent)}>
                    {i.name}
                </div>
            })}
            <div className={styles.scell + " " + styles.deleter}></div>
            </div>
            {data.bars && data.bars.map((i,d)=>{
                return <div className={styles.row}>
<div className={styles.headcell} onClick={()=>{removeFromBarsAndRemoveKey(d)}} style={{backgroundColor:i.color}}>{i.name}

<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 5a.75.75 0 0 0-.743.648l-.007.102v3.5h-3.5a.75.75 0 0 0-.102 1.493l.102.007h3.5v3.5a.75.75 0 0 0 1.493.102l.007-.102v-3.5h3.5a.75.75 0 0 0 .102-1.493l-.102-.007h-3.5v-3.5A.75.75 0 0 0 12 7Z" fill="#212121"/></svg></div>
{data.data && data.data.map((z,v)=>{
    return <div className={styles.scell} onClick={()=>{setEdit(v)}}
    contentEditable={edit == v ? true : false}
            suppressContentEditableWarning
            onBlur={(event) => handleContentChange(v,i.key, event.target.textContent)}
    >{z[i.key]}</div>
})}
  <div onClick={copyLastObjectAndAppend} className={styles.scell + " " + styles.add}><svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.883 3.007 12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007Z" fill="#212121"/></svg></div>              </div>
            })}
            <div className={styles.row}>
            <div className={styles.scell + " " + styles.deleter}></div>
            {data?.data && data.data.map((i,d)=>{

                return <div className={styles.scell + " " + styles.deleter} onClick={()=>{removeObjectAtIndex(d)}}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 5a.75.75 0 0 0-.743.648l-.007.102v3.5h-3.5a.75.75 0 0 0-.102 1.493l.102.007h3.5v3.5a.75.75 0 0 0 1.493.102l.007-.102v-3.5h3.5a.75.75 0 0 0 .102-1.493l-.102-.007h-3.5v-3.5A.75.75 0 0 0 12 7Z" fill="#212121"/></svg>
                </div>
            })}
            <div className={styles.scell + " " + styles.deleter}></div>
            </div>
            <div className={styles.rowadd} onClick={()=>{
               setEnableAdder(true)
            }}>Add New Row</div>
{enableAdder ? 
<div className={styles.adder}>
    <InputField type="text" value={'key'} label={"Key"} onChange={(e)=>{setaddData(res=>({...res,key:e}))}}></InputField>
    <InputField type="text" value={'name'} label={"Name"} onChange={(e)=>{setaddData(res=>({...res,name:e}))}}></InputField>
    <InputField type="colorpicker" value={'#ffffff'} label={"Color"} onChange={(e)=>{setaddData(res=>({...res,color:e}))}}></InputField>
    <Button onClick={()=>{ appendToBarsAndAddKey(addData)}} text="ADD NEW"></Button>
</div>
:''}

        </div>
    </div>:''}</>
}

export default ChartEditor;