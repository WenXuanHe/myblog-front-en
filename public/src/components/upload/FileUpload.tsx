import * as React from "react"

export interface State {
    files: Array<any>
}

class FileUpload extends React.Component<undefined, State>{

    constructor(){
        super();
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
    changed = (e:any)=>{
        this.setState({
            'files': e.target.files
        });
    }
    getFiles = ()=>{
        return this.state.files;
    }
}
export default FileUpload;