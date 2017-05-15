import React from 'react';

/**
 * 处理所有未匹配路由
 */
export default class NoMatch extends React.Component{

    componentWillMount(){

    }
    render(){
        return (
            <div>
                <h3>No match for <code>{this.props.location.pathname}</code></h3>
            </div>
        )
    }
}
