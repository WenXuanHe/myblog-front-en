import React from "react"
import Editor from './editor'
import FileUpload from './fileUpload'

export default class WangEditor extends React.Component{

    render(){
        return (
            <div>
                <Editor id="editor"/>
                <FileUpload />
            </div>
        )
    }
}
