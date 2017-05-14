import React from 'react';
import FileEditor from './editor/FileEditor';
import { Link } from 'react-router-dom'
export default class Index extends React.Component{

    constructor() {
        super(...arguments);
    }

    render(){
        return (
            <div>
               <FileEditor ref='fileEditor' />
               <a href="javascript:void(0);" onClick={this.submit}>提交</a>
               <Link to='/home' >home</Link>
            </div>
        )
    }

    //todo
    submit = () => {
        let files = this.refs.fileEditor.getFiles();
        let content = this.refs.fileEditor.getEditContent();
        let result = {
            files,
            content
        };
        console.log(result);
    }
}
