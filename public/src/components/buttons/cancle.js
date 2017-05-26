// import React from 'react';
let React = require('react');

class Cancle extends React.Component{
    constructor(){
        super(...arguments);
        this.value = this.props.value || '取消';
        this.func = this.props.func;
    }
    render(){
        return (
            <a className="btn btn-dark" href="javascript:void(0);" onClick={this.func}>{this.value}</a>
        )
    }
}

// export default Submit;
module.exports = Cancle;

