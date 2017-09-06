
import React from 'react'

class ArticleDelete extends React.PureComponent {

    delete = () => {
        this.props.onClick(this.props.id);
    }

    render() {
        return <span className="z-file-logo" onClick={this.delete}>
            <i className="iconfont">&#xe6f2;</i>
        </span>
    }
}
export default ArticleDelete;