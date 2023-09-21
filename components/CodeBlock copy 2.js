import styles from './CodeBlock.module.css'

import { atomOneLight, CopyBlock, dracula } from "react-code-blocks";
function CodeBlock(props) {
  
  return (
    <div className={styles.codewrap}>
     <div className={styles.filepath}>{props?.filepath ? props.filepath : 'Code Block'}</div>
    <CopyBlock  language="jsx" showLineNumbers={true}   text={props.data} theme={dracula} highlight={props.highlight ? props.highlight : ''}>
      {props.data}
    </CopyBlock></div>
  )
}

export default CodeBlock;


