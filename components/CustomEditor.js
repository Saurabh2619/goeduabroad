import React, { useState, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import styles from './CustomEditor.module.css';

function CustomEditor(props) {
  const [content, setContent] = useState(props.data ? props.data : '');

  // Define config with the sticky toolbar options
  const config = useMemo(() => ({
    readonly: false,
    placeholder: props.data || 'Start typing...',
    showXPathInStatusbar: true, // Enable tag selector
    toolbarSticky: true,
    toolbarStickyOffset: 0, // Set your desired offset
  }), [props.data]);

  return (
    <div className={styles.edit}>
      <JoditEditor
        value={content}
        config={config}
        tabIndex={1}
        onChange={newContent => {
          setContent(newContent);
          props.onChange(newContent);
        }}
      />
    </div>
  );
}

export default CustomEditor;
