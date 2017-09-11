import * as React from "react"
import Editor from './Editor'
import FileUpload from '../upload/FileUpload'

export default class FileEditor extends React.Component<undefined, undefined>{

    render(){
        return (
            <div className='edit-content'>
                <Editor />
                <FileUpload/>
            </div>
        )
    }
}
