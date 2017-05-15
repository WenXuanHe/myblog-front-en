import React from "react"
import Editor from './Editor'
import FileUpload from '../upload/FileUpload'

export default class FileEditor extends React.Component{

    render(){
        return (
            <div>
                <Editor id="editor" ref='editor' />
                <FileUpload ref='upload'/>
            </div>
        )
    }

    getFiles = () =>{
        return this.refs.upload.getFiles();
    }

    getEditContent = ()=>{
        return this.refs.editor.getEditContent();
    }
}
