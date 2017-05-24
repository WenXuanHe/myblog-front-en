import React from "react"

export default class FileUpload extends React.Component{

    constructor(){
        super(...arguments);
        this.state = {
            files:[]
        };
    }
    render(){
        return (
            <div>
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
