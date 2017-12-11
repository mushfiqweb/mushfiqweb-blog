import * as React from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

const HtmlEditorCompo = (editorText, onEditorChange) => {
    return (<ReactQuill
        value={editorText}
        onChange={onEditorChange} />);
}


export default HtmlEditorCompo;