let React = require('react');


/**
 * 处理所有未匹配路由
 */
class NoMatch extends React.Component{
    render(){
        return (
            <div>123</div>
        )
    }
}
//ReactDOMServer.renderToString(React.createFactory()

module.exports = <NoMatch />;
