import React, { useRef } from "react";
import JoditEditor from "jodit-react";
import "../../styles/post.css";

function TextEditor({ setContent, intialValue }) {
  const editor = useRef(null);

  return (
    <div>
      <JoditEditor
        ref={editor}
        onChange={(content) => setContent(content)}
        value={intialValue}
      />
    </div>
  );
}

export default TextEditor;
