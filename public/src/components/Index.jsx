import React from 'react'
import '../styles/index.scss';

export default class Index extends React.Component{

    render(){
        return (
            <div>
               <a href="javascript:void(0);" onClick={this.submit}>提交</a>
            </div>
        )
    }

    //todo
    submit = () => {
        // let files = this.refs.fileEditor.getFiles();
        // let content = this.refs.fileEditor.getEditContent();
        
    }
}
