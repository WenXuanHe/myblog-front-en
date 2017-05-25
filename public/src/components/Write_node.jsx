let React = require('react');
let InitData = require('../redux/store/data.js');
/**
 * 处理所有未匹配路由
 */
class NoMatch extends React.Component{
    render(){
        return (
            <div>
                <h3>No match for <code>1111111111</code></h3>
            </div>
        )
    }
}

module.export = NoMatch;