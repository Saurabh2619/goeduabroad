

import { atomOneLight, CopyBlock } from "react-code-blocks";
function CodeBlock(props) {
  
  return (
    <CopyBlock language="jsx"  text={props.data} theme={atomOneLight} highlight={props.highlight ? props.highlight : ''}>
      {props.data}
    </CopyBlock>
  )
}

export default CodeBlock;


