
import React from 'react'

class Increace extends React.PureComponent {
    setNewWorkName = () =>{
        this.props.onChange(this.props.newWorkName);
    }
    render() {
        return (
            <div className='u-file-name'>
                <div className='field'>
                    <input type='text' placeholder='请输入文集名'
                    onChange={this.setNewWorkName}
                    value={this.props.newWorkName} />
                </div>
                {
                    this.props.children
                }
            </div>
        )
    }
}
export default Increace;