import React, { useRef } from "react";
import JoditEditor from "jodit-react";
import "../../styles/post.css";

function TextEditor({ setContent, value }) {
  const editor = useRef(null);

  return (
    <div>
      <JoditEditor
        ref={editor}
        onChange={(content) => setContent(content)}
        value={value}
      />
    </div>
  );
}

export default TextEditor;
