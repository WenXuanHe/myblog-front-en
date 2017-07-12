// import React from "react"

let React = require('react');

class FileUpload extends React.Component{

    constructor(){
        super(...arguments);
        this.state = {
            files:[]
        };
    }
    render(){
        return (
            <div className='m-upload'>
                <input type='file' multiple onChange={this.changed} />
            </div>
        )
    }

    changed = (e)=>{
        this.setState({
            'files': e.target.files
        });
    }

    getFiles = ()=>{
        return this.state.files;
    }
}
// export default FileUpload;
module.exports = FileUpload;