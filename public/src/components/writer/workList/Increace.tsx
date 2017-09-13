
import * as React from 'react'

interface Props{
    onChange: (name:string) => void
}

class Increace extends React.PureComponent<Props> {
    setNewWorkName = (e) =>{
        this.props.onChange(e.target.value);
    }
    render() {
        return (
            <div className='u-file-name'>
                <div className='field'>
                    <input type='text' placeholder='请输入文集名'
                    onChange={this.setNewWorkName}/>
                </div>
                {
                    this.props.children
                }
            </div>
        )
    }
}
export default Increace;