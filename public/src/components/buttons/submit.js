// import React from 'react';
let React = require('react');

class Submit extends React.Component{
    render(){
        return (
            <a className="btn btn-green" href="javascript:void(0);" onClick={this.props.func}>{this.props.value}</a>
        )
    }
}

module.exports = Submit;
