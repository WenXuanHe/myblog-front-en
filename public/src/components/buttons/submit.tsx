import * as React from 'react';

export interface Props{
    func: () => void,
    value: string
}

class Submit extends React.Component<Props, undefined>{
    render(){
        return (
            <a className="btn btn-green" href="javascript:void(0);" onClick={this.props.func}>{this.props.value}</a>
        )
    }
}
export default Submit;
