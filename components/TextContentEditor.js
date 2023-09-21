import Editor from 'react-simple-wysiwyg';
import { useEffect, useState } from 'react';
function TextContentEditor(props){

    const [html, setHtml] = useState(props?.value ? props.value: '<b>Start Editing Here</b>');

    useEffect(()=>{

        props.onChange(html)
    },[])
    function onChange(e) {

        setHtml(e.target.value);
        props.onChange(e.target.value)
      }

      return (
        <Editor value={html} onChange={onChange} />
      );
    
}

export default TextContentEditor;