import * as React from "react"

interface Props{
    onChange:(files:Array<any>) => void
}

class FileUpload extends React.PureComponent<Props>{

    files:Array<any>;

    render(){
        return (
            <div className='m-upload'>
                <input type='file' multiple onChange={this.change} />
            </div>
        )
    }
    change = (e)=>{
        this.props.onChange(e.target.files)
    }
}
export default FileUpload;