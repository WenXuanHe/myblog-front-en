import React from 'react';

export default class Submit extends React.Component{
    constructor(){
        super(...arguments);
        this.value = this.props.value || '删除';
        this.func = this.props.func;
    }
    render(){
        return (
            <a className="btn btn-delete" href="javascript:void(0);" onClick={this.func}>{this.value}</a>
        )
    }
}