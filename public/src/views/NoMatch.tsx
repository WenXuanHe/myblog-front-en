import * as React from 'react'

interface Props {
    location:any
}

/**
 * 处理所有未匹配路由
 */
class NoMatch extends React.PureComponent<Props>{

    render(){
        return (
            <div>
                <h3>No match for <code>{this.props.location.pathname}</code></h3>
            </div>
        )
    }
}

export default NoMatch
